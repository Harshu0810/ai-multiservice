// components/forms/pricing-step.tsx
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface PricingStepProps {
  data: {
    price: number;
    status: 'rent' | 'sale';
  };
  onChange: (data: Partial<PricingStepProps['data']>) => void;
}

const rentSuggestions = [5000, 8000, 10000, 15000, 20000, 25000, 30000, 50000];
const saleSuggestions = [1500000, 2500000, 3500000, 5000000, 7500000, 10000000];

function formatINR(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)} L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
  return `₹${value}`;
}

export function PricingStep({ data, onChange }: PricingStepProps) {
  const [touched, setTouched] = useState(false);
  const isRent = data.status === 'rent';
  const suggestions = isRent ? rentSuggestions : saleSuggestions;
  const showError = touched && (!data.price || data.price <= 0);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          {isRent ? 'Set your monthly rent' : 'Set your sale price'}
        </h2>
        <p className="text-gray-500 mt-1 text-sm">
          {isRent
            ? 'Enter the monthly rental amount in Indian Rupees.'
            : 'Enter the total sale price in Indian Rupees.'}
        </p>
      </div>

      {/* Price input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {isRent ? 'Monthly Rent' : 'Sale Price'}{' '}
          <span className="text-red-500">*</span>
        </label>
        <div className="relative max-w-sm">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-lg">
            ₹
          </span>
          <input
            type="number"
            value={data.price || ''}
            onChange={(e) => onChange({ price: parseFloat(e.target.value) || 0 })}
            onBlur={() => setTouched(true)}
            placeholder="0"
            min={0}
            className={cn(
              'w-full pl-9 pr-4 py-4 rounded-xl border text-xl font-bold transition focus:outline-none focus:ring-2 focus:ring-indigo-500',
              showError ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
            )}
          />
        </div>

        {/* Formatted display */}
        {data.price > 0 && (
          <p className="mt-2 text-indigo-600 font-semibold text-sm">
            {formatINR(data.price)}
            {isRent ? ' / month' : ' total'}
          </p>
        )}

        {showError && (
          <p className="text-red-500 text-xs mt-1">Please enter a valid price</p>
        )}
      </div>

      {/* Quick suggestions */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Common prices in your area
        </p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onChange({ price: s })}
              className={cn(
                'px-4 py-2 rounded-xl border text-sm font-medium transition-all',
                data.price === s
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 text-gray-600 hover:border-indigo-300 hover:bg-gray-50'
              )}
            >
              {formatINR(s)}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing tips */}
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
        <p className="text-xs font-semibold text-amber-700 mb-2">💡 Pricing tips</p>
        <ul className="text-xs text-amber-700 space-y-1 list-disc list-inside opacity-90">
          {isRent ? (
            <>
              <li>Research similar listings in your area before setting the price</li>
              <li>Consider including maintenance charges separately</li>
              <li>Competitive pricing leads to faster bookings</li>
            </>
          ) : (
            <>
              <li>Factor in registration and stamp duty costs for buyers</li>
              <li>Slightly negotiable prices attract more serious buyers</li>
              <li>Get a professional valuation for best results</li>
            </>
          )}
        </ul>
      </div>

      {/* Deposit field (rent only) */}
      {isRent && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Security deposit{' '}
            <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <div className="relative max-w-sm">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
              ₹
            </span>
            <input
              type="number"
              placeholder="e.g. 100000"
              min={0}
              className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Typically 2–3 months of rent. Not included in the listing price.
          </p>
        </div>
      )}
    </div>
  );
}