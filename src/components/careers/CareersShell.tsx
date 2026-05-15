import type { CareersContent } from '@/content/us-en/careers';

export function CareersShell({ content }: { content: CareersContent }) {
  return (
    <main className="min-h-[60vh] bg-navy-900 text-text-on-dark">
      <div className="grid grid-cols-1 md:grid-cols-[260px_minmax(0,1fr)_320px]">
        <div
          aria-hidden="true"
          className="md:border-r md:border-white/10 px-6 py-10"
        />

        <div className="flex flex-col items-center justify-center text-center px-6 py-16 md:py-24 gap-4">
          <span className="font-ui text-eyebrow uppercase tracking-[0.18em] text-brand-500">
            {content.eyebrow}
          </span>
          <h1 className="font-display text-h2 md:text-h1 max-w-[28ch]">
            {content.heading}
          </h1>
          <p className="font-body text-body text-text-on-dark-muted max-w-[52ch]">
            {content.body}
          </p>
        </div>

        <div
          aria-hidden="true"
          className="md:border-l md:border-white/10 px-6 py-10"
        />
      </div>
    </main>
  );
}
