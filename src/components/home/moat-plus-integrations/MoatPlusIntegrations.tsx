import type { Locale } from '@/lib/i18n';

import { Integrations } from '../integrations/Integrations';
import { Moat } from '../moat/Moat';

export function MoatPlusIntegrations({ locale }: { locale: Locale }) {
  return (
    <section
      aria-labelledby="moat-heading"
      className="vm-moat-integrations-section"
    >
      <Moat locale={locale} />
      <Integrations locale={locale} />
    </section>
  );
}
