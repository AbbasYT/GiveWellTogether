import React, { useState } from 'react';
import { Product } from '../../stripe-config';
import { Button } from '../ui/Button';
import { Alert } from '../ui/Alert';
import { supabase } from '../../lib/supabase';

interface SubscriptionCardProps {
  product: Product;
  isCurrentPlan?: boolean;
}

export function SubscriptionCard({ product, isCurrentPlan = false }: SubscriptionCardProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('You must be logged in to subscribe');
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          price_id: product.priceId,
          mode: product.mode,
          success_url: `${window.location.origin}/success`,
          cancel_url: window.location.href,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      console.error('Subscription error:', err);
      setError(err instanceof Error ? err.message : 'Failed to start subscription');
    } finally {
      setLoading(false);
    }
  };

  const getPriceDisplay = () => {
    if (product.price >= 100) {
      return `$${product.price.toFixed(0)}`;
    }
    return `$${product.price.toFixed(2)}`;
  };

  const getPopularBadge = () => {
    if (product.price === 50.00) {
      return (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`relative bg-white rounded-lg shadow-md p-6 border-2 transition-all duration-200 hover:shadow-lg ${
      product.price === 50.00 ? 'border-blue-500 scale-105' : 'border-gray-200'
    }`}>
      {getPopularBadge()}
      
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">{getPriceDisplay()}</span>
          <span className="text-gray-600 text-lg">/month</span>
        </div>

        <div className="mb-6 space-y-2 text-sm text-gray-600">
          <div className="flex items-center justify-center">
            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Monthly charitable giving
          </div>
          <div className="flex items-center justify-center">
            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Impact tracking & reports
          </div>
          <div className="flex items-center justify-center">
            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Cancel anytime
          </div>
        </div>

        {error && (
          <Alert type="error" className="mb-4">
            {error}
          </Alert>
        )}

        {isCurrentPlan ? (
          <Button variant="outline" disabled className="w-full">
            Current Plan
          </Button>
        ) : (
          <Button
            onClick={handleSubscribe}
            loading={loading}
            className={`w-full ${
              product.price === 50.00 
                ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' 
                : ''
            }`}
          >
            {loading ? 'Processing...' : 'Subscribe Now'}
          </Button>
        )}
      </div>
    </div>
  );
}