"use client";

import { useRef } from "react";
import { gsap, MEDIA, useGSAP } from "@/lib/gsap";

/** 4-way ceiling diffuser line drawing. Draws on load, then the airflow lines flow forever. */
export default function HeroDiffuser() {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motion, () => {
        const q = gsap.utils.selector(ref);
        const air = q("[data-hero-air]");
        gsap
          .timeline({ defaults: { ease: "power2.out" } })
          .set(ref.current, { visibility: "visible" })
          .from(q("[data-hero-grid]"), { drawSVG: 0, duration: 1.2, ease: "power1.inOut" }, 0)
          .from(q("[data-hero-draw]"), { drawSVG: 0, duration: 1.4, stagger: 0.12, ease: "power2.inOut" }, 0.2)
          .from(air, { drawSVG: 0, duration: 1, stagger: 0.1, ease: "power1.out" }, 1.1)
          .add(() => {
            gsap.set(air, { clearProps: "strokeDasharray,strokeDashoffset" });
            gsap.set(air, { strokeDasharray: "10 8", strokeDashoffset: 0 });
            gsap.to(air, { strokeDashoffset: -36, duration: 1.4, ease: "none", repeat: -1 });
            gsap.fromTo(air, { opacity: 1 }, { opacity: 0.5, duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
          }, ">+0.05")
          .from(q("[data-hero-dim]"), { drawSVG: 0, duration: 0.8, stagger: 0.15 }, 1.4)
          .from(q("[data-hero-dot]"), { opacity: 0, duration: 0.5, stagger: 0.08 }, 1.9);
      });
    },
    { scope: ref },
  );

  return (
    <svg
      ref={ref}
      data-js-reveal
      data-latin
      viewBox="0 0 520 540"
      className="block h-auto w-full overflow-visible"
      fill="none"
      role="img"
      aria-label="4-way ceiling diffuser line drawing"
    >
      <g stroke="#DCE5EC" strokeWidth="1">
        <path data-hero-grid d="M0 60H520M0 140H520M0 220H520M0 300H520M0 380H520M0 460H520" />
        <path data-hero-grid d="M60 0V540M140 0V540M220 0V540M300 0V540M380 0V540M460 0V540" />
      </g>
      <g stroke="#0B2D5B" strokeWidth="2" strokeLinejoin="round">
        <rect data-hero-draw x="80" y="80" width="360" height="360" rx="6" />
        <rect data-hero-draw x="110" y="110" width="300" height="300" rx="4" />
        <rect data-hero-draw x="140" y="140" width="240" height="240" rx="3" />
        <rect data-hero-draw x="170" y="170" width="180" height="180" rx="2" />
        <rect data-hero-draw x="200" y="200" width="120" height="120" rx="2" />
        <path data-hero-draw d="M80 80L200 200M440 80L320 200M80 440L200 320M440 440L320 320" />
      </g>
      <g stroke="#00AAA6" strokeWidth="2" strokeLinecap="round">
        <path data-hero-air d="M220 70C210 50 230 36 220 16M260 70C250 50 270 34 260 8M300 70C290 50 310 36 300 16" />
        <path data-hero-air d="M220 450C210 470 230 484 220 504M260 450C250 470 270 486 260 512M300 450C290 470 310 484 300 504" />
        <path data-hero-air d="M70 220C50 210 36 230 16 220M70 260C50 250 34 270 8 260M70 300C50 290 36 310 16 300" />
        <path data-hero-air d="M450 220C470 210 484 230 504 220M450 260C470 250 486 270 512 260M450 300C470 290 484 310 504 300" />
      </g>
      <g stroke="#6B7280" strokeWidth="1">
        <path data-hero-dim d="M80 528H440M80 520V536M440 520V536" />
        <path data-hero-dim d="M398 122L452 56H520" />
      </g>
      <circle data-hero-dot cx="398" cy="122" r="4" fill="#00C853" />
      <text
        data-hero-dot
        x="520"
        y="46"
        textAnchor="end"
        fontFamily="var(--font-plex-mono)"
        fontSize="12"
        fill="#6B7280"
        letterSpacing="1"
      >
        4-WAY DIFFUSER
      </text>
    </svg>
  );
}
