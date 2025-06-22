import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Heart } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <Heart className="h-6 w-6 text-red-500 absolute -bottom-1 -right-1 bg-white rounded-full p-1" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome to Give Well Together!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for joining our community of effective givers. Your subscription has been activated and you're now making a meaningful impact on countless lives.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center mb-2">
            <Heart className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-green-800 font-medium">Your Impact Starts Now</span>
          </div>
          <p className="text-green-700 text-sm">
            Your monthly contribution will be automatically distributed to the most effective charities, maximizing the lives you can save and improve.
          </p>
        </div>
        
        <Button
          onClick={() => navigate('/dashboard')}
          className="w-full"
        >
          Go to Dashboard
        </Button>

        <p className="text-xs text-gray-500 mt-4">
          You'll receive a confirmation email with your subscription details shortly.
        </p>
      </div>
    </div>
  );
}