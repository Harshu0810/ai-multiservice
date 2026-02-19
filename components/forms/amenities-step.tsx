// components/forms/amenities-step.tsx
'use client';

import { cn } from '@/lib/utils/cn';

interface AmenitiesStepProps {
  selected: string[];
  onChange: (amenities: string[]) => void;
}

const amenityGroups = [
  {
    group: 'Essentials',
    items: [
      { id: 'wifi', label: 'Wi-Fi', icon: '📶' },
      { id: 'ac', label: 'Air Conditioning', icon: '❄️' },
      { id: 'heating', label: 'Heating', icon: '🔥' },
      { id: 'kitchen', label: 'Kitchen', icon: '🍳' },
      { id: 'washer', label: 'Washing Machine', icon: '🫧' },
      { id: 'parking', label: 'Parking', icon: '🚗' },
    ],
  },
  {
    group: 'Safety',
    items: [
      { id: 'cctv', label: 'CCTV', icon: '📷' },
      { id: 'security', label: 'Security Guard', icon: '💂' },
      { id: 'fire_extinguisher', label: 'Fire Extinguisher', icon: '🧯' },
      { id: 'first_aid', label: 'First Aid Kit', icon: '🩺' },
    ],
  },
  {
    group: 'Features',
    items: [
      { id: 'gym', label: 'Gym', icon: '🏋️' },
      { id: 'pool', label: 'Swimming Pool', icon: '🏊' },
      { id: 'lift', label: 'Lift / Elevator', icon: '🛗' },
      { id: 'garden', label: 'Garden', icon: '🌿' },
      { id: 'terrace', label: 'Terrace', icon: '🏙️' },
      { id: 'clubhouse', label: 'Clubhouse', icon: '🏛️' },
    ],
  },
  {
    group: 'Furnishing',
    items: [
      { id: 'furnished', label: 'Fully Furnished', icon: '🛋️' },
      { id: 'semi_furnished', label: 'Semi-Furnished', icon: '🪑' },
      { id: 'modular_kitchen', label: 'Modular Kitchen', icon: '🚿' },
      { id: 'wardrobes', label: 'Wardrobes', icon: '🚪' },
    ],
  },
];

export function AmenitiesStep({ selected, onChange }: AmenitiesStepProps) {
  function toggle(id: string) {
    if (selected.includes(id)) {
      onChange(selected.filter((a) => a !== id));
    } else {
      onChange([...selected, id]);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">What amenities do you offer?</h2>
        <p className="text-gray-500 mt-1 text-sm">
          Select all that apply. You can always update this later.
        </p>
      </div>

      {/* Selected count */}
      {selected.length > 0 && (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 rounded-full">
          <span className="w-5 h-5 bg-indigo-600 text-white rounded-full text-xs flex items-center justify-center font-bold">
            {selected.length}
          </span>
          <span className="text-indigo-700 text-sm font-medium">amenities selected</span>
        </div>
      )}

      {/* Groups */}
      <div className="space-y-8">
        {amenityGroups.map((group) => (
          <div key={group.group}>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              {group.group}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {group.items.map((item) => {
                const isSelected = selected.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggle(item.id)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all text-left',
                      isSelected
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    )}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="leading-tight">{item.label}</span>
                    {isSelected && (
                      <span className="ml-auto text-indigo-500 text-base">✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}