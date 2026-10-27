"use client";

import { startTransition, useActionState, useState, type FormEvent, type ReactNode } from "react";
import { sendEnquiry } from "@/app/actions/enquiry";
import { COUNTRY_KEYS, DEADLINE_KEYS, type EnquiryField, type EnquiryState } from "@/lib/enquiry";
import type { Locale, UI } from "@/messages";

const INITIAL: EnquiryState = { status: "idle" };
const labelCls =
  "flex flex-col gap-2 font-mono text-xs tracking-[0.12em] text-ink uppercase";

function StepHeading({ n, children }: { n: string; children: ReactNode }) {
  return (
    <div className="col-span-full mt-2 flex items-center gap-3">
      <span className="grid size-7 place-items-center rounded-full border-[1.5px] border-navy font-mono text-xs font-medium text-navy">
        {n}
      </span>
      <h3 className="m-0 text-[17px] font-bold text-navy">{children}</h3>
      <span className="h-px flex-1 bg-line" aria-hidden="true" />
    </div>
  );
}

type FormProps = { t: UI; chips: string[]; locale: Locale };

function EnquiryForm({
  t,
  chips,
  locale,
  initialPicked,
  onReset,
}: FormProps & { initialPicked: number[]; onReset: () => void }) {
  const [state, formAction, pending] = useActionState(sendEnquiry, INITIAL);
  const [picked, setPicked] = useState(initialPicked);

  // Submit manually so a server-side validation error doesn't clear what the user typed.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(() => formAction(fd));
  };

  if (state.status === "success") {
    return (
      <div className="py-8 text-center" role="status">
        <svg viewBox="0 0 80 80" className="mx-auto size-[72px]" fill="none" aria-hidden="true">
          <circle cx="40" cy="40" r="36" stroke="#00AAA6" strokeWidth="2" />
          <path d="M24 41l11 11 21-24" stroke="#0B2D5B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="mt-4 mb-2 text-[26px] font-bold text-navy">{t.thanks}</div>
        <p className="mx-auto mt-0 mb-5 max-w-[380px] text-base leading-[1.6]">{t.thanksP}</p>
        <button
          type="button"
          onClick={onReset}
          className="min-h-11 cursor-pointer rounded-md border border-navy bg-transparent px-[18px] py-2.5 text-[15px] font-semibold text-navy hover:bg-navy hover:text-white"
        >
          {t.another}
        </button>
      </div>
    );
  }

  const err = (f: EnquiryField) => state.fieldErrors?.[f];
  const errProps = (f: EnquiryField) =>
    err(f) ? { "aria-invalid": true as const, "aria-describedby": `${f}-error` } : {};
  const errText = (f: EnquiryField) =>
    err(f) && (
      <span id={`${f}-error`} className="font-sans text-[13px] tracking-normal text-[#B42318] normal-case">
        {err(f) === "email" ? t.errEmail : t.errRequired}
      </span>
    );

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-x-4 gap-y-[18px]">
      <input type="hidden" name="locale" value={locale} />
      <div className="absolute -start-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <StepHeading n="01">{t.step1}</StepHeading>
      <label className={labelCls}>
        {t.fName}
        <input required name="name" autoComplete="name" placeholder={t.phName} className="field" {...errProps("name")} />
        {errText("name")}
      </label>
      <label className={labelCls}>
        {t.fCompany}
        <input
          required
          name="company"
          autoComplete="organization"
          placeholder={t.phCompany}
          className="field"
          {...errProps("company")}
        />
        {errText("company")}
      </label>
      <label className={labelCls}>
        {t.fEmail}
        <input
          required
          type="email"
          name="email"
          autoComplete="email"
          placeholder="name@company.com"
          dir="ltr"
          className="field rtl:text-end"
          {...errProps("email")}
        />
        {errText("email")}
      </label>
      <label className={labelCls}>
        {t.fPhone}
        <input type="tel" name="phone" autoComplete="tel" placeholder="+971 …" dir="ltr" className="field rtl:text-end" />
      </label>
      <label className={labelCls}>
        {t.fCountry}
        <select name="country" className="field select-chevron" defaultValue={COUNTRY_KEYS[0]}>
          {COUNTRY_KEYS.map((k) => (
            <option key={k} value={k}>
              {t[k]}
            </option>
          ))}
        </select>
      </label>
      <label className={labelCls}>
        {t.fDeadline}
        <select name="deadline" className="field select-chevron" defaultValue={DEADLINE_KEYS[0]}>
          {DEADLINE_KEYS.map((k) => (
            <option key={k} value={k}>
              {t[k]}
            </option>
          ))}
        </select>
      </label>

      <StepHeading n="02">{t.step2}</StepHeading>
      <div className="col-span-full flex flex-wrap gap-2" role="group" aria-label={t.step2}>
        {chips.map((label, i) => {
          const on = picked.includes(i);
          return (
            <button
              key={label}
              type="button"
              aria-pressed={on}
              onClick={() => setPicked((p) => (on ? p.filter((x) => x !== i) : [...p, i]))}
              className={`flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full border-[1.5px] px-3.5 py-2.5 text-[15px] ${
                on
                  ? "border-navy bg-navy font-semibold text-white"
                  : "border-field bg-white font-medium text-ink hover:border-navy hover:text-navy"
              }`}
            >
              {on && (
                <svg viewBox="0 0 12 12" className="size-[11px]" fill="none" aria-hidden="true">
                  <path d="M2 6.5l2.5 2.5L10 3" stroke="#9FE8D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              {label}
            </button>
          );
        })}
        {picked.map((i) => (
          <input key={i} type="hidden" name="services" value={i} />
        ))}
      </div>
      <label className={`${labelCls} col-span-full`}>
        {t.fSummary}
        <textarea
          name="message"
          rows={4}
          placeholder={t.phSummary}
          className="field h-auto resize-y py-[13px] leading-normal"
        />
      </label>
      <div className="col-span-full flex items-start gap-3 rounded-md bg-surface px-4 py-3.5 text-sm leading-normal text-ink">
        <span className="mt-1.5 size-2 flex-none bg-teal" aria-hidden="true" />
        <span>{t.ndaNote}</span>
      </div>
      {state.status === "error" && !state.fieldErrors && (
        <p role="alert" className="col-span-full m-0 text-sm text-[#B42318]">
          {t.errGeneric}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="col-span-full flex h-14 cursor-pointer items-center justify-center gap-2.5 rounded-md border-none bg-navy text-[17px] font-semibold text-white hover:bg-navy-hover disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? t.sending : t.send}
        <svg viewBox="0 0 16 16" className="size-4 rtl:-scale-x-100" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </form>
  );
}

/** Two-part enquiry form posting to the `sendEnquiry` Server Action. */
export default function ContactForm({ t, chips, locale }: FormProps) {
  const [round, setRound] = useState(0);
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white shadow-[0_24px_60px_-30px_rgba(11,45,91,0.25)]">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-navy px-[clamp(24px,3.5vw,36px)] py-5 text-white">
        <h3 className="m-0 text-xl font-bold">{t.cta}</h3>
        <div className="flex items-center gap-2 font-mono text-xs tracking-[0.12em] text-ice uppercase">
          <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden="true">
            <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="#9FE8D9" strokeWidth="1.5" />
            <path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="#9FE8D9" strokeWidth="1.5" />
          </svg>
          {t.ndaBadge}
        </div>
      </div>
      <div className="relative p-[clamp(24px,3.5vw,36px)]">
        {/* Remounting resets the action state and the picked chips. */}
        <EnquiryForm
          key={round}
          t={t}
          chips={chips}
          locale={locale}
          initialPicked={round === 0 ? [0] : []}
          onReset={() => setRound((r) => r + 1)}
        />
      </div>
    </div>
  );
}
