import { notFound } from 'next/navigation';

import { Footer } from '@/components/layout/Footer';
import { StickyNav } from '@/components/layout/StickyNav';
import { isLocale, type Locale } from '@/lib/i18n';

export default async function ChromeLayout({
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
  return (
    <>
      <StickyNav locale={locale as Locale} />
      {children}
      <Footer locale={locale as Locale} />
    </>
  );
}
