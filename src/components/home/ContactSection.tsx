import React, { useState } from 'react';
import { Mail, MessageCircle, Send } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="py-24 bg-mantle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-text mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-subtext1 mb-8">
              Have questions about our platform, want to suggest an organization, or need support? We'd love to hear from you.
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue/20 rounded-full">
                  <Mail className="h-6 w-6 text-blue" />
                </div>
                <div>
                  <div className="text-text font-medium">Email Us</div>
                  <div className="text-subtext1">hello@givewelltogether.org</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-mauve/20 rounded-full">
                  <MessageCircle className="h-6 w-6 text-mauve" />
                </div>
                <div>
                  <div className="text-text font-medium">Live Chat</div>
                  <div className="text-subtext1">Available 9 AM - 6 PM EST</div>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-surface0 rounded-xl border border-surface1">
              <h3 className="text-xl font-semibold text-text mb-4">For Organizations</h3>
              <p className="text-subtext1 mb-4">
                Interested in joining our network of verified organizations? 
              </p>
              <Button variant="outline" className="w-full">
                Learn About Joining
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-surface0 rounded-xl p-8 border border-surface1">
            <h3 className="text-2xl font-semibold text-text mb-6">Send us a message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <Input
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-text">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="block w-full px-4 py-3 bg-surface1 border border-surface2 rounded-lg text-text placeholder-subtext0 focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Tell us how we can help..."
                  required
                />
              </div>

              <Button type="submit" className="w-full group">
                Send Message
                <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}