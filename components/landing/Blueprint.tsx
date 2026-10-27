"use client";

import { useRef } from "react";
import { gsap, idleMedia, MEDIA, useGSAP } from "@/lib/gsap";

const DETECTIONS = [
  {
    box: "M108 72V48H132M548 48H572V72M572 298V322H548M132 322H108V298",
    tag: { x: 108, y: 14, w: 150, label: "GENSET 0.99" },
    color: "#00AAA6",
  },
  {
    box: "M690 120V100H710M860 100H880V120M880 240V260H860M710 260H690V240",
    tag: { x: 690, y: 262, w: 190, label: "ATTENUATOR 0.96" },
    color: "#00AAA6",
  },
  {
    box: "M950 66V48H966M982 48H998V66M998 324V342H982M966 342H950V324",
    tag: { x: 1008, y: 48, w: 150, label: "LOUVER 0.95" },
    color: "#00C853",
  },
];
const DETECT_AT = [0.7, 1.6, 2.1];

/** Generator-room drawing that is "taken off" as you scroll: lines draw, a scan line sweeps, detections pop. */
export default function Blueprint() {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      return idleMedia(MEDIA.motion, () => {
        const q = gsap.utils.selector(ref);
        const bp = gsap.timeline({
          scrollTrigger: { trigger: ref.current, start: "top 85%", end: "bottom 45%", scrub: 0.8 },
        });
        bp.from(q("[data-bp-grid]"), { drawSVG: 0, duration: 1, ease: "none" }, 0)
          .from(q("[data-bp-line]"), { drawSVG: 0, duration: 1.4, stagger: 0.18, ease: "none" }, 0.2)
          .from(q("[data-bp-dim]"), { drawSVG: 0, duration: 0.5 }, 1.6)
          .from(q("[data-bp-text]"), { opacity: 0, duration: 0.5, stagger: 0.15 }, 1.8)
          .from(q("[data-bp-flow]"), { drawSVG: 0, duration: 0.5, stagger: 0.15 }, 2.0)
          .fromTo(q("[data-bp-scan]"), { x: 0, opacity: 0 }, { x: 1200, opacity: 1, duration: 2.4, ease: "none" }, 2.6)
          .to(q("[data-bp-scan]"), { opacity: 0, duration: 0.3 }, 4.8);
        q("[data-bp-det]").forEach((d, i) => {
          const at = 2.6 + DETECT_AT[i];
          bp.from(d.querySelector("[data-bp-box]"), { drawSVG: "50% 50%", duration: 0.4 }, at).from(
            d.querySelector("[data-bp-tag]"),
            { opacity: 0, y: 8, duration: 0.3 },
            at + 0.25,
          );
        });
        gsap.fromTo(
          q("[data-bp-flow]"),
          { opacity: 0.35 },
          { opacity: 1, duration: 0.9, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.3 },
        );
      });
    },
    { scope: ref },
  );

  return (
    <svg
      ref={ref}
      viewBox="0 0 1200 420"
      className="block h-auto w-full overflow-visible"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Generator room drawing with AI-detected genset, attenuator and louver"
      data-latin
    >
      <g stroke="rgba(159,217,232,0.10)" strokeWidth="1">
        <path data-bp-grid d="M0 40H1200M0 120H1200M0 200H1200M0 280H1200M0 360H1200" />
        <path data-bp-grid d="M80 0V420M240 0V420M400 0V420M560 0V420M720 0V420M880 0V420M1040 0V420" />
      </g>
      <g stroke="#6FC3E0" strokeWidth="1.6" opacity="0.8">
        <path data-bp-line d="M120 60H560V310H120Z" />
        <path data-bp-line d="M150 90H400V280H150Z" />
        <path data-bp-line d="M306 185a46 46 0 1 1-92 0a46 46 0 1 1 92 0M260 139V231M214 185H306" />
        <path data-bp-line d="M420 100H540V250H420Z" />
        <path data-bp-line d="M560 80H640V290H560ZM572 92V278M584 92V278M596 92V278M608 92V278M620 92V278" />
        <path data-bp-line d="M640 130H700M640 240H700" />
        <path data-bp-line d="M700 110H870V250H700Z" />
        <path data-bp-line d="M870 130H962M870 230H962" />
        <path data-bp-line d="M955 0V420M992 0V420" />
        <path
          data-bp-line
          d="M962 60H986V330H962ZM962 84L986 64M962 114L986 94M962 144L986 124M962 174L986 154M962 204L986 184M962 234L986 214M962 264L986 244M962 294L986 274M962 324L986 304"
        />
      </g>
      <g stroke="#6FC3E0" strokeWidth="1.4" strokeDasharray="10 8" opacity="0.7">
        <path data-bp-text d="M716 140H854M716 162H854M716 184H854M716 206H854M716 228H854" />
      </g>
      <g stroke="rgba(159,217,232,0.7)" strokeWidth="1">
        <path data-bp-dim d="M700 80H870M700 72V88M870 72V88" />
      </g>
      <g fontFamily="var(--font-plex-mono)" fontSize="15" fill="rgba(159,217,232,0.85)" letterSpacing="1">
        <text data-bp-text x="785" y="68" textAnchor="middle">
          2,400
        </text>
        <text data-bp-text x="340" y="350" textAnchor="middle">
          GEN-01 · 1500 kVA
        </text>
        <text data-bp-text x="940" y="30" textAnchor="end">
          LV-02 DISCHARGE
        </text>
      </g>
      <g stroke="#00C8C3" strokeWidth="2.2">
        <path data-bp-flow d="M20 185H90M76 173L90 185L76 197" />
        <path data-bp-flow d="M890 185H940M926 173L940 185L926 197" />
        <path data-bp-flow d="M1010 185H1130M1116 173L1130 185L1116 197" />
      </g>
      <path data-bp-scan d="M0 0V420" stroke="#00C853" strokeWidth="2" opacity="0" />
      {DETECTIONS.map((d) => (
        <g key={d.tag.label} data-bp-det>
          <path data-bp-box d={d.box} stroke={d.color} strokeWidth="2.5" />
          <g data-bp-tag>
            <rect x={d.tag.x} y={d.tag.y} width={d.tag.w} height="30" rx="2" fill={d.color} />
            <text
              x={d.tag.x + 12}
              y={d.tag.y + 21}
              fontFamily="var(--font-plex-mono)"
              fontSize="15"
              fontWeight="500"
              fill="#062042"
            >
              {d.tag.label}
            </text>
          </g>
        </g>
      ))}
    </svg>
  );
}
