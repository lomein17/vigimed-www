import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLocale, isLocale, isLocaleShaped } from '@/lib/i18n';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split('/')[1] ?? '';

  if (isLocale(firstSegment)) {
    return NextResponse.next();
  }

  if (isLocaleShaped(firstSegment)) {
    return new NextResponse(null, { status: 404 });
  }

  const country = request.headers.get('x-vercel-ip-country');
  const target = country === 'MX' ? 'mx-es' : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = pathname === '/' ? `/${target}` : `/${target}${pathname}`;

  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
