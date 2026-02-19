// app/(auth)/callback/route.ts
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const role = (user.user_metadata?.role as string | undefined)?.toLowerCase() ?? 'user';
        return NextResponse.redirect(new URL(`/dashboard/${role}`, origin));
      }

      return NextResponse.redirect(new URL(next, origin));
    }
  }

  // Return to error page if code exchange fails
  return NextResponse.redirect(new URL('/login?error=oauth_callback_failed', origin));
}