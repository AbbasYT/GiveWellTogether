import React from 'react';
import { Clock, Calendar } from 'lucide-react';
import { Button } from '../ui/Button';
import { formatPrice } from '../../stripe-config';

interface DonationHistory {
  id: number;
  amount_total: number;
  currency: string;
  order_date: string;
  order_status: string;
}

interface DonationTimelineProps {
  donationHistory: DonationHistory[];
}

export function DonationTimeline({ donationHistory }: DonationTimelineProps) {
  return (
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
      <div className="flex items-center mb-6">
        <Clock className="h-8 w-8 text-green-400 mr-3" />
        <h2 className="text-2xl font-bold text-white">Donation Timeline</h2>
      </div>
      
      {donationHistory.length > 0 ? (
        <div className="space-y-4">
          {donationHistory.slice(0, 10).map((donation, index) => (
            <div key={donation.id} className="bg-gray-700/50 rounded-2xl p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-white font-semibold">
                    {formatPrice(donation.amount_total)}
                  </div>
                  <div className="text-sm text-gray-300">
                    {new Date(donation.order_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    donation.order_status === 'completed' 
                      ? 'bg-green-900/50 text-green-300' 
                      : 'bg-yellow-900/50 text-yellow-300'
                  }`}>
                    {donation.order_status}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {donationHistory.length > 10 && (
            <div className="text-center">
              <Button variant="outline" className="bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50">
                View All History
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <Calendar className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400">No donation history yet. Your first payment will appear here.</p>
        </div>
      )}
    </div>
  );
}