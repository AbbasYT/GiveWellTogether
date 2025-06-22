import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Menu, X, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, signOut } = useAuth();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Join Us!', href: '/join' },
    { name: 'Where Your Money Goes', href: '/organizations' },
  ];

  return (
    <header className="bg-base/95 backdrop-blur-sm border-b border-surface1 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-br from-blue to-mauve rounded-lg group-hover:scale-105 transition-transform duration-200">
              <Heart className="h-6 w-6 text-base" />
            </div>
            <span className="text-xl font-bold text-text">Give Well Together</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-subtext1 hover:text-text transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-surface0 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue to-mauve rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-base" />
                  </div>
                  <span className="text-text font-medium">{user.email?.split('@')[0]}</span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-surface0 border border-surface1 rounded-lg shadow-xl py-2">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-text hover:bg-surface1 transition-colors duration-200"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-text hover:bg-surface1 transition-colors duration-200"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Settings
                    </Link>
                    <hr className="my-2 border-surface1" />
                    <button
                      onClick={() => {
                        signOut();
                        setIsProfileOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-red hover:bg-surface1 transition-colors duration-200"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/signin">
                <Button variant="primary">Sign In</Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-surface0 transition-colors duration-200"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-text" />
            ) : (
              <Menu className="h-6 w-6 text-text" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-surface1">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-subtext1 hover:text-text transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-surface1">
                {user ? (
                  <div className="space-y-2">
                    <Link
                      to="/dashboard"
                      className="block text-text hover:text-blue transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/settings"
                      className="block text-text hover:text-blue transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                      className="block text-red hover:text-maroon transition-colors duration-200"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="primary" className="w-full">Sign In</Button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}