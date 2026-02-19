// app/(dashboard)/vendor/list-property/flat-form.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { PropertyTypeStep } from '@/components/forms/property-type-step';
import { PlaceTypeStep } from '@/components/forms/place-type-step';
import { LocationStep } from '@/components/forms/location-step';
import { BasicsStep } from '@/components/forms/basics-step';
import { AmenitiesStep } from '@/components/forms/amenities-step';
import { PhotosStep } from '@/components/forms/photos-step';
import { DescriptionStep } from '@/components/forms/description-step';
import { TitleStep } from '@/components/forms/title-step';
import { PricingStep } from '@/components/forms/pricing-step';
import { SecurityStep } from '@/components/forms/security-step';
import { VerificationStep } from '@/components/forms/verification-step';

interface FlatFormProps {
  onBack: () => void;
}

const STEPS = [
  'Property Type',
  'Place Type',
  'Location',
  'Basics',
  'Amenities',
  'Photos',
  'Description',
  'Title',
  'Pricing',
  'Security',
  'Verification',
];

interface FormData {
  propertyType: string;
  placeType: string;
  location: string;
  city: string;
  state: string;
  pincode: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  status: 'rent' | 'sale';
  amenities: string[];
  images: string[];
  description: string;
  title: string;
  price: number;
  security: string[];
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  idType: string;
  idNumber: string;
  agreeToTerms: boolean;
}

const initialData: FormData = {
  propertyType: '',
  placeType: '',
  location: '',
  city: '',
  state: '',
  pincode: '',
  bedrooms: 1,
  bathrooms: 1,
  area: 0,
  status: 'rent',
  amenities: [],
  images: [],
  description: '',
  title: '',
  price: 0,
  security: [],
  ownerName: '',
  ownerPhone: '',
  ownerEmail: '',
  idType: '',
  idNumber: '',
  agreeToTerms: false,
};

export function FlatForm({ onBack }: FlatFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initialData);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  function updateData(partial: Partial<FormData>) {
    setData((prev) => ({ ...prev, ...partial }));
  }

  function canProceed(): boolean {
    switch (step) {
      case 0: return !!data.propertyType;
      case 1: return !!data.placeType;
      case 2: return !!(data.location && data.city && data.state && data.pincode);
      case 3: return data.bedrooms >= 0 && data.bathrooms >= 0;
      case 4: return true;
      case 5: return data.images.length > 0;
      case 6: return data.description.length >= 50;
      case 7: return data.title.length >= 10;
      case 8: return data.price > 0;
      case 9: return true;
      case 10: return !!(
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
      const res = await fetch('/api/properties/flat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message ?? 'Failed to submit listing');
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
              className="h-full bg-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 min-h-[400px]">
        {step === 0 && (
          <PropertyTypeStep
            selected={data.propertyType}
            onChange={(type) => updateData({ propertyType: type })}
          />
        )}
        {step === 1 && (
          <PlaceTypeStep
            selected={data.placeType}
            onChange={(type) => updateData({ placeType: type })}
          />
        )}
        {step === 2 && (
          <LocationStep
            data={{ location: data.location, city: data.city, state: data.state, pincode: data.pincode }}
            onChange={updateData}
          />
        )}
        {step === 3 && (
          <BasicsStep
            data={{ bedrooms: data.bedrooms, bathrooms: data.bathrooms, area: data.area, status: data.status }}
            onChange={updateData}
          />
        )}
        {step === 4 && (
          <AmenitiesStep
            selected={data.amenities}
            onChange={(amenities) => updateData({ amenities })}
          />
        )}
        {step === 5 && (
          <PhotosStep
            images={data.images}
            onChange={(images) => updateData({ images })}
          />
        )}
        {step === 6 && (
          <DescriptionStep
            description={data.description}
            onChange={(description) => updateData({ description })}
          />
        )}
        {step === 7 && (
          <TitleStep
            title={data.title}
            onChange={(title) => updateData({ title })}
          />
        )}
        {step === 8 && (
          <PricingStep
            data={{ price: data.price, status: data.status }}
            onChange={updateData}
          />
        )}
        {step === 9 && (
          <SecurityStep
            selected={data.security}
            onChange={(security) => updateData({ security })}
          />
        )}
        {step === 10 && (
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
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          )}
        >
          {submitting
            ? 'Submitting...'
            : isLastStep
            ? '🚀 Submit Listing'
            : 'Continue →'}
        </button>
      </div>
    </div>
  );
}