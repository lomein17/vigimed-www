import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale, isLocale } from '@/lib/i18n';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/_next') || pathname.startsWith('/api')) {
    return;
  }

  for (const l of locales) {
    if (pathname === `/${l}` || pathname.startsWith(`/${l}/`)) {
      return;
    }
  }

  const cookieLocale = request.cookies.get('vm-locale')?.value;
  if (cookieLocale && isLocale(cookieLocale)) {
    return NextResponse.redirect(new URL(`/${cookieLocale}`, request.url), 302);
  }

  const country = request.headers.get('x-vercel-ip-country') ?? '';
  const target = country === 'MX' ? 'mx-es' : defaultLocale;

  const response = NextResponse.redirect(new URL(`/${target}`, request.url), 302);
  response.cookies.set('vm-locale', target, {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
    sameSite: 'lax',
  });
  return response;
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
