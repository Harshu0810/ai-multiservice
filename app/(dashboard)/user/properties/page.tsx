// app/(dashboard)/user/properties/page.tsx
import { prisma } from '@/lib/prisma/client';
import { FlatCard } from '@/components/cards/FlatCard';

export const metadata = { title: 'Browse Properties' };

interface SearchParams {
  type?: string;
  status?: string;
  city?: string;
  minPrice?: string;
  maxPrice?: string;
  bedrooms?: string;
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const where: any = { isApproved: true, isActive: true };

  if (searchParams.type) where.type = searchParams.type;
  if (searchParams.status) where.status = searchParams.status;
  if (searchParams.city) where.city = { contains: searchParams.city, mode: 'insensitive' };
  if (searchParams.bedrooms) where.bedrooms = parseInt(searchParams.bedrooms);
  if (searchParams.minPrice || searchParams.maxPrice) {
    where.price = {};
    if (searchParams.minPrice) where.price.gte = parseFloat(searchParams.minPrice);
    if (searchParams.maxPrice) where.price.lte = parseFloat(searchParams.maxPrice);
  }

  const properties = await prisma.property.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  const propertyTypes = ['flat', 'house', 'villa', 'commercial', 'plot', 'pg'];
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Jaipur', 'Kolkata'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Browse Properties</h1>
        <p className="text-gray-500 text-sm mt-1">
          {properties.length} verified properties available
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <form className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Status */}
          <select
            name="status"
            defaultValue={searchParams.status ?? ''}
            className="px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="">All Types</option>
            <option value="rent">For Rent</option>
            <option value="sale">For Sale</option>
          </select>

          {/* Property type */}
          <select
            name="type"
            defaultValue={searchParams.type ?? ''}
            className="px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="">All Properties</option>
            {propertyTypes.map((t) => (
              <option key={t} value={t} className="capitalize">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>

          {/* City */}
          <select
            name="city"
            defaultValue={searchParams.city ?? ''}
            className="px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="">All Cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Bedrooms */}
          <select
            name="bedrooms"
            defaultValue={searchParams.bedrooms ?? ''}
            className="px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="">Any Beds</option>
            {[1, 2, 3, 4, 5].map((b) => (
              <option key={b} value={b}>{b} BHK</option>
            ))}
          </select>

          {/* Min price */}
          <input
            type="number"
            name="minPrice"
            defaultValue={searchParams.minPrice ?? ''}
            placeholder="Min ₹"
            className="px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Search button */}
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Results */}
      {properties.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
          <p className="text-5xl mb-4">🏠</p>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-500 text-sm">Try adjusting your filters to see more results.</p>
        </div>
      ) : (
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
            />
          ))}
        </div>
      )}
    </div>
  );
}