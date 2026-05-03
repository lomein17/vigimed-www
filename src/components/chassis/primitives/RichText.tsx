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
        return <span key={i}>{seg.text}</span>;
      })}
    </>
  );
}
