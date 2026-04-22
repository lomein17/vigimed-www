import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/lib/i18n';

type Sample = {
  intro: string;
  statLabel: string;
  eyebrow: string;
  h1: string;
  h2: string;
  body: string;
  oppositeLabel: string;
};

const samples: Record<Locale, Sample> = {
  'mx-es': {
    intro:
      'Comparación de candidatos tipográficos. Elija uno revisando acentos, peso, y espaciado. Cierre este /dev/fonts al final.',
    statLabel: 'reducción de IAAS con monitoreo inteligente',
    eyebrow: 'MONITOREO DE CUMPLIMIENTO',
    h1: 'Cumplimiento que se ve.',
    h2: 'Sección de prueba.',
    body:
      'Prueba de acentos: ñ á é í ó ú. Párrafo en español para evaluar legibilidad en bloques de texto largos con ligaduras y diacríticos.',
    oppositeLabel: 'Ver en inglés (US)',
  },
  'us-en': {
    intro:
      'Font candidate comparison. Choose one by reviewing accents, weight, and spacing. This /dev/fonts route ships only to preview.',
    statLabel: 'HAI reduction with intelligent monitoring',
    eyebrow: 'HOSPITAL COMPLIANCE MONITORING',
    h1: 'Compliance you can see.',
    h2: 'Sample section.',
    body:
      'Accent check: ñ á é í ó ú. English paragraph to evaluate legibility at body size across lines and paragraph length.',
    oppositeLabel: 'View in Spanish (MX)',
  },
};

type Candidate = {
  name: string;
  familyClass: string;
  license: string;
};

const candidates: readonly Candidate[] = [
  { name: 'DM Sans', familyClass: 'font-dm-sans', license: 'SIL OFL 1.1' },
  { name: 'General Sans', familyClass: 'font-general-sans', license: 'Fontshare FFL' },
  { name: 'Satoshi', familyClass: 'font-satoshi', license: 'Fontshare FFL' },
];

export default async function DevFontsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if (process.env.VERCEL_ENV === 'production') notFound();

  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const sample = samples[locale];
  const opposite: Locale = locale === 'mx-es' ? 'us-en' : 'mx-es';

  return (
    <main className="bg-white text-text-body">
      <div className="mx-auto max-w-content px-gutter py-section">
        <header className="mb-12 border-b border-gray-100 pb-8">
          <p className="eyebrow text-amber-500">/dev/fonts</p>
          <h1 className="mt-2 text-h2 text-text-primary" style={{ fontWeight: 700 }}>
            Font candidates ({locale})
          </h1>
          <p className="mt-4 max-w-2xl text-body">{sample.intro}</p>
          <p className="mt-2 text-small text-text-muted">
            Candidates: {candidates.map((c) => c.name).join(' · ')}.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {candidates.map((c) => (
            <section
              key={c.name}
              className={`${c.familyClass} flex flex-col gap-6`}
              aria-label={c.name}
            >
              <div className="border-b border-gray-100 pb-4">
                <p className="text-small text-text-muted">
                  {c.name} · {c.license}
                </p>
              </div>

              <div>
                <p className="text-stat text-text-primary">75%</p>
                <div className="amber-line mt-2" aria-hidden />
                <p className="mt-2 text-small text-text-muted">{sample.statLabel}</p>
              </div>

              <p className="eyebrow text-amber-500">{sample.eyebrow}</p>

              <h2 className="text-h1 text-text-primary">{sample.h1}</h2>

              <h3 className="text-h2 text-text-primary">{sample.h2}</h3>

              <p className="text-body">{sample.body}</p>
            </section>
          ))}
        </div>

        <footer className="mt-16 border-t border-gray-100 pt-8">
          <Link
            href={`/${opposite}/dev/fonts`}
            className="nav-item text-amber-500 hover:text-amber-400"
          >
            {sample.oppositeLabel}
          </Link>
        </footer>
      </div>
    </main>
  );
}
