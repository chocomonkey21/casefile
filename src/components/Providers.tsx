"use client";

import { MotionConfig } from "motion/react";
import { useEffect, type ReactNode } from "react";
import { useCaseFile } from "@/lib/store";

/**
 * Motion animations follow the device's "reduce motion" setting ("user"), or always skip
 * movement when the student turned on Reduce motion in the profile menu ("always").
 * The same switch adds a class on <html> so CSS transitions and smooth scrolling stop too.
 */
export function Providers({ children }: { children: ReactNode }) {
  const { reduceMotion } = useCaseFile();

  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", reduceMotion);
  }, [reduceMotion]);

  return <MotionConfig reducedMotion={reduceMotion ? "always" : "user"}>{children}</MotionConfig>;
}
