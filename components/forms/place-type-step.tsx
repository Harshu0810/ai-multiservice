// components/forms/place-type-step.tsx
'use client';

import { cn } from '@/lib/utils/cn';

interface PlaceTypeStepProps {
  selected: string;
  onChange: (type: string) => void;
}

const placeTypes = [
  {
    id: 'entire_place',
    label: 'Entire place',
    icon: '🏠',
    description:
      'Guests have the whole place to themselves — includes bedroom, bathroom, and kitchen.',
  },
  {
    id: 'private_room',
    label: 'Private room',
    icon: '🚪',
    description:
      'Guests have a private room but may share some common areas like kitchen or living room.',
  },
  {
    id: 'shared_room',
    label: 'Shared room',
    icon: '🛏️',
    description:
      'Guests sleep in a room or common area that may be shared with others.',
  },
];

export function PlaceTypeStep({ selected, onChange }: PlaceTypeStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">What type of place will guests have?</h2>
        <p className="text-gray-500 mt-1 text-sm">
          This helps tenants understand what they&apos;re getting.
        </p>
      </div>

      <div className="space-y-4">
        {placeTypes.map((type) => (
          <button
            key={type.id}
            type="button"
            onClick={() => onChange(type.id)}
            className={cn(
              'w-full flex items-center gap-5 p-5 rounded-2xl border-2 text-left transition-all',
              selected === type.id
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            )}
          >
            <span className="text-4xl">{type.icon}</span>
            <div className="flex-1">
              <p
                className={cn(
                  'font-bold text-base mb-1',
                  selected === type.id ? 'text-indigo-700' : 'text-gray-900'
                )}
              >
                {type.label}
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">{type.description}</p>
            </div>
            <div
              className={cn(
                'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all',
                selected === type.id
                  ? 'border-indigo-500 bg-indigo-500'
                  : 'border-gray-300'
              )}
            >
              {selected === type.id && (
                <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M10 3L5 8.5 2 5.5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}