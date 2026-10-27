import type { Messages } from "@/messages";
import AiSteps from "./AiSteps";
import Blueprint from "./Blueprint";
import RevealScope from "./RevealScope";
import SectionRule from "./SectionRule";

/** Navy "AI-enabled, engineer-verified" block: intro + blueprint, pinned steps, then where AI adds value. */
export default function AiProcess({ m }: { m: Messages }) {
  const { ui: t, aiSteps, aiValue } = m;
  return (
    <>
      <section id="process" className="gutter bg-navy pt-[clamp(80px,10vw,140px)] text-mist">
        <RevealScope className="container-x">
          <SectionRule n="05" label={t.sec5} dark />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-x-14 gap-y-6">
            <h2 data-reveal className="h2-display text-white">
              {t.aiH}
            </h2>
            <p data-reveal className="pretty m-0 text-lg leading-[1.65]">
              {t.aiP}
            </p>
          </div>
          <div className="relative mt-[clamp(40px,6vw,72px)] border-t border-white/12 pt-2">
            <div className="flex flex-wrap justify-between gap-3 py-3 font-mono text-xs tracking-[0.12em] text-ice uppercase">
              <span>{t.bpLeft}</span>
              <span>{t.bpRight}</span>
            </div>
            <Blueprint />
          </div>
        </RevealScope>
      </section>

      <AiSteps steps={aiSteps} />

      <section className="gutter bg-navy pb-[clamp(80px,10vw,140px)] text-mist">
        <RevealScope className="container-x">
          <h3 data-reveal className="m-0 mb-8 text-[clamp(24px,2.6vw,34px)] font-bold text-white">
            {t.aiValueH}
          </h3>
          <div data-stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-8 gap-y-9">
            {aiValue.map((v) => (
              <div key={v.t} className="border-t border-white/25 pt-[18px]">
                <h4 className="m-0 mb-2 text-[19px] font-bold text-white">{v.t}</h4>
                <p className="pretty m-0 text-base leading-[1.6]">{v.d}</p>
              </div>
            ))}
          </div>
          <div data-reveal className="mt-12 rounded-md border border-dashed border-white/35 px-7 py-6">
            <div className="mb-1.5 text-lg font-bold text-white">{t.futureT}</div>
            <div className="text-base leading-[1.6]">{t.futureD}</div>
          </div>
          <p data-reveal className="mt-6 mb-0 max-w-[900px] text-[13px] leading-[1.6] text-fog">
            {t.aiDisc}
          </p>
        </RevealScope>
      </section>
    </>
  );
}
