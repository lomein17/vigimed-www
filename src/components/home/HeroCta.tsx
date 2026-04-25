'use client';

import type { MouseEvent } from 'react';

const SCROLL_DURATION_MS = 1000;
const SCROLL_OFFSET_PX = 96;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function HeroCta({
  label,
  targetId,
}: {
  label: string;
  targetId: string;
}) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (!el) return;

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

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      className="relative inline-flex items-center justify-center h-[38px] px-[18px] rounded-md border border-brand-500 bg-brand-500 hover:bg-brand-400 hover:border-brand-400 box-border font-ui text-button text-text-on-dark transition-colors"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 -inset-y-[3px]"
      />
      <span className="relative">{label}</span>
    </a>
  );
}
