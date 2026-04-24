import { notFound } from 'next/navigation';

import { isLocale } from '@/lib/i18n';

export default async function BareLayout({
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
  return <>{children}</>;
}
