// app/(dashboard)/user/layout.tsx
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

const sidebarLinks = [
  { href: '/dashboard/user/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/dashboard/user/properties', label: 'Properties', icon: '🏠' },
  { href: '/dashboard/user/venues', label: 'Venues', icon: '💒' },
  { href: '/dashboard/user/shop', label: 'Shop', icon: '🛍️' },
  { href: '/dashboard/user/services', label: 'Services', icon: '🧹' },
];

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const displayName = user.user_metadata?.name ?? user.email ?? 'User';
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
              <p className="text-xs text-green-600 font-medium">Customer Account</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            >
              <span className="text-base">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-gray-100 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <span>🏠</span> Homepage
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

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 flex items-center justify-around px-2 py-2">
        {sidebarLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-gray-500 hover:text-indigo-600 transition-colors"
          >
            <span className="text-xl">{link.icon}</span>
            <span className="text-xs font-medium">{link.label}</span>
          </Link>
        ))}
      </nav>

      {/* Main */}
      <main className="flex-1 md:ml-64 pt-16 pb-20 md:pb-0 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">{children}</div>
      </main>
    </div>
  );
}