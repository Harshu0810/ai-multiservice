// components/forms/verification-step.tsx
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface VerificationStepProps {
  data: {
    ownerName: string;
    ownerPhone: string;
    ownerEmail: string;
    idType: string;
    idNumber: string;
    agreeToTerms: boolean;
  };
  onChange: (data: Partial<VerificationStepProps['data']>) => void;
}

const idTypes = [
  { id: 'aadhaar', label: 'Aadhaar Card' },
  { id: 'pan', label: 'PAN Card' },
  { id: 'passport', label: 'Passport' },
  { id: 'driving_license', label: 'Driving Licence' },
  { id: 'voter_id', label: 'Voter ID' },
];

export function VerificationStep({ data, onChange }: VerificationStepProps) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  function handleBlur(field: string) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function isInvalid(field: keyof typeof data) {
    return touched[field] && !data[field];
  }

  const isPhoneInvalid =
    touched.ownerPhone &&
    (!/^\d{10}$/.test(data.ownerPhone));

  const isEmailInvalid =
    touched.ownerEmail &&
    (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.ownerEmail));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Verify your identity</h2>
        <p className="text-gray-500 mt-1 text-sm">
          We verify all vendors to ensure a safe and trusted marketplace. Your details are
          encrypted and never shared publicly.
        </p>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: '🔒', label: 'SSL Encrypted' },
          { icon: '🛡️', label: 'Data Protected' },
          { icon: '✅', label: 'RBI Compliant' },
        ].map((badge) => (
          <div
            key={badge.label}
            className="flex flex-col items-center gap-1.5 py-3 px-2 bg-green-50 border border-green-100 rounded-xl"
          >
            <span className="text-xl">{badge.icon}</span>
            <span className="text-xs font-medium text-green-700 text-center">{badge.label}</span>
          </div>
        ))}
      </div>

      {/* Owner details */}
      <div className="space-y-5">
        <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Owner / Contact details
        </p>

        {/* Full name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Full name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.ownerName}
            onChange={(e) => onChange({ ownerName: e.target.value })}
            onBlur={() => handleBlur('ownerName')}
            placeholder="As per your government ID"
            className={cn(
              'w-full px-4 py-3 rounded-xl border text-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500',
              isInvalid('ownerName')
                ? 'border-red-400 bg-red-50'
                : 'border-gray-200 bg-white'
            )}
          />
          {isInvalid('ownerName') && (
            <p className="text-red-500 text-xs mt-1">Full name is required</p>
          )}
        </div>

        {/* Phone & Email row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Mobile number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                +91
              </span>
              <input
                type="tel"
                value={data.ownerPhone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                  onChange({ ownerPhone: val });
                }}
                onBlur={() => handleBlur('ownerPhone')}
                placeholder="10-digit number"
                maxLength={10}
                className={cn(
                  'w-full pl-12 pr-4 py-3 rounded-xl border text-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500',
                  isPhoneInvalid
                    ? 'border-red-400 bg-red-50'
                    : 'border-gray-200 bg-white'
                )}
              />
            </div>
            {isPhoneInvalid && (
              <p className="text-red-500 text-xs mt-1">Enter a valid 10-digit mobile number</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={data.ownerEmail}
              onChange={(e) => onChange({ ownerEmail: e.target.value })}
              onBlur={() => handleBlur('ownerEmail')}
              placeholder="you@example.com"
              className={cn(
                'w-full px-4 py-3 rounded-xl border text-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500',
                isEmailInvalid
                  ? 'border-red-400 bg-red-50'
                  : 'border-gray-200 bg-white'
              )}
            />
            {isEmailInvalid && (
              <p className="text-red-500 text-xs mt-1">Enter a valid email address</p>
            )}
          </div>
        </div>
      </div>

      {/* ID verification */}
      <div className="space-y-4">
        <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Government ID verification
        </p>

        {/* ID type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            ID type <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {idTypes.map((id) => (
              <button
                key={id.id}
                type="button"
                onClick={() => onChange({ idType: id.id })}
                className={cn(
                  'py-2.5 px-3 rounded-xl border-2 text-xs font-medium transition-all text-left',
                  data.idType === id.id
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                )}
              >
                {id.label}
              </button>
            ))}
          </div>
        </div>

        {/* ID number */}
        {data.idType && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              ID number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.idNumber}
              onChange={(e) => onChange({ idNumber: e.target.value.toUpperCase() })}
              onBlur={() => handleBlur('idNumber')}
              placeholder={
                data.idType === 'aadhaar'
                  ? 'XXXX XXXX XXXX'
                  : data.idType === 'pan'
                  ? 'ABCDE1234F'
                  : 'Enter ID number'
              }
              className={cn(
                'w-full px-4 py-3 rounded-xl border text-sm font-mono tracking-wider transition focus:outline-none focus:ring-2 focus:ring-indigo-500',
                isInvalid('idNumber')
                  ? 'border-red-400 bg-red-50'
                  : 'border-gray-200 bg-white'
              )}
            />
            {isInvalid('idNumber') && (
              <p className="text-red-500 text-xs mt-1">ID number is required</p>
            )}
            <p className="text-xs text-gray-400 mt-1">
              Your ID number is encrypted and used only for verification.
            </p>
          </div>
        )}
      </div>

      {/* Terms & conditions */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <div className="mt-0.5 flex-shrink-0">
            <input
              type="checkbox"
              checked={data.agreeToTerms}
              onChange={(e) => onChange({ agreeToTerms: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            I confirm that all the information provided is accurate and I am the rightful owner
            or authorised representative for this property. I agree to Spotly&apos;s{' '}
            <a href="#" className="text-indigo-600 underline hover:text-indigo-700">
              Terms of Service
            </a>
            ,{' '}
            <a href="#" className="text-indigo-600 underline hover:text-indigo-700">
              Vendor Policy
            </a>
            , and{' '}
            <a href="#" className="text-indigo-600 underline hover:text-indigo-700">
              Privacy Policy
            </a>
            .
          </p>
        </label>
        {touched.agreeToTerms && !data.agreeToTerms && (
          <p className="text-red-500 text-xs mt-2 ml-7">
            You must agree to the terms to continue
          </p>
        )}
      </div>

      {/* What happens next */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
        <p className="text-xs font-semibold text-blue-700 mb-2">📋 What happens next?</p>
        <ol className="text-xs text-blue-600 space-y-1 list-decimal list-inside">
          <li>Your listing will be submitted for admin review</li>
          <li>Our team verifies your details within 24 hours</li>
          <li>You&apos;ll receive an email once your listing is approved</li>
          <li>Your property goes live and starts receiving enquiries</li>
        </ol>
      </div>
    </div>
  );
}