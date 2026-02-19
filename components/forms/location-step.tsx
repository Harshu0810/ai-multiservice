// components/forms/location-step.tsx
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface LocationStepProps {
  data: {
    location: string;
    city: string;
    state: string;
    pincode: string;
  };
  onChange: (data: Partial<LocationStepProps['data']>) => void;
}

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh',
];

export function LocationStep({ data, onChange }: LocationStepProps) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  function handleBlur(field: string) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function isInvalid(field: keyof typeof data) {
    return touched[field] && !data[field];
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Where is your property located?</h2>
        <p className="text-gray-500 mt-1 text-sm">
          Accurate location helps buyers and renters find your listing easily.
        </p>
      </div>

      {/* Street / Area */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Street address / Area <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={data.location}
          onChange={(e) => onChange({ location: e.target.value })}
          onBlur={() => handleBlur('location')}
          placeholder="e.g. 42, Sunrise Colony, MG Road"
          className={cn(
            'w-full px-4 py-3 rounded-xl border text-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500',
            isInvalid('location') ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
          )}
        />
        {isInvalid('location') && (
          <p className="text-red-500 text-xs mt-1">Address is required</p>
        )}
      </div>

      {/* City & State row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.city}
            onChange={(e) => onChange({ city: e.target.value })}
            onBlur={() => handleBlur('city')}
            placeholder="e.g. Jaipur"
            className={cn(
              'w-full px-4 py-3 rounded-xl border text-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500',
              isInvalid('city') ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
            )}
          />
          {isInvalid('city') && (
            <p className="text-red-500 text-xs mt-1">City is required</p>
          )}
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            State <span className="text-red-500">*</span>
          </label>
          <select
            value={data.state}
            onChange={(e) => onChange({ state: e.target.value })}
            onBlur={() => handleBlur('state')}
            className={cn(
              'w-full px-4 py-3 rounded-xl border text-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white',
              isInvalid('state') ? 'border-red-400 bg-red-50' : 'border-gray-200'
            )}
          >
            <option value="">Select state</option>
            {indianStates.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {isInvalid('state') && (
            <p className="text-red-500 text-xs mt-1">State is required</p>
          )}
        </div>
      </div>

      {/* Pincode */}
      <div className="max-w-xs">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Pincode <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={data.pincode}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '').slice(0, 6);
            onChange({ pincode: val });
          }}
          onBlur={() => handleBlur('pincode')}
          placeholder="e.g. 302001"
          maxLength={6}
          className={cn(
            'w-full px-4 py-3 rounded-xl border text-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500',
            isInvalid('pincode') ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
          )}
        />
        {isInvalid('pincode') && (
          <p className="text-red-500 text-xs mt-1">Pincode is required</p>
        )}
      </div>

      {/* Map placeholder */}
      <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50 h-48 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <p className="text-3xl mb-2">🗺️</p>
          <p className="text-sm">Map preview will appear here</p>
          <p className="text-xs mt-1">Powered by Google Maps (configure API key in .env)</p>
        </div>
      </div>
    </div>
  );
}