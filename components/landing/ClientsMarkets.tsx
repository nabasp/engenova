import type { Messages } from "@/messages";
import RevealScope from "./RevealScope";
import SectionRule from "./SectionRule";

export default function ClientsMarkets({ m }: { m: Messages }) {
  const { ui: t, clients } = m;
  return (
    <section id="clients" className="gutter section-y">
      <RevealScope className="container-x">
        <SectionRule n="11" label={t.secClients} />
        <div className="mb-14 grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-x-14 gap-y-6">
          <h2 data-reveal className="h2-display text-navy">
            {t.clientsH}
          </h2>
          <p data-reveal className="pretty m-0 text-lg leading-[1.65]">
            {t.clientsP}
          </p>
        </div>
        <div data-stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-8 gap-y-10">
          {clients.map((c) => (
            <div key={c.n} className="border-t-2 border-navy pt-5">
              <div className="mb-3.5 font-mono text-[13px] text-gray">{c.n}</div>
              <h3 className="m-0 mb-2.5 text-[22px] leading-[1.25] font-bold text-navy">{c.t}</h3>
              <p className="pretty m-0 text-base leading-[1.6]">{c.d}</p>
            </div>
          ))}
          <div className="flex flex-col justify-end rounded-md bg-navy p-6 text-mist">
            <div className="mb-3 font-mono text-xs tracking-[0.12em] text-ice uppercase">{t.targetT}</div>
            <p className="m-0 text-[19px] leading-[1.5] font-bold text-white">{t.targetV}</p>
          </div>
        </div>
        <p data-reveal className="mt-6 mb-0 max-w-[900px] text-[13px] leading-[1.6] text-gray">
          {t.clientsDisc}
        </p>
      </RevealScope>
    </section>
  );
}
