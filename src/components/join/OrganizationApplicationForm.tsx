import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { supabase } from '../../lib/supabase';
import { Building, Mail, Target } from 'lucide-react';

interface FormData {
  organization_name: string;
  country_registration: string;
  legal_status: string;
  registration_number: string;
  tax_identification: string;
  founding_date: string;
  address: string;
  website: string;
  primary_contact_name: string;
  primary_contact_email: string;
  organization_email: string;
  organization_phone: string;
  partner_affiliations: string;
  mission_statement: string;
  primary_category: string;
  geographic_focus: string;
  programs_services: string;
  beneficiaries: string;
  achievements: string;
  anti_terror_certification: boolean;
  terms_conditions: boolean;
}

const CATEGORIES = [
  'Education',
  'Health',
  'Environment',
  'Child Welfare',
  'Poverty Alleviation',
  'Human Rights',
  'Disaster Relief',
  'Animal Welfare',
  'Arts & Culture',
  'Community Development',
  'Technology',
  'Other'
];

interface OrganizationApplicationFormProps {
  onSubmitSuccess: () => void;
  onError: (error: string) => void;
}

export function OrganizationApplicationForm({ onSubmitSuccess, onError }: OrganizationApplicationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    organization_name: '',
    country_registration: '',
    legal_status: '',
    registration_number: '',
    tax_identification: '',
    founding_date: '',
    address: '',
    website: '',
    primary_contact_name: '',
    primary_contact_email: '',
    organization_email: '',
    organization_phone: '',
    partner_affiliations: '',
    mission_statement: '',
    primary_category: '',
    geographic_focus: '',
    programs_services: '',
    beneficiaries: '',
    achievements: '',
    anti_terror_certification: false,
    terms_conditions: false
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.anti_terror_certification || !formData.terms_conditions) {
      onError('Please accept all required certifications and terms');
      setLoading(false);
      return;
    }

    try {
      console.log('Submitting form data:', formData);
      
      const { data, error: submitError } = await supabase
        .from('organization_applications')
        .insert([formData])
        .select();

      if (submitError) {
        console.error('Supabase error:', submitError);
        throw submitError;
      }

      console.log('Form submitted successfully:', data);
      onSubmitSuccess();
      
      // Reset form
      setFormData({
        organization_name: '',
        country_registration: '',
        legal_status: '',
        registration_number: '',
        tax_identification: '',
        founding_date: '',
        address: '',
        website: '',
        primary_contact_name: '',
        primary_contact_email: '',
        organization_email: '',
        organization_phone: '',
        partner_affiliations: '',
        mission_statement: '',
        primary_category: '',
        geographic_focus: '',
        programs_services: '',
        beneficiaries: '',
        achievements: '',
        anti_terror_certification: false,
        terms_conditions: false
      });
    } catch (err: any) {
      console.error('Form submission error:', err);
      onError(err.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 relative">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-20">
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Organization Application</h2>
          <p className="text-gray-300 mb-8 text-center">
            Complete this comprehensive application to join our network of verified partner organizations.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Organization Identity & Legal Details */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Organization Identity & Legal Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Organization Name <span className="text-blue-400">(Public)</span> *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organization_name}
                    onChange={(e) => handleInputChange('organization_name', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Official registered name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Country of Registration <span className="text-blue-400">(Public)</span> *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.country_registration}
                    onChange={(e) => handleInputChange('country_registration', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Where legally incorporated"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Legal Status <span className="text-blue-400">(Public)</span> *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.legal_status}
                    onChange={(e) => handleInputChange('legal_status', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. 501(c)(3) nonprofit, NGO, charity, trust"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Registration Number <span className="text-red-400">(Private)</span> *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.registration_number}
                    onChange={(e) => handleInputChange('registration_number', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Government-issued registration number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tax Identification <span className="text-red-400">(Private)</span> *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.tax_identification}
                    onChange={(e) => handleInputChange('tax_identification', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Federal tax ID/EIN or local equivalent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Founding Date <span className="text-blue-400">(Public)</span> *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.founding_date}
                    onChange={(e) => handleInputChange('founding_date', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Year established"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Address <span className="text-blue-400">(Public)</span> *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Physical address of headquarters (street, city, country)"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Website <span className="text-blue-400">(Public)</span> *
                </label>
                <input
                  type="url"
                  required
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://your-organization.org"
                />
              </div>
            </div>

            {/* Contact and Leadership */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Contact and Leadership
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Primary Contact Name <span className="text-red-400">(Private)</span> *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.primary_contact_name}
                    onChange={(e) => handleInputChange('primary_contact_name', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Person overseeing the application"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Primary Contact Email <span className="text-red-400">(Private)</span> *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.primary_contact_email}
                    onChange={(e) => handleInputChange('primary_contact_email', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="contact@organization.org"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Organization Email <span className="text-blue-400">(Public)</span> *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.organization_email}
                    onChange={(e) => handleInputChange('organization_email', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="General contact info (to be shared publicly)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Organization Phone <span className="text-blue-400">(Public)</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.organization_phone}
                    onChange={(e) => handleInputChange('organization_phone', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Partner Affiliations <span className="text-red-400">(Private)</span>
                </label>
                <textarea
                  value={formData.partner_affiliations}
                  onChange={(e) => handleInputChange('partner_affiliations', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="List any umbrella organizations or international chapters, if applicable"
                />
              </div>
            </div>

            {/* Mission and Operations */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Mission and Operations
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Mission Statement <span className="text-blue-400">(Public)</span> *
                  </label>
                  <textarea
                    required
                    value={formData.mission_statement}
                    onChange={(e) => handleInputChange('mission_statement', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Short statement of the organization's mission and vision"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Primary Category <span className="text-blue-400">(Public)</span> *
                  </label>
                  <select
                    required
                    value={formData.primary_category}
                    onChange={(e) => handleInputChange('primary_category', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select main category</option>
                    {CATEGORIES.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Geographic Focus <span className="text-blue-400">(Public)</span> *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.geographic_focus}
                    onChange={(e) => handleInputChange('geographic_focus', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Regions/countries served by your programs"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Programs and Services <span className="text-blue-400">(Public)</span> *
                  </label>
                  <textarea
                    required
                    value={formData.programs_services}
                    onChange={(e) => handleInputChange('programs_services', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe main programs or projects. Explain what the organization actually does on the ground."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Beneficiaries <span className="text-blue-400">(Public)</span> *
                  </label>
                  <textarea
                    required
                    value={formData.beneficiaries}
                    onChange={(e) => handleInputChange('beneficiaries', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the communities or populations served (e.g. 'we educate low-income children in rural areas'). Provide recent numbers if available (e.g. 'program reached 500 students in 2024')."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Achievements <span className="text-blue-400">(Public)</span>
                  </label>
                  <textarea
                    value={formData.achievements}
                    onChange={(e) => handleInputChange('achievements', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Highlight major accomplishments (milestones, awards, recognitions)"
                  />
                </div>
              </div>
            </div>

            {/* Policies and Agreements */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Policies and Agreements</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="anti_terror"
                    checked={formData.anti_terror_certification}
                    onChange={(e) => handleInputChange('anti_terror_certification', e.target.checked)}
                    className="mt-1 mr-3 rounded"
                    required
                  />
                  <label htmlFor="anti_terror" className="text-gray-300 text-sm">
                    <strong>Anti-Terror Certification:</strong> I certify that this organization and its funds will not support terrorism and agree to standard anti-terrorism due-diligence requirements. *
                  </label>
                </div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={formData.terms_conditions}
                    onChange={(e) => handleInputChange('terms_conditions', e.target.checked)}
                    className="mt-1 mr-3 rounded"
                    required
                  />
                  <label htmlFor="terms" className="text-gray-300 text-sm">
                    <strong>Terms & Conditions:</strong> I agree to the platform's Terms of Service, Privacy Policy, and all anti-terrorism/due-diligence agreements. *
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-lg font-bold rounded-2xl"
              >
                {loading ? 'Submitting Application...' : 'Submit Application'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}