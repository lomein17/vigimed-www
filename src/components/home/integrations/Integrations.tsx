import type { IntegrationsTile as IntegrationsTileType } from '@/content/us-en/home';
import { homeContent as mxHome } from '@/content/mx-es/home';
import { homeContent as usHome } from '@/content/us-en/home';
import type { Locale } from '@/lib/i18n';

import { IntegrationsMagnetic } from './IntegrationsMagnetic';

const contentByLocale = {
  'mx-es': mxHome,
  'us-en': usHome,
} as const;

export function Integrations({ locale }: { locale: Locale }) {
  const { integrations } = contentByLocale[locale];

  return (
    <section
      aria-labelledby="integrations-heading"
      className="vm-integrations-section"
    >
      <div className="vm-integrations-haze" aria-hidden="true" />
      <div className="vm-integrations-inner">
        <h2 id="integrations-heading" className="vm-integrations-h2">
          {integrations.h2}
        </h2>
        <IntegrationsMagnetic>
          <div className="vm-integrations-grid">
            {integrations.tiles.map((tile) => (
              <IntegrationsTile key={tile.name} tile={tile} />
            ))}
          </div>
        </IntegrationsMagnetic>
      </div>
    </section>
  );
}

function IntegrationsTile({ tile }: { tile: IntegrationsTileType }) {
  return (
    <div className="vm-integrations-tile">
      {/* eslint-disable-next-line @next/next/no-img-element -- static brand logos served from /public; SVG path requires dangerouslyAllowSVG on next/image */}
      <img
        src={tile.src}
        alt={tile.alt}
        width={tile.width}
        height={tile.height}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
