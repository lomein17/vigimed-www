import { notFound } from 'next/navigation';
import { isLocale, locales, localeConfig, type Locale } from '@/lib/i18n';
import '../globals.css';

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
  return (
    <html lang={cfg.hreflang}>
      <body>{children}</body>
    </html>
  );
}
