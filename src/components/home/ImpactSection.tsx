import React from 'react';
import { Quote } from 'lucide-react';

export function ImpactSection() {
  const testimonials = [
    {
      quote: "Through Give Well Together, we've been able to provide clean water to over 500 families in rural Kenya. The consistent monthly funding allows us to plan long-term projects.",
      author: "Sarah Johnson",
      role: "Director, Clean Water Initiative",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
    },
    {
      quote: "Being part of this community feels incredible. Knowing my $15/month is making a real difference alongside thousands of others gives me purpose.",
      author: "Michael Chen",
      role: "Monthly Donor",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
    },
    {
      quote: "The transparency is unmatched. We can see exactly how funds are used and the impact reports keep us motivated to continue our work.",
      author: "Dr. Amara Okafor",
      role: "Founder, Education for All",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
    }
  ];

  const impactStories = [
    {
      title: "Education in Rural Bangladesh",
      description: "Built 12 schools serving 2,400 children",
      image: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
      impact: "2,400 children now have access to education"
    },
    {
      title: "Clean Water in Sub-Saharan Africa",
      description: "Installed 45 water wells in remote villages",
      image: "https://images.pexels.com/photos/6994982/pexels-photo-6994982.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
      impact: "15,000 people now have clean water access"
    },
    {
      title: "Medical Care in Southeast Asia",
      description: "Mobile clinics reaching isolated communities",
      image: "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
      impact: "8,500 patients treated in remote areas"
    }
  ];

  return (
    <section className="py-24 bg-mantle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text mb-6">
            Real Impact, Real Stories
          </h2>
          <p className="text-xl text-subtext1 max-w-3xl mx-auto">
            See how your contributions create lasting change around the world through our verified partner organizations.
          </p>
        </div>

        {/* Impact Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {impactStories.map((story, index) => (
            <div key={index} className="bg-surface0 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-text mb-2">{story.title}</h3>
                <p className="text-subtext1 mb-4">{story.description}</p>
                <div className="bg-blue/10 border border-blue/20 rounded-lg p-3">
                  <p className="text-blue font-medium text-sm">{story.impact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-surface0 rounded-xl p-6 hover:bg-surface1 transition-colors duration-300">
              <Quote className="h-8 w-8 text-blue mb-4" />
              <p className="text-subtext1 mb-6 leading-relaxed">"{testimonial.quote}"</p>
              <div className="flex items-center space-x-3">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="text-text font-medium">{testimonial.author}</div>
                  <div className="text-subtext0 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}