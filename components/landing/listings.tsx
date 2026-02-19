// components/landing/listings.tsx
import Link from 'next/link';

const sampleListings = [
  {
    id: '1',
    type: 'property',
    title: '3 BHK Apartment in Bandra',
    subtitle: 'Mumbai, Maharashtra',
    price: '₹45,000/month',
    badge: 'Rent',
    badgeColor: 'bg-blue-100 text-blue-700',
    emoji: '🏢',
    tags: ['3 BHK', '1200 sqft', 'Furnished'],
  },
  {
    id: '2',
    type: 'venue',
    title: 'Royal Garden Banquet Hall',
    subtitle: 'Jaipur, Rajasthan',
    price: '₹1,50,000/event',
    badge: 'Venue',
    badgeColor: 'bg-pink-100 text-pink-700',
    emoji: '💒',
    tags: ['500 guests', 'AC', 'Catering'],
  },
  {
    id: '3',
    type: 'shop',
    title: 'Ethnic Wear Collection',
    subtitle: 'Free delivery above ₹999',
    price: '₹1,299 onwards',
    badge: 'Fashion',
    badgeColor: 'bg-purple-100 text-purple-700',
    emoji: '👗',
    tags: ['Virtual Try-On', 'New Arrivals'],
  },
  {
    id: '4',
    type: 'services',
    title: 'Professional Home Cook',
    subtitle: 'Delhi NCR',
    price: '₹250/hour',
    badge: 'Service',
    badgeColor: 'bg-green-100 text-green-700',
    emoji: '🍳',
    tags: ['Verified', '5★ Rated', 'Background Checked'],
  },
];

export function Listings() {
  return (
    <section className="py-24 bg-gray-50" id="listings">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
          <div>
            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 text-xs font-semibold rounded-full mb-3 uppercase tracking-wide">
              Featured
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Popular Listings
            </h2>
          </div>
          <Link
            href="/dashboard/user"
            className="text-indigo-600 font-semibold text-sm hover:underline whitespace-nowrap"
          >
            View all listings →
          </Link>
        </div>

        {/* Listing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleListings.map((listing) => (
            <Link
              key={listing.id}
              href={`/dashboard/user/${listing.type}/${listing.id}`}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Emoji Placeholder */}
              <div className="h-44 bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center text-6xl">
                {listing.emoji}
              </div>

              <div className="p-4">
                {/* Badge */}
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-2 ${listing.badgeColor}`}
                >
                  {listing.badge}
                </span>

                <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1 group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {listing.title}
                </h3>
                <p className="text-gray-400 text-xs mb-3">{listing.subtitle}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {listing.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-indigo-600 font-bold text-sm">{listing.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}