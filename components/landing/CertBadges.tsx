"use client";

import { useRef } from "react";
import { gsap, idleMedia, MEDIA, useGSAP } from "@/lib/gsap";
import type { Messages } from "@/messages";

/** Circular certification badges whose rings draw in when scrolled into view. */
export default function CertBadges({ certs }: { certs: Messages["certs"] }) {
  const ref = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      return idleMedia(MEDIA.motion, () => {
        const q = gsap.utils.selector(ref);
        const st = { trigger: ref.current, start: "top 80%" };
        gsap.from(q("[data-badge]"), { drawSVG: 0, duration: 1.4, stagger: 0.1, ease: "power2.inOut", scrollTrigger: st });
        gsap.from(q("[data-badge-text]"), { opacity: 0, y: 12, duration: 0.6, stagger: 0.1, delay: 0.5, scrollTrigger: st });
      });
    },
    { scope: ref },
  );

  return (
    <ul ref={ref} className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-4 p-0">
      {certs.map((c) => (
        <li key={c.t} className="grid aspect-square w-full max-w-[220px] place-items-center justify-self-center">
          <svg viewBox="0 0 200 200" className="[grid-area:1/1] size-full overflow-visible" fill="none" aria-hidden="true">
            <circle data-badge cx="100" cy="100" r="96" stroke="#0B2D5B" strokeWidth="1.5" />
            <circle data-badge cx="100" cy="100" r="86" stroke="#00AAA6" strokeWidth="1" strokeDasharray="3 5" />
          </svg>
          <div data-badge-text className="[grid-area:1/1] px-[17%] text-center">
            <div data-latin className="text-[clamp(19px,4.6vw,26px)] font-extrabold tracking-[-0.01em] text-navy">
              {c.t}
            </div>
            <div className="mt-1.5 text-[clamp(11px,2.8vw,13px)] leading-[1.35] text-ink">{c.d}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
