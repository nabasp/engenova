"use client";

import { useRef } from "react";
import { gsap, idleMedia, MEDIA, useGSAP } from "@/lib/gsap";

/** Counts up from 0 to `value` when scrolled into view. Renders the final value without JS or motion. */
export default function StatCount({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      return idleMedia(MEDIA.motion, () => {
        const o = { v: 0 };
        el.textContent = "0";
        gsap.to(o, {
          v: value,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = String(Math.round(o.v));
          },
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
        return () => {
          el.textContent = String(value);
        };
      });
    },
    { scope: ref, dependencies: [value] },
  );

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
