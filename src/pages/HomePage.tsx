import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/Button';
import { FAQItem } from '../components/ui/FAQ';
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">$2.4M+</div>
              <div className="text-gray-600">Total Donated</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">15,000+</div>
              <div className="text-gray-600">Lives Impacted</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">127</div>
              <div className="text-gray-600">Partner Organizations</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, transparent, and impactful. Your subscription creates lasting change.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Choose Your Impact</h3>
              <p className="text-gray-600">
                Select a monthly subscription that fits your budget. Every dollar counts and makes a difference.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Equal Distribution</h3>
              <p className="text-gray-600">
                Your contribution is equally distributed among all verified partner organizations each month.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Track Your Impact</h3>
              <p className="text-gray-600">
                See exactly where your money goes with full transparency and regular impact reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "Knowing my monthly contribution helps multiple organizations gives me such peace of mind. 
                The transparency is incredible."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" 
                  alt="Sarah M." 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">Sarah M.</div>
                  <div className="text-gray-600">Monthly Donor</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "I love that I don't have to choose between causes. My subscription supports 
                education, healthcare, and environmental projects all at once."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" 
                  alt="Michael R." 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">Michael R.</div>
                  <div className="text-gray-600">Annual Subscriber</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "The impact reports show exactly how my donations are being used. 
                It's amazing to see the real difference we're making together."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" 
                  alt="Emily K." 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">Emily K.</div>
                  <div className="text-gray-600">Community Member</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-8">
            <FAQItem
              question="How is my money distributed?"
              answer="Your monthly subscription is divided equally among all verified partner organizations. We update the distribution monthly as new organizations join our platform."
            />
            
            <FAQItem
              question="Can I cancel anytime?"
              answer="Yes, you can cancel your subscription at any time from your dashboard. There are no cancellation fees or penalties."
            />
            
            <FAQItem
              question="How do you verify organizations?"
              answer="All organizations go through a rigorous verification process including financial audits, impact assessments, and ongoing monitoring to ensure your donations create real change."
            />
            
            <FAQItem
              question="What about privacy and data security?"
              answer="We take your privacy seriously. Your personal information is encrypted and never shared with third parties. You control what information is visible in impact reports."
            />
            
            <FAQItem
              question="What types of organizations do you support?"
              answer="We support a diverse range of verified organizations including education initiatives, healthcare programs, environmental conservation, disaster relief, poverty alleviation, and human rights advocacy groups worldwide."
            />
            
            <FAQItem
              question="How often will I receive impact reports?"
              answer="You'll receive detailed impact reports monthly showing exactly how your contribution was distributed and the specific outcomes achieved by each organization."
            />
            
            <FAQItem
              question="Can I choose which organizations to support?"
              answer="Currently, contributions are distributed equally among all verified partners to maximize collective impact. However, we're exploring options for donor preferences in future updates."
            />
            
            <FAQItem
              question="What happens if an organization loses verification?"
              answer="If an organization fails to maintain our standards, they're immediately removed from the platform and future distributions are redistributed among remaining verified partners."
            />
            
            <FAQItem
              question="Are my donations tax-deductible?"
              answer="Yes, all donations through our platform are tax-deductible. You'll receive annual tax documentation and can download receipts from your dashboard at any time."
            />
            
            <FAQItem
              question="What's the minimum subscription amount?"
              answer="Our minimum subscription starts at $15 per month, making it accessible for anyone who wants to make a meaningful impact regardless of their budget."
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Have Questions?</h2>
          <p className="text-xl text-gray-600 mb-8">
            We're here to help you make the biggest impact possible.
          </p>
          
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a topic</option>
                  <option value="general">General Inquiry</option>
                  <option value="subscription">Subscription Questions</option>
                  <option value="organizations">Organization Verification</option>
                  <option value="technical">Technical Support</option>
                  <option value="partnership">Partnership Opportunities</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder="Tell us how we can help you..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                ></textarea>
              </div>
              
              <div className="text-center">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Give Well Together</h3>
              <p className="text-gray-400">
                One subscription. Countless lives changed.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/organizations" className="hover:text-white">Organizations</Link></li>
                <li><Link to="/join" className="hover:text-white">Join Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Give Well Together. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}