// components/forms/basics-step.tsx
'use client';

import { cn } from '@/lib/utils/cn';

interface BasicsStepProps {
  data: {
    bedrooms: number;
    bathrooms: number;
    area: number;
    status: 'rent' | 'sale';
  };
  onChange: (data: Partial<BasicsStepProps['data']>) => void;
}

function Counter({
  label,
  sublabel,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  sublabel?: string;
  value: number;
  min: number;
  max: number;
  onChange: (val: number) => void;
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
      <div>
        <p className="font-medium text-gray-900 text-sm">{label}</p>
        {sublabel && <p className="text-xs text-gray-400 mt-0.5">{sublabel}</p>}
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className={cn(
            'w-9 h-9 rounded-full border-2 flex items-center justify-center font-bold text-lg transition-all',
            value <= min
              ? 'border-gray-200 text-gray-300 cursor-not-allowed'
              : 'border-gray-400 text-gray-700 hover:border-indigo-500 hover:text-indigo-600'
          )}
        >
          −
        </button>
        <span className="text-gray-900 font-semibold text-lg w-6 text-center">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className={cn(
            'w-9 h-9 rounded-full border-2 flex items-center justify-center font-bold text-lg transition-all',
            value >= max
              ? 'border-gray-200 text-gray-300 cursor-not-allowed'
              : 'border-gray-400 text-gray-700 hover:border-indigo-500 hover:text-indigo-600'
          )}
        >
          +
        </button>
      </div>
    </div>
  );
}

export function BasicsStep({ data, onChange }: BasicsStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Share some basics about your place</h2>
        <p className="text-gray-500 mt-1 text-sm">
          You can always change these details later.
        </p>
      </div>

      {/* Listing type */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">Listing purpose</p>
        <div className="grid grid-cols-2 gap-3">
          {(['rent', 'sale'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onChange({ status: type })}
              className={cn(
                'py-4 rounded-xl border-2 font-semibold text-sm capitalize transition-all',
                data.status === type
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'
              )}
            >
              {type === 'rent' ? '🔑 For Rent' : '🏷️ For Sale'}
            </button>
          ))}
        </div>
      </div>

      {/* Counters */}
      <div className="bg-gray-50 rounded-2xl px-6 py-2">
        <Counter
          label="Bedrooms"
          sublabel="How many bedrooms?"
          value={data.bedrooms}
          min={0}
          max={20}
          onChange={(val) => onChange({ bedrooms: val })}
        />
        <Counter
          label="Bathrooms"
          sublabel="How many bathrooms?"
          value={data.bathrooms}
          min={0}
          max={20}
          onChange={(val) => onChange({ bathrooms: val })}
        />
      </div>

      {/* Area */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Total area (sq. ft.)
        </label>
        <div className="relative max-w-xs">
          <input
            type="number"
            value={data.area || ''}
            onChange={(e) => onChange({ area: parseFloat(e.target.value) || 0 })}
            placeholder="e.g. 1200"
            min={0}
            className="w-full px-4 py-3 pr-16 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium">
            sq. ft.
          </span>
        </div>
      </div>
    </div>
  );
}