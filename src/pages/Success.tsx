import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useSubscription } from '../hooks/useSubscription';

export function Success() {
  const navigate = useNavigate();
  const { refetch } = useSubscription();

  useEffect(() => {
    // Refetch subscription data to get the latest status
    const timer = setTimeout(() => {
      refetch();
    }, 2000);

    return () => clearTimeout(timer);
  }, [refetch]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for your subscription. Your payment has been processed successfully.
        </p>
        
        <Button
          onClick={() => navigate('/dashboard')}
          className="w-full"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}