import React from 'react';
import { CreditCard } from 'lucide-react';
import { Button } from '../ui/Button';
import { useSubscription } from '../../hooks/useSubscription';
import { useStripePortal } from '../../hooks/useStripePortal';
import { getProductByPriceId, formatPrice } from '../../stripe-config';

export function SubscriptionSection() {
  const { subscription, isActive } = useSubscription();
  const { openCustomerPortal, loading: portalLoading } = useStripePortal();

  const getCurrentPlan = () => {
    if (!subscription?.price_id) return null;
    return getProductByPriceId(subscription.price_id);
  };

  const currentPlan = getCurrentPlan();

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
      <div className="flex items-center mb-6">
        <CreditCard className="h-6 w-6 text-green-400 mr-3" />
        <h2 className="text-2xl font-bold text-white">Subscription Management</h2>
      </div>

      <div className="space-y-4">
        {subscription && currentPlan ? (
          <div className="p-4 bg-gray-700/50 rounded-lg">
            <div className="text-white font-semibold mb-2">Current Plan</div>
            <div className="text-gray-300 mb-2">
              <span className="text-blue-400 font-semibold">{currentPlan.name}</span>
            </div>
            <div className="text-gray-300 mb-2">
              <span className="text-green-400">{formatPrice(currentPlan.price)}</span>
              <span className="text-gray-400">/{currentPlan.interval}</span>
            </div>
            <div className="text-gray-300">
              Status: <span className="text-green-400 capitalize">{subscription?.subscription_status}</span>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-gray-700/50 rounded-lg">
            <div className="text-white font-semibold mb-2">No Active Subscription</div>
            <div className="text-gray-300">
              You don't have an active subscription yet.
            </div>
          </div>
        )}

        {subscription && isActive() ? (
          <Button
            onClick={() => openCustomerPortal()}
            disabled={portalLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {portalLoading ? 'Opening Portal...' : 'Manage Subscription & Billing'}
          </Button>
        ) : (
          <Button
            onClick={() => window.location.href = '/pricing'}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Start Subscription
          </Button>
        )}

        <p className="text-gray-400 text-sm">
          {subscription && isActive() 
            ? "This will open Stripe's secure portal where you can update payment methods, change plans, view invoices, and cancel your subscription."
            : "Choose a subscription plan to start making an impact."
          }
        </p>
      </div>
    </div>
  );
}