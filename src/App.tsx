import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { HomePage } from './pages/HomePage';
import { SignInPage } from './pages/SignInPage';

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
        <Route path="/signin" element={<SignInPage />} />
        {/* Placeholder routes for future pages */}
        <Route path="/about" element={<div>About Us - Coming Soon</div>} />
        <Route path="/join" element={<div>Join Us - Coming Soon</div>} />
        <Route path="/organizations" element={<div>Organizations - Coming Soon</div>} />
        <Route path="/pricing" element={<div>Pricing - Coming Soon</div>} />
        <Route path="/dashboard" element={<div>Dashboard - Coming Soon</div>} />
        <Route path="/settings" element={<div>Settings - Coming Soon</div>} />
      </Routes>
    </Router>
  );
}

export default App;