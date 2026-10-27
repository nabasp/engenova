import type { CSSProperties } from "react";
import type { UI } from "@/messages";
import HeroDiffuser from "./HeroDiffuser";

const rise = (i: number) => ({ "--i": i }) as CSSProperties;
const STANDARDS = ["UL 555", "UL 555S", "AMCA", "AHRI", "Intertek"];

export default function Hero({ t }: { t: UI }) {
  return (
    <section className="gutter relative flex min-h-screen flex-col justify-center bg-linear-to-b from-white to-surface pt-[120px] pb-12">
      <div className="container-x grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-center gap-12">
        <div>
          <div
            className="hero-rise mb-6 flex items-center gap-2.5 font-mono text-[13px] tracking-[0.16em] text-gray uppercase"
            style={rise(0)}
          >
            <span className="size-2 rounded-full bg-green" aria-hidden="true" />
            {t.eyebrow}
          </div>
          <h1
            className="hero-rise m-0 text-[clamp(44px,6.4vw,88px)] leading-[0.98] font-extrabold tracking-[-0.03em] text-balance text-navy"
            style={rise(1)}
          >
            {t.h1}
          </h1>
          <p
            className="hero-rise pretty mt-6 mb-0 max-w-[560px] text-[clamp(18px,1.6vw,22px)] leading-normal text-ink"
            style={rise(2)}
          >
            {t.heroSub}
          </p>
          <div className="hero-rise mt-9 flex flex-wrap gap-3" style={rise(3)}>
            <a
              href="#contact"
              className="rounded-sm bg-navy px-6 py-4 text-base font-semibold text-white hover:bg-navy-hover hover:text-white"
            >
              {t.cta}
            </a>
            <a
              href="#services"
              className="rounded-sm border border-navy px-6 py-[15px] text-base font-semibold text-navy hover:bg-navy hover:text-white"
            >
              {t.explore}
            </a>
          </div>
          <ul
            className="hero-rise mt-12 grid max-w-[560px] list-none grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-px border border-tile bg-tile p-0"
            style={rise(4)}
          >
            {[t.p1, t.p2, t.p3, t.p4].map((p) => (
              <li key={p} className="bg-white px-[18px] py-4 text-base font-bold text-navy">
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative w-full max-w-[560px] justify-self-center">
          <HeroDiffuser />
        </div>
      </div>
      <div
        className="hero-rise container-x mt-14 flex flex-wrap items-center justify-between gap-x-10 gap-y-4 border-t border-tile pt-5"
        style={rise(5)}
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5">
          <span className="font-mono text-xs tracking-[0.14em] text-gray uppercase">{t.stdLabel}</span>
          <span className="flex flex-wrap gap-5 text-[15px] font-bold text-navy">
            {STANDARDS.map((s) => (
              <span key={s} data-latin>
                {s}
              </span>
            ))}
            <span className="font-medium text-gray">{t.others}</span>
          </span>
        </div>
        <span className="font-mono text-xs tracking-widest text-gray">{t.markets}</span>
      </div>
    </section>
  );
}
