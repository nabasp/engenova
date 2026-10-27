"use client";

import { useRef } from "react";
import { gsap, idleMedia, MEDIA, useGSAP } from "@/lib/gsap";
import type { commitmentIcons } from "./svg/data";

/** Line icon that draws in, then loops: typing dots, a turning gear or a scanning shield. */
export default function CommitIcon({ icon }: { icon: (typeof commitmentIcons)[number] }) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      return idleMedia(MEDIA.motion, () => {
        const svg = ref.current!;
        const acc = svg.querySelectorAll("[data-cm-accent]");
        gsap
          .timeline({ scrollTrigger: { trigger: svg, start: "top 88%" } })
          .from(svg.querySelector("[data-cm-draw]"), { drawSVG: 0, duration: 1.6, ease: "power1.inOut" })
          .from(acc, { opacity: 0, duration: 0.4, stagger: 0.1 }, 1.1)
          .add(() => {
            if (icon.loop === "dots")
              gsap.to(acc, { y: -5, duration: 0.45, ease: "sine.inOut", stagger: { each: 0.15, repeat: -1, yoyo: true } });
            if (icon.loop === "spin") gsap.to(acc, { rotation: 360, svgOrigin: "68 48", duration: 8, ease: "none", repeat: -1 });
            if (icon.loop === "scan") gsap.fromTo(acc, { y: 0 }, { y: 30, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: -1 });
          });
      });
    },
    { scope: ref },
  );

  return (
    <svg
      ref={ref}
      viewBox="0 0 96 72"
      className="mb-6 block h-[72px] w-24 overflow-visible"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path data-cm-draw d={icon.icon} stroke="#0B2D5B" strokeWidth="2" />
      {icon.accents.map((a) => (
        <path key={a.d} data-cm-accent d={a.d} stroke="#00AAA6" strokeWidth={a.w} />
      ))}
    </svg>
  );
}
