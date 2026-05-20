'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

// VM-494 A.3 Headroom auto-hide.
//
// Gating: (max-width: 1023px) and prefers-reduced-motion: no-preference.
// Outside the gate the shell renders inert: no listeners, no transform,
// no console activity. The two media queries are observed live so a
// device-rotation or settings change flips behavior without reload.
//
// Hide rule: scrollY > 80 with a downward delta translates the header
// off-top by 100% plus the 3px divider so the brand-pulse line clears
// the viewport alongside the header.
//
// Reveal rule: any upward delta > 4px reveals. The 4px floor absorbs
// scroll jitter on touch surfaces without trapping the user under a
// hidden header.
//
// Drawer coordination: any descendant (HeaderMobile) registers a closer
// via context. When a hide is about to trigger while the drawer is
// open, the closer fires and the hide is deferred to the next downward
// delta. This keeps the drawer's open/close transit visually anchored
// to the chrome rather than smearing alongside a translating header.

type DrawerCloser = () => boolean;

const StickyNavShellContext = createContext<{
  registerDrawerCloser: (closer: DrawerCloser | null) => void;
} | null>(null);

export function useRegisterDrawerCloser(closer: DrawerCloser) {
  const ctx = useContext(StickyNavShellContext);
  useEffect(() => {
    if (!ctx) return;
    ctx.registerDrawerCloser(closer);
    return () => ctx.registerDrawerCloser(null);
  }, [ctx, closer]);
}

const HIDE_THRESHOLD_PX = 80;
const REVEAL_DELTA_PX = 4;
const DIVIDER_HEIGHT_PX = 3;
const HIDE_TRANSFORM = `translateY(calc(-100% - ${DIVIDER_HEIGHT_PX}px))`;
// At rest the transform is `none` rather than `translateY(0)`. The
// header contains position: fixed descendants (HeaderMobile's drawer
// scrim and sheet); any non-none transform (or `will-change: transform`)
// on an ancestor establishes a containing block for fixed children,
// which would re-root them to the 75px-tall header box and collapse
// the drawer. Transitioning from `none` to a translate is well-
// supported across modern browsers (interpreted as identity-to-target).
// Once `hidden` flips true the drawer is already closed (the closer
// callback fired one frame earlier) and the shell's transform-induced
// containing block has no visible side effect.
const TRANSITION = 'transform 220ms cubic-bezier(0.4, 0, 0.2, 1)';

export function StickyNavShell({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false);
  const drawerCloserRef = useRef<DrawerCloser | null>(null);

  const registerDrawerCloser = useCallback(
    (closer: DrawerCloser | null) => {
      drawerCloserRef.current = closer;
    },
    [],
  );

  useEffect(() => {
    const mqMobile = window.matchMedia('(max-width: 1023px)');
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    let lastY = window.scrollY;
    let ticking = false;
    let scrollBound = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;
        if (y > HIDE_THRESHOLD_PX && delta > 0) {
          if (drawerCloserRef.current?.()) {
            // Drawer was open; close it this frame, defer the hide to
            // the next downward delta.
          } else {
            setHidden(true);
          }
        } else if (delta < -REVEAL_DELTA_PX) {
          setHidden(false);
        }
        lastY = y;
        ticking = false;
      });
    }

    function bindScroll() {
      if (scrollBound) return;
      lastY = window.scrollY;
      window.addEventListener('scroll', onScroll, { passive: true });
      scrollBound = true;
    }

    function unbindScroll() {
      if (!scrollBound) return;
      window.removeEventListener('scroll', onScroll);
      scrollBound = false;
    }

    function applyGate() {
      const enabled = mqMobile.matches && !mqReduce.matches;
      if (enabled) {
        bindScroll();
      } else {
        unbindScroll();
        setHidden(false);
      }
    }

    applyGate();
    mqMobile.addEventListener('change', applyGate);
    mqReduce.addEventListener('change', applyGate);

    return () => {
      unbindScroll();
      mqMobile.removeEventListener('change', applyGate);
      mqReduce.removeEventListener('change', applyGate);
    };
  }, []);

  // VM-494 round 3. Publish the effective nav height to consumers that
  // need to compensate for Headroom hide: scroll-padding-top (anchor
  // landings) and Section5SnapBridge (Space/PageDown target math).
  // Section sizing math intentionally keeps using --vm-nav-h so the
  // chassis does not reflow as the header animates.
  //
  // VM-520 r2: the published value is now viewport-aware. The mobile
  // chrome no longer carries a 3px brand-pulse divider, so the band is
  // 72px below lg and 75px at lg+. A matchMedia listener keeps the
  // value live across device-rotation and resize.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023.98px)');
    const apply = () => {
      const navH = mq.matches ? 72 : 75;
      document.documentElement.style.setProperty(
        '--vm-nav-effective-h',
        hidden ? '0px' : `${navH}px`,
      );
    };
    apply();
    mq.addEventListener('change', apply);
    return () => {
      mq.removeEventListener('change', apply);
      document.documentElement.style.removeProperty('--vm-nav-effective-h');
    };
  }, [hidden]);

  return (
    <StickyNavShellContext.Provider value={{ registerDrawerCloser }}>
      <header
        className="sticky top-0 z-40 bg-navy-800"
        style={{
          transform: hidden ? HIDE_TRANSFORM : 'none',
          transition: TRANSITION,
        }}
      >
        {children}
      </header>
    </StickyNavShellContext.Provider>
  );
}
