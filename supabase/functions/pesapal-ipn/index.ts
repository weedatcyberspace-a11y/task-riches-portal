import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('PesaPal IPN received:', req.method, req.url);
    
    const url = new URL(req.url);
    const notificationType = url.searchParams.get('pesapal_notification_type');
    const trackingId = url.searchParams.get('pesapal_transaction_tracking_id');
    const merchantReference = url.searchParams.get('pesapal_merchant_reference');

    console.log('IPN Parameters:', { notificationType, trackingId, merchantReference });

    if (notificationType === 'CHANGE' && trackingId) {
      // Get auth token
      const authResponse = await fetch(`${url.origin}/functions/v1/pesapal-auth`, {
        method: 'POST'
      });

      if (!authResponse.ok) {
        throw new Error('Failed to authenticate with PesaPal');
      }

      const authData = await authResponse.json();
      const accessToken = authData.token;

      // Query transaction status
      const statusUrl = `https://pay.pesapal.com/v3/api/Transactions/GetTransactionStatus?orderTrackingId=${trackingId}`;
      
      const statusResponse = await fetch(statusUrl, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json'
        }
      });

      if (!statusResponse.ok) {
        throw new Error('Failed to get transaction status');
      }

      const statusData = await statusResponse.json();
      console.log('Transaction status:', statusData);

      // Update database based on status
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      );

      const paymentStatus = statusData.payment_status_description?.toLowerCase() === 'completed' ? 'completed' : 'failed';
      
      const { error: updateError } = await supabase
        .from('payments')
        .update({ status: paymentStatus })
        .eq('paypal_payment_id', trackingId);

      if (updateError) {
        console.error('Database update error:', updateError);
      }

      // If payment completed, update user profile
      if (paymentStatus === 'completed') {
        // Find the payment record to get user_id
        const { data: payment } = await supabase
          .from('payments')
          .select('user_id, amount')
          .eq('paypal_payment_id', trackingId)
          .single();

        if (payment) {
          // Update user's account balance (activation fee becomes starting balance)
          const { error: profileError } = await supabase
            .from('profiles')
            .update({ 
              account_balance: payment.amount,
              total_earned: payment.amount 
            })
            .eq('user_id', payment.user_id);

          if (profileError) {
            console.error('Profile update error:', profileError);
          } else {
            console.log('User profile updated with activation payment');
          }
        }
      }

      // Send acknowledgment back to PesaPal
      const response = `pesapal_notification_type=${notificationType}&pesapal_transaction_tracking_id=${trackingId}&pesapal_merchant_reference=${merchantReference}`;
      
      return new Response(response, {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'text/plain' 
        }
      });
    }

    return new Response('OK', {
      headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
    });

  } catch (error) {
    console.error('Error in pesapal-ipn:', error);
    return new Response('Error processing IPN', {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
    });
  }
});