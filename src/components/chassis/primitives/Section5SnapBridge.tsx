'use client';

import { useEffect } from 'react';
import { easeOutCubic } from '@/lib/easing';

/**
 * VM-453 AC6 / VM-464 corrective 3 / VM-465. Bridges Space and PageDown
 * advance from §D to §E with a hand-rolled RAF animation. Native
 * `window.scrollTo({behavior: 'smooth'})` does not animate at all under
 * this codebase's scroll-snap configuration (verified empirically on
 * staging during VM-464 follow-up), so the bridge cannot delegate the
 * animation to the browser.
 *
 * Easing: easeOutCubic. The bridge fires in response to a discrete
 * user gesture; the user pressed Space expecting forward motion. An
 * easeInOut curve starts at zero velocity and reads as hesitation
 * (round-2 / corrective-2 UAT). easeOutCubic starts at maximum
 * velocity and decelerates into the landing, which matches the
 * gesture's intent.
 *
 * Duration: 600 ms. Calibrated under VM-465 corrective 1 to match the
 * perceived total time of the native Space-key scroll-by-page plus
 * scroll-snap-proximity settle observed on §1→§2 / §2→§3 / §3→§4
 * (biphasic, roughly 450-650 ms end to end). The earlier 400 ms value
 * carried a JSDoc claim that it was calibrated against those native
 * transitions; that claim was empirically wrong. A 400 ms monolithic
 * easeOutCubic over the ~1038 px §4→§5 distance averaged ~2,600 px/s,
 * faster than the native sequences and flagged in UAT as such. 600 ms
 * brings the average down to ~1,700 px/s and lines the bridge up with
 * the native perceived pace.
 *
 * Reduced motion: when prefers-reduced-motion: reduce is set, the
 * bridge jumps instantly via the same snap-disable + scrollTo path
 * the round-1 corrective uses. No animation.
 *
 * Mechanism per Space press:
 *   1. Verify §D is the current section and §E is still below the nav.
 *   2. Set html.scrollSnapType = 'none' so per-frame scrollTo calls
 *      are not silently no-op'd by the snap engine.
 *   3. Drive scrollY from current to (§E absoluteTop - NAV_H) using
 *      easeOutCubic over 400 ms, calling
 *      `window.scrollTo({behavior: 'instant'})` per frame. `'instant'`
 *      (not `'auto'`) is required because globals.css sets
 *      `html { scroll-behavior: smooth }` for HeroCta and other anchor
 *      consumers, and `'auto'` defers to that CSS value, routing every
 *      per-frame call through the browser's smooth-scroll engine and
 *      producing the §4→§5 hesitation flagged in VM-465 UAT.
 *   4. Restore the original scrollSnapType after the final frame.
 *
 * Re-entrancy guard: ignores Space/PageDown while an animation is in
 * flight; rapid presses cannot stack overlapping animations or leak
 * the snap-disabled state.
 *
 * Target offset: targetY lands 1 px short of the §E snap target. The
 * FAQ section measures at sub-pixel layout positions on common
 * viewports (e.g., §E top at doc y 4127.57 instead of 4128 on a
 * 1920x1080 Retina), leaving §F's off-white top edge 0.43 px inside
 * the viewport at the exact snap target. The bridge committing to
 * that exact target for one frame before snap-proximity pulls back
 * produces a momentary flicker at the viewport bottom (VM-465
 * corrective 2 UAT). Landing 1 px short keeps §F fully off-screen
 * throughout the tail of the animation; snap-proximity considers the
 * position already satisfied, so there is no post-bridge motion
 * either. §E lands 0.5-1 px below the nav band, which is
 * imperceptible.
 *
 * Activation guards unchanged:
 *   - No modifier keys.
 *   - No interactive control or contentEditable element focused.
 *   - §E top below the nav band (still approaching).
 *   - §D top at or above the nav band (§D is the current section);
 *     preserves §1-§3 step-through.
 *
 * Refs: section4 and section5 are re-queried inside onKeyDown on every
 * keypress, not captured once at mount. The bridge listener is bound
 * to window, which persists across App Router client-side navigation;
 * the section DOM elements do not. Capturing the refs once would let
 * a sister-segment-page transition leave the handler operating on
 * detached or null elements, causing the activation guards to fall
 * through and native scroll-by-page to take over (VM-465 corrective
 * 3). Re-querying ensures the handler always operates on the current
 * page's sections.
 *
 * Cleanup: in addition to removing the listener, the cleanup also
 * restores inline scrollSnapType if it is stuck at 'none'. An
 * animation interrupted by unmount (e.g., the component unmounting
 * mid-flight on a client-side route change) would otherwise leave the
 * html element's snap state polluted across the next route, since the
 * html element persists across App Router navigation (VM-465
 * corrective 3).
 *
 * Listener registered in capture phase, mounted once via
 * Section5FinalCta.
 */
export function Section5SnapBridge() {
  useEffect(() => {
    const NAV_H = 75;
    const DURATION_MS = 600;
    let animating = false;

    function withSnapDisabled(action: (restore: () => void) => void) {
      const htmlEl = document.documentElement;
      const prevSnap = htmlEl.style.scrollSnapType;
      htmlEl.style.scrollSnapType = 'none';
      action(() => {
        htmlEl.style.scrollSnapType = prevSnap;
      });
    }

    function jumpTo(targetY: number, done: () => void) {
      withSnapDisabled((restore) => {
        window.scrollTo({ top: targetY, behavior: 'instant' });
        requestAnimationFrame(() => {
          restore();
          done();
        });
      });
    }

    function animateScrollTo(targetY: number, done: () => void) {
      const startY = window.scrollY;
      const distance = targetY - startY;
      if (Math.abs(distance) < 1) {
        done();
        return;
      }
      withSnapDisabled((restore) => {
        const startTime = performance.now();
        function step(now: number) {
          const elapsed = now - startTime;
          const t = Math.min(elapsed / DURATION_MS, 1);
          const y = startY + distance * easeOutCubic(t);
          window.scrollTo({ top: y, behavior: 'instant' });
          if (t < 1) {
            requestAnimationFrame(step);
          } else {
            restore();
            done();
          }
        }
        requestAnimationFrame(step);
      });
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (animating) {
        if (e.code === 'Space' || e.code === 'PageDown') e.preventDefault();
        return;
      }
      if (e.shiftKey || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.code !== 'Space' && e.code !== 'PageDown') return;

      const section5 = document.querySelector<HTMLElement>(
        '.vm-segment-faq-section',
      );
      const section4 = document.querySelector<HTMLElement>(
        '.vm-segment-section-4',
      );
      if (!section5 || !section4) return;

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
        Math.round(window.scrollY + r5.top - NAV_H) - 1,
      );

      animating = true;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduce) {
        jumpTo(targetY, () => {
          animating = false;
        });
      } else {
        animateScrollTo(targetY, () => {
          animating = false;
        });
      }
    };

    window.addEventListener('keydown', onKeyDown, { capture: true });
    return () => {
      window.removeEventListener('keydown', onKeyDown, { capture: true });
      // Defensive: if an in-flight bridge animation was interrupted by
      // unmount, the inline scroll-snap-type can be left stuck at 'none'.
      // The html element persists across client-side route changes, so
      // a stuck value would bleed into the next page. Restore it here.
      if (document.documentElement.style.scrollSnapType === 'none') {
        document.documentElement.style.scrollSnapType = '';
      }
    };
  }, []);

  return null;
}
