import type { Messages } from "@/messages";
import RevealScope from "./RevealScope";
import SectionRule from "./SectionRule";

export default function Consultancy({ m }: { m: Messages }) {
  const { ui: t, consult } = m;
  return (
    <section id="consultancy" className="gutter section-y bg-surface">
      <RevealScope className="container-x">
        <SectionRule n="08" label={t.sec8} surface />
        <div className="mb-14 grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-x-14 gap-y-6">
          <h2 data-reveal className="h2-display text-navy">
            {t.csH}
          </h2>
          <p data-reveal className="pretty m-0 text-lg leading-[1.65]">
            {t.csP}
          </p>
        </div>
        <div data-stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-4">
          {consult.map((c) => (
            <div key={c.n} className="rounded-md border border-line bg-white p-6 transition-colors hover:border-navy">
              <div className="mb-[22px] font-mono text-[13px] text-teal-dark">{c.n}</div>
              <h3 className="m-0 mb-2 text-[19px] leading-[1.25] font-bold text-navy">{c.t}</h3>
              <p className="pretty m-0 text-[15px] leading-[1.55]">{c.d}</p>
            </div>
          ))}
          <div className="flex flex-col justify-end rounded-md bg-navy p-6 text-mist">
            <h3 className="m-0 mb-2 text-[19px] font-bold text-white">{t.onsiteT}</h3>
            <p className="m-0 text-[15px] leading-[1.55]">{t.onsiteD}</p>
          </div>
        </div>
        <p data-reveal className="mt-6 mb-0 max-w-[900px] text-[13px] leading-[1.6] text-gray">
          {t.csDisc}
        </p>
      </RevealScope>
    </section>
  );
}
