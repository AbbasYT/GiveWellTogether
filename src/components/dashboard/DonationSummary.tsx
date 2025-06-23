import React from 'react';
import { DollarSign, Crown } from 'lucide-react';
import { formatPrice } from '../../stripe-config';

interface DonationSummaryProps {
  totalDonated: number;
  currentCycleAmount: number;
  nextBillingDate: Date | null;
  subscriptionPlan: any;
  subscription: any;
}

export function DonationSummary({
  totalDonated,
  currentCycleAmount,
  nextBillingDate,
  subscriptionPlan,
  subscription
}: DonationSummaryProps) {
  return (
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
      <div className="flex items-center mb-6">
        <DollarSign className="h-8 w-8 text-blue-400 mr-3" />
        <h2 className="text-2xl font-bold text-white">Donation Summary</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-700/50 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">
            {formatPrice(totalDonated)}
          </div>
          <div className="text-gray-300">Total Donated</div>
        </div>
        
        <div className="bg-gray-700/50 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">
            {formatPrice(currentCycleAmount)}
          </div>
          <div className="text-gray-300">This Billing Cycle</div>
        </div>
        
        <div className="bg-gray-700/50 rounded-2xl p-6 text-center">
          <div className="text-lg font-bold text-purple-400 mb-2">
            {nextBillingDate ? nextBillingDate.toLocaleDateString() : 'N/A'}
          </div>
          <div className="text-gray-300">Next Billing Date</div>
        </div>
      </div>

      {subscriptionPlan && (
        <div className="mt-6 p-4 bg-blue-900/30 rounded-2xl border border-blue-700/50">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-semibold">Current Plan: {subscriptionPlan.name}</div>
              <div className="text-blue-300">
                {formatPrice(subscriptionPlan.price)}/{subscriptionPlan.interval === 'year' ? 'year' : 'month'}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-300">Status</div>
              <div className="text-green-400 font-semibold capitalize">{subscription?.subscription_status}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}