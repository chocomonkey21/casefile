import type { ReactNode } from "react";
import type { DiagramId } from "@/lib/types";

/*
  Inline SVG diagrams. Colours come from the theme tokens (fill-manila-500 and so on),
  so they match the rest of the app. Every diagram gets its text description from
  the lesson data (the `alt` field), which DiagramFigure puts on the SVG.
*/

const T = "fill-ink font-sans text-[15px]"; // standard label text

/** A small cloud made of overlapping ellipses, centred on (cx, cy) */
function Cloud({ cx, cy, scale = 1, className = "fill-paper stroke-ink" }: { cx: number; cy: number; scale?: number; className?: string }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale})`} className={className} strokeWidth={2}>
      <ellipse cx={-28} cy={6} rx={30} ry={18} />
      <ellipse cx={10} cy={-6} rx={34} ry={24} />
      <ellipse cx={42} cy={8} rx={28} ry={16} />
      <rect x={-46} y={6} width={108} height={18} rx={9} stroke="none" />
    </g>
  );
}

function Arrow({ id }: { id: string }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" className="fill-ink" />
      </marker>
    </defs>
  );
}

function Sun({ cx, cy }: { cx: number; cy: number }) {
  const rays = Array.from({ length: 8 }, (_, i) => (i * Math.PI) / 4);
  return (
    <g>
      {rays.map((a, i) => (
        <line
          key={i}
          x1={cx + Math.cos(a) * 34}
          y1={cy + Math.sin(a) * 34}
          x2={cx + Math.cos(a) * 46}
          y2={cy + Math.sin(a) * 46}
          className="stroke-postit-dark"
          strokeWidth={4}
          strokeLinecap="round"
        />
      ))}
      <circle cx={cx} cy={cy} r={26} className="fill-postit stroke-ink" strokeWidth={2} />
    </g>
  );
}

function EvapClose() {
  const inWater: [number, number][] = [[70, 235], [145, 265], [215, 230], [290, 272], [365, 240], [435, 268], [505, 232], [548, 280], [105, 298], [255, 302], [405, 300]];
  const escaping: [number, number][] = [[205, 150], [270, 105], [150, 112], [345, 140], [410, 92], [478, 146]];
  return (
    <>
      <Arrow id="arr-evap" />
      <rect width={600} height={340} rx={14} className="fill-paper-dark" />
      <Sun cx={540} cy={52} />
      <rect x={20} y={195} width={560} height={125} rx={12} className="fill-manila-500" />
      <path d="M20 195 Q80 185 140 195 T260 195 T380 195 T500 195 T580 195" className="fill-none stroke-coffee" strokeWidth={3} />
      {inWater.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={8} className="fill-coffee stroke-paper" strokeWidth={1.5} />
      ))}
      {escaping.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={8} className="fill-postit-light stroke-ink" strokeWidth={2} strokeDasharray="3 3" />
          <line x1={x} y1={y + 14} x2={x} y2={y + 38} className="stroke-ink" strokeWidth={2} markerStart="url(#arr-evap)" />
        </g>
      ))}
      <text x={28} y={38} className={T}>Water vapour</text>
      <text x={28} y={58} className={T}>(an invisible gas)</text>
      <text x={34} y={226} className="fill-paper font-sans text-[15px] font-semibold">Liquid water</text>
    </>
  );
}

function ColdGlass() {
  const drops: [number, number][] = [[246, 150], [244, 210], [252, 260], [354, 140], [358, 200], [348, 255], [298, 286]];
  const vapour: [number, number][] = [[105, 130], [150, 215], [500, 145], [455, 230]];
  return (
    <>
      <Arrow id="arr-glass" />
      <rect width={600} height={340} rx={14} className="fill-paper-dark" />
      {/* the glass */}
      <path d="M232 92 L368 92 L356 290 Q300 302 244 290 Z" className="fill-paper/60 stroke-ink" strokeWidth={3} />
      <path d="M240 160 L360 160 L356 290 Q300 302 244 290 Z" className="fill-beige" />
      {drops.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={5} className="fill-manila-500 stroke-coffee" strokeWidth={1.5} />
      ))}
      {vapour.map(([x, y], i) => {
        const toward = x < 300 ? 1 : -1;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={9} className="fill-postit-light stroke-ink" strokeWidth={2} strokeDasharray="3 3" />
            <line x1={x + toward * 16} y1={y} x2={x + toward * 54} y2={y + 6} className="stroke-ink" strokeWidth={2} markerEnd="url(#arr-glass)" />
          </g>
        );
      })}
      <text x={24} y={56} className={T}>Water vapour in the air</text>
      <text x={24} y={76} className={T}>(invisible)</text>
      <text x={388} y={300} className={T}>Drops of liquid water</text>
      <text x={388} y={320} className={T}>on the outside</text>
      <text x={268} y={330} className="fill-coffee font-sans text-[15px] font-semibold">Cold glass</text>
    </>
  );
}

function FourTypes() {
  const panels = [
    { x: 12, title: "Rain", note: "Warm all the way" },
    { x: 162, title: "Snow", note: "Freezing all the way" },
    { x: 312, title: "Sleet", note: "Cold layer low down" },
    { x: 462, title: "Hail", note: "Strong storm winds" },
  ];
  return (
    <>
      <rect width={600} height={340} rx={14} className="fill-paper-dark" />
      {panels.map((p, i) => (
        <g key={p.title} transform={`translate(${p.x} 12)`}>
          <rect width={126} height={316} rx={10} className="fill-paper stroke-manila-600" strokeWidth={2} />
          <Cloud cx={63} cy={52} scale={0.85} className={i === 3 ? "fill-manila-500 stroke-ink" : "fill-beige stroke-ink"} />
          {/* precipitation */}
          {i === 0 &&
            [28, 52, 76, 100].flatMap((x) => [110, 170, 230].map((y) => (
              <path key={`${x}-${y}`} d={`M${x} ${y + (x % 3) * 6} l-4 14`} className="stroke-coffee" strokeWidth={3} strokeLinecap="round" />
            )))}
          {i === 1 &&
            [34, 66, 96].flatMap((x) => [118, 178, 238].map((y) => (
              <g key={`${x}-${y}`} transform={`translate(${x + (y % 40)} ${y})`} className="stroke-coffee" strokeWidth={2.5} strokeLinecap="round">
                <line x1={-7} y1={0} x2={7} y2={0} />
                <line x1={-3.5} y1={-6} x2={3.5} y2={6} />
                <line x1={-3.5} y1={6} x2={3.5} y2={-6} />
              </g>
            )))}
          {i === 2 && (
            <>
              {[30, 62, 94].map((x) => (
                <path key={x} d={`M${x} 100 l-4 14`} className="stroke-coffee" strokeWidth={3} strokeLinecap="round" />
              ))}
              <rect x={10} y={150} width={106} height={26} rx={6} className="fill-paper-dark stroke-coffee" strokeDasharray="4 3" strokeWidth={1.5} />
              <text x={63} y={168} textAnchor="middle" className="fill-coffee font-sans text-[11px]">cold layer</text>
              {[30, 62, 94].map((x) => (
                <circle key={x} cx={x} cy={210 + (x % 20)} r={5} className="fill-beige stroke-coffee" strokeWidth={2} />
              ))}
            </>
          )}
          {i === 3 && (
            <>
              {[[40, 116], [80, 152], [52, 190], [92, 222], [60, 256]].map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r={10} className="fill-paper stroke-coffee" strokeWidth={2.5} />
              ))}
              <path d="M104 220 v-70" className="stroke-ink" strokeWidth={2} strokeDasharray="3 3" />
              <path d="M22 110 v60" className="stroke-ink" strokeWidth={2} strokeDasharray="3 3" />
            </>
          )}
          <text x={63} y={296} textAnchor="middle" className="fill-ink font-display text-[17px]">{p.title}</text>
          <text x={63} y={312} textAnchor="middle" className="fill-ink-soft font-sans text-[11px]">{p.note}</text>
        </g>
      ))}
    </>
  );
}

function WhereRainGoes() {
  return (
    <>
      <Arrow id="arr-rain" />
      <rect width={600} height={340} rx={14} className="fill-paper-dark" />
      <Cloud cx={140} cy={48} scale={1} className="fill-paper stroke-ink" />
      {[90, 120, 150, 180, 210].map((x) => (
        <path key={x} d={`M${x} 92 l-5 16`} className="stroke-coffee" strokeWidth={3} strokeLinecap="round" />
      ))}
      <text x={236} y={64} className={T}>Rain falls</text>
      {/* hill */}
      <path d="M0 340 L0 150 Q120 118 250 190 Q340 240 430 268 L430 340 Z" className="fill-desk-light stroke-desk" strokeWidth={2} />
      {/* underground layer */}
      <path d="M0 290 Q180 262 430 300 L430 340 L0 340 Z" className="fill-manila-400" />
      <text x={20} y={326} className={T}>Underground rock and soil</text>
      {/* river and sea */}
      <path d="M380 255 Q420 262 440 282 L600 282 L600 340 L430 340 Z" className="fill-manila-500" />
      <text x={470} y={318} className="fill-paper font-sans text-[15px] font-semibold">Sea</text>
      {/* runoff */}
      <path d="M130 158 Q250 190 370 252" className="fill-none stroke-evidence-dark" strokeWidth={3} markerEnd="url(#arr-rain)" />
      <text x={238} y={166} className="fill-evidence-dark font-sans text-[15px] font-semibold" transform="rotate(14 238 166)">Runoff</text>
      {/* soaking in */}
      <path d="M90 168 L90 268" className="fill-none stroke-coffee" strokeWidth={3} strokeDasharray="6 5" markerEnd="url(#arr-rain)" />
      <text x={100} y={232} className="fill-coffee font-sans text-[15px] font-semibold">Soaks in</text>
      {/* groundwater */}
      <path d="M96 290 Q240 282 420 304" className="fill-none stroke-coffee" strokeWidth={3} strokeDasharray="6 5" markerEnd="url(#arr-rain)" />
      <text x={200} y={278} className="fill-coffee font-sans text-[15px] font-semibold">Groundwater</text>
    </>
  );
}

function CycleMap() {
  return (
    <>
      <Arrow id="arr-cycle" />
      <rect width={600} height={340} rx={14} className="fill-paper-dark" />
      <Sun cx={60} cy={56} />
      <Cloud cx={370} cy={62} scale={1.1} className="fill-paper stroke-ink" />
      {/* land and sea */}
      <path d="M340 340 L340 252 Q420 214 470 236 Q540 196 600 226 L600 340 Z" className="fill-desk-light stroke-desk" strokeWidth={2} />
      <rect x={0} y={268} width={360} height={72} className="fill-manila-500" />
      <path d="M0 268 Q45 260 90 268 T180 268 T270 268 T360 268" className="fill-none stroke-coffee" strokeWidth={3} />
      {/* 1 evaporation */}
      <path d="M150 262 C150 190 210 124 306 94" className="fill-none stroke-ink" strokeWidth={3} strokeDasharray="7 5" markerEnd="url(#arr-cycle)" />
      {/* 3 precipitation */}
      {[382, 408, 434, 460].map((x) => (
        <path key={x} d={`M${x} 104 l-5 18`} className="stroke-coffee" strokeWidth={3} strokeLinecap="round" />
      ))}
      <path d="M426 136 L446 208" className="fill-none stroke-ink" strokeWidth={3} markerEnd="url(#arr-cycle)" />
      {/* 4 collection */}
      <path d="M500 262 C440 282 400 288 360 300" className="fill-none stroke-evidence-dark" strokeWidth={4} markerEnd="url(#arr-cycle)" />
      {/* numbered labels */}
      {[
        { n: 1, x: 20, y: 200, t: "Evaporation" },
        { n: 2, x: 140, y: 30, t: "Condensation" },
        { n: 3, x: 474, y: 150, t: "Precipitation" },
        { n: 4, x: 410, y: 320, t: "Collection" },
      ].map((l) => (
        <g key={l.n}>
          <circle cx={l.x} cy={l.y} r={13} className="fill-postit stroke-ink" strokeWidth={2} />
          <text x={l.x} y={l.y + 5} textAnchor="middle" className="fill-ink font-display text-[15px]">{l.n}</text>
          <text x={l.x + 20} y={l.y + 5} className="fill-ink font-sans text-[15px] font-semibold">{l.t}</text>
        </g>
      ))}
      <text x={20} y={320} className="fill-paper font-sans text-[15px] font-semibold">Sea</text>
    </>
  );
}

const DIAGRAMS: Record<DiagramId, () => ReactNode> = {
  "evap-close": EvapClose,
  "cold-glass": ColdGlass,
  "four-types": FourTypes,
  "where-rain-goes": WhereRainGoes,
  "cycle-map": CycleMap,
};

/** The SVG itself. `alt` is read out by screen readers. */
export function Diagram({ id, alt }: { id: DiagramId; alt: string }) {
  const Scene = DIAGRAMS[id];
  return (
    <svg viewBox="0 0 600 340" role="img" aria-label={alt} className="h-auto w-full">
      <Scene />
    </svg>
  );
}
