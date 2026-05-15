import { careersContent as mxCareers } from '@/content/mx-es/careers';
import { careersContent as usCareers } from '@/content/us-en/careers';
import type { Locale } from '@/lib/i18n';

const contentByLocale = {
  'mx-es': mxCareers,
  'us-en': usCareers,
} as const;

export function CareersZeroState({ locale }: { locale: Locale }) {
  const { zeroState } = contentByLocale[locale];

  return (
    <section
      aria-labelledby="careers-zero-state-heading"
      className="bg-white"
    >
      <div className="max-w-[1280px] mx-auto px-gutter py-16 md:py-20">
        <div className="mx-auto max-w-[60ch] text-center">
          <h2
            id="careers-zero-state-heading"
            className="font-display text-[1.375rem] md:text-[1.625rem] font-bold leading-[1.25] tracking-[-0.01em] text-text-primary"
          >
            {zeroState.heading}
          </h2>
          <p className="font-body mt-4 text-[1rem] md:text-[1.0625rem] leading-relaxed text-text-body">
            {zeroState.body}
          </p>
        </div>
      </div>
    </section>
  );
}
