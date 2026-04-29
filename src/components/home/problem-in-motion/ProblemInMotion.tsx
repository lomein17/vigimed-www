'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

import { homeContent as mxHome } from '@/content/mx-es/home';
import { homeContent as usHome } from '@/content/us-en/home';
import type { BreachState } from '@/content/us-en/home';
import type { Locale } from '@/lib/i18n';

const contentByLocale = {
  'mx-es': mxHome,
  'us-en': usHome,
} as const;

const VIDEO_SRC_DESKTOP = '/videos/pim-sterile-breach-1080.mp4';
const VIDEO_SRC_MOBILE = '/videos/pim-sterile-breach-480.mp4';
const POSTER_SRC = '/videos/pim-sterile-breach-poster.jpg';

const LOOP_DURATION_SEC = 14.0;

// Initial estimates. Pablo locks final values via UAT screen-share against the
// rendered staging clip and patches these two constants in a follow-up.
const GREEN_TO_AMBER_SEC = 3.5;
const AMBER_TO_RED_SEC = 9.0;

const STATE_SEQUENCE: ReadonlyArray<{
  state: BreachState;
  startSec: number;
  endSec: number;
}> = [
  { state: 'green', startSec: 0, endSec: GREEN_TO_AMBER_SEC },
  { state: 'amber', startSec: GREEN_TO_AMBER_SEC, endSec: AMBER_TO_RED_SEC },
  { state: 'red', startSec: AMBER_TO_RED_SEC, endSec: LOOP_DURATION_SEC },
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

const REDUCED_MOTION_SEQUENCE_MS: ReadonlyArray<{
  state: BreachState;
  durationMs: number;
}> = [
  { state: 'green', durationMs: 4000 },
  { state: 'amber', durationMs: 5000 },
  { state: 'red', durationMs: 5000 },
];

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

function stateAtCurrentTimeSec(currentTimeSec: number): BreachState {
  const positionSec =
    ((currentTimeSec % LOOP_DURATION_SEC) + LOOP_DURATION_SEC) %
    LOOP_DURATION_SEC;
  for (const entry of STATE_SEQUENCE) {
    if (positionSec >= entry.startSec && positionSec < entry.endSec) {
      return entry.state;
    }
  }
  return 'green';
}

export function ProblemInMotion({ locale }: { locale: Locale }) {
  const home = contentByLocale[locale];
  const content = home.problemInMotion;

  const [state, setState] = useState<BreachState>('green');
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const videoEl = videoRef.current;
    if (videoEl === null) return;

    const sync = () => {
      const next = stateAtCurrentTimeSec(videoEl.currentTime);
      setState((prev) => (prev === next ? prev : next));
    };

    videoEl.addEventListener('timeupdate', sync);
    videoEl.addEventListener('seeked', sync);
    return () => {
      videoEl.removeEventListener('timeupdate', sync);
      videoEl.removeEventListener('seeked', sync);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!prefersReducedMotion) return;

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const step = (index: number) => {
      if (cancelled) return;
      const entry = REDUCED_MOTION_SEQUENCE_MS[index];
      if (entry === undefined) return;
      setState(entry.state);
      const nextIndex = (index + 1) % REDUCED_MOTION_SEQUENCE_MS.length;
      timeoutId = setTimeout(() => step(nextIndex), entry.durationMs);
    };

    step(0);

    return () => {
      cancelled = true;
      if (timeoutId !== null) clearTimeout(timeoutId);
    };
  }, [prefersReducedMotion]);

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
          {prefersReducedMotion ? (
            <Image
              className="vm-pim-video"
              src={POSTER_SRC}
              alt={content.videoAriaLabel}
              fill
              priority
              sizes="(min-width: 768px) 1280px, 100vw"
            />
          ) : (
            <>
              {/*
                Responsive video pattern (VM-417): two H.264 MP4 sources behind
                the same <video> element. The 1080p source serves desktop
                (>= 768px viewport), the 480p source serves mobile and acts as
                fallback. Browsers pick at element creation; window resize does
                not re-evaluate. Native HTML5 loop. Subsequent asset wiring
                (Hero, Loop, Moat, Final CTA) follows this shape.
              */}
              <video
                ref={videoRef}
                className="vm-pim-video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={POSTER_SRC}
                aria-label={content.videoAriaLabel}
              >
                <source
                  src={VIDEO_SRC_DESKTOP}
                  type="video/mp4"
                  media="(min-width: 768px)"
                />
                <source src={VIDEO_SRC_MOBILE} type="video/mp4" />
              </video>
            </>
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
        </div>

        <p className="vm-pim-caption">{content.sceneCaption}</p>
      </div>
    </section>
  );
}
