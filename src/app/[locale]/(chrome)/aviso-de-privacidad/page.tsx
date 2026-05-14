import fs from 'node:fs';
import path from 'node:path';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { LegalDocument } from '@/components/legal/LegalDocument';

const source = fs.readFileSync(
  path.join(process.cwd(), 'src/content/mx-es/legal/aviso-de-privacidad.md'),
  'utf8',
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'mx-es') return {};
  return {
    title: 'Aviso de Privacidad | VigiMed',
    description:
      'Aviso de Privacidad de VigiMed México, S. de R. L. de C.V., conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.',
  };
}

export default async function AvisoDePrivacidadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'mx-es') notFound();
  return (
    <main>
      <LegalDocument source={source} lang="es" />
    </main>
  );
}
