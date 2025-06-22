import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Alert } from '../ui/Alert';

export function SignInForm() {
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-catppuccin-base via-catppuccin-mantle to-catppuccin-crust flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-catppuccin-mauve to-catppuccin-pink rounded-xl flex items-center justify-center mb-4">
            <span className="text-catppuccin-base font-bold text-2xl">G</span>
          </div>
          <h2 className="text-3xl font-bold text-catppuccin-text">Welcome back</h2>
          <p className="mt-2 text-catppuccin-subtext0">Sign in to your Give Well Together account</p>
        </div>

        <div className="bg-catppuccin-surface0 rounded-xl shadow-xl p-8 border border-catppuccin-surface1">
          {error && (
            <Alert type="error" className="mb-6">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email address"
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
            <p className="text-catppuccin-subtext0 text-sm">
              Don't have an account?{' '}
              <span className="text-catppuccin-mauve font-medium">
                Choose a subscription plan to get started
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}