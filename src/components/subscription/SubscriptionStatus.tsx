import React from 'react';
import { useSubscription } from '../../hooks/useSubscription';
import { Alert } from '../ui/Alert';

export function SubscriptionStatus() {
  const { subscription, loading, error, getSubscriptionProduct, isActive, isTrialing, isPastDue, isCanceled } = useSubscription();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert type="error" title="Error loading subscription">
        {error}
      </Alert>
    );
  }

  if (!subscription || subscription.subscription_status === 'not_started') {
    return (
      <Alert type="info" title="No Active Subscription">
        You don't have an active subscription yet. Choose a plan below to get started.
      </Alert>
    );
  }

  const product = getSubscriptionProduct();
  const statusColors = {
    active: 'text-green-600',
    trialing: 'text-blue-600',
    past_due: 'text-yellow-600',
    canceled: 'text-red-600',
    default: 'text-gray-600',
  };

  const getStatusColor = () => {
    if (isActive) return statusColors.active;
    if (isTrialing) return statusColors.trialing;
    if (isPastDue) return statusColors.past_due;
    if (isCanceled) return statusColors.canceled;
    return statusColors.default;
  };

  const getStatusText = () => {
    if (isActive) return 'Active';
    if (isTrialing) return 'Trial';
    if (isPastDue) return 'Past Due';
    if (isCanceled) return 'Canceled';
    return subscription.subscription_status.replace('_', ' ').toUpperCase();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Subscription</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Plan:</span>
          <span className="font-medium">{product?.name || 'Unknown Plan'}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Status:</span>
          <span className={`font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>

        {subscription.current_period_end && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              {subscription.cancel_at_period_end ? 'Expires:' : 'Renews:'}
            </span>
            <span className="font-medium">
              {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
            </span>
          </div>
        )}

        {subscription.payment_method_last4 && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Payment Method:</span>
            <span className="font-medium">
              {subscription.payment_method_brand?.toUpperCase()} ****{subscription.payment_method_last4}
            </span>
          </div>
        )}
      </div>

      {subscription.cancel_at_period_end && (
        <Alert type="warning" className="mt-4">
          Your subscription will not renew and will end on{' '}
          {new Date(subscription.current_period_end! * 1000).toLocaleDateString()}.
        </Alert>
      )}
    </div>
  );
}