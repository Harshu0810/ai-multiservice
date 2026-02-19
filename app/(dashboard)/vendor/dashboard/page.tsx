// app/(dashboard)/vendor/dashboard/page.tsx
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma/client';
import { FlatCard } from '@/components/cards/FlatCard';
import { MarriageGardenCard } from '@/components/cards/MarriageGardenCard';
import Link from 'next/link';

export const metadata = { title: 'My Listings' };

export default async function VendorDashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Fetch vendor's properties and venues
  const [properties, venues] = await Promise.all([
    prisma.property.findMany({
      where: { vendorId: user.id },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.venue.findMany({
      where: { vendorId: user.id },
      orderBy: { createdAt: 'desc' },
      include: { packages: true },
    }),
  ]);

  const totalListings = properties.length + venues.length;
  const approvedProperties = properties.filter((p) => p.isApproved).length;
  const pendingProperties = properties.filter((p) => !p.isApproved).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">My Listings</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your properties and venues
          </p>
        </div>
        <Link
          href="/dashboard/vendor/list-property"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-colors shadow-sm"
        >
          <span>➕</span> Add New Listing
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Listings', value: totalListings, icon: '🏠', color: 'bg-indigo-50 text-indigo-600' },
          { label: 'Approved', value: approvedProperties, icon: '✅', color: 'bg-green-50 text-green-600' },
          { label: 'Pending Review', value: pendingProperties, icon: '⏳', color: 'bg-amber-50 text-amber-600' },
          { label: 'Venues', value: venues.length, icon: '💒', color: 'bg-pink-50 text-pink-600' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-extrabold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {totalListings === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
          <p className="text-5xl mb-4">🏡</p>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No listings yet</h3>
          <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
            Start by listing your first property or venue to reach thousands of potential buyers and tenants.
          </p>
          <Link
            href="/dashboard/vendor/list-property"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-colors"
          >
            <span>➕</span> Create your first listing
          </Link>
        </div>
      )}

      {/* Properties */}
      {properties.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>🏠</span> Properties ({properties.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <FlatCard
                key={property.id}
                id={property.id}
                title={property.title}
                location={property.location}
                city={property.city}
                price={property.price}
                status={property.status as 'rent' | 'sale'}
                bedrooms={property.bedrooms ?? 0}
                bathrooms={property.bathrooms ?? 0}
                area={property.area ?? undefined}
                images={property.images}
                amenities={property.amenities}
                isApproved={property.isApproved}
                isActive={property.isActive}
                href={`/dashboard/user/properties/${property.id}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* Venues */}
      {venues.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>💒</span> Venues ({venues.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {venues.map((venue) => (
              <MarriageGardenCard
                key={venue.id}
                id={venue.id}
                name={venue.name}
                location={venue.location}
                price={venue.price}
                capacity={venue.capacity}
                images={venue.images}
                amenities={venue.amenities}
                foodTypes={venue.foodTypes}
                decorationTypes={venue.decorationTypes}
                packages={venue.packages.map((p) => ({
                  name: p.name,
                  price: p.price,
                }))}
                href={`/dashboard/user/venues/${venue.id}`}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}