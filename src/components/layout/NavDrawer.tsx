'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

import { hrefFor, localizedEquivalent, type Locale, type RouteKey } from '@/lib/i18n';

interface NavDrawerProps {
  id: string;
  open: boolean;
  onClose: () => void;
  locale: Locale;
  items: Array<{ label: string; route: RouteKey }>;
  cta: { label: string; href: string };
  localeSelector: {
    currentLabel: string;
    otherLabel: string;
    otherLocale: Locale;
  };
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function NavDrawer({
  id,
  open,
  onClose,
  locale,
  items,
  cta,
  localeSelector,
}: NavDrawerProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname() ?? `/${locale}`;
  const otherLocaleHref = localizedEquivalent(
    pathname,
    locale,
    localeSelector.otherLocale,
  );

  // Body scroll lock while the drawer is open. Restore prior overflow on close
  // so a parent or future style isn't accidentally clobbered.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // ESC to close + focus trap.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const focusables = () =>
      Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => !el.hasAttribute('aria-hidden'),
      );

    const initial = focusables()[0];
    initial?.focus();

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const list = focusables();
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (first === undefined || last === undefined) return;
      const active = document.activeElement as HTMLElement | null;
      if (event.shiftKey) {
        if (active === first || !panel.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  const handleNavigate = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden="true"
      />
      <div
        id={id}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={locale === 'mx-es' ? 'Menú principal' : 'Main menu'}
        className={`absolute top-0 right-0 h-full w-full md:w-[380px] bg-navy-900 text-text-on-dark shadow-2xl transition-transform duration-200 ease-out ${open ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}
      >
        <div className="flex items-center justify-end h-[72px] px-6 md:px-8 border-b border-white/5">
          <button
            type="button"
            onClick={onClose}
            aria-label={locale === 'mx-es' ? 'Cerrar menú' : 'Close menu'}
            className="inline-flex items-center justify-center w-10 h-10 rounded-md text-text-on-dark hover:text-brand-300 transition-colors"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>

        <nav
          aria-label={locale === 'mx-es' ? 'Menú principal' : 'Main menu'}
          className="flex-1 overflow-y-auto px-6 md:px-8 py-8 font-ui"
        >
          <ul className="flex flex-col gap-5">
            {items.map((item) => (
              <li key={item.route}>
                <Link
                  href={hrefFor(locale, item.route)}
                  onClick={handleNavigate}
                  className="block text-h3 font-display text-text-on-dark hover:text-brand-300 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={cta.href}
            onClick={handleNavigate}
            className="mt-10 inline-flex items-center justify-center w-full rounded-full bg-brand-500 hover:bg-brand-400 text-text-on-dark font-ui text-button px-5 py-3 transition-colors"
          >
            {cta.label}
          </Link>
        </nav>

        <div className="border-t border-white/10 px-6 md:px-8 py-6 font-ui text-small">
          <div className="flex items-center justify-center gap-2">
            <span className="font-semibold text-text-on-dark" aria-current="true">
              {localeSelector.currentLabel}
            </span>
            <span aria-hidden="true" className="text-white/30">
              ·
            </span>
            <a
              href={otherLocaleHref}
              onClick={handleNavigate}
              className="text-white/55 hover:text-white hover:underline transition-colors"
            >
              {localeSelector.otherLabel}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
