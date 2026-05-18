import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  defaultLocale,
  getLiveLocales,
  isLocale,
  isLocaleShaped,
  type Locale,
} from '@/lib/i18n';

const LOCALE_COOKIE = 'vm-locale';
const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split('/')[1] ?? '';
  const live = getLiveLocales();
  const isLive = (value: string): value is Locale =>
    isLocale(value) && (live as readonly string[]).includes(value);

  if (isLocale(firstSegment)) {
    if (!isLive(firstSegment)) {
      return new NextResponse(null, { status: 404 });
    }
    const response = NextResponse.next();
    response.cookies.set({
      name: LOCALE_COOKIE,
      value: firstSegment,
      maxAge: LOCALE_COOKIE_MAX_AGE,
      path: '/',
      sameSite: 'lax',
      httpOnly: true,
    });
    return response;
  }

  if (isLocaleShaped(firstSegment)) {
    return new NextResponse(null, { status: 404 });
  }

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  let target: Locale;
  if (cookieLocale !== undefined && isLive(cookieLocale)) {
    target = cookieLocale;
  } else {
    const country = request.headers.get('x-vercel-ip-country');
    const preferred: Locale = country === 'MX' ? 'mx-es' : defaultLocale;
    target = isLive(preferred) ? preferred : (live[0] ?? defaultLocale);
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === '/' ? `/${target}` : `/${target}${pathname}`;

  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
