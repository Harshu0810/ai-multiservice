// components/forms/description-step.tsx
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface DescriptionStepProps {
  description: string;
  onChange: (description: string) => void;
}

const MIN_CHARS = 50;
const MAX_CHARS = 1000;

const suggestions = [
  'Spacious and well-ventilated rooms',
  'Recently renovated',
  'Close to schools and hospitals',
  'Gated community with 24/7 security',
  'Great connectivity to metro/bus',
  'Prime location in city center',
  'Quiet and peaceful neighbourhood',
  'Walking distance to market',
];

export function DescriptionStep({ description, onChange }: DescriptionStepProps) {
  const [touched, setTouched] = useState(false);

  const charCount = description.length;
  const isUnderMin = charCount < MIN_CHARS;
  const isOverMax = charCount > MAX_CHARS;
  const showError = touched && isUnderMin;

  function appendSuggestion(text: string) {
    const separator = description.trim() ? '. ' : '';
    const updated = (description.trim() + separator + text).slice(0, MAX_CHARS);
    onChange(updated);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Describe your property</h2>
        <p className="text-gray-500 mt-1 text-sm">
          A great description helps your listing stand out. Highlight what makes it special.
        </p>
      </div>

      {/* Textarea */}
      <div>
        <textarea
          value={description}
          onChange={(e) => onChange(e.target.value.slice(0, MAX_CHARS))}
          onBlur={() => setTouched(true)}
          rows={7}
          placeholder="Describe your property — location highlights, nearby amenities, special features, who it's ideal for..."
          className={cn(
            'w-full px-4 py-3 rounded-xl border text-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none leading-relaxed',
            showError ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
          )}
        />

        {/* Character count */}
        <div className="flex items-center justify-between mt-1.5">
          {showError ? (
            <p className="text-red-500 text-xs">
              Please write at least {MIN_CHARS} characters ({MIN_CHARS - charCount} more needed)
            </p>
          ) : (
            <p className="text-xs text-gray-400">
              {charCount < MIN_CHARS
                ? `${MIN_CHARS - charCount} more characters needed`
                : '✓ Looks good!'}
            </p>
          )}
          <p
            className={cn(
              'text-xs',
              isOverMax ? 'text-red-500 font-semibold' : 'text-gray-400'
            )}
          >
            {charCount} / {MAX_CHARS}
          </p>
        </div>
      </div>

      {/* Quick suggestions */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Quick add highlights
        </p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => appendSuggestion(s)}
              className="px-3 py-1.5 bg-gray-100 hover:bg-indigo-50 hover:text-indigo-600 text-gray-600 rounded-full text-xs font-medium transition-colors border border-transparent hover:border-indigo-200"
            >
              + {s}
            </button>
          ))}
        </div>
      </div>

      {/* Writing tips */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
        <p className="text-xs font-semibold text-blue-700 mb-2">✍️ Writing tips</p>
        <ul className="text-xs text-blue-600 space-y-1 list-disc list-inside">
          <li>Mention nearby landmarks, metro stations, or schools</li>
          <li>Describe the type of tenant or family it suits best</li>
          <li>Include any recent renovations or upgrades</li>
          <li>Avoid pricing details — use the pricing step for that</li>
        </ul>
      </div>
    </div>
  );
}