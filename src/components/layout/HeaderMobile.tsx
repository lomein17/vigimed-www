'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import type { HeaderContent } from '@/content/us-en/header';
import { hrefFor, type Locale } from '@/lib/i18n';

import { useRegisterDrawerCloser } from './StickyNavShell';

export type SecondaryNavItem = { label: string; href: string };

interface HeaderMobileProps {
  locale: Locale;
  header: HeaderContent;
  navOrder: readonly string[];
  secondaryNav: readonly SecondaryNavItem[];
}

type Pane = 'closed' | 'L1' | 'L2';

const HEADER_HEIGHT_PX = 72;
const DIVIDER_HEIGHT_PX = 3;
// VM-494 A.2: SHEET_TOP grew from the bare 75px constant to include
// env(safe-area-inset-top) so the drawer sheet sits below the notch on
// iOS while the navy header band stays flush to the screen edge.
const SHEET_TOP = `calc(${HEADER_HEIGHT_PX + DIVIDER_HEIGHT_PX}px + env(safe-area-inset-top, 0px))`;
// Hide translate must clear top: SHEET_TOP, not just the sheet's own
// height. translateY(-100%) shifts by the element's height only, leaving
// the bottom edge at top: SHEET_TOP. The extra offset moves the bottom
// edge to y=0 so the drawer never paints over the chrome row.
const SHEET_HIDE_TRANSFORM = `translateY(calc(-100% - ${HEADER_HEIGHT_PX + DIVIDER_HEIGHT_PX}px - env(safe-area-inset-top, 0px)))`;

const OPEN_TRANSITION = 'transform 240ms cubic-bezier(0.32, 0.72, 0, 1)';
const CLOSE_TRANSITION = 'transform 200ms cubic-bezier(0.4, 0, 1, 1)';

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

function ChevronRightSmall({ size = 14 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="#20A2E2"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

function ChevronLeftSmall({ size = 14 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="#2FBBF7"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}

export function HeaderMobile({ locale, header, navOrder, secondaryNav }: HeaderMobileProps) {
  const [pane, setPane] = useState<Pane>('closed');
  const [activeParentKey, setActiveParentKey] = useState<string | null>(null);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);
  const sheetId = useId();
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const isOpen = pane !== 'closed';

  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (pane !== 'closed') {
      setPane('closed');
    }
    if (activeParentKey !== null) {
      setActiveParentKey(null);
    }
  }

  const closeSheet = useCallback(() => {
    setPane('closed');
    setActiveParentKey(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  // VM-494 A.3 (preserved): hand the shell a closer so a scroll-down
  // hide while the drawer is open closes the drawer first; the hide
  // defers to the next downward delta. Passive close, no refocus.
  useRegisterDrawerCloser(
    useCallback(() => {
      if (pane === 'closed') return false;
      setPane('closed');
      setActiveParentKey(null);
      return true;
    }, [pane]),
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      if (pane === 'L2') {
        setPane('L1');
        setActiveParentKey(null);
        return;
      }
      closeSheet();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, pane, closeSheet]);

  const visibleParents = navOrder.flatMap((key) => {
    const parent = header.nav[key];
    return parent ? [{ key, parent }] : [];
  });

  const activeParent = activeParentKey ? header.nav[activeParentKey] : undefined;
  const backLabel = locale === 'mx-es' ? 'VOLVER' : 'BACK';

  return (
    <div
      className="md:hidden flex items-center justify-between"
      style={{
        paddingTop: 'calc(14px + env(safe-area-inset-top, 0px))',
        paddingRight: 18,
        paddingBottom: 14,
        paddingLeft: 18,
        minHeight: `calc(${HEADER_HEIGHT_PX}px + env(safe-area-inset-top, 0px))`,
      }}
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
        {/* VM-456 D-S56-1: header CTA always routes to the Home Final
            CTA on the active locale. The pathname change closes the
            drawer via the usePathname() effect above. */}
        <Link
          href={`/${locale}/#final-cta`}
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
        </Link>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => {
            if (isOpen) {
              setPane('closed');
              setActiveParentKey(null);
            } else {
              setPane('L1');
            }
          }}
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-controls={sheetId}
          aria-label={
            isOpen
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
          {isOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>
      </div>

      <div
        id={sheetId}
        role="region"
        aria-label={locale === 'mx-es' ? 'Menú principal' : 'Main menu'}
        aria-hidden={!isOpen}
        className="fixed left-0 right-0 bottom-0 bg-navy-800"
        style={{
          top: SHEET_TOP,
          transform: isOpen ? 'translateY(0)' : SHEET_HIDE_TRANSFORM,
          transition: isOpen ? OPEN_TRANSITION : CLOSE_TRANSITION,
          zIndex: 31,
          pointerEvents: isOpen ? 'auto' : 'none',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {pane === 'L1' && (
          <div
            className="flex flex-col"
            style={{ minHeight: '100%', padding: 18 }}
          >
            <div className="flex flex-col" style={{ gap: 10 }}>
              {visibleParents.map(({ key, parent }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setActiveParentKey(key);
                    setPane('L2');
                  }}
                  className="flex items-center cursor-pointer text-left bg-[rgba(32,162,226,0.06)] border border-[rgba(32,162,226,0.22)] hover:bg-[rgba(32,162,226,0.10)] hover:border-[rgba(32,162,226,0.35)] focus:outline-none focus-visible:[outline:2px_solid_#20A2E2] focus-visible:outline-offset-2"
                  style={{
                    gap: 12,
                    padding: '14px 16px',
                    minHeight: 68,
                    borderRadius: 10,
                    transition: 'background-color 150ms ease-out, border-color 150ms ease-out',
                  }}
                >
                  <span
                    className="inline-flex items-center justify-center bg-[rgba(32,162,226,0.10)]"
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 8,
                      flexShrink: 0,
                    }}
                  >
                    <ParentIcon parentKey={key} size={22} />
                  </span>
                  <span
                    className="font-display text-text-on-dark"
                    style={{
                      flex: 1,
                      fontSize: 18,
                      fontWeight: 500,
                      letterSpacing: '-0.005em',
                    }}
                  >
                    {parent.drawerName}
                  </span>
                  <ChevronRightSmall />
                </button>
              ))}
            </div>

            <div className="flex flex-col" style={{ marginTop: 16 }}>
              {secondaryNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center focus:outline-none focus-visible:[outline:2px_solid_#20A2E2] focus-visible:outline-offset-2"
                  style={{
                    gap: 12,
                    padding: '16px 4px',
                    minHeight: 52,
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <span
                    className="font-ui"
                    style={{
                      flex: 1,
                      fontSize: 15,
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.92)',
                    }}
                  >
                    {item.label}
                  </span>
                  <ChevronRightSmall />
                </Link>
              ))}
            </div>

            <p
              className="font-ui"
              style={{
                marginTop: 'auto',
                paddingTop: 24,
                textAlign: 'center',
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: '0.04em',
                color: 'rgba(255,255,255,0.55)',
              }}
            >
              {header.utility.regionName}
            </p>
          </div>
        )}

        {pane === 'L2' && activeParent && activeParentKey && (
          <div
            className="flex flex-col"
            style={{ minHeight: '100%', padding: 18 }}
          >
            <button
              type="button"
              onClick={() => {
                setActiveParentKey(null);
                setPane('L1');
              }}
              className="inline-flex items-center cursor-pointer focus:outline-none focus-visible:[outline:2px_solid_#20A2E2] focus-visible:outline-offset-2"
              style={{
                gap: 6,
                padding: '6px 4px 16px',
                background: 'transparent',
                border: 0,
                minHeight: 44,
                alignSelf: 'flex-start',
              }}
              aria-label={backLabel}
            >
              <ChevronLeftSmall />
              <span
                className="font-ui"
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  color: '#2FBBF7',
                }}
              >
                {backLabel}
              </span>
            </button>

            <div
              className="flex items-center"
              style={{ gap: 12, marginBottom: 14 }}
            >
              <span
                className="inline-flex items-center justify-center bg-[rgba(32,162,226,0.10)]"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  flexShrink: 0,
                }}
              >
                <ParentIcon parentKey={activeParentKey} size={22} />
              </span>
              <h2
                className="font-display text-text-on-dark"
                style={{
                  fontSize: 22,
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  margin: 0,
                }}
              >
                {activeParent.drawerName}
              </h2>
            </div>

            <p
              className="font-ui"
              style={{
                whiteSpace: 'pre-line',
                fontStyle: 'italic',
                fontSize: 13,
                fontWeight: 400,
                color: 'rgba(255,255,255,0.72)',
                marginTop: 0,
                marginBottom: 16,
              }}
            >
              {activeParent.drawerQuestion}
            </p>

            <div className="flex flex-col" style={{ gap: 16 }}>
              {activeParent.subsegments.map((sub) => {
                if (!sub.image) return null;
                return (
                  <Link
                    key={sub.slug}
                    href={sub.slug}
                    onClick={() => {
                      setPane('closed');
                      setActiveParentKey(null);
                    }}
                    className="group block bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.10)] hover:bg-[rgba(32,162,226,0.06)] hover:border-[rgba(32,162,226,0.30)] focus:outline-none focus-visible:[outline:2px_solid_#20A2E2] focus-visible:outline-offset-2"
                    style={{
                      borderRadius: 10,
                      overflow: 'hidden',
                      textDecoration: 'none',
                      transition: 'background-color 150ms ease-out, border-color 150ms ease-out',
                    }}
                  >
                    <Image
                      src={sub.image.src}
                      alt={sub.image.alt}
                      width={400}
                      height={250}
                      sizes="(max-width: 430px) 100vw, 400px"
                      style={{
                        width: '100%',
                        height: 'auto',
                        aspectRatio: '16 / 10',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                    <div
                      className="flex flex-col"
                      style={{
                        padding: '16px 16px 14px',
                        gap: 8,
                      }}
                    >
                      <h3
                        className="font-display text-text-on-dark"
                        style={{
                          fontSize: 18,
                          fontWeight: 500,
                          letterSpacing: '-0.005em',
                          margin: 0,
                        }}
                      >
                        {sub.name}
                      </h3>
                      {sub.valueProp ? (
                        <p
                          className="font-ui"
                          style={{
                            whiteSpace: 'pre-line',
                            fontSize: 13,
                            fontWeight: 400,
                            lineHeight: 1.5,
                            color: 'rgba(255,255,255,0.72)',
                            margin: 0,
                          }}
                        >
                          {sub.valueProp}
                        </p>
                      ) : null}
                      <span
                        className="font-ui inline-flex items-center"
                        style={{
                          alignSelf: 'flex-end',
                          gap: 6,
                          fontSize: 13,
                          fontWeight: 500,
                          color: '#2FBBF7',
                        }}
                      >
                        {header.cardCta}
                        <span
                          aria-hidden="true"
                          className="inline-flex items-center group-hover:translate-x-[2px]"
                          style={{ transition: 'transform 150ms ease-out' }}
                        >
                          <ChevronRightSmall />
                        </span>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
