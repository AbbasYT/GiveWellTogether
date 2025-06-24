import React, { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { supabase } from '../lib/supabase';
import { JoinUsHero } from '../components/join/JoinUsHero';
import { OrganizationApplicationForm } from '../components/join/OrganizationApplicationForm';
import { ApplicationsList } from '../components/join/ApplicationsList';
import { StatusMessages } from '../components/join/StatusMessages';

interface OrganizationApplication {
  id: string;
  organization_name: string;
  country_registration: string;
  legal_status: string;
  founding_date: string;
  address: string;
  website: string;
  organization_email: string;
  organization_phone?: string;
  mission_statement: string;
  primary_category: string;
  geographic_focus: string;
  programs_services: string;
  beneficiaries: string;
  achievements?: string;
  status: string;
  created_at: string;
}

export function JoinUsPage() {
  const [applications, setApplications] = useState<OrganizationApplication[]>([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllApplications();
  }, []);

  const fetchAllApplications = async () => {
    try {
      console.log('Fetching applications...');
      
      const { data, error } = await supabase
        .from('organization_applications')
        .select(`
          id,
          organization_name,
          country_registration,
          legal_status,
          founding_date,
          address,
          website,
          organization_email,
          organization_phone,
          mission_statement,
          primary_category,
          geographic_focus,
          programs_services,
          beneficiaries,
          achievements,
          status,
          created_at
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching applications:', error);
        throw error;
      }
      
      console.log('Fetched applications:', data);
      setApplications(data || []);
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError('Failed to load applications');
    }
  };

  const handleSubmitSuccess = () => {
    setSubmitSuccess(true);
    setError('');
    
    // Refresh the applications list
    fetchAllApplications();
    
    // Clear success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setSubmitSuccess(false);
    
    // Clear error message after 5 seconds
    setTimeout(() => setError(''), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <Header />
      
      <JoinUsHero />

      <StatusMessages submitSuccess={submitSuccess} error={error} />

      <OrganizationApplicationForm 
        onSubmitSuccess={handleSubmitSuccess}
        onError={handleError}
      />

      <ApplicationsList applications={applications} />

      <Footer />
    </div>
  );
}