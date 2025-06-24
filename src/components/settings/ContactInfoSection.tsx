import React, { useState } from 'react';
import { User, Edit3, Mail, Phone, Twitter, Facebook, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';

interface ContactInfo {
  email: string;
  phone: string;
  twitter: string;
  facebook: string;
  is_private: boolean;
}

interface ContactInfoSectionProps {
  contactInfo: ContactInfo;
  setContactInfo: (info: ContactInfo) => void;
  onSaveSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export function ContactInfoSection({ contactInfo, setContactInfo, onSaveSuccess, onError }: ContactInfoSectionProps) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    
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
      
      onSaveSuccess('Contact information updated successfully');
      setIsEditing(false);
    } catch (err) {
      onError('Failed to save contact information');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original values if needed
  };

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <User className="h-6 w-6 text-blue-400 mr-3" />
          <h2 className="text-2xl font-bold text-white">Contact Information</h2>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
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

      {isEditing ? (
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
              onClick={handleSave}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
            >
              {loading ? 'Saving...' : 'Save Changes'}
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
  );
}