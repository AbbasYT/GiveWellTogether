import React, { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { Navigate } from 'react-router-dom';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { ContactInfoSection } from '../components/settings/ContactInfoSection';
import { SubscriptionSection } from '../components/settings/SubscriptionSection';
import { CommunicationSection } from '../components/settings/CommunicationSection';
import { SecuritySection } from '../components/settings/SecuritySection';
import { DeleteAccountSection } from '../components/settings/DeleteAccountSection';

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
  
  const [saveSuccess, setSaveSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      // Load contact info from user_profiles table
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

        setCommunicationPrefs({
          email_newsletters: profile.email_newsletters ?? true,
          impact_updates: profile.impact_updates ?? true,
          organization_updates: profile.organization_updates ?? true
        });
      } else {
        // If no profile exists, pre-fill with user's auth email
        setContactInfo(prev => ({
          ...prev,
          email: user?.email || ''
        }));
      }
    } catch (err) {
      console.error('Error loading user data:', err);
    }
  };

  const handleSaveSuccess = (message: string) => {
    setSaveSuccess(message);
    setError('');
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  const handleError = (message: string) => {
    setError(message);
    setSaveSuccess('');
    setTimeout(() => setError(''), 5000);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/pricing" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <Header />
      
      <div className="pt-24 pb-12">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
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

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <ContactInfoSection
              contactInfo={contactInfo}
              setContactInfo={setContactInfo}
              onSaveSuccess={handleSaveSuccess}
              onError={handleError}
            />

            <SubscriptionSection />

            <CommunicationSection
              communicationPrefs={communicationPrefs}
              setCommunicationPrefs={setCommunicationPrefs}
              onSaveSuccess={handleSaveSuccess}
              onError={handleError}
            />

            <SecuritySection
              onSaveSuccess={handleSaveSuccess}
              onError={handleError}
            />

            <DeleteAccountSection
              onSaveSuccess={handleSaveSuccess}
              onError={handleError}
            />
          </div>
        </div>
      </div>
    </div>
  );
}