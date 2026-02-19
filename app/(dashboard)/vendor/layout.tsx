// app/(dashboard)/vendor/layout.tsx
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

const sidebarLinks = [
  { href: '/dashboard/vendor', label: 'Overview', icon: '📊', exact: true },
  { href: '/dashboard/vendor/dashboard', label: 'My Listings', icon: '🏠' },
  { href: '/dashboard/vendor/list-property', label: 'List Property', icon: '➕' },
];

export default async function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const role = (user.user_metadata?.role as string | undefined)?.toUpperCase();
  if (role !== 'VENDOR' && role !== 'ADMIN') redirect('/dashboard/user');

  const displayName = user.user_metadata?.name ?? user.email ?? 'Vendor';
  const initials = displayName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 fixed top-0 left-0 h-full z-40 pt-16">
        {/* Profile */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {initials}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-gray-900 truncate">{displayName}</p>
              <p className="text-xs text-indigo-600 font-medium">Vendor Account</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors group"
            >
              <span className="text-base">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom links */}
        <div className="px-3 py-4 border-t border-gray-100 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <span>🏠</span> Go to Homepage
          </Link>
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
            >
              <span>🚪</span> Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:ml-64 pt-16 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">{children}</div>
      </main>
    </div>
  );
}