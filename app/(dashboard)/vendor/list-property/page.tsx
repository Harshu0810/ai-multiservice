// app/(dashboard)/vendor/list-property/page.tsx
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { FlatForm } from './flat-form';
import { MarriageGardenForm } from './marriage-garden-form';
import { RestaurantForm } from './restaurant-form';

type ListingType = 'flat' | 'garden' | 'restaurant';

const listingTypes: { id: ListingType; label: string; icon: string; description: string }[] = [
  {
    id: 'flat',
    label: 'Property',
    icon: '🏠',
    description: 'Flat, house, villa, commercial space, PG, or plot',
  },
  {
    id: 'garden',
    label: 'Marriage Garden',
    icon: '💒',
    description: 'Banquet hall, marriage garden, or event venue',
  },
  {
    id: 'restaurant',
    label: 'Restaurant / Kitchen',
    icon: '🍽️',
    description: 'Restaurant, cloud kitchen, or food service',
  },
];

export default function ListPropertyPage() {
  const [selected, setSelected] = useState<ListingType | null>(null);

  if (selected === 'flat') return <FlatForm onBack={() => setSelected(null)} />;
  if (selected === 'garden') return <MarriageGardenForm onBack={() => setSelected(null)} />;
  if (selected === 'restaurant') return <RestaurantForm onBack={() => setSelected(null)} />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Create a new listing</h1>
        <p className="text-gray-500 text-sm mt-1">
          Choose the type of listing you want to create.
        </p>
      </div>

      {/* Type selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {listingTypes.map((type) => (
          <button
            key={type.id}
            type="button"
            onClick={() => setSelected(type.id)}
            className={cn(
              'group flex flex-col items-start gap-4 p-6 rounded-2xl border-2 text-left transition-all hover:border-indigo-400 hover:shadow-lg hover:-translate-y-1',
              'border-gray-200 bg-white'
            )}
          >
            <span className="text-4xl">{type.icon}</span>
            <div>
              <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-indigo-600 transition-colors">
                {type.label}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{type.description}</p>
            </div>
            <span className="text-sm font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform inline-block">
              Get started →
            </span>
          </button>
        ))}
      </div>

      {/* Info banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex gap-4">
        <span className="text-2xl">ℹ️</span>
        <div>
          <p className="text-sm font-semibold text-blue-800 mb-1">
            Listings are reviewed within 24 hours
          </p>
          <p className="text-sm text-blue-600">
            Our admin team verifies every listing to ensure quality and trust. You will receive
            an email notification once your listing is approved and goes live.
          </p>
        </div>
      </div>
    </div>
  );
}