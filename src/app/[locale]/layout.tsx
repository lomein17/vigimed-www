import { notFound } from 'next/navigation';
import localFont from 'next/font/local';
import { isLocale, locales, localeConfig, type Locale } from '@/lib/i18n';
import '../globals.css';

const dmSans = localFont({
  src: [
    {
      path: '../../../public/fonts/dm-sans/dm-sans-variable.woff2',
      weight: '400 700',
      style: 'normal',
    },
  ],
  variable: '--font-dm-sans-variable',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: 'Arial',
});

const generalSans = localFont({
  src: [
    {
      path: '../../../public/fonts/general-sans/general-sans-400.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/general-sans/general-sans-700.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-general-sans-variable',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: 'Arial',
});

const satoshi = localFont({
  src: [
    {
      path: '../../../public/fonts/satoshi/satoshi-400.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/satoshi/satoshi-700.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-satoshi-variable',
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
  const fontVariables = `${dmSans.variable} ${generalSans.variable} ${satoshi.variable}`;
  return (
    <html lang={cfg.hreflang} className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
