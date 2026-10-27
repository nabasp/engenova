import type { Messages } from "@/messages";
import CommitIcon from "./CommitIcon";
import RevealScope from "./RevealScope";
import SectionRule from "./SectionRule";
import { commitmentIcons } from "./svg/data";

export default function Commitments({ m }: { m: Messages }) {
  const { ui: t, comms } = m;
  return (
    <section id="commitments" className="gutter section-y">
      <RevealScope className="container-x">
        <SectionRule n="06" label={t.sec6} />
        <h2 data-reveal className="h2-display mb-14 max-w-[820px] text-navy">
          {t.cmH}
        </h2>
        <div data-stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-5">
          {comms.map((c, i) => (
            <div key={c.t} className="rounded-md bg-surface p-8">
              <CommitIcon icon={commitmentIcons[i]} />
              <h3 className="m-0 mb-5 text-2xl font-bold text-navy">{c.t}</h3>
              <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
                {c.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-base leading-normal">
                    <span className="mt-2 size-2 flex-none bg-teal" aria-hidden="true" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p data-reveal className="mt-6 mb-0 text-[13px] text-gray">
          {t.cmNote}
        </p>
      </RevealScope>
    </section>
  );
}
