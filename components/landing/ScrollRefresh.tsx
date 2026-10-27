"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/** Re-measures every ScrollTrigger once fonts settle and whenever the locale changes. */
export default function ScrollRefresh({ locale }: { locale: string }) {
  useEffect(() => {
    let cancelled = false;
    const refresh = () => !cancelled && ScrollTrigger.refresh();
    const timer = window.setTimeout(refresh, 400);
    document.fonts?.ready.then(refresh);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [locale]);

  return null;
}
