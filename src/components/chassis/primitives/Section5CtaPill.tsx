'use client';

export function Section5CtaPill({ label }: { label: string }) {
  return (
    <a
      href="#"
      aria-disabled="true"
      onClick={(e) => e.preventDefault()}
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
