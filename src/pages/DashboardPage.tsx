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
import { CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { getProductByPriceId } from '../stripe-config';

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
  const [organizations, setOrganizations] = useState<OrganizationDistribution[]>([]);
  const [contactInfo, setContactInfo] = useState({
    email: '',
    twitter: '',
    facebook: ''
  });
  const [loading, setLoading] = useState(true);
  const [syncingPayments, setSyncingPayments] = useState(false);

  // Check for payment success/failure from URL params
  const paymentStatus = searchParams.get('payment');

  useEffect(() => {
    if (!authLoading && !subLoading && user) {
      fetchDashboardData();
    }
  }, [user, subscription, authLoading, subLoading]);

  const fetchApprovedOrganizations = async () => {
    try {
      console.log('Fetching approved organizations...');
      
      const { data: approvedOrgs, error } = await supabase
        .from('organization_applications')
        .select('organization_name, primary_category')
        .eq('status', 'approved')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching approved organizations:', error);
        throw error;
      }

      console.log('Approved organizations:', approvedOrgs);
      return approvedOrgs || [];
    } catch (error) {
      console.error('Error fetching approved organizations:', error);
      return [];
    }
  };

  const calculateOrganizationDistribution = (approvedOrgs: any[], monthlyAmount: number) => {
    if (approvedOrgs.length === 0) {
      return [];
    }

    const amountPerOrg = monthlyAmount / approvedOrgs.length;
    const percentage = 100 / approvedOrgs.length;

    return approvedOrgs.map(org => ({
      name: org.organization_name,
      category: org.primary_category,
      amount: amountPerOrg,
      percentage: percentage
    }));
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch approved organizations first
      const approvedOrgs = await fetchApprovedOrganizations();
      
      // **ONLY** fetch real payment data from database - NO MOCK DATA
      const { data: orders, error: ordersError } = await supabase
        .from('stripe_user_orders')
        .select('*')
        .order('order_date', { ascending: false });

      if (ordersError) {
        console.error('Error fetching orders:', ordersError);
        throw ordersError;
      }

      console.log('Raw orders from database:', orders);

      // Filter out invalid dates (1970 dates indicate corrupted data)
      const validOrders = orders?.filter(order => {
        const orderDate = new Date(order.order_date);
        const orderYear = orderDate.getFullYear();
        const isValid = orderYear > 1990; // Filter out obviously wrong dates
        
        if (!isValid) {
          console.warn('Filtered out invalid order date:', order.order_date, 'from order:', order.id);
        }
        
        return isValid;
      }) || [];

      console.log('Valid orders after filtering:', validOrders);

      // Set donation history to ONLY valid orders
      setDonationHistory(validOrders);
      
      // Calculate totals from valid orders only
      const total = validOrders.reduce((sum, order) => sum + (order.amount_total || 0), 0);
      setTotalDonated(total);
      
      // Calculate current cycle amount (this month's donations)
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const currentCycleTotal = validOrders
        .filter(order => {
          const orderDate = new Date(order.order_date);
          return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
        })
        .reduce((sum, order) => sum + (order.amount_total || 0), 0);
      
      setCurrentCycleAmount(currentCycleTotal);

      // Set next billing date from subscription
      if (subscription?.current_period_end) {
        setNextBillingDate(new Date(subscription.current_period_end * 1000));
      }

      // Calculate organization distribution based on monthly amount and approved organizations
      if (subscription?.price_id && approvedOrgs.length > 0) {
        const subscriptionPlan = getProductByPriceId(subscription.price_id);
        if (subscriptionPlan) {
          // Always calculate monthly distribution regardless of billing cycle
          const monthlyAmount = subscriptionPlan.interval === 'year' 
            ? subscriptionPlan.price / 12 // Convert yearly to monthly
            : subscriptionPlan.price;
          
          const distributionData = calculateOrganizationDistribution(approvedOrgs, monthlyAmount);
          setOrganizations(distributionData);
        }
      } else if (approvedOrgs.length > 0) {
        // If no subscription but we have approved orgs, show them with 0 amounts
        const distributionData = calculateOrganizationDistribution(approvedOrgs, 0);
        setOrganizations(distributionData);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const syncPaymentsFromStripe = async () => {
    setSyncingPayments(true);
    
    try {
      // Call a function to manually sync payments from Stripe
      // This would typically be a Supabase Edge Function
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/sync-stripe-payments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to sync payments');
      }

      // Refresh the dashboard data after sync
      await fetchDashboardData();
      
    } catch (error) {
      console.error('Error syncing payments:', error);
    } finally {
      setSyncingPayments(false);
    }
  };

  const getSubscriptionPlan = () => {
    if (!subscription?.price_id) return null;
    return getProductByPriceId(subscription.price_id);
  };

  const currentPlan = getSubscriptionPlan();

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

          {/* Debug Info for Payment Sync Issues */}
          {donationHistory.length === 0 && isActive() && (
            <div className="mb-8 p-4 bg-yellow-900/50 border border-yellow-700 rounded-2xl text-yellow-300 max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertCircle className="h-6 w-6 mr-3" />
                  <div>
                    <h3 className="font-bold">No Payment History Found</h3>
                    <p className="text-sm">Your Stripe payments may not be syncing properly. Try refreshing the data.</p>
                  </div>
                </div>
                <Button
                  onClick={syncPaymentsFromStripe}
                  disabled={syncingPayments}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${syncingPayments ? 'animate-spin' : ''}`} />
                  {syncingPayments ? 'Syncing...' : 'Sync Payments'}
                </Button>
              </div>
            </div>
          )}

          {/* Organization Count Info */}
          {organizations.length > 0 && (
            <div className="mb-8 p-4 bg-blue-900/50 border border-blue-700 rounded-2xl text-blue-300 max-w-4xl mx-auto">
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 mr-3" />
                <div>
                  <h3 className="font-bold">Distribution Updated</h3>
                  <p className="text-sm">
                    Your monthly contribution is now distributed equally among {organizations.length} approved partner organizations.
                  </p>
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
                  subscriptionPlan={currentPlan}
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