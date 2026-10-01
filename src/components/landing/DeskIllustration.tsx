"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { copy } from "@/lib/copy";

/** Each object drops onto the desk a moment after the one before. Motion skips the movement for reduced motion. */
function Drop({ delay, children }: { delay: number; children: ReactNode }) {
  return (
    <motion.g
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 160, damping: 18, delay }}
    >
      {children}
    </motion.g>
  );
}

/**
 * A detective's desk seen from above: case folder, notes, a magnifying glass, a sticky note,
 * and two cards joined by red string. All drawn in SVG with the theme colours.
 */
export function DeskIllustration() {
  return (
    <svg
      viewBox="0 0 600 460"
      role="img"
      aria-label={copy.landing.illustrationLabel}
      className="h-auto w-full drop-shadow-[0_18px_24px_rgb(31_27_22_/_0.25)]"
    >
      {/* desk top with wood grain */}
      <rect width={600} height={460} rx={28} className="fill-manila-500" />
      {[48, 112, 176, 240, 304, 368, 432].map((y, i) => (
        <path
          key={y}
          d={`M0 ${y} Q150 ${y + (i % 2 ? 8 : -8)} 300 ${y} T600 ${y}`}
          className="fill-none stroke-manila-600"
          strokeOpacity={0.3}
          strokeWidth={2}
        />
      ))}
      <rect x={3} y={3} width={594} height={454} rx={26} className="fill-none stroke-manila-700" strokeOpacity={0.5} strokeWidth={6} />

      {/* loose paper */}
      <Drop delay={0.05}>
        <g transform="rotate(5 280 190)">
          <rect x={170} y={36} width={230} height={300} rx={4} className="fill-paper" />
          <line x1={196} y1={36} x2={196} y2={336} className="stroke-evidence" strokeOpacity={0.5} strokeWidth={2} />
          {Array.from({ length: 10 }, (_, i) => (
            <line key={i} x1={206} y1={72 + i * 26} x2={384} y2={72 + i * 26} className="stroke-manila-600" strokeOpacity={0.35} strokeWidth={1.5} />
          ))}
        </g>
      </Drop>

      {/* mug of hot chocolate */}
      <Drop delay={0.15}>
        <g>
          <rect x={126} y={86} width={26} height={22} rx={11} className="fill-none stroke-navy" strokeWidth={6} />
          <circle cx={86} cy={96} r={46} className="fill-paper stroke-navy" strokeWidth={5} />
          <circle cx={86} cy={96} r={35} className="fill-manila-700" />
          <circle cx={74} cy={86} r={9} className="fill-paper" fillOpacity={0.25} />
        </g>
      </Drop>

      {/* notebook */}
      <Drop delay={0.25}>
        <g transform="rotate(-8 125 345)">
          <rect x={40} y={252} width={170} height={190} rx={8} className="fill-navy" />
          {Array.from({ length: 7 }, (_, i) => (
            <circle key={i} cx={46} cy={274 + i * 26} r={5} className="fill-highlighter" />
          ))}
          <rect x={72} y={288} width={116} height={64} rx={4} className="fill-paper" />
          <text x={130} y={314} textAnchor="middle" className="fill-ink font-display text-[15px]">
            NOTEBOOK
          </text>
          <text x={130} y={336} textAnchor="middle" className="fill-ink-soft font-sans text-[11px]">
            Write it down
          </text>
        </g>
      </Drop>

      {/* the case folder */}
      <Drop delay={0.35}>
        <g transform="rotate(-6 325 225)">
          <rect x={190} y={100} width={96} height={30} rx={7} className="fill-manila-400 stroke-manila-600" strokeWidth={2} />
          <text x={238} y={121} textAnchor="middle" className="fill-ink font-display text-[12px]">
            NO. 017
          </text>
          <rect x={190} y={120} width={280} height={206} rx={10} className="fill-manila stroke-manila-600" strokeWidth={2.5} />
          <rect x={218} y={170} width={188} height={74} rx={4} className="fill-paper" />
          <text x={312} y={198} textAnchor="middle" className="fill-ink-soft font-display text-[12px] tracking-widest">
            CASE NO. 017
          </text>
          <text x={312} y={222} textAnchor="middle" className="fill-ink font-display text-[19px]">
            The Vanishing
          </text>
          <text x={312} y={241} textAnchor="middle" className="fill-ink font-display text-[19px]">
            Puddle
          </text>
          <g transform="rotate(-12 420 290)">
            <rect x={366} y={272} width={96} height={34} rx={5} className="fill-none stroke-evidence-dark" strokeWidth={3.5} />
            <text x={414} y={297} textAnchor="middle" className="fill-evidence-dark font-display text-[19px] tracking-widest">
              OPEN
            </text>
          </g>
        </g>
      </Drop>

      {/* sticky note */}
      <Drop delay={0.45}>
        <g transform="rotate(8 505 90)">
          <rect x={456} y={40} width={104} height={104} className="fill-highlighter" />
          <text x={466} y={66} className="fill-ink font-display text-[12px]">
            WHERE DID
          </text>
          <text x={466} y={84} className="fill-ink font-display text-[12px]">
            THE WATER GO?
          </text>
          <path d="M466 106 q10 -10 20 0 t20 0 t20 0 t20 0" className="fill-none stroke-ink" strokeOpacity={0.5} strokeWidth={2} />
          <path d="M466 124 q10 -10 20 0 t20 0 t20 0" className="fill-none stroke-ink" strokeOpacity={0.5} strokeWidth={2} />
        </g>
      </Drop>

      {/* two cards on red string */}
      <Drop delay={0.55}>
        <g>
          <g transform="rotate(-5 335 380)">
            <rect x={296} y={346} width={78} height={86} rx={3} className="fill-paper stroke-manila-600" strokeWidth={2} />
            <rect x={304} y={354} width={62} height={44} className="fill-navy-100" />
            <line x1={304} y1={410} x2={362} y2={410} className="stroke-manila-600" strokeWidth={3} />
            <line x1={304} y1={420} x2={346} y2={420} className="stroke-manila-600" strokeWidth={3} />
          </g>
          <g transform="rotate(6 455 395)">
            <rect x={414} y={362} width={78} height={86} rx={3} className="fill-paper stroke-manila-600" strokeWidth={2} />
            <rect x={422} y={370} width={62} height={44} className="fill-sage-light" />
            <line x1={422} y1={426} x2={480} y2={426} className="stroke-manila-600" strokeWidth={3} />
            <line x1={422} y1={436} x2={464} y2={436} className="stroke-manila-600" strokeWidth={3} />
          </g>
          <path d="M335 350 Q395 400 453 366" className="fill-none stroke-evidence" strokeWidth={4} strokeLinecap="round" />
          <circle cx={335} cy={350} r={7} className="fill-evidence stroke-evidence-dark" strokeWidth={2} />
          <circle cx={453} cy={366} r={7} className="fill-evidence stroke-evidence-dark" strokeWidth={2} />
        </g>
      </Drop>

      {/* pencil */}
      <Drop delay={0.65}>
        <g transform="rotate(-28 90 220)">
          <rect x={14} y={212} width={150} height={16} className="fill-highlighter-dark" />
          <rect x={14} y={212} width={20} height={16} className="fill-evidence-light" />
          <rect x={34} y={212} width={8} height={16} className="fill-manila-400" />
          <path d="M164 212 L196 220 L164 228 Z" className="fill-manila" />
          <path d="M184 216.5 L196 220 L184 223.5 Z" className="fill-ink" />
        </g>
      </Drop>

      {/* magnifying glass */}
      <Drop delay={0.75}>
        <g>
          <line x1={504} y1={262} x2={566} y2={326} className="stroke-ink" strokeWidth={16} strokeLinecap="round" />
          <line x1={504} y1={262} x2={520} y2={278} className="stroke-navy" strokeWidth={16} strokeLinecap="round" />
          <circle cx={462} cy={216} r={56} className="fill-highlighter-light" fillOpacity={0.45} />
          <circle cx={462} cy={216} r={56} className="fill-none stroke-navy" strokeWidth={10} />
          <path d="M430 200 A36 36 0 0 1 456 176" className="fill-none stroke-paper" strokeWidth={6} strokeLinecap="round" strokeOpacity={0.85} />
        </g>
      </Drop>
    </svg>
  );
}
