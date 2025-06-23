import React, { useState } from 'react';
import { Edit3, Mail, Twitter, Facebook } from 'lucide-react';
import { Button } from '../ui/Button';

interface ContactInfo {
  email: string;
  twitter: string;
  facebook: string;
}

interface ContactInformationProps {
  contactInfo: ContactInfo;
  setContactInfo: (info: ContactInfo) => void;
}

export function ContactInformation({ contactInfo, setContactInfo }: ContactInformationProps) {
  const [isEditingContact, setIsEditingContact] = useState(false);

  const handleContactInfoSave = async () => {
    // Here you would save to your user preferences table
    setIsEditingContact(false);
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
              onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your@email.com"
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
              onChange={(e) => setContactInfo({...contactInfo, twitter: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="@username"
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
              onChange={(e) => setContactInfo({...contactInfo, facebook: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="facebook.com/username"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={handleContactInfoSave}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
            >
              Save
            </Button>
            <Button
              onClick={() => setIsEditingContact(false)}
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
            <span>{contactInfo.twitter || 'Not provided'}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <Facebook className="h-4 w-4 mr-3 text-gray-500" />
            <span>{contactInfo.facebook || 'Not provided'}</span>
          </div>
        </div>
      )}
    </div>
  );
}