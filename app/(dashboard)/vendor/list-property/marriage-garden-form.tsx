// app/(dashboard)/vendor/list-property/marriage-garden-form.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { LocationStep } from '@/components/forms/location-step';
import { PhotosStep } from '@/components/forms/photos-step';
import { AmenitiesStep } from '@/components/forms/amenities-step';
import { DescriptionStep } from '@/components/forms/description-step';
import { VerificationStep } from '@/components/forms/verification-step';

interface MarriageGardenFormProps {
  onBack: () => void;
}

const STEPS = [
  'Basic Details',
  'Location',
  'Capacity & Pricing',
  'Amenities',
  'Food & Decor',
  'Photos',
  'Description',
  'Packages',
  'Verification',
];

const foodTypeOptions = [
  { id: 'veg', label: '🌿 Vegetarian' },
  { id: 'non_veg', label: '🍗 Non-Vegetarian' },
  { id: 'jain', label: '🌱 Jain' },
  { id: 'chinese', label: '🥢 Chinese' },
  { id: 'continental', label: '🍝 Continental' },
  { id: 'indian', label: '🍛 Indian' },
];

const decorationOptions = [
  { id: 'floral', label: '🌸 Floral' },
  { id: 'theme', label: '🎨 Themed' },
  { id: 'royal', label: '👑 Royal' },
  { id: 'minimal', label: '🤍 Minimal' },
  { id: 'traditional', label: '🏮 Traditional' },
  { id: 'modern', label: '✨ Modern' },
];

interface PackageItem {
  name: string;
  description: string;
  price: number;
  items: string[];
}

interface FormData {
  name: string;
  location: string;
  city: string;
  state: string;
  pincode: string;
  capacity: number;
  price: number;
  amenities: string[];
  foodTypes: string[];
  decorationTypes: string[];
  images: string[];
  videos: string[];
  description: string;
  packages: PackageItem[];
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
  capacity: 100,
  price: 0,
  amenities: [],
  foodTypes: [],
  decorationTypes: [],
  images: [],
  videos: [],
  description: '',
  packages: [],
  ownerName: '',
  ownerPhone: '',
  ownerEmail: '',
  idType: '',
  idNumber: '',
  agreeToTerms: false,
};

export function MarriageGardenForm({ onBack }: MarriageGardenFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initialData);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [newPackage, setNewPackage] = useState<PackageItem>({
    name: '',
    description: '',
    price: 0,
    items: [],
  });
  const [packageItem, setPackageItem] = useState('');

  function updateData(partial: Partial<FormData>) {
    setData((prev) => ({ ...prev, ...partial }));
  }

  function toggleFoodType(id: string) {
    const updated = data.foodTypes.includes(id)
      ? data.foodTypes.filter((f) => f !== id)
      : [...data.foodTypes, id];
    updateData({ foodTypes: updated });
  }

  function toggleDecoration(id: string) {
    const updated = data.decorationTypes.includes(id)
      ? data.decorationTypes.filter((d) => d !== id)
      : [...data.decorationTypes, id];
    updateData({ decorationTypes: updated });
  }

  function addPackageItem() {
    if (!packageItem.trim()) return;
    setNewPackage((prev) => ({ ...prev, items: [...prev.items, packageItem.trim()] }));
    setPackageItem('');
  }

  function addPackage() {
    if (!newPackage.name || newPackage.price <= 0) return;
    updateData({ packages: [...data.packages, newPackage] });
    setNewPackage({ name: '', description: '', price: 0, items: [] });
  }

  function removePackage(index: number) {
    updateData({ packages: data.packages.filter((_, i) => i !== index) });
  }

  function canProceed(): boolean {
    switch (step) {
      case 0: return !!data.name;
      case 1: return !!(data.location && data.city && data.state && data.pincode);
      case 2: return data.capacity > 0 && data.price > 0;
      case 3: return true;
      case 4: return true;
      case 5: return data.images.length > 0;
      case 6: return data.description.length >= 50;
      case 7: return true;
      case 8: return !!(
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
      const res = await fetch('/api/properties/garden', {
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
              className="h-full bg-pink-500 rounded-full transition-all duration-500"
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
              <h2 className="text-2xl font-bold text-gray-900">Name your venue</h2>
              <p className="text-gray-500 mt-1 text-sm">
                Give your marriage garden or banquet hall a memorable name.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Venue name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => updateData({ name: e.target.value })}
                placeholder="e.g. Royal Garden Banquet Hall"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
              />
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

        {/* Step 2 — Capacity & Pricing */}
        {step === 2 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Capacity & Pricing</h2>
              <p className="text-gray-500 mt-1 text-sm">
                Set your venue capacity and starting price per event.
              </p>
            </div>

            {/* Capacity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Guest capacity <span className="text-red-500">*</span>
              </label>
              <div className="relative max-w-xs">
                <input
                  type="number"
                  value={data.capacity}
                  onChange={(e) => updateData({ capacity: parseInt(e.target.value) || 0 })}
                  placeholder="e.g. 500"
                  min={1}
                  className="w-full px-4 py-3 pr-16 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium">
                  guests
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {[100, 200, 300, 500, 750, 1000, 1500].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => updateData({ capacity: c })}
                    className={cn(
                      'px-3 py-1.5 rounded-xl border text-xs font-medium transition-all',
                      data.capacity === c
                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    )}
                  >
                    {c.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Starting price per event <span className="text-red-500">*</span>
              </label>
              <div className="relative max-w-xs">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                  ₹
                </span>
                <input
                  type="number"
                  value={data.price || ''}
                  onChange={(e) => updateData({ price: parseFloat(e.target.value) || 0 })}
                  placeholder="e.g. 150000"
                  min={0}
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {[50000, 100000, 150000, 250000, 500000].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => updateData({ price: p })}
                    className={cn(
                      'px-3 py-1.5 rounded-xl border text-xs font-medium transition-all',
                      data.price === p
                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    )}
                  >
                    ₹{(p / 1000).toFixed(0)}K
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3 — Amenities */}
        {step === 3 && (
          <AmenitiesStep
            selected={data.amenities}
            onChange={(amenities) => updateData({ amenities })}
          />
        )}

        {/* Step 4 — Food & Decor */}
        {step === 4 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Food & Decoration options</h2>
              <p className="text-gray-500 mt-1 text-sm">
                Let guests know what culinary and decoration styles you offer.
              </p>
            </div>

            {/* Food types */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">Food types available</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {foodTypeOptions.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => toggleFoodType(f.id)}
                    className={cn(
                      'py-2.5 px-3 rounded-xl border-2 text-xs font-medium transition-all text-left',
                      data.foodTypes.includes(f.id)
                        ? 'border-orange-400 bg-orange-50 text-orange-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    )}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Decoration types */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">Decoration styles</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {decorationOptions.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => toggleDecoration(d.id)}
                    className={cn(
                      'py-2.5 px-3 rounded-xl border-2 text-xs font-medium transition-all text-left',
                      data.decorationTypes.includes(d.id)
                        ? 'border-pink-400 bg-pink-50 text-pink-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    )}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 5 — Photos */}
        {step === 5 && (
          <PhotosStep
            images={data.images}
            onChange={(images) => updateData({ images })}
          />
        )}

        {/* Step 6 — Description */}
        {step === 6 && (
          <DescriptionStep
            description={data.description}
            onChange={(description) => updateData({ description })}
          />
        )}

        {/* Step 7 — Packages */}
        {step === 7 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Create event packages</h2>
              <p className="text-gray-500 mt-1 text-sm">
                Offer bundled packages to attract more bookings. This step is optional.
              </p>
            </div>

            {/* Existing packages */}
            {data.packages.length > 0 && (
              <div className="space-y-3">
                {data.packages.map((pkg, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between p-4 bg-purple-50 rounded-xl border border-purple-100"
                  >
                    <div>
                      <p className="font-semibold text-purple-800 text-sm">{pkg.name}</p>
                      <p className="text-xs text-purple-600 mt-0.5">
                        ₹{pkg.price.toLocaleString()} • {pkg.items.length} inclusions
                      </p>
                      {pkg.items.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {pkg.items.map((item) => (
                            <span
                              key={item}
                              className="px-2 py-0.5 bg-white text-purple-600 text-xs rounded-full border border-purple-100"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => removePackage(index)}
                      className="text-red-400 hover:text-red-600 text-sm ml-4 flex-shrink-0"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add new package */}
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 space-y-4">
              <p className="text-sm font-semibold text-gray-700">Add a package</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={newPackage.name}
                  onChange={(e) => setNewPackage((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Package name (e.g. Silver)"
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={newPackage.price || ''}
                    onChange={(e) =>
                      setNewPackage((p) => ({ ...p, price: parseFloat(e.target.value) || 0 }))
                    }
                    placeholder="Price"
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              <input
                type="text"
                value={newPackage.description}
                onChange={(e) => setNewPackage((p) => ({ ...p, description: e.target.value }))}
                placeholder="Brief description (optional)"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              {/* Package items */}
              <div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={packageItem}
                    onChange={(e) => setPackageItem(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addPackageItem()}
                    placeholder="Add inclusion (e.g. Catering for 200)"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="button"
                    onClick={addPackageItem}
                    className="px-4 py-2.5 rounded-xl bg-purple-100 text-purple-700 text-sm font-semibold hover:bg-purple-200 transition-colors"
                  >
                    Add
                  </button>
                </div>
                {newPackage.items.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {newPackage.items.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 bg-purple-50 text-purple-600 text-xs rounded-full border border-purple-100"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={addPackage}
                disabled={!newPackage.name || newPackage.price <= 0}
                className={cn(
                  'w-full py-2.5 rounded-xl text-sm font-bold transition-all',
                  newPackage.name && newPackage.price > 0
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                )}
              >
                + Add Package
              </button>
            </div>
          </div>
        )}

        {/* Step 8 — Verification */}
        {step === 8 && (
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
              ? 'bg-pink-600 hover:bg-pink-700 text-white shadow-sm'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          )}
        >
          {submitting ? 'Submitting...' : isLastStep ? '🚀 Submit Venue' : 'Continue →'}
        </button>
      </div>
    </div>
  );
}