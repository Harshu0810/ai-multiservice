// components/forms/title-step.tsx
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface TitleStepProps {
  title: string;
  onChange: (title: string) => void;
}

const MAX_CHARS = 80;

const suggestions = [
  'Spacious 2 BHK in prime location',
  'Modern flat with parking & amenities',
  'Fully furnished studio near metro',
  'Family home with garden & terrace',
  'Luxury apartment with city view',
  'Affordable 1 BHK near IT hub',
  'Independent house with 24/7 security',
  'Well-ventilated flat in gated society',
];

export function TitleStep({ title, onChange }: TitleStepProps) {
  const [touched, setTouched] = useState(false);
  const charCount = title.length;
  const isUnderMin = charCount < 10;
  const showError = touched && isUnderMin;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Give your listing a great title</h2>
        <p className="text-gray-500 mt-1 text-sm">
          A catchy title helps buyers notice your property. Keep it short and descriptive.
        </p>
      </div>

      {/* Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Listing title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => onChange(e.target.value.slice(0, MAX_CHARS))}
          onBlur={() => setTouched(true)}
          placeholder="e.g. Spacious 3 BHK flat with parking in Bandra"
          className={cn(
            'w-full px-4 py-3 rounded-xl border text-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500',
            showError ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
          )}
        />
        <div className="flex justify-between mt-1.5">
          {showError ? (
            <p className="text-red-500 text-xs">Title must be at least 10 characters</p>
          ) : (
            <p className="text-xs text-gray-400">
              {charCount >= 10 ? '✓ Looks good!' : `${10 - charCount} more characters needed`}
            </p>
          )}
          <p className={cn('text-xs', charCount >= MAX_CHARS ? 'text-red-500' : 'text-gray-400')}>
            {charCount} / {MAX_CHARS}
          </p>
        </div>
      </div>

      {/* Preview */}
      {title.length >= 10 && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
          <p className="text-xs font-semibold text-indigo-500 mb-1">Preview</p>
          <p className="text-base font-bold text-gray-900">{title}</p>
        </div>
      )}

      {/* Suggestions */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Need inspiration?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onChange(s)}
              className="text-left px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 transition-all"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
        <p className="text-xs font-semibold text-blue-700 mb-2">💡 Title tips</p>
        <ul className="text-xs text-blue-600 space-y-1 list-disc list-inside">
          <li>Include bedroom count, city/area, and a key feature</li>
          <li>Avoid ALL CAPS or excessive punctuation</li>
          <li>Don't include the price — it has its own field</li>
          <li>Be specific: "near Hinjewadi IT Park" beats just "Pune"</li>
        </ul>
      </div>
    </div>
  );
}