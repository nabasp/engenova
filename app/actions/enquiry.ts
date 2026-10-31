"use server";

import { getCountries, parsePhoneNumberFromString, type CountryCode } from "libphonenumber-js";
import { Resend } from "resend";
import { z } from "zod";
import { en } from "@/messages/en";
import { DEADLINE_KEYS, type EnquiryState } from "@/lib/enquiry";

const DIAL_COUNTRIES = new Set<string>(getCountries());
const isDialCountry = (v: string): v is CountryCode => DIAL_COUNTRIES.has(v);
const regionName = new Intl.DisplayNames(["en"], { type: "region" });

const schema = z.object({
  name: z.string().trim().min(1, "required").max(200),
  company: z.string().trim().min(1, "required").max(200),
  email: z.string().trim().min(1, "required").pipe(z.email("email")),
  // Mobile number: the dial-code picker's country plus the number as typed (which may itself start with +).
  dial: z.string().refine(isDialCountry),
  phone: z.string().trim().min(1, "required").max(30),
  deadline: z.enum(DEADLINE_KEYS).or(z.literal("")),
  services: z.array(z.coerce.number().int().min(0).max(en.chips.length - 1)).max(en.chips.length),
  message: z.string().trim().max(5000).optional().default(""),
  locale: z.enum(["en", "ar"]),
  website: z.string().max(0), // honeypot: real people leave it empty
});

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const parsed = schema.safeParse({
    name: formData.get("name") ?? "",
    company: formData.get("company") ?? "",
    email: formData.get("email") ?? "",
    dial: formData.get("dial") ?? "",
    phone: formData.get("phone") ?? "",
    deadline: formData.get("deadline") ?? "",
    services: formData.getAll("services"),
    message: formData.get("message") ?? "",
    locale: formData.get("locale"),
    website: formData.get("website") ?? "",
  });

  const fieldErrors: EnquiryState["fieldErrors"] = {};
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === "name" || key === "company" || key === "email" || key === "phone") {
        fieldErrors[key] ??= issue.message === "email" ? "email" : "required";
      }
    }
  }
  // The country is read from the number, so it must be a real one. Checked even when other fields fail.
  const dial = String(formData.get("dial") ?? "");
  const phone = String(formData.get("phone") ?? "").trim();
  const mobile = phone ? parsePhoneNumberFromString(phone, isDialCountry(dial) ? dial : undefined) : undefined;
  if (phone && !mobile?.isValid()) fieldErrors.phone = "phone";

  if (!parsed.success || !mobile?.isValid()) {
    // Anything else (tampered selects, honeypot) gets a generic error.
    return { status: "error", fieldErrors: Object.keys(fieldErrors).length ? fieldErrors : undefined };
  }

  const d = parsed.data;
  const country = mobile.country ?? d.dial;
  // Always report in English, whichever page the enquiry came from.
  const rows: [string, string][] = [
    ["Name", d.name],
    ["Company", d.company],
    ["Email", d.email],
    ["Mobile", mobile.formatInternational()],
    ["Country", `${regionName.of(country) ?? country} (from mobile number)`],
    ["Deadline", d.deadline ? en.ui[d.deadline] : "—"],
    ["Services", d.services.map((i) => en.chips[i]).join(", ") || "—"],
    ["Page language", d.locale.toUpperCase()],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nRequirement summary:\n${d.message || "—"}\n`;
  const html = `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#6B7280">${k}</td><td style="color:#0B2D5B"><strong>${escape(v)}</strong></td></tr>`)
    .join("")}</table><p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${escape(d.message || "—")}</p>`;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO;
  const from = process.env.ENQUIRY_FROM ?? "ENGENOVA Website <onboarding@resend.dev>";

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[enquiry] RESEND_API_KEY / ENQUIRY_TO not set — logging instead of sending:\n" + text);
      return { status: "success" };
    }
    console.error("[enquiry] RESEND_API_KEY or ENQUIRY_TO is missing");
    return { status: "error" };
  }

  const { error } = await new Resend(apiKey).emails.send({
    from,
    to: to.split(",").map((s) => s.trim()),
    replyTo: d.email,
    subject: `New enquiry — ${d.company} (${d.name})`,
    text,
    html,
  });
  if (error) {
    console.error("[enquiry] Resend error", error);
    return { status: "error" };
  }
  return { status: "success" };
}
