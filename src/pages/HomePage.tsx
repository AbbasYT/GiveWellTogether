import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Users, Shield, Star, Quote } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-catppuccin-base via-catppuccin-mantle to-catppuccin-crust">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-catppuccin-mauve/20 to-catppuccin-pink/20"></div>
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-catppuccin-text mb-6">
              One Subscription.
              <br />
              <span className="bg-gradient-to-r from-catppuccin-mauve to-catppuccin-pink bg-clip-text text-transparent">
                Countless Lives Changed.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-catppuccin-subtext0 mb-8 max-w-3xl mx-auto">
              Join a community of changemakers. Your monthly subscription is equally distributed 
              to verified organizations making real impact around the world.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pricing">
                <Button size="lg" className="text-lg px-8 py-4">
                  Start Making Impact
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/organizations">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  See Where Money Goes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-catppuccin-surface0/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-catppuccin-text mb-4">
              Transparency. Impact. Community.
            </h2>
            <p className="text-lg text-catppuccin-subtext0 max-w-2xl mx-auto">
              We believe in radical transparency and equal distribution. Every dollar is tracked, 
              every organization is verified, and every impact is measured.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-catppuccin-surface0 border border-catppuccin-surface1">
              <div className="w-16 h-16 bg-catppuccin-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-catppuccin-green" />
              </div>
              <h3 className="text-xl font-semibold text-catppuccin-text mb-2">Equal Distribution</h3>
              <p className="text-catppuccin-subtext0">
                Your subscription is divided equally among all verified organizations, ensuring fair support for every cause.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-catppuccin-surface0 border border-catppuccin-surface1">
              <div className="w-16 h-16 bg-catppuccin-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-catppuccin-blue" />
              </div>
              <h3 className="text-xl font-semibold text-catppuccin-text mb-2">Verified Organizations</h3>
              <p className="text-catppuccin-subtext0">
                Every organization goes through our rigorous verification process to ensure your money creates real impact.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-catppuccin-surface0 border border-catppuccin-surface1">
              <div className="w-16 h-16 bg-catppuccin-mauve/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-catppuccin-mauve" />
              </div>
              <h3 className="text-xl font-semibold text-catppuccin-text mb-2">Community Driven</h3>
              <p className="text-catppuccin-subtext0">
                Join thousands of donors who believe in collective action and transparent giving.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-catppuccin-text mb-4">
              Real Stories. Real Impact.
            </h2>
            <p className="text-lg text-catppuccin-subtext0">
              See how your contributions are changing lives around the world.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-catppuccin-surface0 rounded-xl p-6 border border-catppuccin-surface1">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face" 
                  alt="Sarah" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-catppuccin-text">Sarah M.</h4>
                  <p className="text-sm text-catppuccin-subtext0">Monthly Donor</p>
                </div>
              </div>
              <Quote className="w-6 h-6 text-catppuccin-mauve mb-2" />
              <p className="text-catppuccin-subtext0 italic">
                "Knowing that my $25/month is helping multiple organizations gives me such peace of mind. 
                The transparency reports show exactly where every dollar goes."
              </p>
            </div>

            <div className="bg-catppuccin-surface0 rounded-xl p-6 border border-catppuccin-surface1">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face" 
                  alt="Maria" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-catppuccin-text">Maria Rodriguez</h4>
                  <p className="text-sm text-catppuccin-subtext0">Clean Water Initiative</p>
                </div>
              </div>
              <Quote className="w-6 h-6 text-catppuccin-mauve mb-2" />
              <p className="text-catppuccin-subtext0 italic">
                "Thanks to Give Well Together, we've been able to provide clean water to 500 families 
                in our community. The consistent funding makes planning so much easier."
              </p>
            </div>

            <div className="bg-catppuccin-surface0 rounded-xl p-6 border border-catppuccin-surface1">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face" 
                  alt="David" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-catppuccin-text">David Chen</h4>
                  <p className="text-sm text-catppuccin-subtext0">Annual Donor</p>
                </div>
              </div>
              <Quote className="w-6 h-6 text-catppuccin-mauve mb-2" />
              <p className="text-catppuccin-subtext0 italic">
                "I love that I don't have to research dozens of charities. Give Well Together 
                does the vetting, and I know my money is making a real difference."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-catppuccin-surface0/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-catppuccin-text mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-catppuccin-surface0 rounded-xl p-6 border border-catppuccin-surface1">
              <h3 className="text-lg font-semibold text-catppuccin-text mb-2">
                How is my subscription distributed?
              </h3>
              <p className="text-catppuccin-subtext0">
                Your monthly subscription is divided equally among all verified organizations on our platform. 
                If there are 10 organizations, each receives 1/10th of your contribution.
              </p>
            </div>

            <div className="bg-catppuccin-surface0 rounded-xl p-6 border border-catppuccin-surface1">
              <h3 className="text-lg font-semibold text-catppuccin-text mb-2">
                How do you verify organizations?
              </h3>
              <p className="text-catppuccin-subtext0">
                Organizations must complete a comprehensive application including financial transparency, 
                impact metrics, and ongoing reporting requirements. Our team reviews each application thoroughly.
              </p>
            </div>

            <div className="bg-catppuccin-surface0 rounded-xl p-6 border border-catppuccin-surface1">
              <h3 className="text-lg font-semibold text-catppuccin-text mb-2">
                Can I cancel my subscription anytime?
              </h3>
              <p className="text-catppuccin-subtext0">
                Yes, you can cancel your subscription at any time from your dashboard. 
                There are no cancellation fees or penalties.
              </p>
            </div>

            <div className="bg-catppuccin-surface0 rounded-xl p-6 border border-catppuccin-surface1">
              <h3 className="text-lg font-semibold text-catppuccin-text mb-2">
                How do I track my impact?
              </h3>
              <p className="text-catppuccin-subtext0">
                Your dashboard provides detailed reports on how your contributions are being used, 
                including updates from each organization and aggregate impact metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-catppuccin-text mb-4">
            Have Questions?
          </h2>
          <p className="text-lg text-catppuccin-subtext0 mb-8">
            We're here to help. Reach out to our team for any questions about our platform, 
            organizations, or how your contributions make an impact.
          </p>
          <Button size="lg" className="text-lg px-8 py-4">
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  );
}