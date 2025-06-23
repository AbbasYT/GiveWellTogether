import React from 'react';
import { Settings, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';
import { ContactInformation } from './ContactInformation';
import { SubscriptionControls } from './SubscriptionControls';

interface ContactInfo {
  email: string;
  twitter: string;
  facebook: string;
}

interface OrganizationDistribution {
  name: string;
  category: string;
  amount: number;
  percentage: number;
}

interface DashboardSidebarProps {
  contactInfo: ContactInfo;
  setContactInfo: (info: ContactInfo) => void;
  organizations: OrganizationDistribution[];
  donationHistory: any[];
  totalDonated: number;
}

export function DashboardSidebar({ 
  contactInfo, 
  setContactInfo, 
  organizations, 
  donationHistory, 
  totalDonated 
}: DashboardSidebarProps) {
  return (
    <div className="space-y-8">
      <ContactInformation 
        contactInfo={contactInfo}
        setContactInfo={setContactInfo}
      />

      <SubscriptionControls />

      {/* Settings Shortcut */}
      <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
        
        <Button
          onClick={() => window.location.href = '/settings'}
          variant="outline"
          className="w-full bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50 justify-between"
        >
          <span className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Settings & Preferences
          </span>
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>

      {/* Impact Stats */}
      <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Your Impact</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Organizations Supported</span>
            <span className="text-blue-400 font-bold">{organizations.length}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Months Active</span>
            <span className="text-green-400 font-bold">
              {donationHistory.length > 0 ? Math.max(1, donationHistory.length) : 0}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Lives Impacted</span>
            <span className="text-purple-400 font-bold">
              {Math.floor((totalDonated / 100) * 0.8)} {/* Rough estimate */}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}