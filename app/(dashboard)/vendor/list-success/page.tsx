// app/(dashboard)/vendor/list-success/page.tsx
import Link from 'next/link';

export const metadata = { title: 'Listing Submitted!' };

export default function ListSuccessPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-lg w-full text-center px-6">
        {/* Success icon */}
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl">🎉</span>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Listing Submitted!</h1>

        <p className="text-gray-500 text-base leading-relaxed mb-8">
          Your listing has been submitted for review. Our admin team will verify your details
          and approve the listing within{' '}
          <span className="font-semibold text-gray-700">24 hours</span>. You will receive an
          email notification once it goes live.
        </p>

        {/* Progress steps */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left space-y-4">
          {[
            { icon: '✅', label: 'Listing submitted', done: true },
            { icon: '⏳', label: 'Under admin review (up to 24 hrs)', done: false },
            { icon: '📧', label: 'Email confirmation sent to you', done: false },
            { icon: '🚀', label: 'Listing goes live on Spotly', done: false },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
                  item.done ? 'bg-green-100' : 'bg-gray-100'
                }`}
              >
                {item.icon}
              </div>
              <span
                className={`text-sm font-medium ${
                  item.done ? 'text-green-700' : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/dashboard/vendor/dashboard"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-colors shadow-sm"
          >
            View My Listings
          </Link>
          <Link
            href="/dashboard/vendor/list-property"
            className="px-6 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold text-sm transition-colors"
          >
            Add Another Listing
          </Link>
        </div>
      </div>
    </div>
  );
}