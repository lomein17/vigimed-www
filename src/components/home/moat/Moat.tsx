import { homeContent as mxHome } from '@/content/mx-es/home';
import { homeContent as usHome } from '@/content/us-en/home';
import type { Locale } from '@/lib/i18n';

const contentByLocale = {
  'mx-es': mxHome,
  'us-en': usHome,
} as const;

export function Moat({ locale }: { locale: Locale }) {
  const { moat } = contentByLocale[locale];

  return (
    <div className="vm-moat-section">
      <div className="vm-moat-inner">
        <header className="vm-moat-header">
          <p className="vm-moat-eyebrow">{moat.eyebrow}</p>
          <h2 id="moat-heading" className="vm-moat-h2">
            {moat.h2Line1}
            <br />
            {moat.h2Line2}
          </h2>
        </header>

        <div className="vm-moat-grid">
          {moat.claims.map((claim) => (
            <div key={claim.subEyebrow} className="vm-moat-column">
              <p className="vm-moat-sub-eyebrow">{claim.subEyebrow}</p>
              <h3 className="vm-moat-claim-heading">
                {claim.heading}
                {claim.headingLine2 !== undefined ? (
                  <>
                    <br />
                    {claim.headingLine2}
                  </>
                ) : null}
              </h3>
              <p className="vm-moat-body">{claim.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
