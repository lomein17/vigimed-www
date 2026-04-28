'use client';

import { useEffect, useRef, type ReactNode } from 'react';

// Activation radius (px) and pull strength (k). Tunable per VM-412 acceptance.
const ACTIVATION_RADIUS = 70;
const STRENGTH = 0.18;
const SCALE_HOVER = '1.15';
const LERP = 0.1;

export function IntegrationsMagnetic({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container === null) return;

    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tiles = Array.from(
      container.querySelectorAll<HTMLElement>('.vm-integrations-tile'),
    );
    if (tiles.length === 0) return;

    const cursor = { x: -9999, y: -9999, active: false };
    const states = tiles.map(() => ({ tx: 0, ty: 0 }));

    const onPointerMove = (e: PointerEvent) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
      cursor.active = true;
    };
    const onPointerLeave = () => {
      cursor.active = false;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);

    let raf = 0;
    const tick = () => {
      let i = 0;
      for (const tile of tiles) {
        const state = states[i];
        i += 1;
        if (state === undefined) continue;

        const rect = tile.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = cursor.x - cx;
        const dy = cursor.y - cy;
        const d = Math.hypot(dx, dy);

        const inRange = cursor.active && d < ACTIVATION_RADIUS;
        const targetTx = inRange ? dx * STRENGTH : 0;
        const targetTy = inRange ? dy * STRENGTH : 0;

        state.tx += (targetTx - state.tx) * LERP;
        state.ty += (targetTy - state.ty) * LERP;

        tile.style.transform = `translate(${state.tx.toFixed(2)}px, ${state.ty.toFixed(2)}px)`;
        tile.style.scale = inRange ? SCALE_HOVER : '';
        tile.style.zIndex = inRange ? '10' : '';
      }
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      for (const tile of tiles) {
        tile.style.transform = '';
        tile.style.scale = '';
        tile.style.zIndex = '';
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="vm-integrations-magnetic">
      {children}
    </div>
  );
}
