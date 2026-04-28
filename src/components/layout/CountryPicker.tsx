'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { localizedEquivalent, type Locale } from '@/lib/i18n';

interface CountryPickerProps {
  locale: Locale;
  currentLabel: string;
  otherLabel: string;
  otherLocale: Locale;
}

export function CountryPicker({
  locale,
  currentLabel,
  otherLabel,
  otherLocale,
}: CountryPickerProps) {
  const pathname = usePathname() ?? `/${locale}`;
  const otherHrefBase = localizedEquivalent(pathname, locale, otherLocale);

  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (
        containerRef.current !== null &&
        target instanceof Node &&
        !containerRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [open]);

  const handleAlternateClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window === 'undefined') return;
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    window.location.assign(
      otherHrefBase + window.location.search + window.location.hash,
    );
  };

  return (
    <div
      ref={containerRef}
      className="font-ui inline-flex flex-col items-start md:items-end justify-end h-9 gap-1"
    >
      {open ? (
        <a
          href={otherHrefBase}
          onClick={handleAlternateClick}
          className="text-[11px] md:text-xs text-text-on-dark hover:text-brand-500 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        >
          {otherLabel}
        </a>
      ) : null}
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            if (event.key === ' ') {
              event.preventDefault();
            }
            setOpen((prev) => !prev);
          }
        }}
        className="text-[11px] md:text-xs text-text-on-dark-muted hover:text-text-on-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 cursor-pointer bg-transparent border-0 p-0"
      >
        {currentLabel}
      </button>
    </div>
  );
}
