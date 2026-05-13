'use client';

import { useEffect } from 'react';

/**
 * VM-453 AC6 / VM-464 corrective 2. Bridges Space and PageDown advance
 * from §D to §E with a hand-rolled easeInOutCubic RAF animation. Native
 * `window.scrollTo({behavior: 'smooth'})` does not animate at all under
 * this codebase's scroll-snap configuration (verified empirically on
 * staging during VM-464 corrective 1 follow-up), so the bridge cannot
 * delegate the animation to the browser.
 *
 * Mechanism per Space press:
 *   1. Verify §D is the current section and §E is still below the nav.
 *   2. Set html.scrollSnapType = 'none' so per-frame scrollTo calls are
 *      not silently no-op'd by the snap engine.
 *   3. Drive scrollY from current to (§E absoluteTop - NAV_H) over
 *      450ms with easeInOutCubic, calling `window.scrollTo({behavior:
 *      'auto'})` on each animation frame.
 *   4. Restore the original scrollSnapType after the final frame.
 *
 * Re-entrancy guard: ignores Space/PageDown while an animation is in
 * flight so rapid presses do not stack overlapping animations or
 * leave scroll-snap permanently disabled.
 *
 * Activation guards unchanged:
 *   - No modifier keys.
 *   - No interactive control or contentEditable element focused.
 *   - §E top below the nav band (still approaching).
 *   - §D top at or above the nav band (§D is the current section);
 *     preserves §1-§3 step-through.
 *
 * Listener registered in capture phase, mounted once via
 * Section5FinalCta.
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
    const DURATION_MS = 450;
    let animating = false;

    function easeInOutCubic(t: number): number {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function animateScrollTo(targetY: number, done: () => void) {
      const startY = window.scrollY;
      const distance = targetY - startY;
      if (Math.abs(distance) < 1) {
        done();
        return;
      }
      const startTime = performance.now();

      function step(now: number) {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / DURATION_MS, 1);
        const y = startY + distance * easeInOutCubic(t);
        window.scrollTo({ top: y, behavior: 'auto' });
        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          done();
        }
      }
      requestAnimationFrame(step);
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (animating) {
        // An in-flight animation already owns this gesture; swallow
        // the input so it does not queue native scroll behind us.
        if (e.code === 'Space' || e.code === 'PageDown') {
          e.preventDefault();
        }
        return;
      }
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

      if (r5.top <= NAV_H + 8) return;
      if (r4.top > NAV_H + 8) return;

      e.preventDefault();
      e.stopPropagation();

      const targetY = Math.max(
        0,
        Math.round(window.scrollY + r5.top - NAV_H),
      );

      const htmlEl = document.documentElement;
      const prevSnap = htmlEl.style.scrollSnapType;
      htmlEl.style.scrollSnapType = 'none';
      animating = true;

      animateScrollTo(targetY, () => {
        htmlEl.style.scrollSnapType = prevSnap;
        animating = false;
      });
    };

    window.addEventListener('keydown', onKeyDown, { capture: true });
    return () =>
      window.removeEventListener('keydown', onKeyDown, { capture: true });
  }, []);

  return null;
}
