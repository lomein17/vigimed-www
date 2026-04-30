'use client';

import { useEffect } from 'react';

/**
 * VM-422 follow-on: when the user is at the very bottom of the document
 * (footer in view, no further scroll possible) and presses Space, scroll
 * smoothly back to the top. Default browser Space behavior is "scroll one
 * viewport down," which becomes a no-op once the page is scrolled to its
 * end; this component intercepts that case and loops.
 *
 * Bound to window keydown, not body, so it works regardless of focus
 * target. Skipped entirely when the focused element is a form input or
 * contenteditable region (typing a literal space must not trigger).
 */
export function FooterSpacebarLoop() {
  useEffect(() => {
    function isEditable(target: EventTarget | null): boolean {
      if (!(target instanceof HTMLElement)) return false;
      const tag = target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
      if (target.isContentEditable) return true;
      return false;
    }

    function onKeydown(event: KeyboardEvent) {
      if (event.code !== 'Space') return;
      if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) return;
      if (isEditable(event.target)) return;

      const doc = document.documentElement;
      const distanceFromBottom =
        doc.scrollHeight - (window.scrollY + window.innerHeight);

      // Within 4px of the bottom counts as "at the footer"; the threshold
      // tolerates subpixel rounding without triggering mid-scroll.
      if (distanceFromBottom > 4) return;

      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  }, []);

  return null;
}
