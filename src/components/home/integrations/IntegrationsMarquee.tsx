'use client';

import { useEffect, useRef } from 'react';

import type { IntegrationsTile } from '@/content/us-en/home';

const TARGET_VEL = -28; // px/s, right-to-left
const VEL_LERP = 0.10;

export function IntegrationsMarquee({
  tiles,
  className,
}: {
  tiles: ReadonlyArray<IntegrationsTile>;
  className?: string;
}) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (viewport === null || track === null) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let offset = 0;
    let velocity = 0;
    let targetVelocity = reducedMotion ? 0 : TARGET_VEL;
    let dragging = false;
    let lastX = 0;
    let setWidth = 0;
    let rafId = 0;
    let lastFrameTime = 0;

    const measure = () => {
      const tile = track.querySelector<HTMLElement>('.vm-integrations-marquee__tile');
      if (tile === null) {
        setWidth = 0;
        return;
      }
      const tileRect = tile.getBoundingClientRect();
      const trackStyle = window.getComputedStyle(track);
      const gap = parseFloat(trackStyle.columnGap || trackStyle.gap || '0') || 0;
      setWidth = tiles.length * (tileRect.width + gap);
    };

    const wrap = () => {
      if (setWidth <= 0) return;
      while (offset <= -setWidth) offset += setWidth;
      while (offset > 0) offset -= setWidth;
    };

    const apply = () => {
      track.style.transform = `translate3d(${offset.toFixed(2)}px, 0, 0)`;
    };

    const tick = (now: number) => {
      const dt = lastFrameTime === 0 ? 0 : Math.min(0.05, (now - lastFrameTime) / 1000);
      lastFrameTime = now;

      if (!dragging) {
        velocity += (targetVelocity - velocity) * VEL_LERP;
        offset += velocity * dt;
        wrap();
        apply();
      }

      rafId = window.requestAnimationFrame(tick);
    };

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      velocity = 0;
      targetVelocity = 0;
      lastX = e.clientX;
      viewport.classList.add('is-grabbing');
      try {
        viewport.setPointerCapture(e.pointerId);
      } catch {
        // setPointerCapture can throw if pointer is already captured elsewhere; ignore.
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      offset += e.clientX - lastX;
      lastX = e.clientX;
      wrap();
      apply();
    };

    const endDrag = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      targetVelocity = reducedMotion ? 0 : TARGET_VEL;
      viewport.classList.remove('is-grabbing');
      try {
        viewport.releasePointerCapture(e.pointerId);
      } catch {
        // releasePointerCapture can throw if the pointer is no longer captured; ignore.
      }
    };

    viewport.addEventListener('pointerdown', onPointerDown);
    viewport.addEventListener('pointermove', onPointerMove);
    viewport.addEventListener('pointerup', endDrag);
    viewport.addEventListener('pointercancel', endDrag);

    const ro = new ResizeObserver(() => {
      measure();
    });
    ro.observe(viewport);

    measure();
    apply();
    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      ro.disconnect();
      viewport.removeEventListener('pointerdown', onPointerDown);
      viewport.removeEventListener('pointermove', onPointerMove);
      viewport.removeEventListener('pointerup', endDrag);
      viewport.removeEventListener('pointercancel', endDrag);
      viewport.classList.remove('is-grabbing');
    };
  }, [tiles]);

  const wrapperClass = ['vm-integrations-marquee', className].filter(Boolean).join(' ');
  const doubled = [...tiles, ...tiles];

  return (
    <div ref={viewportRef} className={wrapperClass} data-marquee>
      <div ref={trackRef} className="vm-integrations-marquee__track">
        {doubled.map((tile, i) => (
          <div key={`${tile.name}-${i}`} className="vm-integrations-marquee__tile">
            {/* eslint-disable-next-line @next/next/no-img-element -- static brand logos served from /public; SVG path requires dangerouslyAllowSVG on next/image */}
            <img
              src={tile.src}
              alt={tile.alt}
              width={tile.width}
              height={tile.height}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
