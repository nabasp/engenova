import type { UI } from "@/messages";
import RevealScope from "./RevealScope";
import SectionRule from "./SectionRule";

export default function ServicesIntro({ t }: { t: UI }) {
  return (
    <section id="services" className="gutter bg-surface pt-[clamp(80px,10vw,140px)]">
      <RevealScope className="container-x">
        <SectionRule n="03" label={t.sec3} surface />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-x-14 gap-y-6">
          <h2 data-reveal className="h2-display text-navy">
            {t.svcH}
          </h2>
          <p data-reveal className="pretty m-0 text-lg leading-[1.65]">
            {t.svcP}
          </p>
        </div>
      </RevealScope>
    </section>
  );
}
