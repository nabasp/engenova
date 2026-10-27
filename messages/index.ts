import { ar } from "./ar";
import { en } from "./en";
import type { Messages } from "./types";

export type { Messages, UI } from "./types";

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const dirOf = (locale: Locale) => (locale === "ar" ? "rtl" : "ltr");

const dictionaries: Record<Locale, Messages> = { en, ar };

export const getMessages = (locale: Locale) => dictionaries[locale];
