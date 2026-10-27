"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once; every animated component imports from here.
gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin);

export { gsap, ScrollTrigger, useGSAP };

/** Conditions shared by every gsap.matchMedia() call. */
export const MEDIA = {
  motion: "(prefers-reduced-motion: no-preference)",
  narrow: "(max-width: 760px)",
} as const;

export type MediaConditions = { motion?: boolean; narrow?: boolean };

/** Fade-up defaults from the reference's "subtle" motion setting. */
export const REVEAL = { y: 22, duration: 0.8, ease: "power2.out" } as const;

type MediaQuery = string | Record<string, string>;
type MediaSetup = (context: gsap.Context) => void | (() => void);

/**
 * gsap.matchMedia().add(), deferred to an idle callback. Building ScrollTriggers forces layout, and doing it for
 * every section inside the hydration task blocks the main thread; this spreads the work out after first paint.
 * Return it from a useGSAP callback so unmounting cancels the pending setup and reverts what it created.
 */
export function idleMedia(query: MediaQuery, setup: MediaSetup): () => void {
  const mm = gsap.matchMedia();
  const run = () => mm.add(query, setup);
  const idle = typeof window.requestIdleCallback === "function";
  const id = idle ? window.requestIdleCallback(run, { timeout: 1200 }) : window.setTimeout(run, 1);
  return () => {
    if (idle) window.cancelIdleCallback(id);
    else window.clearTimeout(id);
    mm.revert();
  };
}
