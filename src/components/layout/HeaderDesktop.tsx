'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

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
const TRANSITION_MS = 150;
const TRANSITION_TIMING = 'cubic-bezier(0.4, 0, 0.2, 1)';

const CARD_WIDTH_PX = 380;
const CARD_GAP_PX = 20;
const DRAWER_PADDING_X_PX = 32;
const DRAWER_MIN_INNER_WIDTH_PX = 700;

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
        transition: `transform ${TRANSITION_MS}ms ${TRANSITION_TIMING}, stroke ${TRANSITION_MS}ms ${TRANSITION_TIMING}`,
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
        {valueProp ? (
          <p
            className="font-ui"
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.65)',
              lineHeight: 1.4,
              margin: '8px 0 0 0',
            }}
          >
            {valueProp}
          </p>
        ) : null}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
          <span
            className="inline-flex items-center font-ui transition-transform duration-[120ms] ease-out group-hover:translate-x-[2px]"
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
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);
  const drawerId = useId();
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const lastOpenedByRef = useRef<string | null>(null);

  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (openKey !== null) {
      setOpenKey(null);
    }
  }

  const closeDrawer = useCallback(() => {
    const lastTriggerKey = lastOpenedByRef.current;
    setOpenKey(null);
    requestAnimationFrame(() => {
      if (lastTriggerKey) {
        triggerRefs.current[lastTriggerKey]?.focus();
      }
      lastOpenedByRef.current = null;
    });
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
  const activeParent: HeaderParent | undefined = openKey
    ? header.nav[openKey]
    : undefined;

  const subsegmentCount = activeParent?.subsegments.length ?? 0;
  const cardsRowWidth =
    subsegmentCount * CARD_WIDTH_PX +
    Math.max(0, subsegmentCount - 1) * CARD_GAP_PX;
  const innerWidth = Math.max(cardsRowWidth, DRAWER_MIN_INNER_WIDTH_PX);
  const drawerWidthPx = innerWidth + 2 * DRAWER_PADDING_X_PX;

  return (
    <div
      className="hidden md:flex relative items-center justify-between gap-6 mx-auto h-[72px] px-6 lg:px-8"
      style={{ maxWidth: 'var(--container-content)' }}
    >
      <div className="flex items-center gap-6 lg:gap-12">
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
                    transition: `color ${TRANSITION_MS}ms ${TRANSITION_TIMING}`,
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
      </div>

      <div className="flex items-center gap-4 lg:gap-[22px]">
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
            transition: `background-color ${TRANSITION_MS}ms ${TRANSITION_TIMING}`,
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

      <div
        aria-hidden={!drawerOpen}
        onClick={closeDrawer}
        className="fixed inset-x-0 bottom-0"
        style={{
          top: DROPDOWN_OFFSET_PX,
          background: 'rgba(0, 0, 0, 0.75)',
          opacity: drawerOpen ? 1 : 0,
          pointerEvents: drawerOpen ? 'auto' : 'none',
          transition: `opacity ${TRANSITION_MS}ms ${TRANSITION_TIMING}`,
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
        className="fixed left-1/2"
        style={{
          top: DROPDOWN_OFFSET_PX,
          width: `min(${drawerWidthPx}px, calc(100vw - 32px))`,
          background: '#0A1628',
          borderRadius: '0 0 12px 12px',
          padding: `32px ${DRAWER_PADDING_X_PX}px 40px`,
          opacity: drawerOpen ? 1 : 0,
          transform: drawerOpen
            ? 'translate(-50%, 0)'
            : 'translate(-50%, -10px)',
          pointerEvents: drawerOpen ? 'auto' : 'none',
          transition: `opacity ${TRANSITION_MS}ms ${TRANSITION_TIMING}, transform ${TRANSITION_MS}ms ${TRANSITION_TIMING}`,
          zIndex: 31,
        }}
      >
        {activeParent ? (
          <>
            <div
              className="flex items-center"
              style={{ marginBottom: 28, gap: 14 }}
            >
              <ParentIcon parentKey={openKey ?? ''} size={18} />
              <span
                className="font-display text-text-on-dark"
                style={{ fontSize: 18, fontWeight: 500 }}
              >
                {activeParent.drawerName}
              </span>
              <span
                aria-hidden="true"
                style={{
                  color: 'rgba(32, 162, 226, 0.5)',
                  fontSize: 18,
                  fontWeight: 300,
                  padding: '0 4px',
                }}
              >
                |
              </span>
              <span
                className="font-ui"
                style={{
                  fontSize: 14,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: 'rgba(255, 255, 255, 0.75)',
                  whiteSpace: 'pre-line',
                }}
              >
                {activeParent.drawerQuestion}
              </span>
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
    </div>
  );
}
