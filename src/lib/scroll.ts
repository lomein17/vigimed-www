'use client';

import type { Locale } from '@/lib/i18n';

const SCROLL_DURATION_MS = 1000;
const SCROLL_OFFSET_PX = 96;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function scrollToFinalCTA(locale: Locale): void {
  const el = document.getElementById('final-cta');
  if (!el) {
    window.location.assign(`/${locale}/#final-cta`);
    return;
  }

  const reduce = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;
  if (reduce) {
    el.scrollIntoView({ block: 'start' });
    return;
  }

  const targetY =
    el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET_PX;
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  function step(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / SCROLL_DURATION_MS, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
