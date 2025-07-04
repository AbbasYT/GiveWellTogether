import React from 'react';
import { Button } from '../ui/Button';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export function ContactSection() {
  return (
    <section className="py-24 relative bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-1/4 w-48 h-48 bg-gray-700/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }}></div>
        <div className="absolute bottom-16 right-1/4 w-64 h-64 bg-gray-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }}></div>
      </div>
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">Have Questions?</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're here to help you make the biggest impact possible. Get in touch with our team.
          </p>
        </div>
        
        {/* Two-column layout: Contact info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gray-800/95 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-700 p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Email Us</div>
                    <div className="text-gray-300">givewelltogether@gmail.com</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Call Us</div>
                    <div className="text-gray-300">+1 (555) xxx-xxx</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Visit Us</div>
                    <div className="text-gray-300">123 Impact Street<br />San Francisco, CA 94102</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Office Hours</div>
                    <div className="text-gray-300">Mon-Fri: 9AM-6PM PST<br />Sat-Sun: 10AM-4PM PST</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="bg-gray-800/95 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-700 p-8">
              <h3 className="text-xl font-bold text-white mb-6">Response Times</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{"< 2hrs"}</div>
                  <div className="text-gray-300 text-sm">Email Response</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{"< 24hrs"}</div>
                  <div className="text-gray-300 text-sm">Issue Resolution</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-gray-800/95 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-700 p-8">
            <form className="space-y-6 group">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-bold text-gray-300 mb-3">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-4 border border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-700/50 hover:bg-gray-700 hover:shadow-md focus:scale-105 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-bold text-gray-300 mb-3">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-4 py-4 border border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-700/50 hover:bg-gray-700 hover:shadow-md focus:scale-105 text-white"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-300 mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-4 border border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-700/50 hover:bg-gray-700 hover:shadow-md focus:scale-105 text-white"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-bold text-gray-300 mb-3">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-4 border border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-700/50 hover:bg-gray-700 hover:shadow-md focus:scale-105 text-white"
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
                <label htmlFor="message" className="block text-sm font-bold text-gray-300 mb-3">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder="Tell us how we can help you..."
                  className="w-full px-4 py-4 border border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-300 bg-gray-700/50 hover:bg-gray-700 hover:shadow-md focus:scale-105 text-white placeholder-gray-400"
                ></textarea>
              </div>
              
              <div className="text-center">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 w-full"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}