import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';

export function Header() {
  const { user, signOut } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-catppuccin-base/95 backdrop-blur-sm border-b border-catppuccin-surface0 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-catppuccin-mauve to-catppuccin-pink rounded-lg flex items-center justify-center">
              <span className="text-catppuccin-base font-bold text-lg">G</span>
            </div>
            <span className="text-xl font-bold text-catppuccin-text">Give Well Together</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-catppuccin-text hover:text-catppuccin-mauve transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-catppuccin-text hover:text-catppuccin-mauve transition-colors duration-200"
            >
              About Us
            </Link>
            <Link 
              to="/join" 
              className="text-catppuccin-text hover:text-catppuccin-mauve transition-colors duration-200"
            >
              Join Us!
            </Link>
            <Link 
              to="/organizations" 
              className="text-catppuccin-text hover:text-catppuccin-mauve transition-colors duration-200"
            >
              Where Your Money Goes
            </Link>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-catppuccin-text hover:text-catppuccin-mauve transition-colors duration-200"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:block">Profile</span>
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-catppuccin-surface0 rounded-md shadow-lg border border-catppuccin-surface1 z-50">
                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-catppuccin-text hover:bg-catppuccin-surface1 transition-colors duration-200"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-catppuccin-text hover:bg-catppuccin-surface1 transition-colors duration-200"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          signOut();
                          setIsProfileOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-catppuccin-text hover:bg-catppuccin-surface1 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/signin">
                <Button variant="primary">
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