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

const REST_FADE_MS = 500;
const REST_HOLD_MS = 1000;
const REST_TOTAL_MS = REST_FADE_MS + REST_HOLD_MS;

const GREEN_TO_AMBER_SEC = 6.5;
const AMBER_TO_RED_SEC = 9.5;

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

const REDUCED_MOTION_SEQUENCE: ReadonlyArray<{
  state: BreachState;
  restProgress: number;
  durationMs: number;
}> = [
  { state: 'green', restProgress: 0, durationMs: 4000 },
  { state: 'amber', restProgress: 0, durationMs: 5000 },
  { state: 'red', restProgress: 0, durationMs: 5000 },
  { state: 'red', restProgress: 1, durationMs: 1500 },
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
  if (currentTimeSec < GREEN_TO_AMBER_SEC) return 'green';
  if (currentTimeSec < AMBER_TO_RED_SEC) return 'amber';
  return 'red';
}

export function ProblemInMotion({ locale }: { locale: Locale }) {
  const home = contentByLocale[locale];
  const content = home.problemInMotion;

  const [state, setState] = useState<BreachState>('green');
  const [restProgress, setRestProgress] = useState(0);
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

    let rafHandle: number | null = null;

    const sync = () => {
      const next = stateAtCurrentTimeSec(videoEl.currentTime);
      setState((prev) => (prev === next ? prev : next));
    };

    const handleEnded = () => {
      const startMs = performance.now();
      const tick = () => {
        const elapsed = performance.now() - startMs;
        if (elapsed >= REST_TOTAL_MS) {
          rafHandle = null;
          videoEl.currentTime = 0;
          setState('green');
          setRestProgress(0);
          videoEl.play().catch(() => {});
          return;
        }
        const progress = elapsed < REST_FADE_MS ? elapsed / REST_FADE_MS : 1;
        setRestProgress(progress);
        rafHandle = requestAnimationFrame(tick);
      };
      tick();
    };

    videoEl.addEventListener('timeupdate', sync);
    videoEl.addEventListener('seeked', sync);
    videoEl.addEventListener('ended', handleEnded);
    return () => {
      videoEl.removeEventListener('timeupdate', sync);
      videoEl.removeEventListener('seeked', sync);
      videoEl.removeEventListener('ended', handleEnded);
      if (rafHandle !== null) cancelAnimationFrame(rafHandle);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!prefersReducedMotion) return;

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const step = (index: number) => {
      if (cancelled) return;
      const entry = REDUCED_MOTION_SEQUENCE[index];
      if (entry === undefined) return;
      setState(entry.state);
      setRestProgress(entry.restProgress);
      const nextIndex = (index + 1) % REDUCED_MOTION_SEQUENCE.length;
      timeoutId = setTimeout(() => step(nextIndex), entry.durationMs);
    };

    step(0);

    return () => {
      cancelled = true;
      if (timeoutId !== null) clearTimeout(timeoutId);
    };
  }, [prefersReducedMotion]);

  const bannerStyle = BANNER_STYLE[state];
  const overlayOpacity = 1 - restProgress;

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
              style={{ opacity: overlayOpacity }}
            />
          ) : (
            <>
              {/*
                Responsive video pattern (VM-417): two H.264 MP4 sources behind
                the same <video> element. The 1080p source serves desktop
                (>= 768px viewport), the 480p source serves mobile and acts as
                fallback. Browsers pick at element creation; window resize does
                not re-evaluate. Loop is driven manually via the ended event so
                a 500ms fade plus 1000ms black hold can run before currentTime
                resets, masking the frame jump at the seam. Subsequent asset
                wiring (Hero, Loop, Moat, Final CTA) follows this shape.
              */}
              <video
                ref={videoRef}
                className="vm-pim-video"
                autoPlay
                muted
                playsInline
                preload="metadata"
                poster={POSTER_SRC}
                aria-label={content.videoAriaLabel}
                style={{ opacity: overlayOpacity }}
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
            style={{
              background: FILTER_COLOR[state],
              opacity: overlayOpacity,
            }}
          />

          <div
            className="vm-pim-banner"
            style={{
              color: bannerStyle.color,
              borderColor: bannerStyle.border,
              opacity: overlayOpacity,
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
