// components/landing/features.tsx
const features = [
  {
    icon: '🏠',
    title: 'Properties',
    description:
      'Browse flats, houses, and commercial spaces for rent or sale across 40+ cities. Verified listings only.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: '💒',
    title: 'Venue Booking',
    description:
      'Discover and book marriage gardens, banquet halls, and restaurants for your special occasions.',
    color: 'bg-pink-50 text-pink-600',
  },
  {
    icon: '👗',
    title: 'Fashion & Shopping',
    description:
      'Shop the latest fashion and household items with AI-powered virtual try-on technology.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: '🍽️',
    title: 'Cloud Kitchens',
    description:
      'Order fresh, homemade meals from cloud kitchens near you. Multiple cuisines, fast delivery.',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: '🧹',
    title: 'Home Services',
    description:
      'Hire verified cooks, cleaners, nannies, and more. Background-checked and rated professionals.',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: '🤖',
    title: 'AI-Powered',
    description:
      'Smart recommendations, virtual try-on, and automated matching — powered by cutting-edge AI.',
    color: 'bg-yellow-50 text-yellow-600',
  },
];

export function Features() {
  return (
    <section className="py-24 bg-white" id="features">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 text-xs font-semibold rounded-full mb-4 uppercase tracking-wide">
            Everything You Need
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            One Platform, Endless Possibilities
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg">
            Spotly brings together all the services you need in daily life — from finding a home to
            booking a wedding venue.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 cursor-default"
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl text-2xl mb-5 ${feature.color}`}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}