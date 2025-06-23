import React from 'react';
import { CreditCard, TrendingUp, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';
import { useStripePortal } from '../../hooks/useStripePortal';

export function SubscriptionControls() {
  const { openCustomerPortal, loading, error } = useStripePortal();

  const handleManageSubscription = async () => {
    await openCustomerPortal();
  };

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4">Subscription Controls</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-300 text-sm">
          {error}
        </div>
      )}
      
      <div className="space-y-3">
        <Button
          onClick={handleManageSubscription}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-between disabled:opacity-50"
        >
          <span className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            {loading ? 'Opening Portal...' : 'Manage Subscription'}
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