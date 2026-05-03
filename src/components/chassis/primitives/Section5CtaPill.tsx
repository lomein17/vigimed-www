'use client';

// Section 5 CTA pill. Renders the conversion-path triplet label per
// CONVERSION_CTA_LABELS and scrolls the user to the meeting-request
// form anchored within Section 5 itself, then places keyboard focus
// on the first form field. The form is the actual conversion target
// of the pill; the pill is the visual handoff between the framing
// copy above and the form below.

export function Section5CtaPill({ label }: { label: string }) {
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
      {label}
    </a>
  );
}
