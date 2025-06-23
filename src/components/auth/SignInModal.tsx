import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { X } from 'lucide-react';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignInSuccess?: () => void;
}

export function SignInModal({ isOpen, onClose, onSignInSuccess }: SignInModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // Call the success callback to proceed with payment
      if (onSignInSuccess) {
        onSignInSuccess();
      } else {
        onClose();
      }
      
      // Reset form
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Logo/Icon */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-lg"></div>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Sign in to your account</h2>
          <p className="text-gray-600 mt-2">Sign in to continue with your subscription</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-slate-500 focus:border-transparent placeholder-gray-500 text-gray-900"
          />
          
          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-slate-500 focus:border-transparent placeholder-gray-500 text-gray-900"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-700 hover:bg-slate-800 text-white py-3.5 rounded-2xl font-medium transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In & Continue to Payment'}
          </button>
        </form>

        <div className="mt-6 text-xs text-center text-gray-500">
          By signing in, you agree to the{' '}
          <a href="#" className="underline hover:text-gray-700">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="underline hover:text-gray-700">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}