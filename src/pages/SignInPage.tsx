import React from 'react';
import { Header } from '../components/layout/Header';
import { SignInForm } from '../components/auth/SignInForm';

export function SignInPage() {
  return (
    <div className="min-h-screen bg-catppuccin-base">
      <Header />
      <SignInForm />
    </div>
  );
}