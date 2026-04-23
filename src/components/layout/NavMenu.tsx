'use client';

import { useCallback, useId, useRef, useState } from 'react';

import type { Locale, RouteKey } from '@/lib/i18n';

import { NavDrawer } from './NavDrawer';

interface NavMenuProps {
  locale: Locale;
  items: Array<{ label: string; route: RouteKey }>;
  cta: { label: string; href: string };
  localeSelector: { currentLabel: string; otherLabel: string; otherLocale: Locale };
}

export function NavMenu({ locale, items, cta, localeSelector }: NavMenuProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const drawerId = useId();

  const handleClose = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-controls={drawerId}
        aria-expanded={open}
        aria-label={locale === 'mx-es' ? 'Abrir menú' : 'Open menu'}
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
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>
      <NavDrawer
        id={drawerId}
        open={open}
        onClose={handleClose}
        locale={locale}
        items={items}
        cta={cta}
        localeSelector={localeSelector}
      />
    </>
  );
}
