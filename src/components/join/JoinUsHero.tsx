import React from 'react';

export function JoinUsHero() {
  return (
    <section className="pt-32 pb-12 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Join Our <span className="text-blue-400">Mission</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-4xl mx-auto">
            Partner with GiveWellTogether to amplify your impact and reach more supporters. 
            We're building a community of verified organizations making real change in the world.
          </p>
          
          <div className="text-lg text-gray-300 space-y-2 mb-8">
            <p><strong className="text-blue-400">Transparent Funding:</strong> Equal distribution ensures fair support for all verified partners</p>
            <p><strong className="text-green-400">Growing Community:</strong> Connect with a network of dedicated donors and fellow organizations</p>
            <p><strong className="text-purple-400">Global Reach:</strong> Expand your impact beyond traditional fundraising boundaries</p>
          </div>
        </div>
      </div>
    </section>
  );
}