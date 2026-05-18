'use client';

import { useEffect, useRef, useState } from 'react';

import { HeroCta } from './HeroCta';

type HeroMediaProps = {
  heroVideo: { desktop: string; mobile: string; poster: string };
  mobileH1: string;
  mobileH2: string;
  ctaLabel: string;
  playLabel: string;
  pauseLabel: string;
};

export function HeroMedia({
  heroVideo,
  mobileH1,
  mobileH2,
  ctaLabel,
  playLabel,
  pauseLabel,
}: HeroMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<'playing' | 'paused'>('playing');

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onPlay = () => setState('playing');
    const onPause = () => setState('paused');
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);

    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    // If the video was already playing, v.pause() fires the pause event and
    // the listener flips state to 'paused'. If autoplay hadn't yet started,
    // the pause is a no-op; the once:true play listener re-pauses on the
    // first autoplay attempt so state converges to 'paused' via events
    // alone (avoids setState-in-effect).
    let onceRePause: (() => void) | undefined;
    if (reduce) {
      v.pause();
      onceRePause = () => {
        v.pause();
      };
      v.addEventListener('play', onceRePause, { once: true });
    }

    return () => {
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
      if (onceRePause) v.removeEventListener('play', onceRePause);
    };
  }, []);

  function handleToggle() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }

  return (
    <>
      <video
        ref={videoRef}
        aria-hidden="true"
        autoPlay
        muted
        playsInline
        loop
        preload="metadata"
        poster={heroVideo.poster}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          filter: 'saturate(0.6)',
        }}
      >
        <source
          src={heroVideo.desktop}
          type="video/mp4"
          media="(min-width: 768px)"
        />
        <source src={heroVideo.mobile} type="video/mp4" />
      </video>

      <div
        aria-hidden="true"
        className="hidden md:block absolute inset-0"
        style={{
          background: 'rgba(0,0,0,0.30)',
        }}
      />
      <div
        aria-hidden="true"
        className="hidden md:block absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.10) 25%, rgba(0,0,0,0) 100%)',
        }}
      />

      <div
        aria-hidden="true"
        className="md:hidden absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,22,40,0.30) 0%, rgba(10,22,40,0.45) 55%, rgba(10,22,40,0.78) 100%), linear-gradient(90deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.10) 60%, rgba(0,0,0,0) 100%)',
        }}
      />

      <button
        type="button"
        className="md:hidden vm-hero-playpause"
        data-state={state}
        aria-label={state === 'playing' ? pauseLabel : playLabel}
        onClick={handleToggle}
      >
        <svg
          className="vm-hero-playpause__play"
          aria-hidden="true"
          width="16"
          height="18"
          viewBox="0 0 16 18"
          fill="currentColor"
        >
          <path d="M2 1.5 L14 9 L2 16.5 Z" />
        </svg>
        <svg
          className="vm-hero-playpause__pause"
          aria-hidden="true"
          width="14"
          height="16"
          viewBox="0 0 14 16"
          fill="currentColor"
        >
          <rect x="1" y="1" width="4" height="14" rx="1" />
          <rect x="9" y="1" width="4" height="14" rx="1" />
        </svg>
      </button>

      <div
        className="md:hidden absolute inset-x-0 bottom-0 z-10 flex flex-col items-start gap-3 px-6 pb-7"
        style={{ top: '62%' }}
      >
        <h1
          id="hero-headline-mobile"
          style={{
            color: '#FFFFFF',
            fontSize: 24,
            fontWeight: 500,
            lineHeight: 1.16,
            letterSpacing: '-0.012em',
            textWrap: 'pretty',
          }}
        >
          {mobileH1}
        </h1>
        <p
          className="font-body"
          style={{
            color: 'rgba(255,255,255,0.88)',
            fontSize: 16,
            fontWeight: 400,
            lineHeight: 1.42,
            letterSpacing: '-0.005em',
            textWrap: 'pretty',
          }}
        >
          {mobileH2}
        </p>
        <HeroCta label={ctaLabel} targetId="final-cta" />
      </div>
    </>
  );
}
