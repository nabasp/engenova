import type { Messages } from "@/messages";
import CertBadges from "./CertBadges";
import RevealScope from "./RevealScope";
import SectionRule from "./SectionRule";

export default function Certifications({ m }: { m: Messages }) {
  const { ui: t, certs, certSupport } = m;
  return (
    <section id="certifications" className="gutter section-y">
      <RevealScope className="container-x">
        <SectionRule n="04" label={t.sec4} />
        <div className="mb-16 grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-x-14 gap-y-6">
          <h2 data-reveal className="h2-display text-navy">
            {t.certH}
          </h2>
          <p data-reveal className="pretty m-0 text-lg leading-[1.65]">
            {t.certP}
          </p>
        </div>
        <CertBadges certs={certs} />
        <div
          data-reveal
          className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-4 rounded-md border border-dashed border-dash px-7 py-6"
        >
          <div className="text-lg font-bold text-navy">{t.otherT}</div>
          <div className="min-w-[260px] flex-1 text-base leading-[1.6]">{t.otherD}</div>
        </div>
        <h3 data-reveal className="mt-24 mb-8 text-[clamp(24px,2.6vw,34px)] font-bold text-navy">
          {t.certSupportH}
        </h3>
        <div
          data-stagger
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-px border border-line bg-line"
        >
          {certSupport.map((c) => (
            <div key={c.n} className="bg-white p-7">
              <div className="mb-3 font-mono text-[13px] text-gray">{c.n}</div>
              <h4 className="m-0 mb-2 text-xl font-bold text-navy">{c.t}</h4>
              <p className="pretty m-0 text-base leading-[1.6]">{c.d}</p>
            </div>
          ))}
        </div>
        <p data-reveal className="mt-6 mb-0 max-w-[900px] text-[13px] leading-[1.6] text-gray">
          {t.certDisc}
        </p>
      </RevealScope>
    </section>
  );
}
