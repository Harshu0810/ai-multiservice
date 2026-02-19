// middleware.ts
import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

const PROTECTED_ROUTES = {
  admin: '/dashboard/admin',
  vendor: '/dashboard/vendor',
  user: '/dashboard/user',
};

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  // Auth routes: redirect logged-in users away
  if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
    if (user) {
      const role = (user.user_metadata?.role as string | undefined)?.toLowerCase() ?? 'user';
      return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
    }
    return response;
  }

  // Protected dashboard routes
  if (pathname.startsWith('/dashboard')) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const role = (user.user_metadata?.role as string | undefined)?.toLowerCase() ?? 'user';

    // Role-based access control
    if (pathname.startsWith('/dashboard/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
    }
    if (pathname.startsWith('/dashboard/vendor') && role !== 'vendor' && role !== 'admin') {
      return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
    }
    if (pathname.startsWith('/dashboard/user') && role === 'admin') {
      return NextResponse.redirect(new URL('/dashboard/admin', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};