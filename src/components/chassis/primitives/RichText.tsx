import type { RichSegment } from '@/lib/chassis/slots';

export function RichText({ segments }: { segments: readonly RichSegment[] }) {
  return (
    <>
      {segments.map((seg, i) => {
        if (seg.emphasis === 'bold-amber') {
          return (
            <strong key={i} className="font-semibold text-brand-amber">
              {seg.text}
            </strong>
          );
        }
        if (seg.emphasis === 'brand-cyan') {
          return (
            <span key={i} className="text-brand-500">
              {seg.text}
            </span>
          );
        }
        if (seg.emphasis === 'amber') {
          // VM-459 v1.16: color-only amber span. No font-weight override
          // and no <strong> semantic; weight inherits from the parent so
          // a page-title H1 at fontWeight: 400 keeps the amber segment at
          // regular weight. Distinct from 'bold-amber' which carries
          // semantic emphasis + font-semibold.
          return (
            <span key={i} className="text-brand-amber">
              {seg.text}
            </span>
          );
        }
        return <span key={i}>{seg.text}</span>;
      })}
    </>
  );
}
