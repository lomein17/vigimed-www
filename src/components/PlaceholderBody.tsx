import { type Locale } from '@/lib/i18n';

const labelByLocale: Record<Locale, string> = {
  'mx-es': 'Próximamente',
  'us-en': 'Coming soon',
};

export function PlaceholderBody({ locale }: { locale: Locale }) {
  return (
    // min-h-screen reserves a full viewport for the body so the footer
    // sits below the fold on a 1440x900 window: StickyNav (~75px) + main
    // (>= 100vh) keeps the footer's top edge below the bottom of the viewport.
    <main className="min-h-screen bg-white px-gutter pt-[24vh] flex justify-center">
      <h2 className="text-h2 font-display text-navy-800 text-center">
        {labelByLocale[locale]}
      </h2>
    </main>
  );
}
