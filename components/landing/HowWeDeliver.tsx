"use client";

import { useRef } from "react";
import { gsap, idleMedia, MEDIA, useGSAP, type MediaConditions } from "@/lib/gsap";
import type { Messages } from "@/messages";

/** Faint navy ceiling plan that builds up behind the delivery steps. Labels stay in English. */
function CeilingPlan() {
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 size-full"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      data-latin
    >
      <g stroke="#0B2D5B" strokeWidth="1" opacity="0.1">
        <path data-dl-bg d="M300 40V880M700 40V880M1100 40V880M1500 40V880" />
        <path data-dl-bg d="M40 220H1560M40 520H1560M40 820H1560" />
      </g>
      <g stroke="#0B2D5B" strokeWidth="1.4" opacity="0.22">
        <path
          data-dl-bg
          d="M300 40m-18 0a18 18 0 1 0 36 0a18 18 0 1 0-36 0M700 40m-18 0a18 18 0 1 0 36 0a18 18 0 1 0-36 0M1100 40m-18 0a18 18 0 1 0 36 0a18 18 0 1 0-36 0M1500 40m-18 0a18 18 0 1 0 36 0a18 18 0 1 0-36 0"
        />
        <path data-dl-bg d="M80 120H1520V820H80Z M100 140H1500V800H100Z" />
        <path data-dl-bg d="M100 280H1380V340H100 M1380 280V340" />
        <path data-dl-bg d="M330 340V560M370 340V560 M730 340V560M770 340V560 M1130 340V560M1170 340V560" />
        <path
          data-dl-bg
          d="M310 560H390V640H310Z M310 560L390 640 M390 560L310 640 M328 578H372V622H328Z M710 560H790V640H710Z M710 560L790 640 M790 560L710 640 M728 578H772V622H728Z M1110 560H1190V640H1110Z M1110 560L1190 640 M1190 560L1110 640 M1128 578H1172V622H1128Z"
        />
        <path
          data-dl-bg
          d="M540 280V210M560 280V210 M940 280V210M960 280V210 M470 190H630V210H470Z M870 190H1030V210H870Z M490 190V210M510 190V210M530 190V210M570 190V210M590 190V210M610 190V210 M890 190V210M910 190V210M930 190V210M970 190V210M990 190V210M1010 190V210"
        />
        <path data-dl-bg d="M180 310H260M246 298L260 310L246 322 M1240 310H1320M1306 298L1320 310L1306 322" />
        <path data-dl-bg d="M100 860H1500 M100 850V870 M300 850V870 M700 850V870 M1100 850V870 M1500 850V870" />
        <path data-dl-bg d="M1240 690H1490V790H1240Z M1240 720H1490 M1240 755H1490 M1380 720V790" />
      </g>
      <g fontFamily="var(--font-plex-mono)" fontSize="14" fill="#0B2D5B" opacity="0.32" letterSpacing="1">
        {[
          ["A", 300], ["B", 700], ["C", 1100], ["D", 1500],
        ].map(([l, x]) => (
          <text key={l} data-dl-txt x={x} y="45" textAnchor="middle">
            {l}
          </text>
        ))}
        <text data-dl-txt x="740" y="270">SA DUCT 1200×600</text>
        {[
          ["SD-01", 350], ["SD-02", 750], ["SD-03", 1150],
        ].map(([l, x]) => (
          <text key={l} data-dl-txt x={x} y="670" textAnchor="middle">
            {l}
          </text>
        ))}
        {[500, 900, 1300].map((x) => (
          <text key={x} data-dl-txt x={x} y="852" textAnchor="middle">
            4,000
          </text>
        ))}
        <text data-dl-txt x="1252" y="711">ENGENOVA</text>
        <text data-dl-txt x="1252" y="744">CEILING PLAN · L2</text>
        <text data-dl-txt x="1252" y="779">ISSUE</text>
        <text data-dl-txt x="1394" y="779">REV C</text>
      </g>
    </svg>
  );
}

/** Pinned six-step delivery method: big panels cross-fade while the plan draws behind. */
export default function HowWeDeliver({ steps }: { steps: Messages["delivery"] }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      return idleMedia(MEDIA, (ctx) => {
        const { motion, narrow } = ctx.conditions as MediaConditions;
        if (!motion) return;
        const q = gsap.utils.selector(ref);
        const panels = q("[data-dlv-panel]");
        const items = q("[data-dlv-item]");
        const n = panels.length;
        gsap.set(panels.slice(1), { opacity: 0, y: 24 });
        if (!narrow) gsap.set(items.slice(1), { opacity: 0.3 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom bottom", scrub: 0.6 },
        });
        tl.from(q("[data-dl-bg]"), { drawSVG: 0, duration: 1.2, stagger: (n - 1.2) / 12, ease: "none" }, 0).from(
          q("[data-dl-txt]"),
          { opacity: 0, duration: 0.3, stagger: (n - 1) / 20 },
          0.6,
        );
        if (narrow) tl.to(q("[data-dlv-bar]"), { scaleX: 1, duration: n, ease: "none" }, 0);
        else tl.from(q("[data-dlv-line]"), { drawSVG: 0, duration: n, ease: "none" }, 0);
        for (let i = 1; i < n; i++) {
          tl.to(panels[i - 1], { opacity: 0, y: -24, duration: 0.3 }, i - 0.15).to(
            panels[i],
            { opacity: 1, y: 0, duration: 0.3 },
            i,
          );
          if (!narrow && items[i]) tl.to(items[i], { opacity: 1, duration: 0.3 }, i);
        }
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="delivery" className="relative h-[320vh] motion-reduce:h-auto">
      <div className="gutter sticky top-0 flex h-svh flex-col justify-center overflow-hidden pt-[72px] motion-reduce:static motion-reduce:h-auto motion-reduce:py-20">
        <CeilingPlan />
        <div className="relative z-[1] container-x grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-center gap-x-[72px] gap-y-10">
          <div className="grid motion-reduce:gap-12">
            <div
              className="relative mb-7 hidden h-[3px] -translate-y-9 self-start bg-line [grid-area:1/1] narrow:motion-safe:block"
              aria-hidden="true"
            >
              <div data-dlv-bar className="absolute inset-0 origin-left scale-x-0 bg-teal rtl:origin-right" />
            </div>
            {steps.map((d) => (
              <div key={d.n} data-dlv-panel className="motion-safe:[grid-area:1/1]">
                <div
                  data-latin
                  className="text-[clamp(88px,11vw,150px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-navy"
                >
                  {d.n}
                </div>
                <h3 className="mt-4 mb-3.5 text-[clamp(28px,3.2vw,44px)] font-bold text-navy">{d.t}</h3>
                <p className="pretty m-0 max-w-[460px] text-lg leading-[1.6]">{d.d}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-7 narrow:hidden">
            <svg viewBox="0 0 4 600" preserveAspectRatio="none" className="w-1 flex-none overflow-visible" fill="none" aria-hidden="true">
              <path d="M2 0V600" stroke="#E1E8EE" strokeWidth="2" />
              <path data-dlv-line d="M2 0V600" stroke="#00AAA6" strokeWidth="3" />
            </svg>
            <ol className="m-0 flex flex-1 list-none flex-col gap-1.5 p-0" aria-hidden="true">
              {steps.map((d) => (
                <li key={d.n} data-dlv-item className="flex items-baseline gap-[18px] border-b border-line py-3">
                  <span className="font-mono text-sm text-teal-dark">{d.n}</span>
                  <span className="text-[clamp(20px,2vw,26px)] font-bold text-navy">{d.t}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
