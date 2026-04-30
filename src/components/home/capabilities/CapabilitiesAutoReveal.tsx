'use client';

import { useEffect, useRef, type ReactNode } from 'react';

const CARD_REVEAL_INITIAL_DELAY_MS = 250;
const CARD_REVEAL_STAGGER_MS = 500;
// Matches the existing 1000ms .vm-capability-front transition in globals.css:271-274. Locked by VM-424 non-goals; do not tune via this constant.
const CARD_REVEAL_OPEN_DURATION_MS = 1000;
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

      cards.forEach((card, i) => {
        const openAt = CARD_REVEAL_INITIAL_DELAY_MS + i * CARD_REVEAL_STAGGER_MS;
        const closeAt = openAt + CARD_REVEAL_OPEN_DURATION_MS;

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

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.disconnect();
            startWave();
            break;
          }
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(container);

    return () => {
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
