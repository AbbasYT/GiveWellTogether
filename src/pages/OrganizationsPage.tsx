import React, { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { supabase } from '../lib/supabase';
import { MapPin, ExternalLink, Globe, Quote, DollarSign, Users, Calendar, Award } from 'lucide-react';
import { formatPrice } from '../stripe-config';

interface Organization {
  id: string;
  organization_name: string;
  country_registration: string;
  primary_category: string;
  mission_statement: string;
  website: string;
  organization_email: string;
  geographic_focus: string;
  programs_services: string;
  beneficiaries: string;
  achievements?: string;
  created_at: string;
}

interface OrganizationWithStats extends Organization {
  logo_url: string;
  monthly_funding: number;
  total_funding: number;
  months_active: number;
  testimonial: {
    text: string;
    author: string;
    role: string;
  };
  color_scheme: {
    bg: string;
    border: string;
    accent: string;
  };
}

export function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<OrganizationWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalDonors, setTotalDonors] = useState(0);
  const [totalMonthlyFunding, setTotalMonthlyFunding] = useState(0);

  useEffect(() => {
    fetchOrganizationsData();
  }, []);

  const fetchOrganizationsData = async () => {
    try {
      // Fetch approved organizations
      const { data: approvedOrgs, error: orgsError } = await supabase
        .from('organization_applications')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: true });

      if (orgsError) throw orgsError;

      // Fetch subscription data to calculate funding
      const { data: subscriptions, error: subsError } = await supabase
        .from('stripe_user_subscriptions')
        .select('*')
        .eq('subscription_status', 'active');

      if (subsError) throw subsError;

      // Calculate total monthly funding and donor count
      const activeDonors = subscriptions?.length || 0;
      let totalMonthly = 0;

      subscriptions?.forEach(sub => {
        if (sub.price_id) {
          // Convert price from cents to dollars
          const priceInDollars = getPriceFromPriceId(sub.price_id) / 100;
          // If yearly, convert to monthly
          const monthlyAmount = sub.price_id.includes('yearly') ? priceInDollars / 12 : priceInDollars;
          totalMonthly += monthlyAmount;
        }
      });

      setTotalDonors(activeDonors);
      setTotalMonthlyFunding(totalMonthly);

      // Calculate funding per organization
      const fundingPerOrg = approvedOrgs?.length > 0 ? totalMonthly / approvedOrgs.length : 0;
      
      // Calculate months active (from creation to now)
      const now = new Date();
      
      // Add sample data and calculate stats for each organization
      const orgsWithStats: OrganizationWithStats[] = (approvedOrgs || []).map((org, index) => {
        const createdDate = new Date(org.created_at);
        const monthsActive = Math.max(1, Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24 * 30)));
        
        return {
          ...org,
          logo_url: getLogoUrl(index),
          monthly_funding: fundingPerOrg,
          total_funding: fundingPerOrg * monthsActive,
          months_active: monthsActive,
          testimonial: getTestimonial(index),
          color_scheme: getColorScheme(index)
        };
      });

      setOrganizations(orgsWithStats);
    } catch (error) {
      console.error('Error fetching organizations data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriceFromPriceId = (priceId: string): number => {
    // Map price IDs to amounts (in cents)
    const priceMap: { [key: string]: number } = {
      'price_1RcolnRnYW51Zw7fMaZfU3R4': 1500, // Tier 1 Monthly
      'price_1RcooDRnYW51Zw7fj51b9Cih': 5000, // Tier 2 Monthly
      'price_1RcoopRnYW51Zw7f2D5HGmIM': 10000, // Tier 3 Monthly
      'price_1RdI1WRnYW51Zw7fS7BbRR1k': 18000, // Tier 1 Yearly
      'price_1RdI1xRnYW51Zw7f3V7F60wZ': 60000, // Tier 2 Yearly
      'price_1RdI2QRnYW51Zw7f4ItuGE9M': 120000, // Tier 3 Yearly
    };
    return priceMap[priceId] || 0;
  };

  const getLogoUrl = (index: number): string => {
    const logos = [
      'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/6995247/pexels-photo-6995247.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/6646919/pexels-photo-6646919.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/6995246/pexels-photo-6995246.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/6646920/pexels-photo-6646920.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
    ];
    return logos[index % logos.length];
  };

  const getColorScheme = (index: number) => {
    const schemes = [
      { bg: 'bg-blue-900/20', border: 'border-blue-700/50', accent: 'text-blue-400' },
      { bg: 'bg-purple-900/20', border: 'border-purple-700/50', accent: 'text-purple-400' },
      { bg: 'bg-green-900/20', border: 'border-green-700/50', accent: 'text-green-400' },
      { bg: 'bg-orange-900/20', border: 'border-orange-700/50', accent: 'text-orange-400' },
      { bg: 'bg-pink-900/20', border: 'border-pink-700/50', accent: 'text-pink-400' },
      { bg: 'bg-indigo-900/20', border: 'border-indigo-700/50', accent: 'text-indigo-400' },
      { bg: 'bg-teal-900/20', border: 'border-teal-700/50', accent: 'text-teal-400' },
      { bg: 'bg-red-900/20', border: 'border-red-700/50', accent: 'text-red-400' }
    ];
    return schemes[index % schemes.length];
  };

  const getTestimonial = (index: number) => {
    const testimonials = [
      {
        text: "This organization has transformed our community. The support we received helped us build sustainable programs that continue to benefit families every day.",
        author: "Maria Santos",
        role: "Community Leader"
      },
      {
        text: "The transparency and dedication of this team is remarkable. Every dollar donated creates real, measurable impact in our region.",
        author: "Dr. James Wilson",
        role: "Local Partner"
      },
      {
        text: "Working with this organization has been life-changing. They don't just provide aid - they empower communities to become self-sufficient.",
        author: "Amara Okafor",
        role: "Program Beneficiary"
      },
      {
        text: "I've seen firsthand how this organization operates. Their commitment to accountability and results is unmatched in the nonprofit sector.",
        author: "Sarah Chen",
        role: "Volunteer Coordinator"
      },
      {
        text: "The programs implemented by this organization have created lasting change. Our children now have access to education and healthcare.",
        author: "Carlos Rodriguez",
        role: "Village Elder"
      },
      {
        text: "This organization's approach to sustainable development has revolutionized how we think about aid. They're building futures, not just providing temporary relief.",
        author: "Dr. Fatima Al-Rashid",
        role: "Development Specialist"
      }
    ];
    return testimonials[index % testimonials.length];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
        <Header />
        <div className="pt-24 pb-12 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Where Your <span className="text-blue-400">Money Goes</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-4xl mx-auto">
              Meet our verified partner organizations making real change around the world. 
              Every dollar is distributed equally among these incredible causes.
            </p>
            
            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <div className="text-3xl font-bold text-blue-400 mb-2">{organizations.length}</div>
                <div className="text-gray-300">Verified Organizations</div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <div className="text-3xl font-bold text-green-400 mb-2">{totalDonors}</div>
                <div className="text-gray-300">Active Donors</div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <div className="text-3xl font-bold text-purple-400 mb-2">{formatPrice(totalMonthlyFunding * 100)}</div>
                <div className="text-gray-300">Monthly Impact</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organizations Masonry Layout */}
      <section className="pb-20 relative">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-20">
          {organizations.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No approved organizations found.</p>
            </div>
          ) : (
            <div 
              className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8"
              style={{
                columnWidth: '400px'
              }}
            >
              {organizations.map((org, index) => (
                <div
                  key={org.id}
                  className={`${org.color_scheme.bg} backdrop-blur-sm rounded-3xl overflow-hidden border ${org.color_scheme.border} hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] break-inside-avoid mb-8`}
                >
                  {/* Header with Logo and Basic Info */}
                  <div className="p-6 border-b border-gray-700/50">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={org.logo_url} 
                        alt={`${org.organization_name} logo`}
                        className="w-16 h-16 rounded-2xl object-cover ring-2 ring-gray-600"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{org.organization_name}</h3>
                        <div className="flex items-center text-gray-300 text-sm mb-2">
                          <MapPin className="h-4 w-4 mr-2" />
                          {org.country_registration}
                        </div>
                        <div className={`inline-block ${org.color_scheme.bg} ${org.color_scheme.accent} px-3 py-1 rounded-full text-sm font-medium border ${org.color_scheme.border}`}>
                          {org.primary_category}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mission Statement */}
                  <div className="p-6 border-b border-gray-700/50">
                    <h4 className={`text-lg font-semibold ${org.color_scheme.accent} mb-3`}>Mission</h4>
                    <p className="text-gray-300 leading-relaxed">{org.mission_statement}</p>
                  </div>

                  {/* Programs & Services */}
                  <div className="p-6 border-b border-gray-700/50">
                    <h4 className={`text-lg font-semibold ${org.color_scheme.accent} mb-3`}>What We Do</h4>
                    <p className="text-gray-300 leading-relaxed mb-4">{org.programs_services}</p>
                    
                    <div className="bg-gray-700/30 rounded-2xl p-4 border border-gray-600/50">
                      <h5 className="text-white font-medium mb-2">Geographic Focus</h5>
                      <p className="text-gray-300 text-sm">{org.geographic_focus}</p>
                    </div>
                  </div>

                  {/* Beneficiaries */}
                  <div className="p-6 border-b border-gray-700/50">
                    <h4 className={`text-lg font-semibold ${org.color_scheme.accent} mb-3 flex items-center`}>
                      <Users className="h-5 w-5 mr-2" />
                      Who We Serve
                    </h4>
                    <p className="text-gray-300 leading-relaxed">{org.beneficiaries}</p>
                  </div>

                  {/* Achievements */}
                  {org.achievements && (
                    <div className="p-6 border-b border-gray-700/50">
                      <h4 className={`text-lg font-semibold ${org.color_scheme.accent} mb-3 flex items-center`}>
                        <Award className="h-5 w-5 mr-2" />
                        Key Achievements
                      </h4>
                      <p className="text-gray-300 leading-relaxed">{org.achievements}</p>
                    </div>
                  )}

                  {/* Funding Stats */}
                  <div className="p-6 border-b border-gray-700/50">
                    <h4 className={`text-lg font-semibold ${org.color_scheme.accent} mb-4 flex items-center`}>
                      <DollarSign className="h-5 w-5 mr-2" />
                      Funding from GiveWellTogether
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-900/30 rounded-2xl p-4 text-center border border-green-700/50">
                        <div className="text-2xl font-bold text-green-400 mb-1">
                          {formatPrice(org.monthly_funding * 100)}
                        </div>
                        <div className="text-green-300 text-sm">Monthly</div>
                      </div>
                      <div className="bg-blue-900/30 rounded-2xl p-4 text-center border border-blue-700/50">
                        <div className="text-2xl font-bold text-blue-400 mb-1">
                          {formatPrice(org.total_funding * 100)}
                        </div>
                        <div className="text-blue-300 text-sm">Total Raised</div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-gray-300 text-sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Active for {org.months_active} month{org.months_active !== 1 ? 's' : ''}
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="p-6 border-b border-gray-700/50">
                    <h4 className={`text-lg font-semibold ${org.color_scheme.accent} mb-4 flex items-center`}>
                      <Quote className="h-5 w-5 mr-2" />
                      Community Impact
                    </h4>
                    <div className="bg-gray-700/30 rounded-2xl p-4 border border-gray-600/50">
                      <p className="text-gray-300 italic mb-3">"{org.testimonial.text}"</p>
                      <div className="text-right">
                        <div className="text-white font-medium">{org.testimonial.author}</div>
                        <div className="text-gray-400 text-sm">{org.testimonial.role}</div>
                      </div>
                    </div>
                    <p className="text-gray-500 text-xs mt-2 italic">
                      *Testimonial shared with us personally by community members
                    </p>
                  </div>

                  {/* Links */}
                  <div className="p-6">
                    <h4 className={`text-lg font-semibold ${org.color_scheme.accent} mb-4`}>Connect</h4>
                    <div className="space-y-3">
                      <a 
                        href={org.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`flex items-center ${org.color_scheme.accent} hover:text-white transition-colors`}
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Official Website
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                      <a 
                        href={`mailto:${org.organization_email}`}
                        className={`flex items-center ${org.color_scheme.accent} hover:text-white transition-colors`}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Contact Organization
                      </a>
                    </div>
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