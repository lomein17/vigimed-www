import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLocale, isLocale, isLocaleShaped } from '@/lib/i18n';

const LOCALE_COOKIE = 'vm-locale';
const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split('/')[1] ?? '';

  if (isLocale(firstSegment)) {
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
  let target: string;
  if (cookieLocale && isLocale(cookieLocale)) {
    target = cookieLocale;
  } else {
    const country = request.headers.get('x-vercel-ip-country');
    target = country === 'MX' ? 'mx-es' : defaultLocale;
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === '/' ? `/${target}` : `/${target}${pathname}`;

  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
