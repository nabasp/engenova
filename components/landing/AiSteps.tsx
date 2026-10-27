"use client";

import { useRef } from "react";
import { gsap, idleMedia, MEDIA, useGSAP, type MediaConditions } from "@/lib/gsap";
import type { Messages } from "@/messages";

/** Pinned four-step AI process. Wide: steps light up in a row. Narrow: one step at a time. */
export default function AiSteps({ steps }: { steps: Messages["aiSteps"] }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      return idleMedia(MEDIA, (ctx) => {
        const { motion, narrow } = ctx.conditions as MediaConditions;
        if (!motion) return;
        const q = gsap.utils.selector(ref);
        const cards = q("[data-ai-step]");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom bottom", scrub: 0.6 },
        });
        tl.from(q("[data-ai-line]"), { drawSVG: 0, duration: cards.length, ease: "none" }, 0);
        if (narrow) {
          gsap.set(cards.slice(1), { opacity: 0, y: 24 });
          for (let i = 1; i < cards.length; i++) {
            tl.to(cards[i - 1], { opacity: 0, y: -24, duration: 0.3 }, i - 0.15).to(
              cards[i],
              { opacity: 1, y: 0, duration: 0.3 },
              i,
            );
          }
        } else {
          gsap.set(cards, { opacity: 0.2, y: 16 });
          cards.forEach((s, i) => tl.to(s, { opacity: 1, y: 0, duration: 0.4 }, i * 0.95 + 0.05));
        }
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative h-[260vh] bg-navy motion-reduce:h-auto">
      <div className="gutter sticky top-0 flex h-svh flex-col justify-center pt-[72px] motion-reduce:static motion-reduce:h-auto motion-reduce:py-20">
        <div className="container-x">
          <svg
            viewBox="0 0 1000 24"
            preserveAspectRatio="none"
            className="block h-6 w-full overflow-visible rtl:-scale-x-100"
            fill="none"
            aria-hidden="true"
          >
            <path d="M0 12H1000" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
            <path data-ai-line d="M0 12H1000" stroke="#00C853" strokeWidth="3" />
          </svg>
          <ol className="m-0 mt-7 grid list-none grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5 p-0 narrow:grid-cols-1">
            {steps.map((a) => (
              <li
                key={a.n}
                data-ai-step
                className="rounded-md border border-white/22 bg-white/4 p-7 narrow:motion-safe:[grid-area:1/1]"
              >
                <div className="mb-10 flex items-center justify-between">
                  <span className="font-mono text-sm text-ice">{a.n}</span>
                  <span className="rounded-[3px] bg-mint px-[9px] py-[5px] font-mono text-[11px] tracking-[0.14em] text-navy uppercase">
                    {a.tag}
                  </span>
                </div>
                <h3 className="m-0 mb-2.5 text-[22px] leading-[1.2] font-bold text-white">{a.t}</h3>
                <p className="m-0 text-base leading-[1.6] text-mist">{a.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
