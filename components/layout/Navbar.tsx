// components/layout/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils/cn';

const navLinks = [
  { label: 'Properties', href: '/dashboard/user/properties' },
  { label: 'Venues', href: '/dashboard/user/venues' },
  { label: 'Shop', href: '/dashboard/user/shop' },
  { label: 'Services', href: '/dashboard/user/services' },
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user);
        setRole((data.user.user_metadata?.role as string | undefined)?.toLowerCase() ?? 'user');
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        setRole(
          (session.user.user_metadata?.role as string | undefined)?.toLowerCase() ?? 'user'
        );
      } else {
        setUser(null);
        setRole('');
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

  const isLanding = pathname === '/';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled || !isLanding
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              'text-2xl font-extrabold transition-colors',
              scrolled || !isLanding ? 'text-indigo-600' : 'text-white'
            )}
          >
            Spotly
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  pathname.startsWith(link.href)
                    ? 'bg-indigo-50 text-indigo-600'
                    : scrolled || !isLanding
                    ? 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors',
                    scrolled || !isLanding
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-white hover:bg-white/10'
                  )}
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                    {user.user_metadata?.name
                      ? user.user_metadata.name.charAt(0).toUpperCase()
                      : user.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block">
                    {user.user_metadata?.name ?? user.email}
                  </span>
                  <svg
                    className="w-4 h-4 opacity-60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                        {role}
                      </p>
                      <p className="text-sm text-gray-700 font-medium truncate">{user.email}</p>
                    </div>
                    <Link
                      href={`/dashboard/${role}`}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <span>📊</span> Dashboard
                    </Link>
                    {role === 'vendor' && (
                      <Link
                        href="/dashboard/vendor/list-property"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <span>➕</span> List Property
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <span>🚪</span> Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/login"
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-semibold transition-colors',
                    scrolled || !isLanding
                      ? 'text-gray-700 hover:text-indigo-600'
                      : 'text-white/90 hover:text-white'
                  )}
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={cn(
                'md:hidden p-2 rounded-lg transition-colors',
                scrolled || !isLanding
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              )}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  pathname.startsWith(link.href)
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-2 border-t border-gray-100 mt-2">
              {user ? (
                <>
                  <Link
                    href={`/dashboard/${role}`}
                    className="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    📊 Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    🚪 Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    className="block px-4 py-2.5 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 mt-1"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}