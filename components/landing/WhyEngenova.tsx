import type { Messages } from "@/messages";
import RevealScope from "./RevealScope";
import SectionRule from "./SectionRule";

export default function WhyEngenova({ m }: { m: Messages }) {
  const { ui: t, why } = m;
  return (
    <section id="why" className="gutter pb-[clamp(80px,10vw,140px)]">
      <RevealScope className="container-x">
        <SectionRule n="02" label={t.sec2} />
        <h2 data-reveal className="h2-display mb-14 max-w-[820px] text-navy">
          {t.whyH}
        </h2>
        <div data-stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-8 gap-y-10">
          {why.map((w) => (
            <div key={w.n} className="border-t-2 border-navy pt-5">
              <div className="mb-3.5 font-mono text-[13px] text-gray">{w.n}</div>
              <h3 className="m-0 mb-2.5 text-[22px] font-bold text-navy">{w.t}</h3>
              <p className="pretty m-0 text-base leading-[1.6]">{w.d}</p>
            </div>
          ))}
        </div>
      </RevealScope>
    </section>
  );
}
