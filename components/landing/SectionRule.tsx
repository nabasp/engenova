/** Numbered section label with a teal rule that draws on scroll (animated by RevealScope via data-draw). */
export default function SectionRule({
  n,
  label,
  dark = false,
  surface = false,
  className = "mb-12",
}: {
  n: string;
  label: string;
  dark?: boolean;
  /** On the light surface background, use the deeper gray for contrast. */
  surface?: boolean;
  className?: string;
}) {
  return (
    <div className={`mono-label flex items-center gap-4 ${dark ? "text-ice" : surface ? "text-gray-deep" : "text-gray"} ${className}`}>
      <span className={`font-medium ${dark ? "text-white" : "text-navy"}`}>{n}</span>
      <svg
        viewBox="0 0 1000 2"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="h-0.5 w-0 min-w-0 flex-1 overflow-visible rtl:-scale-x-100"
      >
        <path data-draw d="M0 1H1000" stroke="#00AAA6" strokeWidth="1.5" />
      </svg>
      <span>{label}</span>
    </div>
  );
}
