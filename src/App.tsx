import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { PricingPage } from './pages/PricingPage';
import { DashboardPage } from './pages/DashboardPage';
import { SettingsPage } from './pages/SettingsPage';
import { JoinUsPage } from './pages/JoinUsPage';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/join" element={<JoinUsPage />} />
        {/* Placeholder routes for future pages */}
        <Route path="/organizations" element={<div>Organizations - Coming Soon</div>} />
      </Routes>
    </Router>
  );
}

export default App;