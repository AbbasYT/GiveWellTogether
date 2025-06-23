import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Check, ArrowRight, CreditCard, Shield, Receipt, Crown } from 'lucide-react';
import { useStripe } from '../hooks/useStripe';
import { useAuth } from '../hooks/useAuth';
import { useSubscription } from '../hooks/useSubscription';
import { SignUpModal } from '../components/auth/SignUpModal';
import { SignInModal } from '../components/auth/SignInModal';
import { getMonthlyProducts, getYearlyProducts, getProductByPriceId } from '../stripe-config';

export function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [pendingPlan, setPendingPlan] = useState<any>(null);
  const { createCheckoutSession, loading: stripeLoading, error: stripeError } = useStripe();
  const { user } = useAuth();
  const { subscription, isActive } = useSubscription();

  // Get products based on billing cycle
  const monthlyProducts = getMonthlyProducts();
  const yearlyProducts = getYearlyProducts();
  const currentProducts = billingCycle === 'monthly' ? monthlyProducts : yearlyProducts;

  // Create plans array from current products
  const plans = currentProducts.map((product, index) => ({
    name: `Tier ${3 - index}`, // Tier 3, Tier 2, Tier 1
    price: product.price,
    priceId: product.priceId,
    description: index === 0 ? 'Maximum impact for dedicated givers' : 
                 index === 1 ? 'Amplify your impact with greater giving' : 
                 'Perfect for getting started with giving',
    features: [
      'Monthly impact reports',
      'Full transparency dashboard',
      'Equal distribution to all partners',
      'Tax-deductible receipts',
      'Cancel anytime'
    ]
  }));

  const getCurrentTierIndex = () => {
    if (!subscription?.price_id || !isActive()) return -1;
    
    const currentPriceId = subscription.price_id;
    const currentProduct = getProductByPriceId(currentPriceId);
    
    if (!currentProduct) return -1;
    
    // Check if current subscription matches the billing cycle being viewed
    if (currentProduct.interval !== billingCycle) return -1;
    
    return currentProducts.findIndex(product => product.priceId === currentPriceId);
  };

  const currentTierIndex = getCurrentTierIndex();

  const getButtonText = (planIndex: number) => {
    if (!user) return 'Start Making Impact';
    if (!isActive()) return 'Start Making Impact';
    
    if (planIndex === currentTierIndex) {
      return 'You\'re on this tier';
    } else if (planIndex > currentTierIndex) {
      return 'Upgrade to this tier';
    } else {
      return 'Move to this tier';
    }
  };

  const getButtonVariant = (planIndex: number) => {
    if (!user || !isActive()) return 'default';
    
    if (planIndex === currentTierIndex) {
      return 'current';
    } else if (planIndex > currentTierIndex) {
      return 'upgrade';
    } else {
      return 'downgrade';
    }
  };

  const proceedToCheckout = async (plan: typeof plans[0]) => {
    await createCheckoutSession({
      priceId: plan.priceId,
      mode: 'subscription',
      successUrl: `${window.location.origin}/dashboard?payment=success`,
      cancelUrl: `${window.location.origin}/pricing?payment=canceled`,
    });
  };

  const handleSubscribe = async (plan: typeof plans[0], planIndex: number) => {
    if (!user) {
      // Store the plan they want to subscribe to
      setPendingPlan(plan);
      setIsSignUpModalOpen(true);
      return;
    }

    // If user is on this tier already, don't do anything
    if (planIndex === currentTierIndex && isActive()) {
      return;
    }

    // If user exists, proceed directly to checkout
    await proceedToCheckout(plan);
  };

  const handleSignUpSuccess = async () => {
    // Close the signup modal
    setIsSignUpModalOpen(false);
    
    // Small delay to ensure auth state is updated
    setTimeout(async () => {
      if (pendingPlan) {
        await proceedToCheckout(pendingPlan);
        setPendingPlan(null);
      }
    }, 500);
  };

  const handleSwitchToSignIn = () => {
    setIsSignUpModalOpen(false);
    setIsSignInModalOpen(true);
  };

  const handleSignInSuccess = async () => {
    // Close the signin modal
    setIsSignInModalOpen(false);
    
    // Small delay to ensure auth state is updated
    setTimeout(async () => {
      if (pendingPlan) {
        await proceedToCheckout(pendingPlan);
        setPendingPlan(null);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-full mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Choose Your <span className="text-blue-400">Impact Level</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-4xl mx-auto">
              <strong className="text-white">"Give What You Can, When You Can. Every Bit Helps. Truly."</strong>
            </p>
            <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto">
              All tiers provide the same transparent, equal distribution to verified organizations. 
              Choose the amount that feels right for your giving journey.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center mb-16">
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-2 border border-gray-700">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    billingCycle === 'monthly'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    billingCycle === 'yearly'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Yearly
                </button>
              </div>
            </div>

            {/* Error Display */}
            {stripeError && (
              <div className="mb-8 p-4 bg-red-900/50 border border-red-700 rounded-2xl text-red-300 max-w-md mx-auto">
                {stripeError}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 relative">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-full mx-auto">
            {plans.map((plan, index) => {
              const buttonVariant = getButtonVariant(index);
              const buttonText = getButtonText(index);
              const isCurrentTier = index === currentTierIndex && isActive();
              
              return (
                <div
                  key={plan.name}
                  className={`relative bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                    isCurrentTier 
                      ? 'border-blue-500 ring-2 ring-blue-500/20' 
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  {isCurrentTier && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center">
                        <Crown className="h-4 w-4 mr-2" />
                        Current Plan
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-300 mb-6">{plan.description}</p>
                    
                    <div className="mb-6">
                      <span className="text-5xl font-bold text-white">
                        ${(plan.price / 100).toLocaleString()}
                      </span>
                      <span className="text-gray-300 ml-2">
                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                      {billingCycle === 'yearly' && (
                        <div className="text-sm text-green-400 mt-2">
                          Save ${((plan.price / 100) * 0.2).toLocaleString()} per year
                        </div>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleSubscribe(plan, index)}
                    disabled={stripeLoading || isCurrentTier}
                    className={`w-full py-4 text-lg font-bold rounded-2xl transition-all duration-300 ${
                      isCurrentTier
                        ? 'bg-blue-600 text-white cursor-default'
                        : buttonVariant === 'upgrade'
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : buttonVariant === 'downgrade'
                        ? 'bg-orange-600 hover:bg-orange-700 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                    } disabled:opacity-50`}
                  >
                    {stripeLoading ? 'Processing...' : buttonText}
                    {!stripeLoading && !isCurrentTier && <ArrowRight className="ml-2 h-5 w-5" />}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative bg-gradient-to-r from-gray-900/50 to-slate-900/50">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-full mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">What You Get</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Every subscription includes these essential features for transparent giving
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-full mx-auto">
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 text-center hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Secure Payments</h3>
                <p className="text-gray-300">
                  All payments processed securely through Stripe with bank-level encryption and fraud protection.
                </p>
              </div>
              
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 text-center hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Receipt className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Tax Documentation</h3>
                <p className="text-gray-300">
                  Automatic receipt generation and annual tax documentation for all your charitable contributions.
                </p>
              </div>
              
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 text-center hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CreditCard className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Easy Management</h3>
                <p className="text-gray-300">
                  Update payment methods, change plans, or cancel anytime from your secure dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">Pricing Questions</h2>
              <p className="text-xl text-gray-300">
                Common questions about our subscription plans
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Can I change my plan anytime?</h3>
                <p className="text-gray-300">
                  Yes! You can upgrade, downgrade, or cancel your subscription at any time from your dashboard. 
                  Changes take effect at your next billing cycle.
                </p>
              </div>
              
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Are there any hidden fees?</h3>
                <p className="text-gray-300">
                  No hidden fees ever. The price you see is exactly what you pay. 100% of your subscription 
                  goes to verified organizations (minus standard payment processing fees).
                </p>
              </div>
              
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">What payment methods do you accept?</h3>
                <p className="text-gray-300">
                  We accept all major credit cards, debit cards, and bank transfers through our secure 
                  Stripe integration. Your payment information is never stored on our servers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-12 border border-gray-700">
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Making Impact?</h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Join our community of givers and start making a difference today. 
                Every subscription helps create lasting change in communities worldwide.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/organizations">
                  <Button variant="outline" size="lg" className="bg-white/20 border-white/30 text-white hover:bg-white/30 px-8 py-4 text-lg w-full sm:w-auto">
                    See Our Partners
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="bg-white/20 border-white/30 text-white hover:bg-white/30 px-8 py-4 text-lg w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative text-white py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20"></div>
          <div className="absolute top-20 left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-60 h-60 bg-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-full mx-auto">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">GiveWellTogether</h3>
              <p className="text-gray-300 leading-relaxed">
                One subscription. Countless lives changed.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Platform</h4>
              <ul className="space-y-3 text-gray-300">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/organizations" className="hover:text-white transition-colors">Organizations</Link></li>
                <li><Link to="/join" className="hover:text-white transition-colors">Join Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Support</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Legal</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="relative border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Give Well Together. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <SignUpModal 
        isOpen={isSignUpModalOpen} 
        onClose={() => {
          setIsSignUpModalOpen(false);
          setPendingPlan(null);
        }}
        onSwitchToSignIn={handleSwitchToSignIn}
        onSignUpSuccess={handleSignUpSuccess}
      />

      <SignInModal 
        isOpen={isSignInModalOpen} 
        onClose={() => {
          setIsSignInModalOpen(false);
          setPendingPlan(null);
        }}
        onSignInSuccess={handleSignInSuccess}
      />
    </div>
  );
}