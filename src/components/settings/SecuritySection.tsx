import React, { useState } from 'react';
import { Shield, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/Button';
import { supabase } from '../../lib/supabase';

interface SecuritySectionProps {
  onSaveSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export function SecuritySection({ onSaveSuccess, onError }: SecuritySectionProps) {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      onError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      onError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) throw updateError;

      onSaveSuccess('Password updated successfully');
      setIsChangingPassword(false);
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      onError(err.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsChangingPassword(false);
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
      <div className="flex items-center mb-6">
        <Shield className="h-6 w-6 text-orange-400 mr-3" />
        <h2 className="text-2xl font-bold text-white">Security</h2>
      </div>

      {!isChangingPassword ? (
        <Button
          onClick={() => setIsChangingPassword(true)}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white"
        >
          <Lock className="h-4 w-4 mr-2" />
          Change Password
        </Button>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-10"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(!showPasswords)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
              >
                {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Confirm New Password
            </label>
            <input
              type={showPasswords ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Confirm new password"
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleChangePassword}
              disabled={loading || !newPassword || !confirmPassword}
              className="bg-orange-600 hover:bg-orange-700 text-white flex-1"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </Button>
            <Button
              onClick={handleCancel}
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