import React, { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { useAuth } from '../hooks/useAuth';
import { useSubscription } from '../hooks/useSubscription';
import { supabase } from '../lib/supabase';
import { Navigate } from 'react-router-dom';
import { 
  Calendar, 
  CreditCard, 
  Settings, 
  PieChart, 
  TrendingUp, 
  DollarSign,
  Clock,
  Users,
  Mail,
  Twitter,
  Facebook,
  Shield,
  Edit3,
  ExternalLink
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { formatPrice } from '../stripe-config';

interface DonationHistory {
  id: number;
  amount_total: number;
  currency: string;
  order_date: string;
  order_status: string;
}

interface OrganizationDistribution {
  name: string;
  category: string;
  amount: number;
  percentage: number;
}

export function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const { subscription, loading: subLoading, isActive } = useSubscription();
  const [donationHistory, setDonationHistory] = useState<DonationHistory[]>([]);
  const [totalDonated, setTotalDonated] = useState(0);
  const [currentCycleAmount, setCurrentCycleAmount] = useState(0);
  const [nextBillingDate, setNextBillingDate] = useState<Date | null>(null);
  const [organizations] = useState<OrganizationDistribution[]>([
    { name: 'Education First', category: 'Education', amount: 0, percentage: 0 },
    { name: 'Clean Water Initiative', category: 'Health', amount: 0, percentage: 0 },
    { name: 'Forest Protection Fund', category: 'Environment', amount: 0, percentage: 0 },
    { name: 'Emergency Relief Network', category: 'Disaster Relief', amount: 0, percentage: 0 },
    { name: 'Community Development Alliance', category: 'Poverty', amount: 0, percentage: 0 },
    { name: 'Human Rights Advocacy', category: 'Human Rights', amount: 0, percentage: 0 }
  ]);
  const [contactInfo, setContactInfo] = useState({
    email: '',
    twitter: '',
    facebook: ''
  });
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !subLoading && user && isActive()) {
      fetchDashboardData();
    }
  }, [user, subscription, authLoading, subLoading]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch donation history
      const { data: orders, error: ordersError } = await supabase
        .from('stripe_user_orders')
        .select('*')
        .order('order_date', { ascending: false });

      if (ordersError) throw ordersError;

      if (orders) {
        setDonationHistory(orders);
        
        // Calculate total donated
        const total = orders.reduce((sum, order) => sum + (order.amount_total || 0), 0);
        setTotalDonated(total);
        
        // Calculate current cycle amount (this month's donations)
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const currentCycleTotal = orders
          .filter(order => {
            const orderDate = new Date(order.order_date);
            return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
          })
          .reduce((sum, order) => sum + (order.amount_total || 0), 0);
        
        setCurrentCycleAmount(currentCycleTotal);
      }

      // Set next billing date from subscription
      if (subscription?.current_period_end) {
        setNextBillingDate(new Date(subscription.current_period_end * 1000));
      }

      // Calculate organization distribution
      if (subscription?.price_id) {
        const subscriptionPlan = getSubscriptionPlan();
        if (subscriptionPlan) {
          const monthlyAmount = subscriptionPlan.price;
          const amountPerOrg = monthlyAmount / organizations.length;
          const percentage = 100 / organizations.length;
          
          organizations.forEach(org => {
            org.amount = amountPerOrg;
            org.percentage = percentage;
          });
        }
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSubscriptionPlan = () => {
    if (!subscription?.price_id) return null;
    
    // This would normally come from your stripe-config
    const plans = [
      { priceId: 'price_1RcoopRnYW51Zw7f2D5HGmIM', price: 10000, name: 'Tier 3' },
      { priceId: 'price_1RcooDRnYW51Zw7fj51b9Cih', price: 5000, name: 'Tier 2' },
      { priceId: 'price_1RcolnRnYW51Zw7fMaZfU3R4', price: 1500, name: 'Tier 1' }
    ];
    
    return plans.find(plan => plan.priceId === subscription.price_id);
  };

  const handleContactInfoSave = async () => {
    // Here you would save to your user preferences table
    setIsEditingContact(false);
  };

  const handleManageSubscription = () => {
    // This would redirect to Stripe customer portal
    window.open('https://billing.stripe.com/p/login/test_your_portal_link', '_blank');
  };

  if (authLoading || subLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || !isActive()) {
    return <Navigate to="/pricing" replace />;
  }

  const subscriptionPlan = getSubscriptionPlan();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <Header />
      
      <div className="pt-24 pb-12">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Your Impact Dashboard</h1>
              <p className="text-xl text-gray-300">Track your giving journey and see the difference you're making</p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Donation Summary */}
                  <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
                    <div className="flex items-center mb-6">
                      <DollarSign className="h-8 w-8 text-blue-400 mr-3" />
                      <h2 className="text-2xl font-bold text-white">Donation Summary</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gray-700/50 rounded-2xl p-6 text-center">
                        <div className="text-3xl font-bold text-blue-400 mb-2">
                          {formatPrice(totalDonated)}
                        </div>
                        <div className="text-gray-300">Total Donated</div>
                      </div>
                      
                      <div className="bg-gray-700/50 rounded-2xl p-6 text-center">
                        <div className="text-3xl font-bold text-green-400 mb-2">
                          {formatPrice(currentCycleAmount)}
                        </div>
                        <div className="text-gray-300">This Billing Cycle</div>
                      </div>
                      
                      <div className="bg-gray-700/50 rounded-2xl p-6 text-center">
                        <div className="text-lg font-bold text-purple-400 mb-2">
                          {nextBillingDate ? nextBillingDate.toLocaleDateString() : 'N/A'}
                        </div>
                        <div className="text-gray-300">Next Billing Date</div>
                      </div>
                    </div>

                    {subscriptionPlan && (
                      <div className="mt-6 p-4 bg-blue-900/30 rounded-2xl border border-blue-700/50">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-white font-semibold">Current Plan: {subscriptionPlan.name}</div>
                            <div className="text-blue-300">{formatPrice(subscriptionPlan.price)}/month</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-300">Status</div>
                            <div className="text-green-400 font-semibold capitalize">{subscription?.subscription_status}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Distribution Breakdown */}
                  <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
                    <div className="flex items-center mb-6">
                      <PieChart className="h-8 w-8 text-purple-400 mr-3" />
                      <h2 className="text-2xl font-bold text-white">Distribution Breakdown</h2>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-gray-300 mb-4">
                        Your monthly contribution is distributed equally among all verified partner organizations:
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {organizations.map((org, index) => (
                          <div key={index} className="bg-gray-700/50 rounded-2xl p-4">
                            <div className="flex justify-between items-center mb-2">
                              <div className="font-semibold text-white">{org.name}</div>
                              <div className="text-blue-400 font-bold">{org.percentage.toFixed(1)}%</div>
                            </div>
                            <div className="text-sm text-gray-300 mb-2">{org.category}</div>
                            <div className="text-green-400 font-semibold">{formatPrice(org.amount)}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-900/30 rounded-2xl p-4 border border-blue-700/50">
                      <div className="flex items-center text-blue-300">
                        <Shield className="h-5 w-5 mr-2" />
                        <span className="text-sm">
                          Equal distribution ensures fair support across all verified organizations. 
                          This approach maximizes collective impact and prevents popularity bias.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Donation Timeline */}
                  <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
                    <div className="flex items-center mb-6">
                      <Clock className="h-8 w-8 text-green-400 mr-3" />
                      <h2 className="text-2xl font-bold text-white">Donation Timeline</h2>
                    </div>
                    
                    {donationHistory.length > 0 ? (
                      <div className="space-y-4">
                        {donationHistory.slice(0, 10).map((donation, index) => (
                          <div key={donation.id} className="bg-gray-700/50 rounded-2xl p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="text-white font-semibold">
                                  {formatPrice(donation.amount_total)}
                                </div>
                                <div className="text-sm text-gray-300">
                                  {new Date(donation.order_date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  donation.order_status === 'completed' 
                                    ? 'bg-green-900/50 text-green-300' 
                                    : 'bg-yellow-900/50 text-yellow-300'
                                }`}>
                                  {donation.order_status}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {donationHistory.length > 10 && (
                          <div className="text-center">
                            <Button variant="outline" className="bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50">
                              View All History
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Calendar className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                        <p className="text-gray-400">No donation history yet. Your first payment will appear here.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column - Sidebar */}
                <div className="space-y-8">
                  {/* Contact Information */}
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

                  {/* Subscription Controls */}
                  <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-4">Subscription Controls</h3>
                    
                    <div className="space-y-3">
                      <Button
                        onClick={handleManageSubscription}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-between"
                      >
                        <span className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Manage Subscription
                        </span>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        onClick={() => window.location.href = '/pricing'}
                        variant="outline"
                        className="w-full bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50 justify-between"
                      >
                        <span className="flex items-center">
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Change Tier
                        </span>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}