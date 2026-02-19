// components/cards/MarriageGardenCard.tsx
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

interface MarriageGardenCardProps {
  id: string;
  name: string;
  location: string;
  price: number;
  capacity: number;
  images: string[];
  amenities: string[];
  foodTypes?: string[];
  decorationTypes?: string[];
  packages?: { name: string; price: number }[];
  isApproved?: boolean;
  showActions?: boolean;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  href?: string;
}

function formatPrice(price: number) {
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)} Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(1)} L`;
  if (price >= 1000) return `₹${(price / 1000).toFixed(0)}K`;
  return `₹${price}`;
}

const amenityIcons: Record<string, string> = {
  parking: '🚗',
  ac: '❄️',
  catering: '🍽️',
  decoration: '🌸',
  dj: '🎵',
  valet: '🤵',
  generator: '⚡',
  bridal_room: '💍',
  green_room: '🪴',
  wifi: '📶',
};

export function MarriageGardenCard({
  id,
  name,
  location,
  price,
  capacity,
  images,
  amenities,
  foodTypes = [],
  decorationTypes = [],
  packages = [],
  isApproved,
  showActions = false,
  onApprove,
  onReject,
  href,
}: MarriageGardenCardProps) {
  const cardHref = href ?? `/dashboard/user/venues/${id}`;
  const coverImage = images?.[0];

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Image */}
      <Link href={cardHref} className="block relative h-52 overflow-hidden bg-gray-100">
        {coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverImage}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-100">
            <span className="text-5xl">💒</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-pink-600 text-white">
            Venue
          </span>
          {isApproved === false && (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-white">
              Pending
            </span>
          )}
          {isApproved === true && (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-500 text-white">
              Approved
            </span>
          )}
        </div>

        {/* Capacity badge */}
        <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/50 text-white text-xs rounded-lg backdrop-blur-sm flex items-center gap-1">
          👥 {capacity.toLocaleString()} guests
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-xl font-extrabold text-pink-600">
              {formatPrice(price)}
            </p>
            <p className="text-xs text-gray-400">per event</p>
          </div>
          {packages.length > 0 && (
            <span className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-lg font-medium">
              {packages.length} packages
            </span>
          )}
        </div>

        {/* Name */}
        <Link href={cardHref}>
          <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 line-clamp-2 hover:text-pink-600 transition-colors">
            {name}
          </h3>
        </Link>

        {/* Location */}
        <p className="text-xs text-gray-400 mb-3 flex items-center gap-1">
          <span>📍</span>
          {location}
        </p>

        {/* Food & Decoration tags */}
        {(foodTypes.length > 0 || decorationTypes.length > 0) && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {foodTypes.slice(0, 2).map((f) => (
              <span
                key={f}
                className="px-2 py-0.5 bg-orange-50 text-orange-600 text-xs rounded-full border border-orange-100 capitalize"
              >
                🍽️ {f}
              </span>
            ))}
            {decorationTypes.slice(0, 1).map((d) => (
              <span
                key={d}
                className="px-2 py-0.5 bg-pink-50 text-pink-600 text-xs rounded-full border border-pink-100 capitalize"
              >
                🌸 {d}
              </span>
            ))}
          </div>
        )}

        {/* Amenities */}
        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {amenities.slice(0, 4).map((a) => (
              <span
                key={a}
                className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full capitalize"
              >
                {amenityIcons[a] ?? '✓'} {a.replace(/_/g, ' ')}
              </span>
            ))}
            {amenities.length > 4 && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-400 text-xs rounded-full">
                +{amenities.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Packages preview */}
        {packages.length > 0 && (
          <div className="mb-4 p-3 bg-purple-50 rounded-xl border border-purple-100">
            <p className="text-xs font-semibold text-purple-700 mb-2">Available packages</p>
            <div className="space-y-1">
              {packages.slice(0, 2).map((pkg) => (
                <div key={pkg.name} className="flex justify-between text-xs">
                  <span className="text-purple-600">{pkg.name}</span>
                  <span className="font-semibold text-purple-700">
                    {formatPrice(pkg.price)}
                  </span>
                </div>
              ))}
              {packages.length > 2 && (
                <p className="text-xs text-purple-400">
                  +{packages.length - 2} more packages
                </p>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        {showActions ? (
          <div className="flex gap-2 pt-2 border-t border-gray-100">
            <button
              onClick={() => onApprove?.(id)}
              className="flex-1 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold transition-colors"
            >
              ✓ Approve
            </button>
            <button
              onClick={() => onReject?.(id)}
              className="flex-1 py-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-600 text-xs font-bold transition-colors"
            >
              ✕ Reject
            </button>
            <Link
              href={`/dashboard/admin/property/garden/${id}`}
              className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold transition-colors"
            >
              View
            </Link>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              href={cardHref}
              className="flex-1 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold text-center transition-colors"
            >
              View Venue
            </Link>
            <Link
              href={`${cardHref}?tab=packages`}
              className="px-4 py-2.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-700 text-xs font-bold text-center transition-colors"
            >
              Packages
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}