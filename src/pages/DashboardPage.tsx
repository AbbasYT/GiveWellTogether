import React, { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { useAuth } from '../hooks/useAuth';
import { useSubscription } from '../hooks/useSubscription';
import { supabase } from '../lib/supabase';
import { Navigate, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { DonationSummary } from '../components/dashboard/DonationSummary';
import { DistributionBreakdown } from '../components/dashboard/DistributionBreakdown';
import { DonationTimeline } from '../components/dashboard/DonationTimeline';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { CheckCircle, AlertCircle } from 'lucide-react';

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
  const [searchParams] = useSearchParams();
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
  const [loading, setLoading] = useState(true);

  // Check for payment success/failure from URL params
  const paymentStatus = searchParams.get('payment');

  useEffect(() => {
    if (!authLoading && !subLoading && user) {
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

  if (authLoading || subLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/pricing" replace />;
  }

  // Only allow access if user has an active subscription
  if (!isActive()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
        <Header />
        <div className="pt-24 pb-12">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-12 border border-gray-700">
                <AlertCircle className="h-16 w-16 text-orange-400 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-white mb-4">Active Subscription Required</h1>
                <p className="text-gray-300 mb-6">
                  You need an active subscription to access the dashboard. Complete your payment to start making an impact.
                </p>
                {subscription && (
                  <p className="text-sm text-gray-400 mb-8">
                    Current status: <span className="capitalize text-orange-400">{subscription.subscription_status}</span>
                  </p>
                )}
                <Button
                  onClick={() => window.location.href = '/pricing'}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                >
                  Complete Your Subscription
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const subscriptionPlan = getSubscriptionPlan();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <Header />
      
      <div className="pt-24 pb-12">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          {/* Payment Success/Failure Messages */}
          {paymentStatus === 'success' && (
            <div className="mb-8 p-4 bg-green-900/50 border border-green-700 rounded-2xl text-green-300 max-w-4xl mx-auto">
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 mr-3" />
                <div>
                  <h3 className="font-bold">Payment Successful!</h3>
                  <p className="text-sm">Welcome to GiveWellTogether! Your subscription is now active and you're making a difference.</p>
                </div>
              </div>
            </div>
          )}

          {paymentStatus === 'canceled' && (
            <div className="mb-8 p-4 bg-orange-900/50 border border-orange-700 rounded-2xl text-orange-300 max-w-4xl mx-auto">
              <div className="flex items-center">
                <AlertCircle className="h-6 w-6 mr-3" />
                <div>
                  <h3 className="font-bold">Payment Canceled</h3>
                  <p className="text-sm">Your payment was canceled. You can try again anytime from the pricing page.</p>
                </div>
              </div>
            </div>
          )}

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
                <DonationSummary
                  totalDonated={totalDonated}
                  currentCycleAmount={currentCycleAmount}
                  nextBillingDate={nextBillingDate}
                  subscriptionPlan={subscriptionPlan}
                  subscription={subscription}
                />

                <DistributionBreakdown organizations={organizations} />

                <DonationTimeline donationHistory={donationHistory} />
              </div>

              {/* Right Column - Sidebar */}
              <DashboardSidebar
                contactInfo={contactInfo}
                setContactInfo={setContactInfo}
                organizations={organizations}
                donationHistory={donationHistory}
                totalDonated={totalDonated}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}