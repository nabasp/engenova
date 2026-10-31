import type { Messages } from "@/messages";
import RevealScope from "./RevealScope";
import SectionRule from "./SectionRule";

export default function ExtendedServices({ m }: { m: Messages }) {
  const { ui: t, extended } = m;
  return (
    <section id="extended" className="gutter section-y">
      <RevealScope className="container-x">
        <SectionRule n="09" label={t.secExt} />
        <div className="mb-14 grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-x-14 gap-y-6">
          <h2 data-reveal className="h2-display text-navy">
            {t.extH}
          </h2>
          <p data-reveal className="pretty m-0 text-lg leading-[1.65]">
            {t.extP}
          </p>
        </div>
        <div data-stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-5">
          {extended.map((s) => (
            <div key={s.n} className="rounded-md bg-surface p-8">
              <div className="mb-[22px] font-mono text-[13px] text-teal-dark">{s.n}</div>
              <h3 className="m-0 mb-5 text-2xl font-bold text-navy">{s.t}</h3>
              <ul className="m-0 flex list-none flex-col gap-3 p-0">
                {s.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-base leading-normal">
                    <span className="mt-2 size-2 flex-none bg-teal" aria-hidden="true" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p data-reveal className="mt-6 mb-0 max-w-[900px] text-[13px] leading-[1.6] text-gray">
          {t.extDisc}
        </p>
      </RevealScope>
    </section>
  );
}
