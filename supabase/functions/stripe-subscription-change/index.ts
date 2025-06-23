import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!;
const stripe = new Stripe(stripeSecret, {
  appInfo: {
    name: 'Bolt Integration',
    version: '1.0.0',
  },
});

// Helper function to create responses with CORS headers
function corsResponse(body: string | object | null, status = 200) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': '*',
  };

  if (status === 204) {
    return new Response(null, { status, headers });
  }

  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  });
}

Deno.serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
      return corsResponse({}, 204);
    }

    if (req.method !== 'POST') {
      return corsResponse({ error: 'Method not allowed' }, 405);
    }

    const { new_price_id } = await req.json();

    if (!new_price_id || typeof new_price_id !== 'string') {
      return corsResponse({ error: 'new_price_id is required and must be a string' }, 400);
    }

    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const {
      data: { user },
      error: getUserError,
    } = await supabase.auth.getUser(token);

    if (getUserError) {
      return corsResponse({ error: 'Failed to authenticate user' }, 401);
    }

    if (!user) {
      return corsResponse({ error: 'User not found' }, 404);
    }

    // Get the customer and current subscription from the database
    const { data: subscriptionData, error: getSubscriptionError } = await supabase
      .from('stripe_user_subscriptions')
      .select('*')
      .maybeSingle();

    if (getSubscriptionError) {
      console.error('Failed to fetch subscription information', getSubscriptionError);
      return corsResponse({ error: 'Failed to fetch subscription information' }, 500);
    }

    if (!subscriptionData || !subscriptionData.subscription_id) {
      return corsResponse({ error: 'No active subscription found' }, 404);
    }

    // Check if the new price is the same as current price
    if (subscriptionData.price_id === new_price_id) {
      return corsResponse({ error: 'You are already on this tier' }, 400);
    }

    try {
      // Get the current subscription from Stripe
      const currentSubscription = await stripe.subscriptions.retrieve(subscriptionData.subscription_id);

      if (!currentSubscription || currentSubscription.status !== 'active') {
        return corsResponse({ error: 'Current subscription is not active' }, 400);
      }

      // Update the subscription with the new price
      const updatedSubscription = await stripe.subscriptions.update(subscriptionData.subscription_id, {
        items: [{
          id: currentSubscription.items.data[0].id,
          price: new_price_id,
        }],
        proration_behavior: 'create_prorations', // This will prorate the change
      });

      console.log(`Successfully updated subscription ${subscriptionData.subscription_id} to price ${new_price_id}`);

      // The webhook will handle updating our database, but we can return success immediately
      return corsResponse({ 
        success: true, 
        message: 'Subscription updated successfully',
        subscription_id: updatedSubscription.id,
        new_price_id: new_price_id
      });

    } catch (stripeError: any) {
      console.error('Stripe error updating subscription:', stripeError);
      
      if (stripeError.code === 'resource_missing') {
        return corsResponse({ error: 'Subscription not found in Stripe' }, 404);
      }
      
      return corsResponse({ error: `Failed to update subscription: ${stripeError.message}` }, 500);
    }

  } catch (error: any) {
    console.error(`Subscription change error: ${error.message}`);
    return corsResponse({ error: error.message }, 500);
  }
});