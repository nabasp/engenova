import type { UI } from "@/messages";
import RevealScope from "./RevealScope";
import RouteMap from "./RouteMap";
import SectionRule from "./SectionRule";
import StatCount from "./StatCount";

const chip = "rounded-full border border-line bg-white px-2.5 py-1.5 font-mono text-xs tracking-[0.08em]";

export default function Overview({ t }: { t: UI }) {
  const markets = [t.kKSA, t.kUAE, t.kQatar, t.kOman, t.kBahrain, t.kKuwait];
  return (
    <section id="overview" className="gutter section-y">
      <RevealScope className="container-x">
        <SectionRule n="01" label={t.sec1} />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-14">
          <div>
            <h2 data-reveal className="h2-display mb-7 text-navy">
              {t.tagline}
            </h2>
            <p data-reveal className="pretty mt-0 mb-[18px] text-lg leading-[1.65]">
              {t.ovP1}
            </p>
            <p data-reveal className="pretty m-0 text-lg leading-[1.65]">
              {t.ovP2}
            </p>
          </div>
          <div data-reveal className="rounded-md bg-navy p-[clamp(28px,4vw,48px)] text-white">
            <div className="font-mono text-[13px] tracking-[0.16em] text-ice uppercase">{t.upTo}</div>
            <div className="mt-1 mb-2 flex items-baseline gap-1.5" data-latin dir="ltr">
              <StatCount
                value={40}
                className="text-[clamp(96px,12vw,160px)] leading-[0.9] font-extrabold tracking-[-0.04em]"
              />
              <span className="text-[clamp(48px,6vw,80px)] font-extrabold text-green">%</span>
            </div>
            <div className="font-mono text-[13px] tracking-[0.16em] text-ice uppercase">{t.lowerCost}</div>
            <div className="my-7 h-px bg-white/20" />
            <div className="text-[22px] leading-[1.3] font-bold">{t.delivered}</div>
            <p className="mt-3 mb-0 text-base leading-[1.6] text-mist">{t.fastP}</p>
            <p className="mt-5 mb-0 text-[13px] leading-normal text-fog">{t.footnote}</p>
          </div>
        </div>

        <div data-reveal className="mt-[72px] rounded-md border border-line bg-panel p-[clamp(20px,3vw,36px)]">
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="m-0 text-xl font-bold text-navy">{t.mapTitle}</h3>
            <div className="font-mono text-xs tracking-[0.12em] text-gray uppercase">{t.mapNote}</div>
          </div>
          <RouteMap label={t.mapTitle} />
          <ul className="m-0 mt-4 hidden list-none flex-wrap gap-2 p-0 narrow:flex">
            <li className={`${chip} flex items-center gap-1.5 text-navy`}>
              <span className="size-2 rounded-full bg-green" aria-hidden="true" />
              {t.kIndia}
            </li>
            {markets.map((m) => (
              <li key={m} className={`${chip} text-ink`}>
                {m}
              </li>
            ))}
          </ul>
        </div>
      </RevealScope>
    </section>
  );
}
