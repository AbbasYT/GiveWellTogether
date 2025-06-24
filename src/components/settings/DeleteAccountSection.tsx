import React, { useState } from 'react';
import { Trash2, Mail, CreditCard } from 'lucide-react';
import { Button } from '../ui/Button';
import { useStripePortal } from '../../hooks/useStripePortal';

interface DeleteAccountSectionProps {
  onSaveSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export function DeleteAccountSection({ onSaveSuccess, onError }: DeleteAccountSectionProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showContactSupport, setShowContactSupport] = useState(false);
  const [loading, setLoading] = useState(false);
  const { openCustomerPortal } = useStripePortal();

  const handleCancelSubscription = async () => {
    setLoading(true);

    try {
      // Open Stripe portal for subscription cancellation
      await openCustomerPortal();
      
      onSaveSuccess('Redirecting to Stripe to cancel your subscription. After cancellation, contact support for account deletion.');
      setShowDeleteConfirm(false);
    } catch (err) {
      onError('Failed to open subscription management portal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-red-700/50 xl:col-span-2">
      <div className="flex items-center mb-6">
        <Trash2 className="h-6 w-6 text-red-400 mr-3" />
        <h2 className="text-2xl font-bold text-white">Delete Account</h2>
      </div>

      <div className="mb-4 p-3 bg-red-900/30 rounded-lg border border-red-700/50">
        <p className="text-red-300 text-sm">
          Account deletion is a two-step process: First cancel your subscription in Stripe, then contact support for backend account deletion.
        </p>
      </div>

      {!showDeleteConfirm ? (
        <div className="space-y-4">
          <Button
            onClick={() => setShowDeleteConfirm(true)}
            variant="outline"
            className="border-red-600 text-red-400 hover:bg-red-900/50"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Start Account Deletion Process
          </Button>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="contact_support"
              checked={showContactSupport}
              onChange={(e) => setShowContactSupport(e.target.checked)}
              className="mr-3 rounded"
            />
            <label htmlFor="contact_support" className="text-gray-300">
              Contact support for account deletion assistance
            </label>
          </div>

          {showContactSupport && (
            <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700/50">
              <div className="flex items-center mb-2">
                <Mail className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-blue-300 font-semibold">Support Contact</span>
              </div>
              <p className="text-blue-300 text-sm mb-2">
                For account deletion assistance, please contact our support team:
              </p>
              <a 
                href="mailto:support@givewelltogether.com" 
                className="text-blue-400 hover:text-blue-300 underline font-medium"
              >
                support@givewelltogether.com
              </a>
              <p className="text-blue-300 text-xs mt-2">
                Please include your account email and reason for deletion in your message.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-white font-semibold">Ready to start the account deletion process?</p>
          <p className="text-gray-300 text-sm">
            Step 1: Cancel your subscription in Stripe<br />
            Step 2: Contact support for backend account deletion
          </p>
          <div className="flex gap-2 max-w-md">
            <Button
              onClick={handleCancelSubscription}
              disabled={loading}
              className="bg-orange-600 hover:bg-orange-700 text-white flex-1"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              {loading ? 'Opening Stripe...' : 'Go to Stripe to Cancel Subscription'}
            </Button>
            <Button
              onClick={() => setShowDeleteConfirm(false)}
              variant="outline"
              className="bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50 flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}