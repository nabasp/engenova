import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AiProcess from "@/components/landing/AiProcess";
import Certifications from "@/components/landing/Certifications";
import Commitments from "@/components/landing/Commitments";
import Consultancy from "@/components/landing/Consultancy";
import Contact from "@/components/landing/Contact";
import CoreServices from "@/components/landing/CoreServices";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import HowWeDeliver from "@/components/landing/HowWeDeliver";
import Overview from "@/components/landing/Overview";
import Pipeline from "@/components/landing/Pipeline";
import RevealScope from "@/components/landing/RevealScope";
import SectionRule from "@/components/landing/SectionRule";
import ServicesIntro from "@/components/landing/ServicesIntro";
import WhyEngenova from "@/components/landing/WhyEngenova";
import { getMessages, isLocale } from "@/messages";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getMessages(locale).ui;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  return {
    metadataBase: siteUrl ? new URL(siteUrl) : undefined,
    title: t.metaTitle,
    description: t.heroSub,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", ar: "/ar", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      url: `/${locale}`,
      siteName: "ENGENOVA",
      title: t.metaTitle,
      description: t.heroSub,
      locale: locale === "ar" ? "ar_AE" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_AE",
      images: [{ url: "/brand/engenova-logo.png", width: 1738, height: 400, alt: "ENGENOVA" }],
    },
  };
}

export default async function Page({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const m = getMessages(locale);
  const t = m.ui;

  return (
    <>
      <noscript>
        <style>{"[data-js-reveal]{visibility:visible!important}"}</style>
      </noscript>
      <Header
        locale={locale}
        t={{
          navServices: t.navServices,
          navCerts: t.navCerts,
          navProcess: t.navProcess,
          navConsult: t.navConsult,
          cta: t.cta,
          langGroup: t.langGroup,
          menuOpen: t.menuOpen,
          menuClose: t.menuClose,
        }}
      />
      <main id="top" key={locale}>
        <span id="main" />
        <Hero t={t} />
        <Overview t={t} />
        <WhyEngenova m={m} />
        <ServicesIntro t={t} />
        <Pipeline label={t.cycleLabel} heading={t.cycleH} steps={m.pipeline} />
        <CoreServices label={t.eight} services={m.services} locale={locale} />
        <Certifications m={m} />
        <AiProcess m={m} />
        <Commitments m={m} />
        <section className="gutter">
          <RevealScope className="container-x">
            <SectionRule n="07" label={t.sec7} className="" />
          </RevealScope>
        </section>
        <HowWeDeliver steps={m.delivery} />
        <Consultancy m={m} />
        <Contact m={m} locale={locale} />
      </main>
      <Footer t={t} />
    </>
  );
}
