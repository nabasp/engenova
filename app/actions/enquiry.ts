"use server";

import { Resend } from "resend";
import { z } from "zod";
import { en } from "@/messages/en";
import { COUNTRY_KEYS, DEADLINE_KEYS, type EnquiryState } from "@/lib/enquiry";

const schema = z.object({
  name: z.string().trim().min(1, "required").max(200),
  company: z.string().trim().min(1, "required").max(200),
  email: z.string().trim().min(1, "required").pipe(z.email("email")),
  phone: z.string().trim().max(50).optional().default(""),
  country: z.enum(COUNTRY_KEYS),
  deadline: z.enum(DEADLINE_KEYS),
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
    phone: formData.get("phone") ?? "",
    country: formData.get("country"),
    deadline: formData.get("deadline"),
    services: formData.getAll("services"),
    message: formData.get("message") ?? "",
    locale: formData.get("locale"),
    website: formData.get("website") ?? "",
  });

  if (!parsed.success) {
    const fieldErrors: EnquiryState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === "name" || key === "company" || key === "email") {
        fieldErrors[key] ??= issue.message === "email" ? "email" : "required";
      }
    }
    // Anything else (tampered selects, honeypot) gets a generic error.
    return { status: "error", fieldErrors: Object.keys(fieldErrors).length ? fieldErrors : undefined };
  }

  const d = parsed.data;
  // Always report in English, whichever page the enquiry came from.
  const rows: [string, string][] = [
    ["Name", d.name],
    ["Company", d.company],
    ["Email", d.email],
    ["Phone", d.phone || "—"],
    ["Country", en.ui[d.country]],
    ["Deadline", en.ui[d.deadline]],
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
