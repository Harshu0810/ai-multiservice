// components/landing/faq.tsx
'use client';

import { useState } from 'react';

const faqs = [
  {
    question: 'How do I list my property on Spotly?',
    answer:
      'Sign up as a Vendor, go to your dashboard, and click "List Property". Fill in the multi-step form with details, photos, and pricing. Your listing will be reviewed by our admin team within 24 hours.',
  },
  {
    question: 'Is Spotly available across India?',
    answer:
      'Spotly currently operates in 40+ cities across India and is rapidly expanding. If your city is not listed, you can still sign up and we will notify you when we launch in your area.',
  },
  {
    question: 'How does the virtual try-on feature work?',
    answer:
      'Our AI-powered virtual try-on lets you upload your photo and see how clothing items look on you before purchasing. It uses augmented reality to provide an accurate visual representation.',
  },
  {
    question: 'Are the service providers verified?',
    answer:
      'Yes. All house help professionals, cooks, cleaners, and nannies go through a thorough background verification process before they are listed on the platform.',
  },
  {
    question: 'What payment methods are supported?',
    answer:
      'Spotly supports UPI, net banking, credit/debit cards, and popular wallets like Paytm and PhonePe. All transactions are secured with industry-standard encryption.',
  },
  {
    question: 'Can I cancel a booking?',
    answer:
      'Yes, cancellation policies vary by service type. Property and venue bookings can be cancelled up to 48 hours before the scheduled date for a full refund. Check individual listings for specific policies.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white" id="faq">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 text-xs font-semibold rounded-full mb-4 uppercase tracking-wide">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-base">
            Everything you need to know about Spotly. Can&apos;t find an answer?{' '}
            <a href="mailto:support@spotly.in" className="text-indigo-600 hover:underline">
              Contact us
            </a>
            .
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 text-sm sm:text-base pr-4">
                  {faq.question}
                </span>
                <span className="text-indigo-500 text-xl flex-shrink-0">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}