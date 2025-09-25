import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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
    const consumerKey = Deno.env.get('PESAPAL_CONSUMER_KEY');
    const consumerSecret = Deno.env.get('PESAPAL_CONSUMER_SECRET');

    if (!consumerKey || !consumerSecret) {
      throw new Error('PesaPal credentials not configured');
    }

    // PesaPal authentication endpoint
    const authUrl = 'https://pay.pesapal.com/v3/api/Auth/RequestToken';
    
    const authPayload = {
      consumer_key: consumerKey,
      consumer_secret: consumerSecret
    };

    console.log('Requesting PesaPal auth token...');

    const response = await fetch(authUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(authPayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('PesaPal auth failed:', errorText);
      throw new Error(`PesaPal authentication failed: ${response.status}`);
    }

    const authData = await response.json();
    console.log('PesaPal auth successful');

    return new Response(JSON.stringify(authData), {
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json' 
      }
    });

  } catch (error) {
    console.error('Error in pesapal-auth:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Authentication failed', 
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