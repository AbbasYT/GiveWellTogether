import React, { useState } from 'react';
import { Bell, Edit3 } from 'lucide-react';
import { Button } from '../ui/Button';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';

interface CommunicationPreferences {
  email_newsletters: boolean;
  impact_updates: boolean;
  organization_updates: boolean;
}

interface CommunicationSectionProps {
  communicationPrefs: CommunicationPreferences;
  setCommunicationPrefs: (prefs: CommunicationPreferences) => void;
  onSaveSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export function CommunicationSection({ 
  communicationPrefs, 
  setCommunicationPrefs, 
  onSaveSuccess, 
  onError 
}: CommunicationSectionProps) {
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
          email_newsletters: communicationPrefs.email_newsletters,
          impact_updates: communicationPrefs.impact_updates,
          organization_updates: communicationPrefs.organization_updates
        }, {
          onConflict: 'user_id'
        });

      if (saveError) throw saveError;
      
      onSaveSuccess('Communication preferences updated successfully');
      setIsEditing(false);
    } catch (err) {
      onError('Failed to save communication preferences');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Bell className="h-6 w-6 text-purple-400 mr-3" />
          <h2 className="text-2xl font-bold text-white">Communication Preferences</h2>
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

      {isEditing ? (
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
              onClick={handleSave}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white flex-1"
            >
              {loading ? 'Saving...' : 'Save Preferences'}
            </Button>
            <Button
              onClick={() => setIsEditing(false)}
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
  );
}