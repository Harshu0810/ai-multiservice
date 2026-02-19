// app/(dashboard)/user/properties/[id]/page.tsx
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma/client';
import { createClient } from '@/lib/supabase/server';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const property = await prisma.property.findUnique({ where: { id: params.id } });
  return { title: property?.title ?? 'Property Details' };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const property = await prisma.property.findUnique({
    where: { id: params.id },
    include: { vendor: { select: { name: true, email: true, phone: true } } },
  });

  if (!property || !property.isApproved) notFound();

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  function formatPrice(price: number) {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)} L`;
    if (price >= 1000) return `₹${(price / 1000).toFixed(0)}K`;
    return `₹${price}`;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Image gallery */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden h-80">
        {property.images.slice(0, 5).map((img, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={img}
            alt={`${property.title} photo ${i + 1}`}
            className={`w-full h-full object-cover ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
          />
        ))}
        {property.images.length === 0 && (
          <div className="col-span-4 row-span-2 bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center">
            <span className="text-7xl">🏢</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left — main info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  property.status === 'rent'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                For {property.status}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600 capitalize">
                {property.type}
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">{property.title}</h1>
            <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
              <span>📍</span>
              {property.location}, {property.city}, {property.state} — {property.pincode}
            </p>
          </div>

          {/* Key stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: '🛏️', label: 'Bedrooms', value: property.bedrooms ?? 'N/A' },
              { icon: '🚿', label: 'Bathrooms', value: property.bathrooms ?? 'N/A' },
              { icon: '📐', label: 'Area', value: property.area ? `${property.area} sq.ft.` : 'N/A' },
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-xl mb-1">{stat.icon}</p>
                <p className="text-sm font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          {property.description && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">About this property</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{property.description}</p>
            </div>
          )}

          {/* Amenities */}
          {property.amenities.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((a) => (
                  <span
                    key={a}
                    className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full capitalize"
                  >
                    {a.replace(/_/g, ' ')}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right — booking card */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm sticky top-24">
            {/* Price */}
            <div className="mb-4">
              <p className="text-3xl font-extrabold text-indigo-600">
                {formatPrice(property.price)}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {property.status === 'rent' ? 'per month' : 'total price'}
              </p>
            </div>

            {/* Contact / Book CTA */}
            {user ? (
              <div className="space-y-3">
                <button className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-colors">
                  📅 Schedule a Visit
                </button>
                <button className="w-full py-3 rounded-xl border-2 border-indigo-200 text-indigo-600 font-bold text-sm hover:bg-indigo-50 transition-colors">
                  💬 Contact Owner
                </button>
              </div>
            ) : (
              
                href="/login"
                className="block w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm text-center transition-colors"
              >
                Sign in to Book
              </a>
            )}

            {/* Vendor info */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                Listed by
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                  {property.vendor.name?.charAt(0).toUpperCase() ?? 'V'}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {property.vendor.name ?? 'Verified Vendor'}
                  </p>
                  {property.vendor.phone && (
                    <p className="text-xs text-gray-400">{property.vendor.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-400">
              <span>✅ Verified</span>
              <span>🔒 Safe</span>
              <span>🏆 Trusted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}