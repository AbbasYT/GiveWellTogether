import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors"
      >
        <h3 className="text-lg font-bold text-gray-900 pr-4">{question}</h3>
        <ChevronRight 
          className={`h-5 w-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
            isOpen ? 'rotate-90' : ''
          }`} 
        />
      </button>
      {isOpen && (
        <div className="px-8 pb-6">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}