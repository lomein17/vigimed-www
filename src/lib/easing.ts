// Shared easing functions for hand-rolled RAF animations across the
// codebase. Two curves currently in use:
//
//   easeInOutCubic: symmetric S-curve. Slow start, fast middle, slow
//     end. Used for deliberate CTA-driven scroll transitions where the
//     gradual build is part of the visual rhetoric (HeroCta).
//
//   easeOutCubic:  front-loaded curve. Fast start, slow end. Used for
//     discrete-gesture responses (Space-bar section advance, Section5
//     snap bridge) where the user expects immediate forward motion
//     followed by a clean settle.
//
// Add new easings here when needed elsewhere in the codebase rather
// than redefining inline.

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
