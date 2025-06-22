import React from 'react';
import { FAQItem } from '../ui/FAQ';

export function FAQSection() {
  return (
    <section className="py-24 relative bg-gradient-to-br from-black via-gray-900 to-slate-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-32 right-16 w-56 h-56 bg-gray-700/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '4s' }}
        ></div>
        <div
          className="absolute bottom-32 left-16 w-72 h-72 bg-gray-600/25 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '6s', animationDelay: '2s' }}
        ></div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to know about making an impact through our platform
          </p>
        </div>

        {/* Two-column layout for larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          <div className="space-y-4">
            <FAQItem
              question="How is my money distributed?"
              answer="Your monthly subscription is divided equally among all verified partner organizations. We update the distribution monthly as new organizations join our platform."
            />
            <FAQItem
              question="How do you verify organizations?"
              answer="All organizations go through a rigorous verification process including financial audits, impact assessments, and ongoing monitoring to ensure your donations create real change."
            />
            <FAQItem
              question="What types of organizations do you support?"
              answer="We support a diverse range of verified organizations including education initiatives, healthcare programs, environmental conservation, disaster relief, poverty alleviation, and human rights advocacy groups worldwide."
            />
            <FAQItem
              question="Can I choose which organizations to support?"
              answer="Currently, contributions are distributed equally among all verified partners to maximize collective impact. However, we're exploring options for donor preferences in future updates."
            />
            <FAQItem
              question="Are my donations tax-deductible?"
              answer="Yes, all donations through our platform are tax-deductible. You'll receive annual tax documentation and can download receipts from your dashboard at any time."
            />
          </div>

          <div className="space-y-4">
            <FAQItem
              question="Can I cancel anytime?"
              answer="Yes, you can cancel your subscription at any time from your dashboard. There are no cancellation fees or penalties."
            />
            <FAQItem
              question="What about privacy and data security?"
              answer="We take your privacy seriously. Your personal information is encrypted and never shared with third parties. You control what information is visible in impact reports."
            />
            <FAQItem
              question="How often will I receive impact reports?"
              answer="You'll receive detailed impact reports monthly showing exactly how your contribution was distributed and the specific outcomes achieved by each organization."
            />
            <FAQItem
              question="What happens if an organization loses verification?"
              answer="If an organization fails to maintain our standards, they're immediately removed from the platform and future distributions are redistributed among remaining verified partners."
            />
            <FAQItem
              question="What's the minimum subscription amount?"
              answer="Our minimum subscription starts at $15 per month, making it accessible for anyone who wants to make a meaningful impact regardless of their budget."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
