'use client';

import Link from 'next/link';

import type { Locale } from '@/lib/i18n';

// Section 5 CTA pill. Two variants:
//
//   - 'navy' (legacy, home-variant render path): brand-cyan fill on
//     navy, white text, smooth-scrolls to the in-page meeting-request
//     form anchored within Section 5 itself and focuses the first
//     field. The form is the actual conversion target; the pill is
//     the visual handoff between the framing copy above and the form
//     below.
//
//   - 'light' (VM-456 D-S56-1, segment-variant render path): the
//     contracted segment-page §F has no form. The pill is a plain
//     anchor to /{locale}/#final-cta, deferring to the Home Final CTA
//     as the single conversion destination site-wide. Brand-cyan fill
//     on off-white, navy text.

type Section5CtaPillProps =
  | {
      variant: 'navy';
      label: string;
    }
  | {
      variant: 'light';
      label: string;
      locale: Locale;
    };

export function Section5CtaPill(props: Section5CtaPillProps) {
  if (props.variant === 'light') {
    return (
      <Link
        href={`/${props.locale}/#final-cta`}
        className="relative inline-flex items-center justify-center h-[38px] px-[18px] rounded-md border border-brand-500 bg-brand-500 hover:bg-brand-400 hover:border-brand-400 box-border font-ui text-button text-text-on-dark transition-colors"
      >
        <span aria-hidden="true" className="absolute inset-x-0 -inset-y-[3px]" />
        <span className="relative">{props.label}</span>
      </Link>
    );
  }

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const anchor = document.querySelector<HTMLElement>(
      '[data-meeting-form-anchor]',
    );
    if (!anchor) return;
    anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const firstField = anchor.querySelector<HTMLElement>(
      'input, select, textarea',
    );
    firstField?.focus({ preventScroll: true });
  }

  return (
    <a
      href="#"
      onClick={handleClick}
      className="inline-flex items-center justify-center rounded-md px-6 py-3 font-ui text-white"
      style={{
        backgroundColor: 'var(--color-brand-500)',
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: '0.02em',
      }}
    >
      {props.label}
    </a>
  );
}
