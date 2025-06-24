import React, { useState, useEffect } from 'react';
import { Edit3, Mail, Twitter, Facebook, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';

interface ContactInfo {
  email: string;
  twitter: string;
  facebook: string;
}

interface ContactInformationProps {
  contactInfo: ContactInfo;
  setContactInfo: (info: ContactInfo) => void;
}

interface ValidationErrors {
  email?: string;
  twitter?: string;
  facebook?: string;
}

export function ContactInformation({ contactInfo, setContactInfo }: ContactInformationProps) {
  const { user } = useAuth();
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  // Load contact info from database on component mount
  useEffect(() => {
    if (user) {
      loadContactInfo();
    }
  }, [user]);

  // Initialize email from auth user if contactInfo email is empty
  useEffect(() => {
    if (user?.email && !contactInfo.email) {
      setContactInfo({
        ...contactInfo,
        email: user.email
      });
    }
  }, [user, contactInfo, setContactInfo]);

  const loadContactInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('email, twitter_handle, facebook_profile')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Error loading contact info:', error);
        return;
      }

      if (data) {
        setContactInfo({
          email: data.email || user?.email || '',
          twitter: data.twitter_handle || '',
          facebook: data.facebook_profile || ''
        });
      } else {
        // If no profile exists, pre-fill with user's auth email
        setContactInfo({
          email: user?.email || '',
          twitter: '',
          facebook: ''
        });
      }
    } catch (error) {
      console.error('Error loading contact info:', error);
    }
  };

  const validateEmail = (email: string): string | null => {
    if (!email) return null; // Empty is allowed
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address with @ and a domain (e.g., user@example.com)';
    }
    
    if (!email.includes('.com') && !email.includes('.org') && !email.includes('.net') && !email.includes('.edu')) {
      return 'Email must contain a valid domain extension (.com, .org, .net, .edu, etc.)';
    }
    
    return null;
  };

  const validateTwitter = (twitter: string): string | null => {
    if (!twitter) return null; // Empty is allowed
    
    // Remove @ if user added it
    const cleanTwitter = twitter.replace('@', '');
    
    // Twitter handle validation: 1-15 characters, alphanumeric and underscores only
    const twitterRegex = /^[a-zA-Z0-9_]{1,15}$/;
    if (!twitterRegex.test(cleanTwitter)) {
      return 'Twitter handle must be 1-15 characters, letters, numbers, and underscores only';
    }
    
    return null;
  };

  const validateFacebook = (facebook: string): string | null => {
    if (!facebook) return null; // Empty is allowed
    
    // Check if it's a valid Facebook URL or username
    const facebookUrlRegex = /^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9.]+\/?$/;
    const facebookUsernameRegex = /^[a-zA-Z0-9.]{5,50}$/;
    
    if (facebook.includes('facebook.com')) {
      if (!facebookUrlRegex.test(facebook)) {
        return 'Please enter a valid Facebook profile URL (e.g., facebook.com/username)';
      }
    } else {
      if (!facebookUsernameRegex.test(facebook)) {
        return 'Facebook username must be 5-50 characters, letters, numbers, and periods only';
      }
    }
    
    return null;
  };

  const validateAllFields = (info: ContactInfo): ValidationErrors => {
    const errors: ValidationErrors = {};
    
    const emailError = validateEmail(info.email);
    if (emailError) errors.email = emailError;
    
    const twitterError = validateTwitter(info.twitter);
    if (twitterError) errors.twitter = twitterError;
    
    const facebookError = validateFacebook(info.facebook);
    if (facebookError) errors.facebook = facebookError;
    
    return errors;
  };

  const handleContactInfoSave = async () => {
    if (!user) return;

    // Validate all fields
    const errors = validateAllFields(contactInfo);
    setValidationErrors(errors);

    // Don't save if there are validation errors
    if (Object.keys(errors).length > 0) {
      return;
    }

    setLoading(true);
    setSaveSuccess(false);

    try {
      // Check if email has changed from the auth email
      const emailChanged = contactInfo.email !== user?.email;
      
      if (emailChanged && contactInfo.email) {
        // Update the authentication email first
        const { error: authError } = await supabase.auth.updateUser({
          email: contactInfo.email
        });

        if (authError) {
          setValidationErrors({ email: `Failed to update login email: ${authError.message}` });
          return;
        }
      }

      // Clean up the data before saving
      const cleanedData = {
        user_id: user.id,
        email: contactInfo.email.trim() || null,
        twitter_handle: contactInfo.twitter.replace('@', '').trim() || null,
        facebook_profile: contactInfo.facebook.trim() || null
      };

      const { error } = await supabase
        .from('user_profiles')
        .upsert(cleanedData, {
          onConflict: 'user_id'
        });

      if (error) {
        console.error('Error saving contact info:', error);
        setValidationErrors({ email: 'Failed to save contact information. Please try again.' });
        return;
      }

      setSaveSuccess(true);
      setIsEditingContact(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving contact info:', error);
      setValidationErrors({ email: 'Failed to save contact information. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditingContact(false);
    setValidationErrors({});
    setSaveSuccess(false);
    // Reload the original data
    loadContactInfo();
  };

  const handleInputChange = (field: keyof ContactInfo, value: string) => {
    setContactInfo({ ...contactInfo, [field]: value });
    
    // Clear validation error for this field when user starts typing
    if (validationErrors[field]) {
      setValidationErrors({ ...validationErrors, [field]: undefined });
    }
  };

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">Contact Information</h3>
        <Button
          onClick={() => setIsEditingContact(!isEditingContact)}
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white"
        >
          <Edit3 className="h-4 w-4" />
        </Button>
      </div>
      
      <p className="text-sm text-gray-400 mb-4">
        Optional: Share your contact info for thank-you notes and impact updates (no spam, ever).
      </p>

      {saveSuccess && (
        <div className="mb-4 p-3 bg-green-900/50 border border-green-700 rounded-lg text-green-300 text-sm flex items-center">
          <CheckCircle className="h-4 w-4 mr-2" />
          Contact information saved successfully!
        </div>
      )}

      {contactInfo.email !== user?.email && (
        <div className="mb-4 p-3 bg-orange-900/30 rounded-lg border border-orange-700/50">
          <p className="text-orange-300 text-sm">
            <strong>Note:</strong> Changing your email will also update your login email.
          </p>
        </div>
      )}
      
      {isEditingContact ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Mail className="h-4 w-4 inline mr-2" />
              Email (Login & Contact)
            </label>
            <input
              type="email"
              value={contactInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-3 py-2 bg-gray-700/50 border rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                validationErrors.email ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="your@email.com"
            />
            {validationErrors.email && (
              <div className="mt-1 text-red-400 text-sm flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {validationErrors.email}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Twitter className="h-4 w-4 inline mr-2" />
              Twitter Handle
            </label>
            <input
              type="text"
              value={contactInfo.twitter}
              onChange={(e) => handleInputChange('twitter', e.target.value)}
              className={`w-full px-3 py-2 bg-gray-700/50 border rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                validationErrors.twitter ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="username (without @)"
            />
            {validationErrors.twitter && (
              <div className="mt-1 text-red-400 text-sm flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {validationErrors.twitter}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Facebook className="h-4 w-4 inline mr-2" />
              Facebook Profile
            </label>
            <input
              type="text"
              value={contactInfo.facebook}
              onChange={(e) => handleInputChange('facebook', e.target.value)}
              className={`w-full px-3 py-2 bg-gray-700/50 border rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                validationErrors.facebook ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="facebook.com/username or just username"
            />
            {validationErrors.facebook && (
              <div className="mt-1 text-red-400 text-sm flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {validationErrors.facebook}
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={handleContactInfoSave}
              disabled={loading}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white flex-1 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save'}
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              size="sm"
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
            <Twitter className="h-4 w-4 mr-3 text-gray-500" />
            <span>{contactInfo.twitter ? `@${contactInfo.twitter.replace('@', '')}` : 'Not provided'}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <Facebook className="h-4 w-4 mr-3 text-gray-500" />
            <span>
              {contactInfo.facebook 
                ? (contactInfo.facebook.includes('facebook.com') 
                    ? contactInfo.facebook 
                    : `facebook.com/${contactInfo.facebook}`)
                : 'Not provided'
              }
            </span>
          </div>
        </div>
      )}
    </div>
  );
}