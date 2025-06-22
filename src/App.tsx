import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { Header } from './components/layout/Header';
import { HomePage } from './pages/HomePage';
import { SignInPage } from './pages/SignInPage';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-catppuccin-base flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-catppuccin-mauve"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-catppuccin-base">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <HomePage />
              </>
            }
          />
          <Route
            path="/signin"
            element={user ? <Navigate to="/" replace /> : <SignInPage />}
          />
          {/* Placeholder routes for future pages */}
          <Route path="/about" element={<div className="min-h-screen bg-catppuccin-base"><Header /><div className="pt-20 text-center text-catppuccin-text">About Us - Coming Soon</div></div>} />
          <Route path="/join" element={<div className="min-h-screen bg-catppuccin-base"><Header /><div className="pt-20 text-center text-catppuccin-text">Join Us - Coming Soon</div></div>} />
          <Route path="/organizations" element={<div className="min-h-screen bg-catppuccin-base"><Header /><div className="pt-20 text-center text-catppuccin-text">Organizations - Coming Soon</div></div>} />
          <Route path="/pricing" element={<div className="min-h-screen bg-catppuccin-base"><Header /><div className="pt-20 text-center text-catppuccin-text">Pricing - Coming Soon</div></div>} />
          <Route path="/dashboard" element={<div className="min-h-screen bg-catppuccin-base"><Header /><div className="pt-20 text-center text-catppuccin-text">Dashboard - Coming Soon</div></div>} />
          <Route path="/settings" element={<div className="min-h-screen bg-catppuccin-base"><Header /><div className="pt-20 text-center text-catppuccin-text">Settings - Coming Soon</div></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;