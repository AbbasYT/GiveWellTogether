import React from 'react';
import { Button } from '../ui/Button';

export function ContactSection() {
  return (
    <section 
      className="py-24 relative bg-gradient-to-br from-blue-50/40 via-white to-slate-50/40"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23dbeafe' fill-opacity='0.15'%3E%3Cpath d='M50 50c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10zm-20 0c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10zm-20 0c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Have Questions?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We're here to help you make the biggest impact possible. Get in touch with our team.
          </p>
        </div>
        
        <div className="relative max-w-2xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-8">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-bold text-gray-700 mb-3">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-bold text-gray-700 mb-3">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-3">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-3">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white"
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
              <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-3">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                placeholder="Tell us how we can help you..."
                className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 bg-gray-50/50 hover:bg-white"
              ></textarea>
            </div>
            
            <div className="text-center">
              <Button 
                type="submit" 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}