"use client";

import { useRef } from "react";
import { gsap, idleMedia, MEDIA, useGSAP } from "@/lib/gsap";
import type { Locale, Messages } from "@/messages";
import { serviceIcons } from "./svg/data";

/** Pinned horizontal scroll through the eight services. Runs right-to-left in Arabic. */
export default function CoreServices({
  label,
  services,
  locale,
}: {
  label: string;
  services: Messages["services"];
  locale: Locale;
}) {
  const ref = useRef<HTMLElement>(null);
  const rtl = locale === "ar";

  useGSAP(
    () => {
      return idleMedia(MEDIA.motion, () => {
        const q = gsap.utils.selector(ref);
        const track = q("[data-svc-track]")[0];
        const st = {
          trigger: ref.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        };
        const trackTween = gsap.to(track, {
          x: () => (rtl ? 1 : -1) * Math.max(0, track.scrollWidth - (track.parentElement?.clientWidth ?? 0)),
          ease: "none",
          scrollTrigger: st,
        });
        gsap.to(q("[data-svc-bar]"), { scaleX: 1, ease: "none", scrollTrigger: { ...st } });

        q("[data-svc-icon]").forEach((svg) => {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: svg.closest("article"),
                containerAnimation: trackTween,
                start: rtl ? "right 8%" : "left 92%",
                toggleActions: "play none none reverse",
              },
            })
            .from(svg.querySelector("[data-svc-bracket]"), { drawSVG: "50% 50%", duration: 0.6, ease: "power2.out" })
            .from(svg.querySelector("[data-svc-draw]"), { drawSVG: 0, duration: 1.6, ease: "power1.inOut" }, 0.1)
            .from(svg.querySelector("[data-svc-accent]"), { drawSVG: 0, duration: 0.8, ease: "power2.out" }, 1.1);
        });
      });
    },
    { scope: ref, dependencies: [rtl] },
  );

  return (
    <section ref={ref} className="relative h-[340vh] bg-surface motion-reduce:h-auto">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden pt-[72px] motion-reduce:static motion-reduce:h-auto motion-reduce:overflow-x-auto motion-reduce:pb-20">
        <div className="container-x gutter mb-7 flex items-center justify-between gap-6">
          <div className="mono-label text-gray-deep">{label}</div>
          <div className="relative h-0.5 max-w-80 flex-1 bg-track motion-reduce:hidden" aria-hidden="true">
            <div data-svc-bar className="absolute inset-0 origin-left scale-x-0 bg-navy rtl:origin-right" />
          </div>
        </div>
        <div data-svc-track className="gutter flex w-max gap-5 will-change-transform">
          {services.map((s, i) => (
            <article
              key={s.n}
              className="flex min-h-[340px] w-[min(78vw,380px)] flex-col rounded-md border border-line bg-white p-8"
            >
              <div className="font-mono text-sm font-medium text-teal-dark">{s.n}</div>
              <svg
                data-svc-icon
                viewBox="0 0 160 120"
                className="mt-2 block h-[150px] w-full overflow-visible"
                fill="none"
                strokeLinejoin="round"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path data-svc-bracket d="M8 22V8H22M138 8H152V22M152 98V112H138M22 112H8V98" stroke="#00C853" strokeWidth="1.6" />
                <path data-svc-draw d={serviceIcons[i].icon} stroke="#0B2D5B" strokeWidth="1.4" />
                <path data-svc-accent d={serviceIcons[i].accent} stroke="#00AAA6" strokeWidth="2" />
              </svg>
              <h3 className="mt-auto mb-3.5 pt-5 text-[26px] leading-[1.15] font-bold text-navy">{s.t}</h3>
              <p className="pretty m-0 text-base leading-[1.6]">{s.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
