import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import localFont from 'next/font/local';
import { isLocale, locales, localeConfig, type Locale } from '@/lib/i18n';
import { Footer } from '@/components/layout/Footer';
import { StickyNav } from '@/components/layout/StickyNav';
import { SITE_URL } from '@/lib/seo/constants';
import '../globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

// Site typography (spec c3ea98927c84 §4.2).
// Fraunces drives display (h1 through h3, hero headlines, large numeric callouts).
// Inter drives body, UI, eyebrows, buttons, nav, footer, tabular numerals.
// Both are self-hosted variable WOFF2 (Latin subset), SIL OFL 1.1.
// next/font/local preloads by default when the font is used in the root
// layout; `display: 'swap'` avoids FOIT on slow connections.

const fraunces = localFont({
  src: [
    {
      path: '../../../public/fonts/fraunces/fraunces-variable.woff2',
      weight: '400 700',
      style: 'normal',
    },
  ],
  variable: '--font-fraunces-variable',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
  adjustFontFallback: 'Times New Roman',
});

const inter = localFont({
  src: [
    {
      path: '../../../public/fonts/inter/inter-variable.woff2',
      weight: '400 700',
      style: 'normal',
    },
  ],
  variable: '--font-inter-variable',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: 'Arial',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const cfg = localeConfig[locale as Locale];
  const fontVariables = `${fraunces.variable} ${inter.variable}`;
  return (
    <html lang={cfg.hreflang} className={fontVariables}>
      <body>
        <StickyNav locale={locale as Locale} />
        {children}
        <Footer locale={locale as Locale} />
      </body>
    </html>
  );
}
