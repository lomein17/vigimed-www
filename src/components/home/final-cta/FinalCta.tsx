import { homeContent as mxHome } from '@/content/mx-es/home';
import { homeContent as usHome } from '@/content/us-en/home';
import type { Locale } from '@/lib/i18n';

import { MeetingRequestForm } from '@/components/shared/MeetingRequestForm';

const contentByLocale = {
  'mx-es': mxHome,
  'us-en': usHome,
} as const;

export function FinalCta({ locale }: { locale: Locale }) {
  const { finalCta } = contentByLocale[locale];

  return (
    <section
      id="final-cta"
      aria-labelledby="final-cta-heading"
      className="vm-final-cta-section"
    >
      <div className="vm-final-cta-inner">
        <div className="vm-final-cta-grid">
          <div>
            <p className="vm-final-cta-eyebrow">{finalCta.eyebrow}</p>
            <h2 id="final-cta-heading" className="vm-final-cta-h2">
              {finalCta.h2}
            </h2>
            <p className="vm-final-cta-frame">{finalCta.frame}</p>
            <ol className="vm-final-cta-ladder">
              {finalCta.steps.map((step, i) => (
                <li key={step.heading} className="vm-final-cta-step">
                  <div className="vm-final-cta-step-badge" aria-hidden="true">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="vm-final-cta-step-h">{step.heading}</h3>
                    <p className="vm-final-cta-step-b">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <MeetingRequestForm locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
