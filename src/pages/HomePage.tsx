import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/Button';
import { FAQSection } from '../components/sections/FAQSection';
import { ContactSection } from '../components/sections/ContactSection';
import { ArrowRight, Heart, Users, Shield, Star } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-800/70 to-transparent"></div>
        
        <Header />
        
        {/* Hero Content */}
        <div className="relative z-10 flex items-center min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                ONE
                <br />
                SUBSCRIPTION.
                <br />
                <span className="text-blue-400">COUNTLESS</span>
                <br />
                LIVES CHANGED.
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                Join thousands of donors making a real difference. Your monthly contribution 
                is transparently distributed to verified organizations changing lives worldwide.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/pricing">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                    Start Making Impact
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/organizations">
                  <Button variant="outline" size="lg" className="bg-white/20 border-white/30 text-white hover:bg-white/30 px-8 py-4 text-lg">
                    See Where Money Goes
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Stats */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-300">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent mb-3">$2.4M+</div>
                <div className="text-gray-300 font-medium">Total Donated</div>
              </div>
            </div>
            <div>
              <div className="bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-300">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent mb-3">15,000+</div>
                <div className="text-gray-300 font-medium">Lives Impacted</div>
              </div>
            </div>
            <div>
              <div className="bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-300">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent mb-3">127</div>
                <div className="text-gray-300 font-medium">Partner Organizations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider between Impact Stats and How It Works */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>

      {/* How It Works */}
      <section className="py-24 relative bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gray-700/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gray-800/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">How It Works</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Simple, transparent, and impactful. Your subscription creates lasting change.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            <div className="text-center h-full">
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 hover:shadow-xl hover:scale-105 transition-all duration-500 border border-gray-700/50 h-full flex flex-col group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <Heart className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 flex-shrink-0">Choose Your Impact</h3>
                <p className="text-gray-300 leading-relaxed flex-grow">
                  Select a monthly subscription that fits your budget. Every dollar counts and makes a difference.
                </p>
              </div>
            </div>
            
            <div className="text-center h-full">
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 hover:shadow-xl hover:scale-105 transition-all duration-500 border border-gray-700/50 h-full flex flex-col group">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 flex-shrink-0">Equal Distribution</h3>
                <p className="text-gray-300 leading-relaxed flex-grow">
                  Your contribution is equally distributed among all verified partner organizations each month.
                </p>
              </div>
            </div>
            
            <div className="text-center h-full">
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 hover:shadow-xl hover:scale-105 transition-all duration-500 border border-gray-700/50 h-full flex flex-col group">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 flex-shrink-0">Track Your Impact</h3>
                <p className="text-gray-300 leading-relaxed flex-grow">
                  See exactly where your money goes with full transparency and regular impact reports.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative bg-gradient-to-br from-gray-900 via-slate-900 to-black overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-20 w-64 h-64 bg-gray-700/25 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '6s' }}></div>
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-gray-600/20 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '8s', animationDelay: '1s' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">What Our Community Says</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Real stories from people making a difference through our platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800/90 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-gray-700/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 group">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }} />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                "Knowing my monthly contribution helps multiple organizations gives me such peace of mind. 
                The transparency is incredible."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" 
                  alt="Sarah M." 
                  className="w-12 h-12 rounded-full mr-4 ring-2 ring-gray-600"
                />
                <div>
                  <div className="font-bold text-white">Sarah M.</div>
                  <div className="text-gray-400">Monthly Donor</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/90 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-gray-700/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 group">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }} />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                "I love that I don't have to choose between causes. My subscription supports 
                education, healthcare, and environmental projects all at once."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" 
                  alt="Michael R." 
                  className="w-12 h-12 rounded-full mr-4 ring-2 ring-gray-600"
                />
                <div>
                  <div className="font-bold text-white">Michael R.</div>
                  <div className="text-gray-400">Annual Subscriber</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/90 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-gray-700/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 group">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }} />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                "The impact reports show exactly how my donations are being used. 
                It's amazing to see the real difference we're making together."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" 
                  alt="Emily K." 
                  className="w-12 h-12 rounded-full mr-4 ring-2 ring-gray-600"
                />
                <div>
                  <div className="font-bold text-white">Emily K.</div>
                  <div className="text-gray-400">Community Member</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider between Testimonials and FAQ */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>

      <FAQSection />
      <ContactSection />

      {/* Footer */}
      <footer className="relative text-white py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20"></div>
          <div className="absolute top-20 left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-60 h-60 bg-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">GiveWellTogether</h3>
              <p className="text-gray-300 leading-relaxed">
                One subscription. Countless lives changed.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Platform</h4>
              <ul className="space-y-3 text-gray-300">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/organizations" className="hover:text-white transition-colors">Organizations</Link></li>
                <li><Link to="/join" className="hover:text-white transition-colors">Join Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Support</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Legal</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="relative border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Give Well Together. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}