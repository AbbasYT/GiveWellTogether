import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { User, ChevronDown } from 'lucide-react';

export function Header() {
  const { user, signOut } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white">
            GiveWellTogether
          </Link>

          {/* Navigation */}
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

          {/* Auth Section */}
          <div className="flex items-center">
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
              <Link to="/signin">
                <Button className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-2 rounded-full text-sm font-medium">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}