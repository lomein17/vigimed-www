import { notFound } from 'next/navigation';

export default async function ComingSoonPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'us-en') notFound();
  return (
    <main>
      <h1>Coming Soon (us-en)</h1>
    </main>
  );
}
