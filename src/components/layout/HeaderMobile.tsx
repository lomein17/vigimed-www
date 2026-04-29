'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import type { HeaderContent } from '@/content/us-en/header';
import { hrefFor, type Locale } from '@/lib/i18n';
import { scrollToFinalCTA } from '@/lib/scroll';

interface HeaderMobileProps {
  locale: Locale;
  header: HeaderContent;
  navOrder: readonly string[];
}

const HEADER_HEIGHT_PX = 72;
const DIVIDER_HEIGHT_PX = 3;
const SHEET_TOP_PX = HEADER_HEIGHT_PX + DIVIDER_HEIGHT_PX;

function ParentIcon({
  parentKey,
  size = 14,
}: {
  parentKey: string;
  size?: number;
}) {
  const common = {
    'aria-hidden': true,
    viewBox: '0 0 24 24',
    width: size,
    height: size,
    fill: 'none',
    stroke: '#20A2E2',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  if (parentKey === 'hospitales' || parentKey === 'hospitals') {
    return (
      <svg {...common}>
        <path d="M3 21h18M3 7l9-4 9 4M5 21V11M19 21V11M9 9v12M15 9v12" />
      </svg>
    );
  }
  if (parentKey === 'clinicas') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v18M3 12h18" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M9 3h6v6l5 9a2 2 0 0 1-2 3H6a2 2 0 0 1-2-3l5-9V3Z" />
      <path d="M9 14h6" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={22}
      height={22}
      fill="none"
      stroke="#FFFFFF"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={22}
      height={22}
      fill="none"
      stroke="#20A2E2"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 6l12 12M6 18L18 6" />
    </svg>
  );
}

function LeafArrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={14}
      height={14}
      fill="none"
      stroke="#20A2E2"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

export function HeaderMobile({ locale, header, navOrder }: HeaderMobileProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);
  const sheetId = useId();
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (open) {
      setOpen(false);
    }
  }

  const closeSheet = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeSheet();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, closeSheet]);

  const handleScrollCta = useCallback(() => {
    setOpen(false);
    scrollToFinalCTA(locale);
  }, [locale]);

  const handleLeafTap = useCallback(() => {
    setOpen(false);
  }, []);

  const visibleParents = navOrder.flatMap((key) => {
    const parent = header.nav[key];
    return parent ? [{ key, parent }] : [];
  });

  return (
    <div
      className="md:hidden flex items-center justify-between"
      style={{ padding: '14px 18px', minHeight: HEADER_HEIGHT_PX }}
    >
      <Link
        href={hrefFor(locale, 'home')}
        className="flex items-center focus:outline-none focus-visible:[outline:2px_solid_#20A2E2] focus-visible:outline-offset-2"
        aria-label="VigiMed"
      >
        <Image
          src="/brand/vigimed-wordmark-on-dark.png"
          alt="VigiMed"
          width={400}
          height={132}
          priority
          className="w-[120px] h-auto"
        />
      </Link>

      <div className="flex items-center" style={{ gap: 12 }}>
        <button
          type="button"
          onClick={handleScrollCta}
          className="font-ui cursor-pointer focus:outline-none focus-visible:[outline:2px_solid_#20A2E2] focus-visible:outline-offset-2"
          style={{
            fontSize: 12,
            fontWeight: 400,
            color: 'rgba(255, 255, 255, 0.75)',
            background: 'transparent',
            border: 0,
            padding: 0,
          }}
        >
          {header.utility.contactMobile}
        </button>
        <button
          type="button"
          onClick={handleScrollCta}
          className="font-ui text-text-on-dark cursor-pointer focus:outline-none focus-visible:[outline:2px_solid_#20A2E2] focus-visible:outline-offset-2"
          style={{
            fontSize: 12,
            fontWeight: 500,
            background: '#20A2E2',
            border: 0,
            padding: '8px 14px',
            borderRadius: 6,
          }}
        >
          {header.cta.demoMobile}
        </button>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-haspopup="true"
          aria-expanded={open}
          aria-controls={sheetId}
          aria-label={
            open
              ? locale === 'mx-es'
                ? 'Cerrar menú'
                : 'Close menu'
              : locale === 'mx-es'
                ? 'Abrir menú'
                : 'Open menu'
          }
          className="inline-flex items-center justify-center cursor-pointer focus:outline-none focus-visible:[outline:2px_solid_#20A2E2] focus-visible:outline-offset-2"
          style={{
            padding: 6,
            background: 'transparent',
            border: 0,
            minWidth: 44,
            minHeight: 44,
          }}
        >
          {open ? <CloseIcon /> : <HamburgerIcon />}
        </button>
      </div>

      <button
        type="button"
        aria-hidden={!open}
        tabIndex={-1}
        onClick={closeSheet}
        className="fixed inset-x-0 bottom-0"
        style={{
          top: SHEET_TOP_PX,
          background: 'transparent',
          border: 0,
          padding: 0,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          zIndex: 30,
          cursor: 'default',
        }}
      />

      <div
        id={sheetId}
        role="region"
        aria-label={locale === 'mx-es' ? 'Menú principal' : 'Main menu'}
        aria-hidden={!open}
        className="fixed left-0 right-0"
        style={{
          top: SHEET_TOP_PX,
          maxHeight: `calc(100vh - ${SHEET_TOP_PX}px)`,
          overflowY: 'auto',
          background: '#0A1628',
          padding: 18,
          transform: open ? 'translateY(0)' : 'translateY(-100%)',
          transitionProperty: 'transform',
          transitionDuration: open ? '220ms' : '180ms',
          transitionTimingFunction: open ? 'ease-out' : 'ease-in',
          zIndex: 31,
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        {visibleParents.map(({ key, parent }, idx) => {
          const isLast = idx === visibleParents.length - 1;
          return (
            <section
              key={key}
              style={{ marginBottom: isLast ? 0 : 22 }}
            >
              <div
                className="flex items-center"
                style={{ gap: 8, padding: '0 4px', marginBottom: 14 }}
              >
                <ParentIcon parentKey={key} size={14} />
                <span
                  className="font-ui"
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#FFFFFF',
                  }}
                >
                  {parent.label}
                </span>
              </div>
              <ul
                className="flex flex-col"
                style={{ gap: 10, listStyle: 'none', padding: 0, margin: 0 }}
              >
                {parent.subsegments.map((sub) => (
                  <li key={sub.slug}>
                    <Link
                      href={sub.slug}
                      onClick={handleLeafTap}
                      className="flex items-center justify-between focus:outline-none focus-visible:[outline:2px_solid_#20A2E2] focus-visible:outline-offset-2"
                      style={{
                        padding: '12px 14px',
                        background: 'rgba(32, 162, 226, 0.06)',
                        border: '1px solid rgba(32, 162, 226, 0.18)',
                        borderRadius: 4,
                        minHeight: 44,
                      }}
                    >
                      <span
                        className="font-display text-text-on-dark"
                        style={{ fontSize: 14, fontWeight: 500 }}
                      >
                        {sub.name}
                      </span>
                      <LeafArrow />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
