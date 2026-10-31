import { getCountries, getCountryCallingCode, type CountryCode } from "libphonenumber-js";
import type { Locale } from "@/messages";

export type DialOption = { iso: string; code: string; name: string; flag: string };

/** GCC target markets, listed first in the picker. */
export const PRIORITY_DIAL: CountryCode[] = ["SA", "AE", "QA", "OM", "BH", "KW"];
export const DEFAULT_DIAL: CountryCode = "SA";

const flagOf = (iso: string) =>
  String.fromCodePoint(...[...iso].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));

/** Country-code options with names in the page's language, built on the server so the phone library stays out of the bundle. */
export function getDialOptions(locale: Locale): { priority: DialOption[]; rest: DialOption[] } {
  const names = new Intl.DisplayNames([locale], { type: "region" });
  const toOption = (iso: CountryCode): DialOption => ({
    iso,
    code: `+${getCountryCallingCode(iso)}`,
    name: names.of(iso) ?? iso,
    flag: flagOf(iso),
  });
  const rest = getCountries()
    .filter((iso) => !PRIORITY_DIAL.includes(iso))
    .map(toOption)
    .sort((a, b) => a.name.localeCompare(b.name, locale));
  return { priority: PRIORITY_DIAL.map(toOption), rest };
}
