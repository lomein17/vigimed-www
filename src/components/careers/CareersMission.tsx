import { careersContent as mxCareers } from '@/content/mx-es/careers';
import { careersContent as usCareers } from '@/content/us-en/careers';
import type { Locale } from '@/lib/i18n';

const contentByLocale = {
  'mx-es': mxCareers,
  'us-en': usCareers,
} as const;

export function CareersMission({ locale }: { locale: Locale }) {
  const { mission } = contentByLocale[locale];

  return (
    <section
      aria-labelledby="careers-mission-heading"
      className="bg-surface-warm"
    >
      <div className="max-w-[1280px] mx-auto px-gutter py-16 md:py-24">
        <div className="max-w-[68ch]">
          <h2
            id="careers-mission-heading"
            className="font-display text-[1.5rem] md:text-[1.875rem] lg:text-[2.25rem] font-bold leading-[1.2] tracking-[-0.01em] text-text-primary"
          >
            {mission.heading}
          </h2>
          {mission.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="font-body text-text-body text-[1rem] md:text-[1.0625rem] leading-relaxed mt-4"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
