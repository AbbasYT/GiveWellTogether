import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does the equal distribution work?",
      answer: "Every month, we collect all subscription fees and distribute them equally among all verified organizations. If we have 100 organizations and collect $100,000, each organization receives $1,000. This ensures fair distribution regardless of organization size."
    },
    {
      question: "How do you verify organizations?",
      answer: "Organizations must complete a comprehensive application including financial transparency, impact metrics, and operational details. Our team conducts thorough reviews, checks references, and requires regular impact reports to maintain verification status."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time with no penalties. Your cancellation will take effect at the end of your current billing cycle, and you'll continue to have access until then."
    },
    {
      question: "What happens to my data and privacy?",
      answer: "We take privacy seriously. We only collect necessary information for payment processing and impact reporting. Your personal data is never shared with third parties, and you can request data deletion at any time."
    },
    {
      question: "How can I track the impact of my donations?",
      answer: "You'll receive monthly impact reports showing exactly how funds were distributed and the outcomes achieved. Each verified organization provides detailed reports on their projects and beneficiaries."
    },
    {
      question: "What if an organization misuses funds?",
      answer: "We have strict monitoring in place. Organizations must provide regular financial reports and impact documentation. If misuse is detected, we immediately suspend the organization and redistribute their allocation to remaining verified partners."
    },
    {
      question: "Are my donations tax-deductible?",
      answer: "Yes, Give Well Together is a registered 501(c)(3) nonprofit organization. You'll receive tax-deductible receipts for all your contributions that you can use for tax purposes."
    },
    {
      question: "How much of my donation goes to organizations vs. operations?",
      answer: "95% of your subscription goes directly to verified organizations. Only 5% covers our operational costs including platform maintenance, verification processes, and impact reporting."
    }
  ];

  return (
    <section className="py-24 bg-base">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-subtext1">
            Everything you need to know about how Give Well Together works
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-surface0 rounded-xl border border-surface1 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-surface1 transition-colors duration-200"
              >
                <span className="text-text font-medium">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-subtext1" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-subtext1" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-subtext1 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}