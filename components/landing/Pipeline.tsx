"use client";

import { useRef } from "react";
import { gsap, idleMedia, MEDIA, useGSAP } from "@/lib/gsap";
import type { Messages } from "@/messages";

const WAVE = "M100 100C200 20 200 180 300 100S400 20 500 100S600 180 700 100S800 20 900 100";
const NODES = [100, 300, 500, 700, 900];

/** Pinned enquiry-to-order cycle: the wave draws with scroll and each stage lights up in turn. */
export default function Pipeline({
  label,
  heading,
  steps,
}: {
  label: string;
  heading: string;
  steps: Messages["pipeline"];
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      return idleMedia(MEDIA.motion, () => {
        const q = gsap.utils.selector(ref);
        const nodes = q("[data-pipe-node]");
        const labels = q("[data-pipe-label]");
        gsap.set(nodes, { opacity: 0.25 });
        gsap.set(labels, { opacity: 0.3 });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom bottom", scrub: 0.6 },
        });
        tl.from(q("[data-pipe-path]"), { drawSVG: 0, duration: 4, ease: "none" }, 0);
        nodes.forEach((n, i) => tl.to([n, labels[i]], { opacity: 1, duration: 0.3 }, i));
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative h-[240vh] bg-surface motion-reduce:h-auto">
      <div className="gutter sticky top-0 flex h-svh flex-col justify-center pt-[72px] motion-reduce:static motion-reduce:h-auto motion-reduce:py-20">
        <div className="container-x">
          <div className="mono-label mb-2 text-gray-deep">{label}</div>
          <h3 className="m-0 mb-12 text-[clamp(24px,2.6vw,34px)] font-bold text-balance text-navy">{heading}</h3>
          <svg
            viewBox="0 0 1000 200"
            className="block h-auto w-full overflow-visible rtl:-scale-x-100"
            fill="none"
            aria-hidden="true"
          >
            <path d={WAVE} stroke="#D3DDE6" strokeWidth="2" />
            <path data-pipe-path d={WAVE} stroke="#00AAA6" strokeWidth="3" strokeLinecap="round" />
            {NODES.map((x, i) => (
              <g key={x} data-pipe-node>
                <circle cx={x} cy="100" r="22" fill="#FFFFFF" stroke="#0B2D5B" strokeWidth="2" />
                <circle cx={x} cy="100" r="8" fill={i === NODES.length - 1 ? "#00C853" : "#0B2D5B"} />
              </g>
            ))}
          </svg>
          <ol className="m-0 mt-5 grid list-none grid-cols-5 p-0">
            {steps.map((p) => (
              <li key={p.n} data-pipe-label className="px-1.5 text-center">
                <div className="font-mono text-[13px] text-gray-deep">{p.n}</div>
                <div className="mt-1.5 text-[clamp(12px,1.6vw,22px)] leading-[1.2] font-bold wrap-anywhere text-navy">
                  {p.t}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
