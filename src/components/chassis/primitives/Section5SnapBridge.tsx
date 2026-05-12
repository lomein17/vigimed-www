'use client';

import { useEffect } from 'react';

/**
 * VM-453 AC6. Bridges Space and PageDown advance from §D to §E when
 * §D's natural height exceeds one spacebar advance (~vh - 40px), which
 * causes the default scroll to undershoot §E's snap point.
 * `scroll-snap-stop: always` only engages on overshoot, so the undershoot
 * case must be handled imperatively.
 *
 * Mounted on every segment-page §E. The `rect.top > 80` and
 * `<= vh * 1.2` guards yield to native scroll when §E is not the next
 * approaching section, so the bridge is a no-op for hospitales-publicos
 * basic-variant §E and any future segment whose §E reaches its snap
 * point under native behavior.
 *
 * Yields to native scroll in every case except a deliberate Space or
 * PageDown advance toward an approaching §E:
 *   - modifier keys held (Shift+Space pages up by spec; Ctrl/Meta/Alt
 *     are app keybindings)
 *   - focus inside a form control, link, button, or contenteditable
 *   - §E top already at or above viewport top
 *   - §E top more than ~1.2 viewport-heights away (multi-screen jumps
 *     are user-driven, not auto-bridged)
 */
export function Section5SnapBridge() {
  useEffect(() => {
    const target = document.querySelector<HTMLElement>(
      '.vm-segment-faq-section',
    );
    if (!target) return;

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

      const rect = target.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top <= 80 || rect.top > vh * 1.2) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'auto', block: 'start' });
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return null;
}
