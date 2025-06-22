import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useSubscription } from '../hooks/useSubscription';
import { SubscriptionStatus } from '../components/subscription/SubscriptionStatus';
import { SubscriptionCard } from '../components/subscription/SubscriptionCard';
import { Button } from '../components/ui/Button';
import { products } from '../stripe-config';

export function Dashboard() {
  const { user, signOut } = useAuth();
  const { subscription, getSubscriptionProduct } = useSubscription();

  const currentProduct = getSubscriptionProduct();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.email}</span>
              <Button onClick={signOut} variant="outline">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <SubscriptionStatus />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Available Plans</h2>
              {products.map((product) => (
                <SubscriptionCard
                  key={product.id}
                  product={product}
                  isCurrentPlan={currentProduct?.id === product.id && 
                    (subscription?.subscription_status === 'active' || subscription?.subscription_status === 'trialing')}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}