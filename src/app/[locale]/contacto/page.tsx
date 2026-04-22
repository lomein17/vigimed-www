import { notFound } from 'next/navigation';

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'mx-es') notFound();
  return (
    <main>
      <h1>Contacto (mx-es)</h1>
    </main>
  );
}
