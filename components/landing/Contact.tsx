import type { Locale, Messages } from "@/messages";
import ContactForm from "./ContactForm";
import RevealScope from "./RevealScope";
import SectionRule from "./SectionRule";

export default function Contact({ m, locale }: { m: Messages; locale: Locale }) {
  const t = m.ui;
  const meta = "pt-0.5 font-mono text-xs tracking-[0.12em] text-gray uppercase";
  return (
    <section id="contact" className="gutter section-y">
      <RevealScope className="container-x">
        <SectionRule n="09" label={t.sec9} />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-14">
          <div>
            <h2
              data-reveal
              className="m-0 mb-6 text-[clamp(40px,5.4vw,72px)] leading-none font-extrabold tracking-[-0.03em] text-balance text-navy"
            >
              {t.ctH}
            </h2>
            <p data-reveal className="pretty mt-0 mb-9 max-w-[520px] text-lg leading-[1.65]">
              {t.ctP}
            </p>
            <div data-reveal className="border-t border-line pt-6 text-[15px] leading-[1.6]">
              <div className="mb-2 font-bold text-navy">{t.shareT}</div>
              <div>{t.shareD}</div>
            </div>
            <dl data-reveal className="m-0 mt-8 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2.5 text-[15px]">
              <dt className={meta}>{t.legalL}</dt>
              <dd data-latin className="m-0 font-semibold text-navy">
                Engenova Services LLP
              </dd>
              <dt className={meta}>{t.marketsL}</dt>
              <dd className="m-0 font-semibold text-navy">{t.marketsV}</dd>
            </dl>
          </div>
          <div data-reveal>
            <ContactForm t={t} chips={m.chips} locale={locale} />
          </div>
        </div>
      </RevealScope>
    </section>
  );
}
