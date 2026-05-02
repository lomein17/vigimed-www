'use client';

import { useEffect, useRef, type ReactNode } from 'react';

const CARD_REVEAL_INITIAL_DELAY_MS = 250;
// Must match the 1000ms transform transition on .vm-capability-front in globals.css:279.
// If that value changes, re-sync this constant manually.
const CARD_REVEAL_CSS_TRANSITION_MS = 1000;
// VM-435 supersedes the VM-424 rolling-wave model with a synchronized open / dwell / close.
// All cards open together, hold fully open for this duration after the CSS transition
// completes, then close together. Safely tunable: bumping this value changes only the
// fully-open rest period; close time is openAt + CARD_REVEAL_CSS_TRANSITION_MS + this value.
const CARD_REVEAL_OPEN_DWELL_MS = 3000;
// Intersection ratio required to arm the dwell timer. 0.6 = 60% of the
// Capabilities section in view. Higher than the previous 0.4 to avoid
// firing during rapid scroll-by. Tunable.
const CARD_REVEAL_INTERSECTION_THRESHOLD = 0.6;
// Sustained-intersection dwell required before the wave starts. Cancels
// if the user scrolls below the threshold within this window. Long enough
// to filter fast scroll-by, short enough not to feel laggy after a deliberate
// scroll-snap settlement. Tunable.
const CARD_REVEAL_DWELL_MS = 300;
const AUTO_OPEN_CLASS = 'vm-capability-card--auto-open';

// Module-level guard prevents replay across component remounts within a single
// page-load lifetime (e.g., App Router internal navigation). Hard reload re-evaluates
// the module and resets the flag, which is the intended demo behavior. See VM-424
// round 3 (2026-04-30) for the rationale and the AC #4/#5 deviation.
let hasPlayed = false;

export function CapabilitiesAutoReveal({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (hasPlayed) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      hasPlayed = true;
      return;
    }

    const container = containerRef.current;
    if (container === null) return;

    const cards = Array.from(
      container.querySelectorAll<HTMLElement>('.vm-capability-card'),
    );
    if (cards.length === 0) return;

    const timeouts: number[] = [];
    const cardHaltHandlers: Array<{ card: HTMLElement; handler: () => void }> = [];
    let halted = false;
    let started = false;

    const halt = () => {
      if (halted) return;
      halted = true;
      for (const id of timeouts) {
        window.clearTimeout(id);
      }
      timeouts.length = 0;
      for (const card of cards) {
        card.classList.remove(AUTO_OPEN_CLASS);
      }
      hasPlayed = true;
      document.removeEventListener('click', halt);
      for (const { card, handler } of cardHaltHandlers) {
        card.removeEventListener('pointerenter', handler);
      }
      cardHaltHandlers.length = 0;
    };

    const startWave = () => {
      if (started) return;
      started = true;
      hasPlayed = true;

      cards.forEach((card) => {
        const openAt = CARD_REVEAL_INITIAL_DELAY_MS;
        const closeAt = openAt + CARD_REVEAL_CSS_TRANSITION_MS + CARD_REVEAL_OPEN_DWELL_MS;

        const openId = window.setTimeout(() => {
          if (halted) return;
          card.classList.add(AUTO_OPEN_CLASS);
        }, openAt);
        timeouts.push(openId);

        const closeId = window.setTimeout(() => {
          if (halted) return;
          card.classList.remove(AUTO_OPEN_CLASS);
        }, closeAt);
        timeouts.push(closeId);
      });

      document.addEventListener('click', halt);
      for (const card of cards) {
        const handler = () => halt();
        card.addEventListener('pointerenter', handler);
        cardHaltHandlers.push({ card, handler });
      }
    };

    let dwellTimer: number | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry === undefined) return;

        if (entry.isIntersecting) {
          if (dwellTimer === null) {
            dwellTimer = window.setTimeout(() => {
              dwellTimer = null;
              observer.disconnect();
              startWave();
            }, CARD_REVEAL_DWELL_MS);
          }
        } else {
          if (dwellTimer !== null) {
            window.clearTimeout(dwellTimer);
            dwellTimer = null;
          }
        }
      },
      { threshold: CARD_REVEAL_INTERSECTION_THRESHOLD },
    );
    observer.observe(container);

    return () => {
      if (dwellTimer !== null) {
        window.clearTimeout(dwellTimer);
        dwellTimer = null;
      }
      observer.disconnect();
      for (const id of timeouts) {
        window.clearTimeout(id);
      }
      timeouts.length = 0;
      document.removeEventListener('click', halt);
      for (const { card, handler } of cardHaltHandlers) {
        card.removeEventListener('pointerenter', handler);
      }
      cardHaltHandlers.length = 0;
      for (const card of cards) {
        card.classList.remove(AUTO_OPEN_CLASS);
      }
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
