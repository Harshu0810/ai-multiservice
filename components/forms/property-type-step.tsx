// components/forms/property-type-step.tsx
'use client';

import { cn } from '@/lib/utils/cn';

interface PropertyTypeStepProps {
  selected: string;
  onChange: (type: string) => void;
}

const propertyTypes = [
  {
    id: 'flat',
    label: 'Flat / Apartment',
    icon: '🏢',
    description: 'A unit in a multi-storey residential building',
  },
  {
    id: 'house',
    label: 'Independent House',
    icon: '🏠',
    description: 'A standalone house with or without a compound',
  },
  {
    id: 'villa',
    label: 'Villa',
    icon: '🏡',
    description: 'A luxurious standalone property, often gated',
  },
  {
    id: 'commercial',
    label: 'Commercial Space',
    icon: '🏬',
    description: 'Office, shop, or warehouse space',
  },
  {
    id: 'plot',
    label: 'Plot / Land',
    icon: '🌍',
    description: 'A vacant plot or land for construction',
  },
  {
    id: 'pg',
    label: 'PG / Hostel',
    icon: '🛏️',
    description: 'Paying guest accommodation or hostel rooms',
  },
];

export function PropertyTypeStep({ selected, onChange }: PropertyTypeStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">What type of property is this?</h2>
        <p className="text-gray-500 mt-1 text-sm">
          Choose the category that best describes your property.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {propertyTypes.map((type) => (
          <button
            key={type.id}
            type="button"
            onClick={() => onChange(type.id)}
            className={cn(
              'flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all',
              selected === type.id
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            )}
          >
            <span className="text-3xl mt-0.5">{type.icon}</span>
            <div>
              <p
                className={cn(
                  'font-semibold text-sm mb-0.5',
                  selected === type.id ? 'text-indigo-700' : 'text-gray-900'
                )}
              >
                {type.label}
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">{type.description}</p>
            </div>
            {selected === type.id && (
              <span className="ml-auto text-indigo-500 text-lg flex-shrink-0">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}