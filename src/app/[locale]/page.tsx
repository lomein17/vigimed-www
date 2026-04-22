import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <main>
      <h1>Home — {locale}</h1>
    </main>
  );
}
