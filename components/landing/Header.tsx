"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale, UI } from "@/messages";
import Logo from "./Logo";

type HeaderCopy = Pick<
  UI,
  "navServices" | "navCerts" | "navProcess" | "navConsult" | "cta" | "langGroup" | "menuOpen" | "menuClose"
>;

const NAV = [
  ["#services", "navServices"],
  ["#certifications", "navCerts"],
  ["#process", "navProcess"],
  ["#consultancy", "navConsult"],
] as const;

function LangSwitch({ locale, label, tall }: { locale: Locale; label: string; tall?: boolean }) {
  const item = (target: Locale, text: string, extra: string) => {
    const active = target === locale;
    return (
      <Link
        href={`/${target}`}
        scroll={false}
        hrefLang={target}
        lang={target}
        aria-current={active ? "true" : undefined}
        className={`grid min-w-11 place-items-center px-3 font-semibold ${extra} ${
          active ? "bg-navy text-white hover:text-white" : "bg-white text-ink hover:text-navy"
        }`}
      >
        {text}
      </Link>
    );
  };
  return (
    <div
      role="group"
      aria-label={label}
      data-latin
      dir="ltr"
      className={`flex flex-none overflow-hidden rounded-md border border-field ${tall ? "h-11" : "h-10"}`}
    >
      {item("en", "EN", "font-sans text-sm tracking-[0.04em]")}
      <span className="w-px bg-field" aria-hidden="true" />
      {item("ar", "ع", "font-arabic text-[17px] leading-none")}
    </div>
  );
}

export default function Header({ t, locale }: { t: HeaderCopy; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-[72px] border-b border-hairline bg-white/92 backdrop-blur-[10px]">
        <div className="container-x gutter flex h-full items-center justify-between gap-6 narrow:gap-3">
          <Logo href="#top" />
          <nav className="flex items-center gap-7 text-[15px] font-medium narrow:hidden">
            {NAV.map(([href, key]) => (
              <a key={href} href={href} className="text-ink hover:text-teal-dark">
                {t[key]}
              </a>
            ))}
            <LangSwitch locale={locale} label={t.langGroup} />
            <a
              href="#contact"
              className="rounded-sm bg-navy px-[18px] py-[11px] font-semibold text-white hover:bg-navy-hover hover:text-white"
            >
              {t.cta}
            </a>
          </nav>
          <div className="hidden items-center gap-2 narrow:flex">
            <LangSwitch locale={locale} label={t.langGroup} tall />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t.menuClose : t.menuOpen}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid size-11 cursor-pointer place-items-center rounded-md border border-field bg-white p-0"
            >
              <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden="true">
                <path
                  d={open ? "M4 4L16 16M16 4L4 16" : "M3 6H17M3 10H17M3 14H17"}
                  stroke="#0B2D5B"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-[72px] z-[49] hidden flex-col border-b border-hairline bg-white px-5 pt-2 pb-5 shadow-[0_20px_40px_-20px_rgba(11,45,91,0.3)] narrow:flex"
        >
          {NAV.map(([href, key]) => (
            <a
              key={href}
              href={href}
              onClick={close}
              className="border-b border-divider py-3.5 text-lg font-semibold text-navy"
            >
              {t[key]}
            </a>
          ))}
          <a
            href="#contact"
            onClick={close}
            className="mt-4 rounded-md bg-navy p-4 text-center text-base font-semibold text-white hover:text-white"
          >
            {t.cta}
          </a>
        </div>
      )}
    </>
  );
}
