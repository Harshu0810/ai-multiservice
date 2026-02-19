// components/landing/sell.tsx
import Link from 'next/link';

const steps = [
  {
    number: '01',
    title: 'Create your account',
    description: 'Sign up as a Vendor in under 2 minutes. No credit card required.',
  },
  {
    number: '02',
    title: 'List your service',
    description: 'Use our guided multi-step form to add photos, pricing, and details.',
  },
  {
    number: '03',
    title: 'Get approved',
    description: 'Our team reviews your listing within 24 hours to ensure quality.',
  },
  {
    number: '04',
    title: 'Start earning',
    description: 'Receive bookings and payments directly. Grow your business with Spotly.',
  },
];

export function Sell() {
  return (
    <section className="py-24 bg-gradient-to-br from-indigo-600 to-purple-700" id="sell">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full mb-6 uppercase tracking-wide backdrop-blur-sm">
              For Vendors
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
              Start Selling & Listing on Spotly Today
            </h2>
            <p className="text-white/80 text-base sm:text-lg mb-10 leading-relaxed">
              Join thousands of vendors who trust Spotly to grow their business. Whether you own
              properties, run a venue, or offer home services — we have the tools to help you
              succeed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup"
                className="px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm text-center"
              >
                Become a Vendor
              </Link>
              <Link
                href="#features"
                className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl border border-white/30 hover:bg-white/20 transition-all backdrop-blur-sm text-sm text-center"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right steps */}
          <div className="space-y-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex items-start gap-5 bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20"
              >
                <span className="text-2xl font-extrabold text-white/30 flex-shrink-0 w-10">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}