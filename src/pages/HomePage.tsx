import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { ImpactSection } from '../components/home/ImpactSection';
import { FAQSection } from '../components/home/FAQSection';
import { ContactSection } from '../components/home/ContactSection';

export function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ImpactSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
}