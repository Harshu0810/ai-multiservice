// app/(dashboard)/user/dashboard/page.tsx
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma/client';
import Link from 'next/link';

export const metadata = { title: 'My Dashboard' };

export default async function UserDashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const [bookings, orders] = await Promise.all([
    prisma.booking.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.order.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { items: { include: { product: true } } },
    }),
  ]);

  const displayName = user.user_metadata?.name ?? 'there';

  const quickLinks = [
    { href: '/dashboard/user/properties', label: 'Browse Properties', icon: '🏠', color: 'bg-blue-50 text-blue-600 hover:bg-blue-100' },
    { href: '/dashboard/user/venues', label: 'Find Venues', icon: '💒', color: 'bg-pink-50 text-pink-600 hover:bg-pink-100' },
    { href: '/dashboard/user/shop', label: 'Shop Now', icon: '🛍️', color: 'bg-purple-50 text-purple-600 hover:bg-purple-100' },
    { href: '/dashboard/user/services', label: 'Home Services', icon: '🧹', color: 'bg-green-50 text-green-600 hover:bg-green-100' },
  ];

  const statusColors: Record<string, string> = {
    PENDING: 'bg-amber-100 text-amber-700',
    CONFIRMED: 'bg-green-100 text-green-700',
    CANCELLED: 'bg-red-100 text-red-700',
    COMPLETED: 'bg-blue-100 text-blue-700',
  };

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-extrabold mb-1">
          Welcome back, {displayName}! 👋
        </h1>
        <p className="text-white/80 text-sm">
          Explore properties, venues, and services tailored just for you.
        </p>
      </div>

      {/* Quick links */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Explore</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-2 p-5 rounded-2xl font-semibold text-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${link.color}`}
            >
              <span className="text-3xl">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Bookings', value: bookings.length, icon: '📅' },
          { label: 'Orders Placed', value: orders.length, icon: '📦' },
          { label: 'Active Bookings', value: bookings.filter((b) => b.status === 'CONFIRMED').length, icon: '✅' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4"
          >
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-xl">
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-extrabold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
        </div>
        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-10 text-center">
            <p className="text-3xl mb-3">📅</p>
            <p className="text-gray-500 text-sm">No bookings yet</p>
            <Link
              href="/dashboard/user/properties"
              className="inline-block mt-4 text-indigo-600 text-sm font-semibold hover:underline"
            >
              Browse properties →
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="divide-y divide-gray-50">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between px-5 py-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900 capitalize">
                      {booking.serviceType} Booking
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(booking.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-bold text-gray-900">
                      ₹{booking.totalAmount.toLocaleString()}
                    </p>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        statusColors[booking.status] ?? 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Recent Orders */}
      {orders.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Orders</h2>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="divide-y divide-gray-50">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between px-5 py-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Order #{order.id.slice(-6).toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''} •{' '}
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-bold text-gray-900">
                      ₹{order.total.toLocaleString()}
                    </p>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 capitalize">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}