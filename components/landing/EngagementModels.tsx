import type { Messages } from "@/messages";
import RevealScope from "./RevealScope";
import SectionRule from "./SectionRule";

export default function EngagementModels({ m }: { m: Messages }) {
  const { ui: t, engagement } = m;
  return (
    <section id="engagement" className="gutter section-y bg-surface">
      <RevealScope className="container-x">
        <SectionRule n="10" label={t.secEngage} surface />
        <div className="mb-14 grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-x-14 gap-y-6">
          <h2 data-reveal className="h2-display text-navy">
            {t.engH}
          </h2>
          <p data-reveal className="pretty m-0 text-lg leading-[1.65]">
            {t.engP}
          </p>
        </div>
        <div
          data-stagger
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-px border border-line bg-line"
        >
          {engagement.map((e) => (
            <div key={e.n} className="bg-white p-7">
              <div className="mb-3 font-mono text-[13px] text-teal-dark">{e.n}</div>
              <h3 className="m-0 mb-2 text-xl font-bold text-navy">{e.t}</h3>
              <p className="pretty m-0 text-base leading-[1.6]">{e.d}</p>
            </div>
          ))}
        </div>
      </RevealScope>
    </section>
  );
}
