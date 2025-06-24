import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface StatusMessagesProps {
  submitSuccess: boolean;
  error: string;
}

export function StatusMessages({ submitSuccess, error }: StatusMessagesProps) {
  if (!submitSuccess && !error) return null;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-20 mb-8">
      {submitSuccess && (
        <div className="p-6 bg-green-900/50 border border-green-700 rounded-2xl text-green-300 max-w-6xl mx-auto">
          <div className="flex items-center">
            <CheckCircle className="h-6 w-6 mr-3" />
            <div>
              <h3 className="font-bold">Application Submitted Successfully!</h3>
              <p className="text-sm">Thank you for your interest in joining GiveWellTogether. We'll review your application and get back to you within 5-7 business days.</p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="p-6 bg-red-900/50 border border-red-700 rounded-2xl text-red-300 max-w-6xl mx-auto">
          <div className="flex items-center">
            <AlertCircle className="h-6 w-6 mr-3" />
            <div>
              <h3 className="font-bold">Submission Error</h3>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}