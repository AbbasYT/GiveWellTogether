import React from 'react';
import { Header } from '../components/layout/Header';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowRight } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <div 
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-transparent"></div>
        
        <Header />
        
        {/* About Content */}
        <div className="relative z-10 flex items-center min-h-screen pt-20 sm:pt-24">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <section className="max-w-4xl mx-auto text-white">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-center">About Us</h1>

              <div className="space-y-12">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-blue-400">Our Mission</h2>
                  <p className="text-base sm:text-lg leading-relaxed text-gray-200">
                    <strong className="text-white">One Subscription. Countless Lives Changed.</strong><br />
                    Give Well Together exists to simplify charitable giving while maximizing transparency and impact. 
                    We believe that donating should be honest, effortless, and truly collective. 
                    With one simple subscription, you help fund multiple vetted organizations doing important work — equally and fairly.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-blue-400">Why We Exist</h2>
                  <p className="text-base sm:text-lg leading-relaxed text-gray-200">
                    Many people want to give back — but don't know who to trust, how their money is used, or whether it's really helping. 
                    Traditional donation platforms often lack transparency, making it hard to track impact or ensure fairness.
                    <br /><br />
                    <em className="text-blue-300">We created Give Well Together so your hard-earned money always finds the right hands — and you can see how it makes a difference.</em>
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-blue-400">How It Works</h2>
                  <ul className="list-disc list-inside text-base sm:text-lg leading-relaxed space-y-2 text-gray-200 ml-4">
                    <li>Subscribe monthly or yearly at a tier you're comfortable with.</li>
                    <li>We pool donations from all users into a central fund.</li>
                    <li>Every 28th of the month, donations are divided equally among approved organizations.</li>
                    <li>You may opt out of exactly one genre of donation (e.g. Education, Health, Animal Welfare).</li>
                    <li>Your personal dashboard shows exactly where your money goes — down to the last rupee or dollar.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-blue-400">Transparency, Always</h2>
                  <p className="text-base sm:text-lg leading-relaxed text-gray-200">
                    Every organization that applies to receive funding must answer a comprehensive onboarding form that becomes publicly visible. 
                    Anyone can read their answers and participate in a public comment section to ask questions and keep them accountable.
                    <br /><br />
                    If approved, these organizations are showcased with funding history, impact stories, and beneficiary outcomes — so you always know who you're helping and why.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-blue-400">Equal Giving, Real Impact</h2>
                  <p className="text-base sm:text-lg leading-relaxed text-gray-200">
                    Donations are split equally across all onboarded causes to promote fairness and avoid popularity contests.
                    While you can opt out of one genre, you cannot select specific organizations — because we believe in community-powered generosity, not individual bias.
                    <br /><br />
                    It's not about choosing one cause over another. It's about giving well, together.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-blue-400">Built for Trust</h2>
                  <p className="text-base sm:text-lg leading-relaxed text-gray-200">
                    From secure payments via Stripe and RevenueCat to transparent donation breakdowns and public onboarding applications,
                    every feature is designed to build trust — not just with donors, but with the organizations we support.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-blue-400">Join Us</h2>
                  <p className="text-base sm:text-lg leading-relaxed text-gray-200">
                    Whether you're here to make a difference or apply on behalf of a cause, Give Well Together is your home for collective generosity done right.
                    <br /><br />
                    <strong className="text-white">No frills. No manipulation. Just genuine giving — together.</strong>
                  </p>
                </div>

                {/* Call to Action */}
                <div className="text-center pt-8">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/pricing">
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto">
                        Start Your Impact Journey
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link to="/organizations">
                      <Button variant="outline" size="lg" className="bg-white/20 border-white/30 text-white hover:bg-white/30 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto">
                        See Our Partners
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative text-white py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20"></div>
          <div className="absolute top-20 left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-60 h-60 bg-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
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