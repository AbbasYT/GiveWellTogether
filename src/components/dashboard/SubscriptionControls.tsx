import React from 'react';
import { CreditCard, TrendingUp, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';
import { useStripePortal } from '../../hooks/useStripePortal';

export function SubscriptionControls() {
  const { openCustomerPortal, loading, error } = useStripePortal();

  const handleManageSubscription = () => {
    // Use the actual Stripe portal link you provided
    window.open('https://billing.stripe.com/p/login/test_9B6dRb1MN3J6bkscQc4Rq00', '_blank');
  };

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4">Subscription Controls</h3>
      
      <div className="space-y-3">
        <Button
          onClick={handleManageSubscription}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-between"
        >
          <span className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            Manage Subscription
          </span>
          <ExternalLink className="h-4 w-4" />
        </Button>
        
        <Button
          onClick={() => window.location.href = '/pricing'}
          variant="outline"
          className="w-full bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50 justify-between"
        >
          <span className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            Change Tier
          </span>
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}