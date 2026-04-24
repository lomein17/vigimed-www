'use client';

import { useEffect, useRef, useState } from 'react';

import { homeContent as mxHome } from '@/content/mx-es/home';
import { homeContent as usHome } from '@/content/us-en/home';
import type { BreachState } from '@/content/us-en/home';
import type { Locale } from '@/lib/i18n';

const contentByLocale = {
  'mx-es': mxHome,
  'us-en': usHome,
} as const;

// Flip this to the real MP4 path to activate the real video; placeholder
// renders when null. Single-line swap is intentional: VM-360 lands the real
// 12-second scene by changing only this constant (and the timing config).
const SCENE_VIDEO_SRC: string | null = null;

const LOOP_MS = 12000;

// Even 4/4/4 split placeholder. VM-360 replaces this with a per-scene config
// driven by the real MP4's visual cues (nurse enters buffer zone = amber,
// crosses sterile line = red).
const STATE_SEQUENCE: ReadonlyArray<{
  state: BreachState;
  startMs: number;
  endMs: number;
}> = [
  { state: 'green', startMs: 0, endMs: 4000 },
  { state: 'amber', startMs: 4000, endMs: 8000 },
  { state: 'red', startMs: 8000, endMs: LOOP_MS },
];

const FILTER_COLOR: Record<BreachState, string> = {
  green: 'rgba(29, 158, 117, 0.26)',
  amber: 'rgba(239, 159, 39, 0.32)',
  red: 'rgba(226, 75, 74, 0.36)',
};

const BANNER_STYLE: Record<BreachState, { color: string; border: string }> = {
  green: { color: '#9FE1CB', border: 'rgba(159, 225, 203, 0.4)' },
  amber: { color: '#FAC775', border: 'rgba(250, 199, 117, 0.5)' },
  red: { color: '#F7C1C1', border: 'rgba(247, 193, 193, 0.55)' },
};

function stateAtElapsed(elapsedMs: number): BreachState {
  for (const entry of STATE_SEQUENCE) {
    if (elapsedMs >= entry.startMs && elapsedMs < entry.endMs) {
      return entry.state;
    }
  }
  return 'green';
}

function formatTimestamp(elapsedMs: number): string {
  const seconds = Math.min(12, Math.floor(elapsedMs / 1000));
  return `00:${seconds.toString().padStart(2, '0')}`;
}

export function ProblemInMotion({ locale }: { locale: Locale }) {
  const home = contentByLocale[locale];
  const content = home.problemInMotion;
  const placeholderLabel = home.placeholderLabel;

  const [state, setState] = useState<BreachState>('green');
  const [elapsedMs, setElapsedMs] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    let rafId = 0;
    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = (now - startRef.current) % LOOP_MS;
      const nextState = stateAtElapsed(elapsed);
      setState((prev) => (prev === nextState ? prev : nextState));
      setElapsedMs(elapsed);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const bannerStyle = BANNER_STYLE[state];

  return (
    <section
      aria-labelledby="problem-in-motion-heading"
      className="vm-pim-section"
    >
      <div className="vm-pim-inner">
        <p className="vm-pim-eyebrow">{content.eyebrow}</p>
        <h2 id="problem-in-motion-heading" className="vm-pim-headline">
          {content.headlineLine1}
          <br />
          {content.headlineLine2}
        </h2>
        <p className="vm-pim-frame">{content.frame}</p>

        <div className="vm-pim-scene">
          {SCENE_VIDEO_SRC !== null ? (
            <video
              className="vm-pim-video"
              src={SCENE_VIDEO_SRC}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <div className="vm-pim-placeholder" aria-hidden="true">
              <span className="vm-pim-placeholder-label">
                {placeholderLabel}
              </span>
            </div>
          )}

          <div
            className="vm-pim-filter"
            aria-hidden="true"
            style={{ background: FILTER_COLOR[state] }}
          />

          <div
            className="vm-pim-banner"
            style={{
              color: bannerStyle.color,
              borderColor: bannerStyle.border,
            }}
          >
            {content.banners[state]}
          </div>

          <div className="vm-pim-stamp">{formatTimestamp(elapsedMs)}</div>
        </div>

        <p className="vm-pim-caption">{content.sceneCaption}</p>

        <ol className="vm-pim-timeline">
          {content.timeline.map((node) => (
            <li key={node.timestamp} className="vm-pim-timeline-node">
              <span className="vm-pim-timeline-dot" aria-hidden="true" />
              <span className="vm-pim-timeline-timestamp">
                {node.timestamp}
              </span>
              <span className="vm-pim-timeline-event">{node.event}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
