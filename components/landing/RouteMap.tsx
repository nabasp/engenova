"use client";

import { useRef } from "react";
import { gsap, idleMedia, MEDIA, useGSAP } from "@/lib/gsap";
import { mapDots } from "./svg/data";

const HUB = { x: 386.5, y: 231.8 };
const CITIES = [
  { x: 172, y: 134.5, cx: 279.3, cy: 93.6, label: "KUWAIT", lx: 164, ly: 126.5, anchor: "end" },
  { x: 194.4, y: 165.1, cx: 290.5, cy: 121.2, label: "BAHRAIN", lx: 186.4, ly: 161.1, anchor: "end" },
  { x: 202.6, y: 174, cx: 294.5, cy: 129.7, label: "QATAR", lx: 208.6, ly: 188, anchor: "start" },
  { x: 161.2, y: 179.5, cx: 273.8, cy: 117.8, label: "SAUDI ARABIA", lx: 152.2, ly: 193.5, anchor: "end" },
  { x: 227.1, y: 182, cx: 306.8, cy: 143.4, label: "UAE", lx: 235.1, ly: 176, anchor: "start" },
  { x: 261.9, y: 190.1, cx: 324.2, cy: 161, label: "OMAN", lx: 269.9, ly: 202.1, anchor: "start" },
] as const;

const route = (c: (typeof CITIES)[number]) => `M${HUB.x} ${HUB.y}Q${c.cx} ${c.cy} ${c.x} ${c.y}`;

/** Dot-matrix map with routes drawing from India to the GCC, then pulsing forever. */
export default function RouteMap({ label }: { label: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      return idleMedia(MEDIA.motion, () => {
        const q = gsap.utils.selector(ref);
        const pings = q("[data-ping]");
        const hubPing = q("[data-hub-ping]");
        gsap.set([...pings, ...hubPing], { opacity: 0 });
        gsap
          .timeline({ scrollTrigger: { trigger: ref.current, start: "top 80%" } })
          .from(q("[data-map-dots]"), { opacity: 0, duration: 0.9, ease: "power1.out" })
          .from(q("[data-city]"), { opacity: 0, scale: 0.6, transformOrigin: "center", duration: 0.5, stagger: 0.06 }, 0.3)
          .from(q("[data-route]"), { drawSVG: 0, duration: 1.4, stagger: 0.12, ease: "power2.inOut" }, 0.5)
          .add(() => {
            q("[data-route-pulse]").forEach((p, i) => {
              gsap.set(p, { opacity: 1 });
              gsap.fromTo(
                p,
                { drawSVG: "0% 0%" },
                {
                  keyframes: [
                    { drawSVG: "0% 18%", duration: 0.5 },
                    { drawSVG: "82% 100%", duration: 1.3 },
                    { drawSVG: "100% 100%", duration: 0.4 },
                  ],
                  ease: "none",
                  repeat: -1,
                  repeatDelay: 0.8,
                  delay: i * 0.35,
                },
              );
            });
            gsap.fromTo(pings, { attr: { r: 4 }, opacity: 0.9 }, { attr: { r: 14 }, opacity: 0, duration: 1.8, ease: "power1.out", repeat: -1, stagger: 0.3 });
            gsap.fromTo(hubPing, { attr: { r: 8 }, opacity: 1 }, { attr: { r: 26 }, opacity: 0, duration: 1.8, ease: "power1.out", repeat: -1 });
          });
      });
    },
    { scope: ref },
  );

  return (
    <svg
      ref={ref}
      viewBox="0 0 620 373"
      className="block h-auto w-full overflow-visible"
      fill="none"
      role="img"
      aria-label={label}
      data-latin
    >
      <path data-map-dots d={mapDots[0]} stroke="#C9D5DF" strokeWidth="3" strokeLinecap="round" />
      <path data-map-dots d={mapDots[1]} stroke="#7FC9D6" strokeWidth="3.4" strokeLinecap="round" />
      <g stroke="#00AAA6" strokeWidth="1.6" strokeLinecap="round">
        {CITIES.map((c) => (
          <path key={c.label} data-route d={route(c)} />
        ))}
      </g>
      <g stroke="#00C853" strokeWidth="2.6" strokeLinecap="round">
        {CITIES.map((c) => (
          <path key={c.label} data-route-pulse d={route(c)} opacity="0" />
        ))}
      </g>
      <g data-city>
        {CITIES.map((c) => (
          <circle key={c.label} cx={c.x} cy={c.y} r="4" fill="#0B2D5B" stroke="#FFFFFF" strokeWidth="1.5" />
        ))}
      </g>
      <g>
        {CITIES.map((c) => (
          <circle key={c.label} data-ping cx={c.x} cy={c.y} r="4" stroke="#0B2D5B" strokeWidth="1" />
        ))}
      </g>
      <g data-city>
        <circle data-hub-ping cx={HUB.x} cy={HUB.y} r="8" stroke="#00C853" strokeWidth="1.5" />
        <circle cx={HUB.x} cy={HUB.y} r="7" fill="#00C853" stroke="#FFFFFF" strokeWidth="2" />
      </g>
      <g
        data-city
        className="narrow:hidden"
        fontFamily="var(--font-plex-mono)"
        fontSize="11"
        fill="#0B2D5B"
        letterSpacing="1"
        fontWeight="500"
        paintOrder="stroke"
        stroke="#F7FAFB"
        strokeWidth="4"
        strokeLinejoin="round"
      >
        {CITIES.map((c) => (
          <text key={c.label} x={c.lx} y={c.ly} textAnchor={c.anchor}>
            {c.label}
          </text>
        ))}
        <text x="400.5" y="235.8" fontSize="12">
          INDIA · DELIVERY
        </text>
      </g>
    </svg>
  );
}
