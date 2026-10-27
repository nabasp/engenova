import type { UI } from "@/messages";
import { Wordmark } from "./Logo";

export default function Footer({ t }: { t: UI }) {
  return (
    <footer className="gutter bg-navy py-12 text-fog">
      <div className="container-x flex flex-wrap items-start justify-between gap-x-12 gap-y-6">
        <div>
          <Wordmark color="#FFFFFF" />
          <div className="mt-1.5 text-[15px] text-mist">{t.tagline}</div>
        </div>
        <p className="m-0 max-w-[620px] text-[13px] leading-[1.6]">{t.footDisc}</p>
      </div>
    </footer>
  );
}
