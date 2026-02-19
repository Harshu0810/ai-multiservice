// components/cards/FlatCard.tsx
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

interface FlatCardProps {
  id: string;
  title: string;
  location: string;
  city: string;
  price: number;
  status: 'rent' | 'sale';
  bedrooms: number;
  bathrooms: number;
  area?: number;
  images: string[];
  amenities: string[];
  isApproved?: boolean;
  isActive?: boolean;
  showActions?: boolean;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  href?: string;
}

function formatPrice(price: number, status: string) {
  const formatted =
    price >= 10000000
      ? `₹${(price / 10000000).toFixed(1)} Cr`
      : price >= 100000
      ? `₹${(price / 100000).toFixed(1)} L`
      : price >= 1000
      ? `₹${(price / 1000).toFixed(0)}K`
      : `₹${price}`;
  return status === 'rent' ? `${formatted}/mo` : formatted;
}

export function FlatCard({
  id,
  title,
  location,
  city,
  price,
  status,
  bedrooms,
  bathrooms,
  area,
  images,
  amenities,
  isApproved,
  isActive = true,
  showActions = false,
  onApprove,
  onReject,
  href,
}: FlatCardProps) {
  const cardHref = href ?? `/dashboard/user/properties/${id}`;
  const coverImage = images?.[0];

  return (
    <div
      className={cn(
        'group bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
        !isActive && 'opacity-60'
      )}
    >
      {/* Image */}
      <Link href={cardHref} className="block relative h-52 overflow-hidden bg-gray-100">
        {coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100">
            <span className="text-5xl">🏢</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className={cn(
              'px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide',
              status === 'rent'
                ? 'bg-blue-600 text-white'
                : 'bg-emerald-600 text-white'
            )}
          >
            {status === 'rent' ? 'Rent' : 'Sale'}
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

        {/* Photo count */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/50 text-white text-xs rounded-lg backdrop-blur-sm">
            📷 {images.length}
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <div className="flex items-start justify-between mb-2">
          <p className="text-xl font-extrabold text-indigo-600">
            {formatPrice(price, status)}
          </p>
          {area && (
            <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
              {area} sq.ft.
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={cardHref}>
          <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 line-clamp-2 hover:text-indigo-600 transition-colors">
            {title}
          </h3>
        </Link>

        {/* Location */}
        <p className="text-xs text-gray-400 mb-3 flex items-center gap-1">
          <span>📍</span>
          {location}, {city}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 border-t border-gray-50 pt-3">
          <span className="flex items-center gap-1">
            <span>🛏️</span>
            {bedrooms} {bedrooms === 1 ? 'Bed' : 'Beds'}
          </span>
          <span className="flex items-center gap-1">
            <span>🚿</span>
            {bathrooms} {bathrooms === 1 ? 'Bath' : 'Baths'}
          </span>
          {area && (
            <span className="flex items-center gap-1">
              <span>📐</span>
              {area} sq.ft.
            </span>
          )}
        </div>

        {/* Amenities */}
        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {amenities.slice(0, 3).map((a) => (
              <span
                key={a}
                className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full capitalize"
              >
                {a.replace(/_/g, ' ')}
              </span>
            ))}
            {amenities.length > 3 && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-400 text-xs rounded-full">
                +{amenities.length - 3} more
              </span>
            )}
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
              href={`/dashboard/admin/property/flat/${id}`}
              className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold transition-colors"
            >
              View
            </Link>
          </div>
        ) : (
          <Link
            href={cardHref}
            className="block w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold text-center transition-colors"
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  );
}