// components/forms/security-step.tsx
'use client';

import { cn } from '@/lib/utils/cn';

interface SecurityStepProps {
  selected: string[];
  onChange: (items: string[]) => void;
}

const securityItems = [
  {
    id: 'cctv_exterior',
    label: 'CCTV — Exterior',
    icon: '📷',
    description: 'Security cameras monitoring the outside of the property',
    warning: false,
  },
  {
    id: 'cctv_interior',
    label: 'CCTV — Interior',
    icon: '🎥',
    description: 'Security cameras inside the property (must be disclosed)',
    warning: true,
  },
  {
    id: 'security_guard',
    label: 'Security Guard',
    icon: '💂',
    description: '24/7 security personnel at entry/exit points',
    warning: false,
  },
  {
    id: 'intercom',
    label: 'Video Intercom',
    icon: '📞',
    description: 'Video intercom system at the main gate',
    warning: false,
  },
  {
    id: 'smart_lock',
    label: 'Smart Lock',
    icon: '🔐',
    description: 'Keypad or app-controlled door locks',
    warning: false,
  },
  {
    id: 'fire_alarm',
    label: 'Fire Alarm',
    icon: '🚨',
    description: 'Smoke detectors and fire alarm system installed',
    warning: false,
  },
  {
    id: 'fire_extinguisher',
    label: 'Fire Extinguisher',
    icon: '🧯',
    description: 'Fire extinguishers available on the premises',
    warning: false,
  },
  {
    id: 'weapon',
    label: 'Weapons on property',
    icon: '🔫',
    description: 'Firearms or other weapons present on the premises',
    warning: true,
  },
];

export function SecurityStep({ selected, onChange }: SecurityStepProps) {
  function toggle(id: string) {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  }

  const warnings = securityItems.filter((i) => i.warning && selected.includes(i.id));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Do you have any security features?</h2>
        <p className="text-gray-500 mt-1 text-sm">
          Let tenants know what security measures are in place. Transparency builds trust.
        </p>
      </div>

      {/* Warning banner */}
      {warnings.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
          <span className="text-xl">⚠️</span>
          <div>
            <p className="text-sm font-semibold text-amber-800">Disclosure required</p>
            <p className="text-xs text-amber-700 mt-0.5">
              You have selected items that must be disclosed to tenants before they book.
              Failing to disclose these may result in listing removal.
            </p>
          </div>
        </div>
      )}

      {/* Items */}
      <div className="space-y-3">
        {securityItems.map((item) => {
          const isSelected = selected.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggle(item.id)}
              className={cn(
                'w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all',
                isSelected
                  ? item.warning
                    ? 'border-amber-400 bg-amber-50'
                    : 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              )}
            >
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1">
                <p
                  className={cn(
                    'font-semibold text-sm',
                    isSelected
                      ? item.warning
                        ? 'text-amber-700'
                        : 'text-indigo-700'
                      : 'text-gray-900'
                  )}
                >
                  {item.label}
                  {item.warning && (
                    <span className="ml-2 text-xs font-normal bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full">
                      Must disclose
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
              </div>
              <div
                className={cn(
                  'w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all',
                  isSelected
                    ? item.warning
                      ? 'border-amber-500 bg-amber-500'
                      : 'border-indigo-500 bg-indigo-500'
                    : 'border-gray-300'
                )}
              >
                {isSelected && (
                  <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* None option */}
      <button
        type="button"
        onClick={() => onChange([])}
        className={cn(
          'w-full py-3 rounded-xl border-2 text-sm font-medium transition-all',
          selected.length === 0
            ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
            : 'border-gray-200 text-gray-500 hover:border-gray-300'
        )}
      >
        None of the above
      </button>
    </div>
  );
}