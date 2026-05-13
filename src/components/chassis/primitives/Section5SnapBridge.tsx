'use client';

import { useEffect } from 'react';

/**
 * VM-453 AC6 / VM-464. Bridges Space and PageDown advance from §D to §E
 * when native scroll undershoots §E's snap point. CM-shaped §D content
 * (metric strip + video + Acta closing strip + chip strip) regularly
 * exceeds one viewport height, so the original VM-453 bridge bailed
 * its 1.2*vh guard and left the user mid-§E.
 *
 * Round 2 strategy: drop scrollIntoView (unreliable interaction with
 * html { scroll-behavior: smooth } and proximity scroll-snap), compute
 * the exact scrollY explicitly, briefly disable scroll-snap so the
 * imperative scroll cannot be overridden by the snap engine mid-flight,
 * then restore snap on the next animation frame.
 *
 * Activation guards unchanged from round 1:
 *   - Only Space and PageDown without modifiers.
 *   - Skip when an interactive control or contentEditable element has
 *     focus, so form typing and link activation behave normally.
 *   - §E top must be below the nav band (still approaching).
 *   - §D top must be at or above the nav band (§D is the current
 *     section); preserves step-through from §1-§3.
 *
 * Listener is registered in capture phase so the bridge intercepts
 * Space before any descendant or document-level handler.
 *
 * Mounted once via Section5FinalCta.
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

    const NAV_H = 75;

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

      // §E already at or above the nav band: bridge has nothing to do.
      if (r5.top <= NAV_H + 8) return;

      // §D not yet the current section: preserve §1-§3 step-through.
      if (r4.top > NAV_H + 8) return;

      e.preventDefault();
      e.stopPropagation();

      // Compute the exact scrollY that lands §E's top NAV_H below the
      // viewport top. r5.top is relative to the viewport, so adding
      // current scrollY gives the absolute document offset of §E top.
      const targetY = Math.max(
        0,
        Math.round(window.scrollY + r5.top - NAV_H),
      );

      // Briefly disable scroll-snap on html so the imperative scroll
      // cannot be overridden by proximity-snap mid-flight. Restore on
      // the next animation frame after the scroll lands.
      const htmlEl = document.documentElement;
      const prevSnapType = htmlEl.style.scrollSnapType;
      const prevScrollBehavior = htmlEl.style.scrollBehavior;
      htmlEl.style.scrollSnapType = 'none';
      htmlEl.style.scrollBehavior = 'auto';

      window.scrollTo({ top: targetY, behavior: 'auto' });

      // Restore on next frame. Two RAFs to be sure the scroll has
      // committed before snap is re-armed (one RAF for layout, one
      // for paint).
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          htmlEl.style.scrollSnapType = prevSnapType;
          htmlEl.style.scrollBehavior = prevScrollBehavior;
        });
      });
    };

    window.addEventListener('keydown', onKeyDown, { capture: true });
    return () =>
      window.removeEventListener('keydown', onKeyDown, { capture: true });
  }, []);

  return null;
}
