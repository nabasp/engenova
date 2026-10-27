"use client";

import { useRef, type ReactNode } from "react";
import { gsap, idleMedia, MEDIA, REVEAL, useGSAP } from "@/lib/gsap";

/**
 * Scroll-triggered entrances for server-rendered markup inside it:
 * - [data-draw]    SVG strokes draw in
 * - [data-reveal]  fades up
 * - [data-stagger] fades its children up in sequence
 */
export default function RevealScope({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      return idleMedia(MEDIA.motion, () => {
        const q = gsap.utils.selector(ref);
        q("[data-draw]").forEach((el) =>
          gsap.from(el, {
            drawSVG: 0,
            duration: 1.4,
            ease: "power2.inOut",
            scrollTrigger: { trigger: el.closest("svg"), start: "top 88%" },
          }),
        );
        q("[data-reveal]").forEach((el) =>
          gsap.from(el, { ...REVEAL, opacity: 0, scrollTrigger: { trigger: el, start: "top 88%" } }),
        );
        q("[data-stagger]").forEach((el) =>
          gsap.from(el.children, {
            ...REVEAL,
            opacity: 0,
            stagger: 0.08,
            scrollTrigger: { trigger: el, start: "top 85%" },
          }),
        );
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} id={id} className={className}>
      {children}
    </div>
  );
}
