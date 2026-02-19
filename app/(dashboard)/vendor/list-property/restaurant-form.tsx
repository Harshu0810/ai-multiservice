// app/(dashboard)/vendor/list-property/restaurant-form.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { LocationStep } from '@/components/forms/location-step';
import { PhotosStep } from '@/components/forms/photos-step';
import { DescriptionStep } from '@/components/forms/description-step';
import { VerificationStep } from '@/components/forms/verification-step';

interface RestaurantFormProps {
  onBack: () => void;
}

const STEPS = [
  'Basic Details',
  'Location',
  'Cuisine & Menu',
  'Photos',
  'Description',
  'Verification',
];

const cuisineOptions = [
  { id: 'north_indian', label: '🍛 North Indian' },
  { id: 'south_indian', label: '🥘 South Indian' },
  { id: 'chinese', label: '🥢 Chinese' },
  { id: 'continental', label: '🍝 Continental' },
  { id: 'italian', label: '🍕 Italian' },
  { id: 'mexican', label: '🌮 Mexican' },
  { id: 'mughlai', label: '🍖 Mughlai' },
  { id: 'seafood', label: '🦞 Seafood' },
  { id: 'street_food', label: '🌯 Street Food' },
  { id: 'desserts', label: '🍰 Desserts & Bakery' },
  { id: 'healthy', label: '🥗 Healthy / Salads' },
  { id: 'fast_food', label: '🍔 Fast Food' },
];

const priceRangeOptions = [
  { id: 'budget', label: '💰 Budget (Under ₹200/person)' },
  { id: 'moderate', label: '💰💰 Moderate (₹200–₹500/person)' },
  { id: 'premium', label: '💰💰💰 Premium (₹500–₹1000/person)' },
  { id: 'luxury', label: '💰💰💰💰 Luxury (₹1000+/person)' },
];

interface MenuItem {
  name: string;
  price: number;
  category: string;
}

interface FormData {
  name: string;
  location: string;
  city: string;
  state: string;
  pincode: string;
  cuisine: string[];
  priceRange: string;
  menu: MenuItem[];
  images: string[];
  description: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  idType: string;
  idNumber: string;
  agreeToTerms: boolean;
}

const initialData: FormData = {
  name: '',
  location: '',
  city: '',
  state: '',
  pincode: '',
  cuisine: [],
  priceRange: '',
  menu: [],
  images: [],
  description: '',
  ownerName: '',
  ownerPhone: '',
  ownerEmail: '',
  idType: '',
  idNumber: '',
  agreeToTerms: false,
};

export function RestaurantForm({ onBack }: RestaurantFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initialData);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [newItem, setNewItem] = useState<MenuItem>({ name: '', price: 0, category: '' });

  function updateData(partial: Partial<FormData>) {
    setData((prev) => ({ ...prev, ...partial }));
  }

  function toggleCuisine(id: string) {
    const updated = data.cuisine.includes(id)
      ? data.cuisine.filter((c) => c !== id)
      : [...data.cuisine, id];
    updateData({ cuisine: updated });
  }

  function addMenuItem() {
    if (!newItem.name || newItem.price <= 0) return;
    updateData({ menu: [...data.menu, newItem] });
    setNewItem({ name: '', price: 0, category: '' });
  }

  function removeMenuItem(index: number) {
    updateData({ menu: data.menu.filter((_, i) => i !== index) });
  }

  function canProceed(): boolean {
    switch (step) {
      case 0: return !!data.name;
      case 1: return !!(data.location && data.city && data.state && data.pincode);
      case 2: return data.cuisine.length > 0 && !!data.priceRange;
      case 3: return data.images.length > 0;
      case 4: return data.description.length >= 50;
      case 5: return !!(
        data.ownerName &&
        data.ownerPhone.length === 10 &&
        data.ownerEmail &&
        data.idType &&
        data.idNumber &&
        data.agreeToTerms
      );
      default: return false;
    }
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/kitchens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message ?? 'Failed to submit');
      }
      router.push('/dashboard/vendor/list-success');
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  const isLastStep = step === STEPS.length - 1;
  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={step === 0 ? onBack : () => setStep((s) => s - 1)}
          className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors flex-shrink-0"
        >
          ←
        </button>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Step {step + 1} of {STEPS.length} — {STEPS[step]}
            </p>
            <p className="text-xs text-gray-400">{Math.round(progress)}%</p>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 min-h-[400px]">

        {/* Step 0 — Basic Details */}
        {step === 0 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Name your restaurant / kitchen</h2>
              <p className="text-gray-500 mt-1 text-sm">
                What do your customers call your food business?
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Restaurant / Kitchen name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => updateData({ name: e.target.value })}
                placeholder="e.g. Spice Garden Cloud Kitchen"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Business type</p>
              <div className="flex flex-wrap gap-2">
                {['Cloud Kitchen', 'Restaurant', 'Tiffin Service', 'Bakery', 'Catering'].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 bg-orange-50 text-orange-600 text-xs font-medium rounded-full border border-orange-100"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 1 — Location */}
        {step === 1 && (
          <LocationStep
            data={{
              location: data.location,
              city: data.city,
              state: data.state,
              pincode: data.pincode,
            }}
            onChange={updateData}
          />
        )}

        {/* Step 2 — Cuisine & Menu */}
        {step === 2 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Cuisine & Pricing</h2>
              <p className="text-gray-500 mt-1 text-sm">
                Tell customers what food you serve and your price range.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Cuisines <span className="text-red-500">*</span>
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {cuisineOptions.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggleCuisine(c.id)}
                    className={cn(
                      'py-2.5 px-3 rounded-xl border-2 text-xs font-medium transition-all text-left',
                      data.cuisine.includes(c.id)
                        ? 'border-orange-400 bg-orange-50 text-orange-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    )}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Price range <span className="text-red-500">*</span>
              </p>
              <div className="space-y-2">
                {priceRangeOptions.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => updateData({ priceRange: p.id })}
                    className={cn(
                      'w-full py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all text-left',
                      data.priceRange === p.id
                        ? 'border-orange-400 bg-orange-50 text-orange-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Menu items{' '}
                <span className="text-gray-400 font-normal">(optional)</span>
              </p>
              {data.menu.length > 0 && (
                <div className="space-y-2 mb-3">
                  {data.menu.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between px-4 py-2.5 bg-orange-50 rounded-xl border border-orange-100"
                    >
                      <div>
                        <span className="text-sm font-medium text-gray-800">{item.name}</span>
                        {item.category && (
                          <span className="ml-2 text-xs text-orange-500">{item.category}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-orange-600">₹{item.price}</span>
                        <button
                          onClick={() => removeMenuItem(index)}
                          className="text-red-400 hover:text-red-600 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Item name"
                  className="col-span-1 px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="text"
                  value={newItem.category}
                  onChange={(e) => setNewItem((p) => ({ ...p, category: e.target.value }))}
                  placeholder="Category"
                  className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={newItem.price || ''}
                      onChange={(e) =>
                        setNewItem((p) => ({ ...p, price: parseFloat(e.target.value) || 0 }))
                      }
                      placeholder="Price"
                      className="w-full pl-7 pr-2 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addMenuItem}
                    className="px-3 py-2.5 rounded-xl bg-orange-100 text-orange-700 text-sm font-bold hover:bg-orange-200 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 — Photos */}
        {step === 3 && (
          <PhotosStep
            images={data.images}
            onChange={(images) => updateData({ images })}
          />
        )}

        {/* Step 4 — Description */}
        {step === 4 && (
          <DescriptionStep
            description={data.description}
            onChange={(description) => updateData({ description })}
          />
        )}

        {/* Step 5 — Verification */}
        {step === 5 && (
          <VerificationStep
            data={{
              ownerName: data.ownerName,
              ownerPhone: data.ownerPhone,
              ownerEmail: data.ownerEmail,
              idType: data.idType,
              idNumber: data.idNumber,
              agreeToTerms: data.agreeToTerms,
            }}
            onChange={updateData}
          />
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3">
        {step > 0 && (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:border-gray-300 hover:bg-gray-50 transition-all"
          >
            Back
          </button>
        )}
        <button
          onClick={isLastStep ? handleSubmit : () => setStep((s) => s + 1)}
          disabled={!canProceed() || submitting}
          className={cn(
            'flex-1 py-3 rounded-xl font-bold text-sm transition-all',
            canProceed() && !submitting
              ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-sm'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          )}
        >
          {submitting ? 'Submitting...' : isLastStep ? '🚀 Submit Kitchen' : 'Continue →'}
        </button>
      </div>
    </div>
  );
}