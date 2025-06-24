import React, { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { supabase } from '../lib/supabase';
import { 
  CheckCircle, 
  AlertCircle, 
  ChevronDown,
  ChevronUp,
  Building,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Target,
  Award
} from 'lucide-react';

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
  created_at: string;
}

interface FormData {
  // Organization Identity & Legal Details
  organization_name: string;
  country_registration: string;
  legal_status: string;
  registration_number: string;
  tax_identification: string;
  founding_date: string;
  address: string;
  website: string;
  
  // Contact and Leadership
  primary_contact_name: string;
  primary_contact_email: string;
  organization_email: string;
  organization_phone: string;
  partner_affiliations: string;
  
  // Mission and Operations
  mission_statement: string;
  primary_category: string;
  geographic_focus: string;
  programs_services: string;
  beneficiaries: string;
  achievements: string;
  
  // Policies and Agreements
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

export function JoinUsPage() {
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

  const [applications, setApplications] = useState<OrganizationApplication[]>([]);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApprovedApplications();
  }, []);

  const fetchApprovedApplications = async () => {
    try {
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
          created_at
        `)
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (err) {
      console.error('Error fetching applications:', err);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!formData.anti_terror_certification || !formData.terms_conditions) {
      setError('Please accept all required certifications and terms');
      setLoading(false);
      return;
    }

    try {
      const { error: submitError } = await supabase
        .from('organization_applications')
        .insert([formData]);

      if (submitError) throw submitError;

      setSubmitSuccess(true);
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

      // Scroll to success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Join Our <span className="text-blue-400">Mission</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-4xl mx-auto">
              Partner with GiveWellTogether to amplify your impact and reach more supporters. 
              We're building a community of verified organizations making real change in the world.
            </p>
            
            {/* Simple text instead of boxes */}
            <div className="text-lg text-gray-300 space-y-2 mb-12">
              <p><strong className="text-blue-400">Transparent Funding:</strong> Equal distribution ensures fair support for all verified partners</p>
              <p><strong className="text-green-400">Growing Community:</strong> Connect with a network of dedicated donors and fellow organizations</p>
              <p><strong className="text-purple-400">Global Reach:</strong> Expand your impact beyond traditional fundraising boundaries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Message */}
      {submitSuccess && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="p-6 bg-green-900/50 border border-green-700 rounded-2xl text-green-300">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 mr-3" />
              <div>
                <h3 className="font-bold">Application Submitted Successfully!</h3>
                <p className="text-sm">Thank you for your interest in joining GiveWellTogether. We'll review your application and get back to you within 5-7 business days.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="p-6 bg-red-900/50 border border-red-700 rounded-2xl text-red-300">
            <div className="flex items-center">
              <AlertCircle className="h-6 w-6 mr-3" />
              <div>
                <h3 className="font-bold">Submission Error</h3>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Application Form */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
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

      {/* Organization Applications */}
      <section className="py-20 relative bg-gradient-to-r from-gray-900/50 to-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Organization Applications</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              View submitted applications from organizations. These may be approved, rejected, or under review. Click on any card to learn more.
            </p>
          </div>

          {applications.length === 0 ? (
            <div className="text-center py-12">
              <Building className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No applications submitted yet. Be the first to join our mission!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => toggleCard(app.id)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-white truncate">{app.organization_name}</h3>
                      {expandedCard === app.id ? (
                        <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      )}
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-300 text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{app.country_registration}</span>
                      </div>
                      <div className="flex items-center text-gray-300 text-sm">
                        <Target className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{app.primary_category}</span>
                      </div>
                      <div className="flex items-center text-gray-300 text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Founded {app.founding_date}</span>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm line-clamp-3 mb-4">
                      {app.mission_statement}
                    </p>

                    {expandedCard === app.id && (
                      <div className="space-y-4 border-t border-gray-600 pt-4">
                        <div>
                          <h4 className="text-white font-semibold mb-2">Legal Status</h4>
                          <p className="text-gray-300 text-sm">{app.legal_status}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-white font-semibold mb-2">Geographic Focus</h4>
                          <p className="text-gray-300 text-sm">{app.geographic_focus}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-white font-semibold mb-2">Programs & Services</h4>
                          <p className="text-gray-300 text-sm">{app.programs_services}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-white font-semibold mb-2">Beneficiaries</h4>
                          <p className="text-gray-300 text-sm">{app.beneficiaries}</p>
                        </div>

                        {app.achievements && (
                          <div>
                            <h4 className="text-white font-semibold mb-2 flex items-center">
                              <Award className="h-4 w-4 mr-2" />
                              Achievements
                            </h4>
                            <p className="text-gray-300 text-sm">{app.achievements}</p>
                          </div>
                        )}
                        
                        <div>
                          <h4 className="text-white font-semibold mb-2">Address</h4>
                          <p className="text-gray-300 text-sm">{app.address}</p>
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                          <a 
                            href={app.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 text-sm underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Visit Website
                          </a>
                          <a 
                            href={`mailto:${app.organization_email}`}
                            className="text-blue-400 hover:text-blue-300 text-sm underline flex items-center"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Mail className="h-4 w-4 mr-1" />
                            {app.organization_email}
                          </a>
                          {app.organization_phone && (
                            <a 
                              href={`tel:${app.organization_phone}`}
                              className="text-blue-400 hover:text-blue-300 text-sm underline flex items-center"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Phone className="h-4 w-4 mr-1" />
                              {app.organization_phone}
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}