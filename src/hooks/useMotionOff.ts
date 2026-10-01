"use client";

import { useReducedMotion } from "motion/react";
import { useCaseFile } from "@/lib/store";

/**
 * True when motion should be skipped: either the device asks for reduced motion,
 * or the student turned on "Reduce motion" in the profile menu.
 * Motion's own components follow the same rule through MotionConfig (see Providers).
 */
export function useMotionOff(): boolean {
  const system = useReducedMotion();
  const { reduceMotion } = useCaseFile();
  return Boolean(system) || reduceMotion;
}
