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
    const { amount, email, firstName, lastName, phoneNumber } = await req.json();
    
    if (!amount || !email || !firstName || !lastName) {
      throw new Error('Missing required fields');
    }

    // Get auth token first
    const authResponse = await fetch(`${req.url.replace('/pesapal-payment', '/pesapal-auth')}`, {
      method: 'POST'
    });

    if (!authResponse.ok) {
      throw new Error('Failed to authenticate with PesaPal');
    }

    const authData = await authResponse.json();
    const accessToken = authData.token;

    // Create unique order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Prepare payment request
    const paymentPayload = {
      id: orderId,
      currency: 'KES',
      amount: parseFloat(amount),
      description: 'TaskEarner Account Activation Fee',
      callback_url: `${new URL(req.url).origin}/activation-success`,
      notification_id: Deno.env.get('PESAPAL_IPN_ID') || 'DEFAULT_IPN_ID',
      billing_address: {
        email_address: email,
        phone_number: phoneNumber || '0700000000',
        first_name: firstName,
        last_name: lastName,
      }
    };

    console.log('Submitting payment request to PesaPal...', { orderId, amount });

    // Submit order to PesaPal
    const paymentResponse = await fetch('https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(paymentPayload)
    });

    if (!paymentResponse.ok) {
      const errorText = await paymentResponse.text();
      console.error('PesaPal payment submission failed:', errorText);
      throw new Error(`Payment submission failed: ${paymentResponse.status}`);
    }

    const paymentData = await paymentResponse.json();
    console.log('PesaPal payment response:', paymentData);

    // Store payment record in database
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { error: dbError } = await supabase.from('payments').insert({
      user_id: req.headers.get('user-id'),
      amount: parseFloat(amount),
      status: 'pending',
      paypal_order_id: orderId, // Using this field for PesaPal order ID
      paypal_payment_id: paymentData.order_tracking_id || paymentData.merchant_reference,
      plan_id: null // Activation fee, not a plan
    });

    if (dbError) {
      console.error('Database error:', dbError);
    }

    return new Response(JSON.stringify({
      success: true,
      redirect_url: paymentData.redirect_url,
      order_id: orderId,
      tracking_id: paymentData.order_tracking_id
    }), {
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json' 
      }
    });

  } catch (error) {
    console.error('Error in pesapal-payment:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Payment processing failed', 
        details: error instanceof Error ? error.message : String(error) 
      }),
      {
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }
      }
    );
  }
});