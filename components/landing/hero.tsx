// components/landing/hero.tsx
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-80px] left-[-80px] w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-80px] right-[-80px] w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-xs font-semibold rounded-full mb-6 tracking-wide uppercase backdrop-blur-sm">
          🚀 India's All-in-One Marketplace
        </span>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
          Find, Book &{' '}
          <span className="relative inline-block">
            <span className="relative z-10">Shop</span>
            <span className="absolute inset-x-0 bottom-1 h-3 bg-yellow-400/60 rounded-full z-0" />
          </span>{' '}
          Everything
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-white/85 max-w-2xl mx-auto mb-10 leading-relaxed">
          Properties, venues, fashion, cloud kitchens, and home services — all in one place.
          Spotly connects buyers, vendors, and service providers seamlessly.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm sm:text-base"
          >
            Get Started — It's Free
          </Link>
          <Link
            href="/dashboard/user/properties"
            className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl border border-white/30 hover:bg-white/20 hover:scale-105 transition-all backdrop-blur-sm text-sm sm:text-base"
          >
            Explore Listings
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { label: 'Properties Listed', value: '2,400+' },
            { label: 'Venues Available', value: '850+' },
            { label: 'Happy Customers', value: '18,000+' },
            { label: 'Cities Covered', value: '40+' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-white">
              <p className="text-2xl sm:text-3xl font-extrabold">{stat.value}</p>
              <p className="text-xs sm:text-sm text-white/75 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}