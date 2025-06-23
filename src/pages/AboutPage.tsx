import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowRight, Heart, Users, Shield, Target, Eye, Handshake } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-full mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                  About <span className="text-blue-400">GiveWellTogether</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Simplifying charitable giving while maximizing transparency and impact through collective generosity.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
  <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg w-full sm:w-auto">
    <Link to="/pricing" className="inline-flex items-center">
      Start Your Impact Journey
      <ArrowRight className="ml-2 h-5 w-5" />
    </Link>
  </Button>
</div>
              </div>
              
              {/* Right Visual Elements */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-700">
                    <Heart className="h-12 w-12 text-blue-400 mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">Transparent</h3>
                    <p className="text-gray-300 text-sm">Full visibility into where your money goes</p>
                  </div>
                  <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-700">
                    <Shield className="h-12 w-12 text-green-400 mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">Verified</h3>
                    <p className="text-gray-300 text-sm">Rigorously vetted partner organizations</p>
                  </div>
                  <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-700">
                    <Users className="h-12 w-12 text-purple-400 mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">Collective</h3>
                    <p className="text-gray-300 text-sm">Stronger impact through community giving</p>
                  </div>
                  <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-700">
                    <Target className="h-12 w-12 text-orange-400 mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">Impactful</h3>
                    <p className="text-gray-300 text-sm">Real change in communities worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 relative">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-full mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Mission */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mr-4">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Our Mission</h2>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  <strong className="text-white">One Subscription. Countless Lives Changed.</strong>
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Give Well Together exists to simplify charitable giving while maximizing transparency and impact. 
                  We believe that donating should be honest, effortless, and truly collective. 
                  With one simple subscription, you help fund multiple vetted organizations doing important work — equally and fairly.
                </p>
              </div>

              {/* Vision */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mr-4">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Why We Exist</h2>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Many people want to give back — but don't know who to trust, how their money is used, or whether it's really helping. 
                  Traditional donation platforms often lack transparency, making it hard to track impact or ensure fairness.
                </p>
                <p className="text-blue-300 italic leading-relaxed">
                  We created Give Well Together so your hard-earned money always finds the right hands — and you can see how it makes a difference.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 relative bg-gradient-to-r from-gray-900/50 to-slate-900/50">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-full mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">How It Works</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Simple, transparent, and impactful process designed for maximum collective impact
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">1</div>
                <h3 className="text-lg font-bold text-white mb-2">Subscribe</h3>
                <p className="text-gray-300 text-sm">Choose monthly or yearly at a tier you're comfortable with</p>
              </div>
              
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">2</div>
                <h3 className="text-lg font-bold text-white mb-2">Pool Funds</h3>
                <p className="text-gray-300 text-sm">We pool donations from all users into a central fund</p>
              </div>
              
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 text-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">3</div>
                <h3 className="text-lg font-bold text-white mb-2">Distribute</h3>
                <p className="text-gray-300 text-sm">Every 28th, donations are divided equally among approved organizations</p>
              </div>
              
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 text-center">
                <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">4</div>
                <h3 className="text-lg font-bold text-white mb-2">Track Impact</h3>
                <p className="text-gray-300 text-sm">Your dashboard shows exactly where your money goes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 relative">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-full mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Transparency */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-400 mb-4">Transparency, Always</h3>
                <p className="text-gray-300 leading-relaxed">
                  Every organization that applies to receive funding must answer a comprehensive onboarding form that becomes publicly visible. 
                  Anyone can read their answers and participate in a public comment section to ask questions and keep them accountable.
                </p>
              </div>

              {/* Equal Giving */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-400 mb-4">Equal Giving, Real Impact</h3>
                <p className="text-gray-300 leading-relaxed">
                  Donations are split equally across all onboarded causes to promote fairness and avoid popularity contests.
                  While you can opt out of one genre, you cannot select specific organizations — because we believe in community-powered generosity, not individual bias.
                </p>
              </div>

              {/* Built for Trust */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
                <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-400 mb-4">Built for Trust</h3>
                <p className="text-gray-300 leading-relaxed">
                  From secure payments via Stripe and RevenueCat to transparent donation breakdowns and public onboarding applications,
                  every feature is designed to build trust — not just with donors, but with the organizations we support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 relative bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-12 border border-gray-700">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Handshake className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-6">Join Us</h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Whether you're here to make a difference or apply on behalf of a cause, Give Well Together is your home for collective generosity done right.
              </p>
              <p className="text-lg text-white font-semibold mb-8">
                No frills. No manipulation. Just genuine giving — together.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/pricing">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg w-full sm:w-auto">
                    Start Making Impact
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/organizations">
                  <Button variant="outline" size="lg" className="bg-white/20 border-white/30 text-white hover:bg-white/30 px-8 py-4 text-lg w-full sm:w-auto">
                    See Our Partners
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}