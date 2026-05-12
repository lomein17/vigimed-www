'use client';

import { useEffect } from 'react';

/**
 * Layout-coupled effects for the footer:
 *
 * 1. **Spacebar loop.** When the user is at the document bottom (footer
 *    fully in view, no further scroll possible) and presses Space,
 *    smoothly return to the top. Intercepts the default Space "scroll
 *    one viewport" no-op at end-of-document.
 *
 * 2. **Footer height variable.** Writes the page footer's measured
 *    offsetHeight to --vm-footer-h on the root element. Consumed by
 *    chassis sections that need to size themselves as (viewport - navbar
 *    - footer). Updates on viewport resize via ResizeObserver. The
 *    selector targets `footer[data-site-footer]` specifically to avoid
 *    matching nested semantic `<footer>` elements that exist for HTML
 *    sectioning content (e.g., the Acta de Cumplimiento closing strip
 *    inside Section 4 Zone B).
 *
 * Bound to window keydown, not body, so the loop works regardless of
 * focus target. Skipped when the focused element is editable so typing
 * a literal space never triggers the scroll.
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

      if (distanceFromBottom > 4) return;

      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  }, []);

  useEffect(() => {
    const footer = document.querySelector<HTMLElement>('footer[data-site-footer]');
    if (!footer) return;

    function updateFooterHeightVar() {
      if (!footer) return;
      document.documentElement.style.setProperty(
        '--vm-footer-h',
        `${footer.offsetHeight}px`,
      );
    }

    updateFooterHeightVar();
    const ro = new ResizeObserver(updateFooterHeightVar);
    ro.observe(footer);
    return () => ro.disconnect();
  }, []);

  return null;
}
