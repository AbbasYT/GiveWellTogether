import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useStripePortal } from '../../hooks/useStripePortal';

interface DeleteAccountSectionProps {
  onSaveSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export function DeleteAccountSection({ onSaveSuccess, onError }: DeleteAccountSectionProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { openCustomerPortal } = useStripePortal();

  const handleDeleteAccount = async () => {
    setLoading(true);

    try {
      // First cancel subscription via Stripe portal
      await openCustomerPortal();
      
      // Note: In a real app, you'd want to handle account deletion more carefully
      // This might involve marking the account for deletion and handling it server-side
      onSaveSuccess('Please cancel your subscription first, then contact support to delete your account');
      setShowDeleteConfirm(false);
    } catch (err) {
      onError('Failed to initiate account deletion process');
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
          This action cannot be undone. You must cancel your subscription first before deleting your account.
        </p>
      </div>

      {!showDeleteConfirm ? (
        <Button
          onClick={() => setShowDeleteConfirm(true)}
          variant="outline"
          className="border-red-600 text-red-400 hover:bg-red-900/50"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Account
        </Button>
      ) : (
        <div className="space-y-4">
          <p className="text-white font-semibold">Are you sure you want to delete your account?</p>
          <div className="flex gap-2 max-w-md">
            <Button
              onClick={handleDeleteAccount}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 text-white flex-1"
            >
              {loading ? 'Processing...' : 'Yes, Delete Account'}
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