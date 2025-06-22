import React from 'react';
import { ArrowRight, Heart, Users, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-base via-mantle to-crust"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-mauve/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-text leading-tight">
              One Subscription.
              <br />
              <span className="bg-gradient-to-r from-blue via-mauve to-pink bg-clip-text text-transparent">
                Countless Lives Changed.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-subtext1 max-w-3xl mx-auto leading-relaxed">
              Join a community of changemakers. Your monthly contribution gets distributed equally among verified organizations making real impact worldwide.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/pricing">
              <Button size="lg" className="group">
                Start Making Impact
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
            <Link to="/organizations">
              <Button variant="outline" size="lg">
                See Where Money Goes
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-surface1">
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="p-3 bg-blue/20 rounded-full">
                  <Heart className="h-8 w-8 text-blue" />
                </div>
              </div>
              <div className="text-3xl font-bold text-text">$2.5M+</div>
              <div className="text-subtext1">Distributed to Charities</div>
            </div>
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="p-3 bg-mauve/20 rounded-full">
                  <Users className="h-8 w-8 text-mauve" />
                </div>
              </div>
              <div className="text-3xl font-bold text-text">10,000+</div>
              <div className="text-subtext1">Active Donors</div>
            </div>
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="p-3 bg-teal/20 rounded-full">
                  <Globe className="h-8 w-8 text-teal" />
                </div>
              </div>
              <div className="text-3xl font-bold text-text">150+</div>
              <div className="text-subtext1">Verified Organizations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}