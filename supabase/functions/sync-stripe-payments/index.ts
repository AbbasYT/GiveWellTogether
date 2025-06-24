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

    // Get the customer ID from the database
    const { data: customer, error: getCustomerError } = await supabase
      .from('stripe_customers')
      .select('customer_id')
      .eq('user_id', user.id)
      .is('deleted_at', null)
      .maybeSingle();

    if (getCustomerError) {
      console.error('Failed to fetch customer information from the database', getCustomerError);
      return corsResponse({ error: 'Failed to fetch customer information' }, 500);
    }

    if (!customer || !customer.customer_id) {
      return corsResponse({ error: 'No customer found' }, 404);
    }

    const customerId = customer.customer_id;

    // Fetch all payment intents for this customer from Stripe
    const paymentIntents = await stripe.paymentIntents.list({
      customer: customerId,
      limit: 100, // Adjust as needed
    });

    console.log(`Found ${paymentIntents.data.length} payment intents for customer ${customerId}`);

    let syncedCount = 0;
    let errorCount = 0;

    // Process each payment intent
    for (const paymentIntent of paymentIntents.data) {
      try {
        // Only process successful payments
        if (paymentIntent.status !== 'succeeded') {
          continue;
        }

        // Check if this payment already exists in our database
        const { data: existingOrder } = await supabase
          .from('stripe_orders')
          .select('id')
          .eq('payment_intent_id', paymentIntent.id)
          .maybeSingle();

        if (existingOrder) {
          console.log(`Payment intent ${paymentIntent.id} already exists in database`);
          continue;
        }

        // Get the checkout session for this payment intent
        const sessions = await stripe.checkout.sessions.list({
          payment_intent: paymentIntent.id,
          limit: 1,
        });

        if (sessions.data.length === 0) {
          console.log(`No checkout session found for payment intent ${paymentIntent.id}`);
          continue;
        }

        const session = sessions.data[0];

        // Insert the order into our database
        const { error: insertError } = await supabase.from('stripe_orders').insert({
          checkout_session_id: session.id,
          payment_intent_id: paymentIntent.id,
          customer_id: customerId,
          amount_subtotal: session.amount_subtotal || paymentIntent.amount,
          amount_total: session.amount_total || paymentIntent.amount,
          currency: paymentIntent.currency,
          payment_status: 'paid',
          status: 'completed',
          // Use the payment intent created date as the order date
          created_at: new Date(paymentIntent.created * 1000).toISOString(),
        });

        if (insertError) {
          console.error(`Error inserting order for payment intent ${paymentIntent.id}:`, insertError);
          errorCount++;
        } else {
          console.log(`Successfully synced payment intent ${paymentIntent.id}`);
          syncedCount++;
        }

      } catch (error) {
        console.error(`Error processing payment intent ${paymentIntent.id}:`, error);
        errorCount++;
      }
    }

    // Also sync subscription data
    await syncCustomerFromStripe(customerId);

    return corsResponse({
      success: true,
      message: `Synced ${syncedCount} payments, ${errorCount} errors`,
      syncedCount,
      errorCount,
    });

  } catch (error: any) {
    console.error(`Sync error: ${error.message}`);
    return corsResponse({ error: error.message }, 500);
  }
});

async function syncCustomerFromStripe(customerId: string) {
  try {
    // fetch latest subscription data from Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1,
      status: 'all',
      expand: ['data.default_payment_method'],
    });

    if (subscriptions.data.length === 0) {
      console.info(`No subscriptions found for customer: ${customerId}`);
      return;
    }

    // assumes that a customer can only have a single subscription
    const subscription = subscriptions.data[0];

    // store subscription state
    const { error: subError } = await supabase.from('stripe_subscriptions').upsert(
      {
        customer_id: customerId,
        subscription_id: subscription.id,
        price_id: subscription.items.data[0].price.id,
        current_period_start: subscription.current_period_start,
        current_period_end: subscription.current_period_end,
        cancel_at_period_end: subscription.cancel_at_period_end,
        ...(subscription.default_payment_method && typeof subscription.default_payment_method !== 'string'
          ? {
              payment_method_brand: subscription.default_payment_method.card?.brand ?? null,
              payment_method_last4: subscription.default_payment_method.card?.last4 ?? null,
            }
          : {}),
        status: subscription.status,
      },
      {
        onConflict: 'customer_id',
      },
    );

    if (subError) {
      console.error('Error syncing subscription:', subError);
      throw new Error('Failed to sync subscription in database');
    }
    console.info(`Successfully synced subscription for customer: ${customerId}`);
  } catch (error) {
    console.error(`Failed to sync subscription for customer ${customerId}:`, error);
    throw error;
  }
}