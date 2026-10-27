import Image from "next/image";

/** "ENGENOVA" wordmark with the green-notched A. Always Latin, always LTR. */
export function Wordmark({ color = "#0B2D5B" }: { color?: string }) {
  return (
    <span
      data-latin
      dir="ltr"
      className="inline-block whitespace-nowrap font-wordmark text-[21px] leading-none font-bold tracking-[0.06em] narrow:text-[17px]"
      style={{ color }}
    >
      ENGENOV
      <svg
        viewBox="0 0 22 20"
        aria-hidden="true"
        className="ms-[0.02em] inline-block h-[0.7em] w-[0.82em] overflow-visible align-baseline"
        fill="none"
      >
        <path d="M2 20L11 4.2L20 20" stroke={color} strokeWidth="3.6" strokeLinejoin="miter" />
        <path d="M11 12.4L14.2 19.6H7.8Z" fill="#00C853" />
      </svg>
    </span>
  );
}

export default function Logo({ href }: { href: string }) {
  return (
    <a href={href} className="flex shrink-0 items-center gap-2.5 narrow:gap-2" aria-label="ENGENOVA">
      <Image src="/brand/engenova-mark.png" alt="" width={48} height={40} preload className="block h-10 w-auto narrow:h-8" />
      <Wordmark />
    </a>
  );
}
