import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { HomePage } from './pages/HomePage';
import { SignInPage } from './components/auth/SignInPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-base text-text">
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/*" element={
            <>
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  {/* Placeholder routes for other pages */}
                  <Route path="/about" element={<div className="min-h-screen flex items-center justify-center"><p className="text-text">About Us - Coming Soon</p></div>} />
                  <Route path="/join" element={<div className="min-h-screen flex items-center justify-center"><p className="text-text">Join Us - Coming Soon</p></div>} />
                  <Route path="/organizations" element={<div className="min-h-screen flex items-center justify-center"><p className="text-text">Organizations - Coming Soon</p></div>} />
                  <Route path="/pricing" element={<div className="min-h-screen flex items-center justify-center"><p className="text-text">Pricing - Coming Soon</p></div>} />
                  <Route path="/dashboard" element={<div className="min-h-screen flex items-center justify-center"><p className="text-text">Dashboard - Coming Soon</p></div>} />
                  <Route path="/settings" element={<div className="min-h-screen flex items-center justify-center"><p className="text-text">Settings - Coming Soon</p></div>} />
                </Routes>
              </main>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;