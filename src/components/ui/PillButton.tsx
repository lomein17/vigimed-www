import Link from 'next/link';
import type { ReactNode } from 'react';

export function PillButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full bg-brand-500 hover:bg-brand-400 text-navy-900 font-ui text-button px-8 py-4 transition-colors duration-[180ms] ease-out"
    >
      {children}
    </Link>
  );
}
