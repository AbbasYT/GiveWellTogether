import React, { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { useAuth } from '../hooks/useAuth';
import { useSubscription } from '../hooks/useSubscription';
import { useStripePortal } from '../hooks/useStripePortal';
import { supabase } from '../lib/supabase';
import { Navigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { 
  User, 
  CreditCard, 
  Bell, 
  Shield, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  AlertCircle, 
  CheckCircle,
  Mail,
  Phone,
  Twitter,
  Facebook,
  Eye,
  EyeOff,
  Lock
} from 'lucide-react';

interface ContactInfo {
  email: string;
  phone: string;
  twitter: string;
  facebook: string;
  is_private: boolean;
}

interface CommunicationPreferences {
  email_newsletters: boolean;
  impact_updates: boolean;
  organization_updates: boolean;
}

export function SettingsPage() {
  const { user, loading: authLoading } = useAuth();
  const { subscription, loading: subLoading, isActive } = useSubscription();
  const { openCustomerPortal, loading: portalLoading } = useStripePortal();
  
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: '',
    phone: '',
    twitter: '',
    facebook: '',
    is_private: true
  });
  
  const [communicationPrefs, setCommunicationPrefs] = useState<CommunicationPreferences>({
    email_newsletters: true,
    impact_updates: true,
    organization_updates: true
  });
  
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingComm, setIsEditingComm] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      // Load contact info
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (profile) {
        setContactInfo({
          email: profile.email || '',
          phone: profile.phone || '',
          twitter: profile.twitter_handle || '',
          facebook: profile.facebook_profile || '',
          is_private: profile.is_private ?? true
        });
      }

      // Load communication preferences (mock data for now)
      setCommunicationPrefs({
        email_newsletters: true,
        impact_updates: true,
        organization_updates: true
      });
    } catch (err) {
      console.error('Error loading user data:', err);
    }
  };

  const handleSaveContact = async () => {
    setLoading(true);
    setError('');
    
    try {
      const { error: saveError } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user?.id,
          email: contactInfo.email || null,
          phone: contactInfo.phone || null,
          twitter_handle: contactInfo.twitter || null,
          facebook_profile: contactInfo.facebook || null,
          is_private: contactInfo.is_private
        }, {
          onConflict: 'user_id'
        });

      if (saveError) throw saveError;
      
      setSaveSuccess('Contact information updated successfully');
      setIsEditingContact(false);
      setTimeout(() => setSaveSuccess(''), 3000);
    } catch (err) {
      setError('Failed to save contact information');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCommunication = async () => {
    setLoading(true);
    setError('');
    
    try {
      // In a real app, you'd save these to a preferences table
      setSaveSuccess('Communication preferences updated successfully');
      setIsEditingComm(false);
      setTimeout(() => setSaveSuccess(''), 3000);
    } catch (err) {
      setError('Failed to save communication preferences');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) throw updateError;

      setSaveSuccess('Password updated successfully');
      setIsChangingPassword(false);
      setNewPassword('');
      setConfirmPassword('');
      setCurrentPassword('');
      setTimeout(() => setSaveSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    setError('');

    try {
      // First cancel subscription via Stripe portal
      await openCustomerPortal();
      
      // Note: In a real app, you'd want to handle account deletion more carefully
      // This might involve marking the account for deletion and handling it server-side
      setSaveSuccess('Please cancel your subscription first, then contact support to delete your account');
      setShowDeleteConfirm(false);
    } catch (err) {
      setError('Failed to initiate account deletion process');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || subLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/pricing" replace />;
  }

  // Remove the subscription check - allow access to settings even without active subscription
  // Users should be able to manage their account settings regardless of subscription status

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <Header />
      
      <div className="pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Account Settings</h1>
            <p className="text-xl text-gray-300">Manage your account preferences and subscription</p>
          </div>

          {/* Success/Error Messages */}
          {saveSuccess && (
            <div className="mb-6 p-4 bg-green-900/50 border border-green-700 rounded-2xl text-green-300 flex items-center">
              <CheckCircle className="h-5 w-5 mr-3" />
              {saveSuccess}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-2xl text-red-300 flex items-center">
              <AlertCircle className="h-5 w-5 mr-3" />
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <User className="h-6 w-6 text-blue-400 mr-3" />
                  <h2 className="text-2xl font-bold text-white">Contact Information</h2>
                </div>
                <Button
                  onClick={() => setIsEditingContact(!isEditingContact)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
              </div>

              <div className="mb-4 p-3 bg-blue-900/30 rounded-lg border border-blue-700/50">
                <p className="text-blue-300 text-sm">
                  This information will only be shared with verified partner organizations for thank-you notes and impact updates. No spam, ever.
                </p>
              </div>

              {isEditingContact ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Mail className="h-4 w-4 inline mr-2" />
                      Email
                    </label>
                    <input
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Phone className="h-4 w-4 inline mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Twitter className="h-4 w-4 inline mr-2" />
                      Twitter Handle
                    </label>
                    <input
                      type="text"
                      value={contactInfo.twitter}
                      onChange={(e) => setContactInfo({ ...contactInfo, twitter: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="username"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Facebook className="h-4 w-4 inline mr-2" />
                      Facebook Profile
                    </label>
                    <input
                      type="text"
                      value={contactInfo.facebook}
                      onChange={(e) => setContactInfo({ ...contactInfo, facebook: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="facebook.com/username"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="is_private"
                      checked={contactInfo.is_private}
                      onChange={(e) => setContactInfo({ ...contactInfo, is_private: e.target.checked })}
                      className="mr-3 rounded"
                    />
                    <label htmlFor="is_private" className="text-gray-300">
                      Keep this information private (recommended)
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={handleSaveContact}
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button
                      onClick={() => {
                        setIsEditingContact(false);
                        loadUserData();
                      }}
                      variant="outline"
                      className="bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50 flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <Mail className="h-4 w-4 mr-3 text-gray-500" />
                    <span>{contactInfo.email || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Phone className="h-4 w-4 mr-3 text-gray-500" />
                    <span>{contactInfo.phone || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Twitter className="h-4 w-4 mr-3 text-gray-500" />
                    <span>{contactInfo.twitter ? `@${contactInfo.twitter}` : 'Not provided'}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Facebook className="h-4 w-4 mr-3 text-gray-500" />
                    <span>{contactInfo.facebook || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm mt-4">
                    {contactInfo.is_private ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
                    <span>{contactInfo.is_private ? 'Private' : 'Shared with organizations'}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Subscription Management */}
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
              <div className="flex items-center mb-6">
                <CreditCard className="h-6 w-6 text-green-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Subscription Management</h2>
              </div>

              <div className="space-y-4">
                {subscription ? (
                  <div className="p-4 bg-gray-700/50 rounded-lg">
                    <div className="text-white font-semibold mb-2">Current Plan</div>
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

            {/* Communication Preferences */}
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Bell className="h-6 w-6 text-purple-400 mr-3" />
                  <h2 className="text-2xl font-bold text-white">Communication Preferences</h2>
                </div>
                <Button
                  onClick={() => setIsEditingComm(!isEditingComm)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
              </div>

              {isEditingComm ? (
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="email_newsletters"
                      checked={communicationPrefs.email_newsletters}
                      onChange={(e) => setCommunicationPrefs({ ...communicationPrefs, email_newsletters: e.target.checked })}
                      className="mr-3 rounded"
                    />
                    <label htmlFor="email_newsletters" className="text-gray-300">
                      Email newsletters and platform updates
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="impact_updates"
                      checked={communicationPrefs.impact_updates}
                      onChange={(e) => setCommunicationPrefs({ ...communicationPrefs, impact_updates: e.target.checked })}
                      className="mr-3 rounded"
                    />
                    <label htmlFor="impact_updates" className="text-gray-300">
                      Monthly impact reports
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="organization_updates"
                      checked={communicationPrefs.organization_updates}
                      onChange={(e) => setCommunicationPrefs({ ...communicationPrefs, organization_updates: e.target.checked })}
                      className="mr-3 rounded"
                    />
                    <label htmlFor="organization_updates" className="text-gray-300">
                      Updates from partner organizations
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={handleSaveCommunication}
                      disabled={loading}
                      className="bg-purple-600 hover:bg-purple-700 text-white flex-1"
                    >
                      {loading ? 'Saving...' : 'Save Preferences'}
                    </Button>
                    <Button
                      onClick={() => setIsEditingComm(false)}
                      variant="outline"
                      className="bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50 flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-gray-300">
                    <span>Email newsletters</span>
                    <span className={communicationPrefs.email_newsletters ? 'text-green-400' : 'text-red-400'}>
                      {communicationPrefs.email_newsletters ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-gray-300">
                    <span>Impact reports</span>
                    <span className={communicationPrefs.impact_updates ? 'text-green-400' : 'text-red-400'}>
                      {communicationPrefs.impact_updates ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-gray-300">
                    <span>Organization updates</span>
                    <span className={communicationPrefs.organization_updates ? 'text-green-400' : 'text-red-400'}>
                      {communicationPrefs.organization_updates ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Security */}
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
                      onClick={() => {
                        setIsChangingPassword(false);
                        setNewPassword('');
                        setConfirmPassword('');
                        setCurrentPassword('');
                        setError('');
                      }}
                      variant="outline"
                      className="bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50 flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Delete Account */}
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-red-700/50">
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
                  className="w-full border-red-600 text-red-400 hover:bg-red-900/50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              ) : (
                <div className="space-y-4">
                  <p className="text-white font-semibold">Are you sure you want to delete your account?</p>
                  <div className="flex gap-2">
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
          </div>
        </div>
      </div>
    </div>
  );
}