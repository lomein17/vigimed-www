'use client';

import { useEffect } from 'react';

/**
 * VM-453 AC6 reworked. Bridges Space and PageDown advance from §D to §E
 * when the native scroll undershoots §E's snap point. The original VM-453
 * version capped the bridge at rect.top <= vh * 1.2 on the assumption
 * that §D would not exceed 1.2 viewport-heights. CM-shaped §D content
 * (metric strip + video + Acta closing strip + chip strip) breaks that
 * assumption, leaving the user mid-§E after one Space.
 *
 * Replacement strategy: drop the distance cap and use a semantic
 * "§D is the current section" check instead. The bridge fires when
 * §D has reached or passed the viewport top (its rect.top is at or
 * above the 75px nav band) and §E is still below the viewport top.
 * From any position inside §D, a single Space anchors §E at viewport
 * top regardless of §D's natural height.
 *
 * Mounted once on every segment-page §E via Section5FinalCta. Yields
 * to native scroll outside the bridge condition, including modifier
 * keys, focused form controls, and any position outside §D (so §1-§3
 * step-through behavior is preserved).
 */
export function Section5SnapBridge() {
  useEffect(() => {
    const section5 = document.querySelector<HTMLElement>(
      '.vm-segment-faq-section',
    );
    const section4 = document.querySelector<HTMLElement>(
      '.vm-segment-section-4',
    );
    if (!section5 || !section4) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.code !== 'Space' && e.code !== 'PageDown') return;

      const active = document.activeElement as HTMLElement | null;
      if (
        active &&
        (active.matches(
          'input, textarea, select, button, a, [contenteditable="true"]',
        ) ||
          active.isContentEditable)
      ) {
        return;
      }

      const r5 = section5.getBoundingClientRect();
      const r4 = section4.getBoundingClientRect();

      // §E already at or above viewport top: nothing to bridge.
      if (r5.top <= 80) return;

      // §D not yet the current section (still below the nav band):
      // a Space here should advance §1-§3 step by step, not skip to §E.
      if (r4.top > 80) return;

      e.preventDefault();
      section5.scrollIntoView({ behavior: 'auto', block: 'start' });
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return null;
}
