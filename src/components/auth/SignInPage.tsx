import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { supabase } from '../../lib/supabase';

export function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base via-mantle to-crust flex items-center justify-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-mauve/5 rounded-full blur-3xl"></div>
      </div>

      {/* Back button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center space-x-2 text-subtext1 hover:text-text transition-colors duration-200"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Home</span>
      </Link>

      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <div className="bg-surface0/80 backdrop-blur-sm rounded-2xl p-8 border border-surface1 shadow-2xl">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-br from-blue to-mauve rounded-xl">
                <Heart className="h-8 w-8 text-base" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-text mb-2">Welcome Back</h1>
            <p className="text-subtext1">Sign in to continue making impact</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red/10 border border-red/20 rounded-lg">
              <p className="text-red text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

            <Button
              type="submit"
              loading={loading}
              className="w-full"
              size="lg"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-subtext0 text-sm">
              Don't have an account?{' '}
              <Link to="/pricing" className="text-blue hover:text-sapphire font-medium transition-colors duration-200">
                Choose a plan to get started
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-surface1 text-center">
            <p className="text-subtext0 text-xs">
              By signing in, you agree to our{' '}
              <Link to="/terms" className="text-blue hover:text-sapphire">Terms of Service</Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-blue hover:text-sapphire">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}