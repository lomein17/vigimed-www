'use client';

// Sticky CTA mechanic (Slot Map v1.1 §9 / Chassis Brief v1.1 §6.2).
// Renders the conversion-path triplet pill (CONVERSION_CTA_LABELS) on
// every chassis page once the user has reached Section 2 and until the
// Final CTA enters the viewport. Mounted at the SegmentChassis level so
// it lives one level up from any single section and pins to the
// viewport rather than to a section frame.
//
// Visibility model: two IntersectionObservers, one on
// #segment-section-2 and one on #segment-final-cta (STICKY_RENDER_TRIGGERS
// in src/lib/chassis/constants.ts). An element counts as "reached" when
// it is in viewport (isIntersecting) or has been scrolled past
// (boundingClientRect.top < 0). visible = section2Reached &&
// !finalCtaReached. Above Hero, visible is false; opacity, visibility,
// and pointer-events all collapse to render the sticky inert.
//
// Layout: desktop renders a floating right-rail card; mobile renders a
// bottom bar. The render switch is purely CSS (display: none /
// display: flex per breakpoint) so both DOM trees mount and the visible
// state applies to whichever the viewport is currently showing.

import { useEffect, useState } from 'react';

import type { Locale } from '@/lib/i18n';
import type { StickyCtaSlots } from '@/lib/chassis/slots';
import { CONVERSION_CTA_LABELS } from '@/lib/chassis/constants';

function isElementReached(entry: IntersectionObserverEntry): boolean {
  if (entry.isIntersecting) return true;
  return entry.boundingClientRect.top < 0;
}

export function StickyCta({
  locale,
  fill,
}: {
  locale: Locale;
  fill: StickyCtaSlots;
}) {
  const ctaLabel = CONVERSION_CTA_LABELS[locale];
  const promptDesktop = fill.promptDesktop[locale];
  const promptMobile = fill.promptMobile[locale];

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section2 = document.getElementById('segment-section-2');
    const finalCta = document.getElementById('segment-final-cta');
    if (!section2 || !finalCta) return;

    let section2Reached = false;
    let finalCtaReached = false;

    function update() {
      setVisible(section2Reached && !finalCtaReached);
    }

    const obs1 = new IntersectionObserver((entries) => {
      for (const entry of entries) section2Reached = isElementReached(entry);
      update();
    });
    obs1.observe(section2);

    const obs2 = new IntersectionObserver((entries) => {
      for (const entry of entries) finalCtaReached = isElementReached(entry);
      update();
    });
    obs2.observe(finalCta);

    return () => {
      obs1.disconnect();
      obs2.disconnect();
    };
  }, []);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    document
      .getElementById('segment-final-cta')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <>
      {/* Desktop: floating right-rail card */}
      <aside
        className="vm-sticky-cta-rail"
        data-visible={visible ? 'true' : 'false'}
        aria-hidden={!visible}
      >
        <p className="vm-sticky-cta-prompt">{promptDesktop}</p>
        <a
          href="#segment-final-cta"
          onClick={handleClick}
          className="vm-sticky-cta-pill"
          tabIndex={visible ? 0 : -1}
        >
          {ctaLabel}
        </a>
      </aside>

      {/* Mobile: bottom bar */}
      <aside
        className="vm-sticky-cta-bar"
        data-visible={visible ? 'true' : 'false'}
        aria-hidden={!visible}
      >
        <p className="vm-sticky-cta-prompt">{promptMobile}</p>
        <a
          href="#segment-final-cta"
          onClick={handleClick}
          className="vm-sticky-cta-pill"
          tabIndex={visible ? 0 : -1}
        >
          {ctaLabel}
        </a>
      </aside>
    </>
  );
}
