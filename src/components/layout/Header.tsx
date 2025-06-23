import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { SignInModal } from '../auth/SignInModal';
import { SignUpModal } from '../auth/SignUpModal';
import { User, ChevronDown, Menu, X } from 'lucide-react';

export function Header() {
  const { user, signOut } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSwitchToSignUp = () => {
    setIsSignInModalOpen(false);
    setIsSignUpModalOpen(true);
  };

  const handleSwitchToSignIn = () => {
    setIsSignUpModalOpen(false);
    setIsSignInModalOpen(true);
  };

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="flex justify-between items-center py-4 sm:py-6">
            {/* Logo */}
            <Link to="/" className="text-lg sm:text-2xl font-bold text-white">
              GiveWellTogether
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-12">
              <Link to="/" className="text-white/90 hover:text-white transition-colors text-sm font-medium">
                Home
              </Link>
              <Link to="/about" className="text-white/90 hover:text-white transition-colors text-sm font-medium">
                About Us
              </Link>
              <Link to="/join" className="text-white/90 hover:text-white transition-colors text-sm font-medium">
                Join Us!
              </Link>
              <Link to="/organizations" className="text-white/90 hover:text-white transition-colors text-sm font-medium">
                Where Your Money Goes
              </Link>
            </nav>

            {/* Desktop Auth Section */}
            <div className="hidden md:flex items-center space-x-3">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors"
                  >
                    <User className="h-5 w-5" />
                    <span className="hidden sm:block text-sm">Profile</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          signOut();
                          setIsProfileOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => setIsSignInModalOpen(true)}
                    className="text-white/90 hover:text-white px-4 py-2 text-sm font-medium transition-colors"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => setIsSignUpModalOpen(true)}
                    className="bg-white text-slate-800 hover:bg-gray-100 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors shadow-sm"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button and Auth */}
            <div className="flex md:hidden items-center space-x-3">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors"
                  >
                    <User className="h-5 w-5" />
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          signOut();
                          setIsProfileOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => setIsSignInModalOpen(true)}
                    className="text-white/90 hover:text-white px-3 py-2 text-xs font-medium transition-colors"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => setIsSignUpModalOpen(true)}
                    className="bg-white text-slate-800 hover:bg-gray-100 px-3 py-2 rounded-full text-xs font-medium transition-colors shadow-sm"
                  >
                    Sign Up
                  </button>
                </>
              )}
              
              {/* Hamburger Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-white/80 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-black/95 backdrop-blur-sm rounded-2xl mt-4 p-6 border border-gray-700">
              <nav className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  className="text-white/90 hover:text-white transition-colors text-base font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  className="text-white/90 hover:text-white transition-colors text-base font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link 
                  to="/join" 
                  className="text-white/90 hover:text-white transition-colors text-base font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Join Us!
                </Link>
                <Link 
                  to="/organizations" 
                  className="text-white/90 hover:text-white transition-colors text-base font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Where Your Money Goes
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      <SignInModal 
        isOpen={isSignInModalOpen} 
        onClose={() => setIsSignInModalOpen(false)}
        onSwitchToSignUp={handleSwitchToSignUp}
      />

      <SignUpModal 
        isOpen={isSignUpModalOpen} 
        onClose={() => setIsSignUpModalOpen(false)}
        onSwitchToSignIn={handleSwitchToSignIn}
      />
    </>
  );
}