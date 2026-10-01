/**
 * Small seeded random numbers, so every folder gets its own slight tilt, paper offsets and tab
 * position, and keeps them between renders (and between server and browser).
 */

/** A 32-bit hash of a string (FNV-1a) */
function hash(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Returns a function that gives the same sequence of numbers between 0 and 1 for the same seed (mulberry32) */
export function seeded(seed: string) {
  let a = hash(seed);
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A number between min and max, rounded to two decimals so server and browser agree */
export function between(rand: () => number, min: number, max: number) {
  return Math.round((min + rand() * (max - min)) * 100) / 100;
}
