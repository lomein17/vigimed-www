'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';

import type { HeaderContent, HeaderParent } from '@/content/us-en/header';
import { hrefFor, type Locale } from '@/lib/i18n';
import { scrollToFinalCTA } from '@/lib/scroll';

interface HeaderDesktopProps {
  locale: Locale;
  header: HeaderContent;
  navOrder: readonly string[];
}

const HEADER_HEIGHT_PX = 72;
const DIVIDER_HEIGHT_PX = 3;
const DROPDOWN_OFFSET_PX = HEADER_HEIGHT_PX + DIVIDER_HEIGHT_PX;

// VM-425: drawer slides from translateY(-100%); open and close use asymmetric timing and easing per Decisions D1 and D7.
const UI_TRANSITION_MS = 150;
const UI_TRANSITION_TIMING = 'cubic-bezier(0.4, 0, 0.2, 1)';
const DRAWER_OPEN_MS = 240;
const DRAWER_OPEN_EASING = 'cubic-bezier(0.32, 0.72, 0, 1)';
const DRAWER_CLOSE_MS = 200;
const DRAWER_CLOSE_EASING = 'cubic-bezier(0.4, 0, 1, 1)';

const CARD_WIDTH_PX = 380;
const CARD_GAP_PX = 20;
const DRAWER_PADDING_X_PX = 32;

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

function getReducedMotionSnapshot(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot(): boolean {
  return false;
}

function ParentIcon({
  parentKey,
  size = 14,
  className,
}: {
  parentKey: string;
  size?: number;
  className?: string;
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
    className,
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

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={10}
      height={10}
      fill="none"
      stroke={open ? '#20A2E2' : '#FFFFFF'}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: `transform ${UI_TRANSITION_MS}ms ${UI_TRANSITION_TIMING}, stroke ${UI_TRANSITION_MS}ms ${UI_TRANSITION_TIMING}`,
      }}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function ArrowRight({ size = 12, color = '#20A2E2' }: { size?: number; color?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function DrawerCard({
  name,
  slug,
  valueProp,
  image,
  cardCta,
  onNavigate,
}: {
  name: string;
  slug: string;
  valueProp?: string;
  image?: { src: string; alt: string };
  cardCta: string;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={slug}
      onClick={onNavigate}
      className="group block focus:outline-none focus-visible:[outline:2px_solid_#20A2E2] focus-visible:outline-offset-2 rounded-[4px]"
    >
      <div
        className="relative w-full"
        style={{
          aspectRatio: '4 / 3',
          border: '1px solid rgba(32, 162, 226, 0.15)',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            style={{ objectFit: 'cover' }}
            sizes={`${CARD_WIDTH_PX}px`}
          />
        ) : (
          <>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, #102844 0%, #1a3a5e 100%)',
              }}
            />
            <span
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                letterSpacing: '0.1em',
                color: 'rgba(255, 255, 255, 0.35)',
                textTransform: 'uppercase',
              }}
            >
              [ asset placeholder ]
            </span>
          </>
        )}
      </div>
      <div className="mt-[14px]">
        <p
          className="font-display text-text-on-dark"
          style={{ fontSize: 16, fontWeight: 500, margin: 0 }}
        >
          {name}
        </p>
        <p
          className="font-ui"
          style={{
            fontSize: 14,
            fontWeight: 400,
            color: 'rgba(255, 255, 255, 0.65)',
            lineHeight: 1.4,
            margin: '8px 0 0 0',
            minHeight: '4.2em',
            whiteSpace: 'pre-line',
          }}
        >
          {valueProp ?? ''}
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
          <span
            className="inline-flex items-center font-ui"
            style={{
              fontSize: 13,
              fontWeight: 400,
              color: '#20A2E2',
              gap: 6,
            }}
          >
            {cardCta}
            <ArrowRight />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function HeaderDesktop({ locale, header, navOrder }: HeaderDesktopProps) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [displayKey, setDisplayKey] = useState<string | null>(null);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);
  const drawerId = useId();
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const lastOpenedByRef = useRef<string | null>(null);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  if (openKey !== null && displayKey !== openKey) {
    setDisplayKey(openKey);
  }

  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (openKey !== null) {
      setOpenKey(null);
    }
  }

  const closeDrawer = useCallback(() => {
    setOpenKey(null);
    lastOpenedByRef.current = null;
    // VM-425 round 4: do not refocus the originating trigger on close.
    // Returning focus to the trigger button lets a subsequent Space keypress
    // activate the button (re-opening the drawer) instead of falling through
    // to the browser-default Space scroll that the page's CSS scroll-snap
    // depends on. Blur the current focus target so focus lands on body.
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, []);

  const openDrawerFor = useCallback((key: string) => {
    lastOpenedByRef.current = key;
    setOpenKey(key);
  }, []);

  useEffect(() => {
    if (!openKey) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeDrawer();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openKey, closeDrawer]);

  useEffect(() => {
    if (!openKey) return;

    let isClosing = false;
    const triggerClose = () => {
      if (isClosing) return;
      isClosing = true;
      closeDrawer();
    };

    const onWheel = () => triggerClose();
    const onTouchMove = () => triggerClose();
    const SCROLL_KEYS = new Set([
      'ArrowUp',
      'ArrowDown',
      'PageUp',
      'PageDown',
      'Home',
      'End',
    ]);
    const onKeyDown = (event: KeyboardEvent) => {
      if (!SCROLL_KEYS.has(event.key)) return;
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
        target?.isContentEditable === true
      ) {
        return;
      }
      triggerClose();
    };

    document.addEventListener('wheel', onWheel, { passive: true });
    document.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('wheel', onWheel);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openKey, closeDrawer]);

  useEffect(() => {
    if (!openKey) return;

    const onSpace = (event: KeyboardEvent) => {
      if (event.key !== ' ' && event.key !== 'Spacebar') return;
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
        target?.isContentEditable === true
      ) {
        return;
      }
      event.preventDefault();
    };

    document.addEventListener('keydown', onSpace);
    return () => document.removeEventListener('keydown', onSpace);
  }, [openKey]);

  const handleScrollCta = useCallback(() => {
    setOpenKey(null);
    lastOpenedByRef.current = null;
    scrollToFinalCTA(locale);
  }, [locale]);

  const handleCardNavigate = useCallback(() => {
    setOpenKey(null);
    lastOpenedByRef.current = null;
  }, []);

  const drawerOpen = openKey !== null;
  const activeParent: HeaderParent | undefined = displayKey
    ? header.nav[displayKey]
    : undefined;

  const subsegmentCount = activeParent?.subsegments.length ?? 0;
  const cardsRowWidth =
    subsegmentCount * CARD_WIDTH_PX +
    Math.max(0, subsegmentCount - 1) * CARD_GAP_PX;
  const innerWidth = cardsRowWidth;
  const drawerWidthPx = innerWidth + 2 * DRAWER_PADDING_X_PX;

  return (
    <>
      <div
        className="hidden md:grid items-center h-[72px] px-6 lg:px-8 bg-navy-800"
        style={{ gridTemplateColumns: '1fr auto 1fr', position: 'relative', zIndex: 32 }}
      >
        <Link
          href={hrefFor(locale, 'home')}
          className="flex items-center focus:outline-none focus-visible:[outline:2px_solid_#20A2E2] focus-visible:outline-offset-2"
          style={{ justifySelf: 'start' }}
          aria-label="VigiMed"
        >
          <Image
            src="/brand/vigimed-wordmark-on-dark.png"
            alt="VigiMed"
            width={400}
            height={132}
            priority
            className="w-[144px] h-auto"
          />
        </Link>

        <nav
          aria-label={locale === 'mx-es' ? 'Segmentos de mercado' : 'Market segments'}
          className="flex items-stretch gap-6 lg:gap-8"
        >
          {navOrder.map((key) => {
            const parent = header.nav[key];
            if (!parent) return null;
            const isOpen = openKey === key;
            const isInactive = drawerOpen && !isOpen;
            return (
              <button
                key={key}
                ref={(el) => {
                  triggerRefs.current[key] = el;
                }}
                type="button"
                onClick={() => {
                  if (isOpen) {
                    closeDrawer();
                  } else {
                    openDrawerFor(key);
                  }
                }}
                onMouseEnter={() => {
                  if (drawerOpen && !isOpen) {
                    openDrawerFor(key);
                  }
                }}
                aria-haspopup="true"
                aria-expanded={isOpen}
                aria-controls={drawerId}
                className="group relative inline-flex items-center -mb-[2px] py-2 cursor-pointer focus:outline-none focus-visible:[outline:2px_solid_#20A2E2] focus-visible:outline-offset-2"
                style={{ gap: 8 }}
              >
                <ParentIcon
                  parentKey={key}
                  size={14}
                  className={isInactive ? 'opacity-55' : ''}
                />
                <span
                  className="font-ui"
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: isInactive
                      ? 'rgba(255, 255, 255, 0.55)'
                      : '#FFFFFF',
                    transition: `color ${UI_TRANSITION_MS}ms ${UI_TRANSITION_TIMING}`,
                  }}
                >
                  {parent.label}
                </span>
                <Chevron open={isOpen} />
                <span
                  aria-hidden="true"
                  className={
                    isOpen
                      ? 'absolute left-0 right-0 bottom-0 h-[2px] bg-brand-500'
                      : 'absolute left-0 right-0 bottom-0 h-[2px] bg-brand-500 opacity-0 group-hover:opacity-100 transition-opacity duration-[120ms] ease-out'
                  }
                />
              </button>
            );
          })}
        </nav>

        <div
          className="flex items-center gap-4 lg:gap-[22px]"
          style={{ justifySelf: 'end' }}
        >
          <a
            href={header.loginUrl}
            target="_self"
            className="font-ui transition-colors duration-[120ms] ease-out hover:text-text-on-dark focus:outline-none focus-visible:[outline:2px_solid_#20A2E2] focus-visible:outline-offset-2"
            style={{
              fontSize: 13,
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.7)',
            }}
          >
            {header.utility.login}
          </a>
          <button
            type="button"
            onClick={handleScrollCta}
            className="font-ui text-text-on-dark cursor-pointer focus:outline-none focus-visible:[outline:2px_solid_#20A2E2] focus-visible:outline-offset-2"
            style={{
              fontSize: 14,
              fontWeight: 500,
              background: '#20A2E2',
              border: 0,
              padding: '11px 22px',
              borderRadius: 6,
              transition: `background-color ${UI_TRANSITION_MS}ms ${UI_TRANSITION_TIMING}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1A8AC4';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#20A2E2';
            }}
          >
            {header.cta.demo}
          </button>
        </div>
      </div>

      <div
        aria-hidden={!drawerOpen}
        onClick={closeDrawer}
        className="hidden md:block fixed inset-x-0 bottom-0"
        style={{
          top: DROPDOWN_OFFSET_PX,
          background: 'rgba(0, 0, 0, 0.35)',
          opacity: drawerOpen ? 1 : 0,
          pointerEvents: drawerOpen ? 'auto' : 'none',
          transition: `opacity ${drawerOpen ? DRAWER_OPEN_MS : DRAWER_CLOSE_MS}ms ${drawerOpen ? DRAWER_OPEN_EASING : DRAWER_CLOSE_EASING}`,
          zIndex: 30,
        }}
      />

      <div
        id={drawerId}
        role="region"
        aria-label={
          activeParent
            ? `${activeParent.drawerName} ${locale === 'mx-es' ? 'menú' : 'menu'}`
            : undefined
        }
        className="hidden md:block fixed left-1/2"
        style={{
          top: DROPDOWN_OFFSET_PX,
          width: `min(${drawerWidthPx}px, calc(100vw - 32px))`,
          background: '#0A1628',
          borderRadius: '0 0 12px 12px',
          padding: `32px ${DRAWER_PADDING_X_PX}px 40px`,
          opacity: drawerOpen ? 1 : 0,
          transform: prefersReducedMotion
            ? 'translate(-50%, 0)'
            : drawerOpen
              ? 'translate(-50%, 0)'
              : 'translate(-50%, -100%)',
          pointerEvents: drawerOpen ? 'auto' : 'none',
          transition: prefersReducedMotion
            ? `opacity ${drawerOpen ? DRAWER_OPEN_MS : DRAWER_CLOSE_MS}ms ${drawerOpen ? DRAWER_OPEN_EASING : DRAWER_CLOSE_EASING}`
            : `opacity ${drawerOpen ? DRAWER_OPEN_MS : DRAWER_CLOSE_MS}ms ${drawerOpen ? DRAWER_OPEN_EASING : DRAWER_CLOSE_EASING}, transform ${drawerOpen ? DRAWER_OPEN_MS : DRAWER_CLOSE_MS}ms ${drawerOpen ? DRAWER_OPEN_EASING : DRAWER_CLOSE_EASING}`,
          zIndex: 31,
        }}
      >
        {activeParent ? (
          <>
            <div style={{ marginBottom: 28 }}>
              <div
                className="flex items-center"
                style={{ gap: 14, marginBottom: 12 }}
              >
                <ParentIcon parentKey={displayKey ?? ''} size={18} />
                <span
                  className="font-display text-text-on-dark"
                  style={{ fontSize: 18, fontWeight: 500 }}
                >
                  {activeParent.drawerName}
                </span>
              </div>
              <p
                className="font-ui"
                style={{
                  fontSize: 14,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: 'rgba(255, 255, 255, 0.75)',
                  whiteSpace: 'pre-line',
                  margin: 0,
                }}
              >
                {activeParent.drawerQuestion}
              </p>
            </div>
            <div
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${subsegmentCount}, ${CARD_WIDTH_PX}px)`,
                gap: CARD_GAP_PX,
              }}
            >
              {activeParent.subsegments.map((sub) => (
                <DrawerCard
                  key={sub.slug}
                  name={sub.name}
                  slug={sub.slug}
                  valueProp={sub.valueProp}
                  image={sub.image}
                  cardCta={header.cardCta}
                  onNavigate={handleCardNavigate}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
