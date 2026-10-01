import type { ReactNode } from "react";
import type { DiagramId } from "@/lib/types";

/*
  Inline SVG lesson diagrams, drawn like plates in a science textbook.

  They use the learning-imagery colours (ill-* in globals.css): water is blue, grass is green,
  the sun is warm yellow, because the colour itself carries meaning here. The rest of the app
  keeps to the walnut and paper palette, and `npm run contrast` fails if ill-* leaks out of the
  lesson illustration files.

  Every diagram gets its text description from the lesson data (`alt`), which goes on the SVG.
  Labels sit on calm areas (sky, water, soil) and every pairing is in the contrast check.
*/

type LabelProps = {
  x: number;
  y: number;
  children: ReactNode;
  /** dark ink on light areas, white on water, soil and rock */
  tone?: "ink" | "light";
  /** A thin outline in the colour behind the label, so it stays readable where it crosses a shape */
  halo?: string;
  anchor?: "start" | "middle" | "end";
  size?: number;
  rotate?: number;
};

function Label({ x, y, children, tone = "ink", halo, anchor = "start", size = 15, rotate }: LabelProps) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
      className={`font-sans font-semibold ${tone === "ink" ? "fill-ink" : "fill-ill-cloud"} ${halo ?? ""}`}
      style={{ fontSize: size, paintOrder: "stroke" }}
      strokeWidth={halo ? 4 : 0}
      strokeLinejoin="round"
    >
      {children}
    </text>
  );
}

/** Arrowhead marker. Markers do not inherit the line colour everywhere yet, so each colour gets its own. */
function ArrowHead({ id, className = "fill-ink" }: { id: string; className?: string }) {
  return (
    <marker id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0L10 5L0 10z" className={className} />
    </marker>
  );
}

/** A cloud made of overlapping lobes, centred on (cx, cy) */
function Cloud({ cx, cy, scale = 1, className = "fill-ill-cloud stroke-ill-cloud-shade" }: { cx: number; cy: number; scale?: number; className?: string }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale})`} className={className} strokeWidth={2.5}>
      <path d="M-50 22 Q-62 22 -60 8 Q-58 -6 -40 -4 Q-38 -26 -14 -26 Q4 -40 26 -28 Q48 -30 50 -8 Q68 -6 66 10 Q64 24 50 24 Z" />
    </g>
  );
}

/** Rounded to 2 decimals so the server and the browser draw identical numbers */
const r2 = (n: number) => Math.round(n * 100) / 100;

function Sun({ cx, cy, r = 26 }: { cx: number; cy: number; r?: number }) {
  return (
    <g>
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * Math.PI) / 6;
        const long = i % 2 === 0;
        return (
          <line
            key={i}
            x1={r2(cx + Math.cos(a) * (r + 7))}
            y1={r2(cy + Math.sin(a) * (r + 7))}
            x2={r2(cx + Math.cos(a) * (r + (long ? 20 : 14)))}
            y2={r2(cy + Math.sin(a) * (r + (long ? 20 : 14)))}
            className="stroke-ill-sun-ray"
            strokeWidth={3.5}
            strokeLinecap="round"
          />
        );
      })}
      <circle cx={cx} cy={cy} r={r} className="fill-ill-sun stroke-ill-sun-ray" strokeWidth={2} />
    </g>
  );
}

/** A water molecule in liquid water: packed close, moving about */
function Molecule({ x, y }: { x: number; y: number }) {
  return <circle cx={x} cy={y} r={8} className="fill-ill-water-light stroke-ill-water-deep" strokeWidth={1.5} />;
}

/** A water vapour molecule: drawn as a dashed outline, because you cannot see the gas */
function Vapour({ x, y, r = 8 }: { x: number; y: number; r?: number }) {
  return <circle cx={x} cy={y} r={r} className="fill-ill-water-light stroke-ill-water-deep" fillOpacity={0.6} strokeWidth={2} strokeDasharray="3 3" />;
}

const WAVE = (y: number, from = 0, to = 600, step = 50, amp = 6) => {
  let d = `M${from} ${y}`;
  for (let x = from; x < to; x += step) d += ` Q${x + step / 4} ${y - amp} ${x + step / 2} ${y} T${x + step} ${y}`;
  return d;
};

/* ───────────────────────── Evaporation up close ───────────────────────── */

function EvapClose() {
  const inWater: [number, number][] = [[62, 286], [130, 266], [200, 232], [270, 270], [340, 238], [410, 266], [480, 234], [548, 270], [95, 304], [235, 306], [375, 304], [515, 306]];
  const escaping: [number, number][] = [[210, 150], [276, 104], [148, 112], [350, 140], [412, 96], [452, 150]];
  return (
    <>
      <defs>
        <ArrowHead id="evap-ink" />
        <ArrowHead id="evap-heat" className="fill-ill-sun-ray" />
      </defs>
      <rect width={600} height={340} className="fill-ill-sky" />
      <Sun cx={540} cy={56} />
      {/* heat from the sun reaching the water */}
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${566 - i * 32} ${104 + i * 6} q-10 18 0 36 t0 36`}
          className="fill-none stroke-ill-sun-ray"
          strokeWidth={2.5}
          strokeDasharray="5 5"
          markerEnd="url(#evap-heat)"
        />
      ))}
      <Label x={590} y={194} anchor="end" halo="stroke-ill-sky">Heat</Label>

      {/* the water */}
      <path d={`${WAVE(200)} V340 H0 Z`} className="fill-ill-water" />
      <path d={WAVE(200)} className="fill-none stroke-ill-water-light" strokeWidth={3} />
      {inWater.map(([x, y], i) => (
        <Molecule key={i} x={x} y={y} />
      ))}

      {/* molecules that broke free */}
      {escaping.map(([x, y], i) => (
        <g key={i}>
          <Vapour x={x} y={y} />
          <line x1={x} y1={y + 14} x2={x} y2={y + 38} className="stroke-ink" strokeWidth={2} markerStart="url(#evap-ink)" />
        </g>
      ))}

      <Label x={24} y={38}>Water vapour</Label>
      <Label x={24} y={58}>(an invisible gas)</Label>
      <Label x={24} y={232} tone="light">Liquid water</Label>
    </>
  );
}

/* ───────────────────────── Condensation on a cold glass ───────────────────────── */

function ColdGlass() {
  const drops: [number, number, number][] = [[247, 148, 5], [242, 196, 6], [251, 244, 5], [355, 136, 5], [359, 186, 6], [351, 236, 5], [300, 278, 4], [264, 116, 4], [338, 268, 4]];
  const vapour: [number, number][] = [[96, 136], [144, 214], [508, 140], [460, 222]];
  return (
    <>
      <defs>
        <ArrowHead id="glass-ink" />
      </defs>
      <rect width={600} height={340} className="fill-ill-wall" />
      {/* the table */}
      <rect y={292} width={600} height={48} className="fill-ill-wood" />
      <line x1={0} y1={292.5} x2={600} y2={292.5} className="stroke-ill-soil" strokeWidth={2} />

      {/* the glass, the cold water and ice inside it */}
      <path d="M240 160 L360 160 L355 286 Q300 296 245 286 Z" className="fill-ill-water-light" />
      <rect x={258} y={150} width={34} height={30} rx={4} transform="rotate(-12 275 165)" className="fill-ill-ice stroke-ill-water" strokeWidth={1.5} />
      <rect x={304} y={154} width={32} height={28} rx={4} transform="rotate(9 320 168)" className="fill-ill-ice stroke-ill-water" strokeWidth={1.5} />
      <path d="M232 92 L368 92 L356 288 Q300 300 244 288 Z" className="fill-ill-ice stroke-ill-water-deep" fillOpacity={0.35} strokeWidth={2.5} />
      <line x1={246} y1={104} x2={256} y2={270} className="stroke-ill-cloud" strokeWidth={4} strokeLinecap="round" strokeOpacity={0.8} />

      {/* droplets forming on the outside */}
      {drops.map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} className="fill-ill-water stroke-ill-water-deep" strokeWidth={1} />
          <circle cx={x - r * 0.35} cy={y - r * 0.35} r={r * 0.3} className="fill-ill-cloud" />
        </g>
      ))}

      {/* water vapour in the room drifting to the cold glass */}
      {vapour.map(([x, y], i) => {
        const toward = x < 300 ? 1 : -1;
        return (
          <g key={i}>
            <Vapour x={x} y={y} r={9} />
            <line x1={x + toward * 16} y1={y} x2={x + toward * 54} y2={y + 6} className="stroke-ink" strokeWidth={2} markerEnd="url(#glass-ink)" />
          </g>
        );
      })}

      <Label x={24} y={50}>Water vapour in the air</Label>
      <Label x={24} y={70}>(invisible)</Label>
      <Label x={576} y={50} anchor="end">Drops of liquid water</Label>
      <Label x={576} y={70} anchor="end">on the outside</Label>
      <Label x={300} y={80} anchor="middle" halo="stroke-ill-wall">Cold glass with ice</Label>
    </>
  );
}

/* ───────────────────────── Four kinds of precipitation ───────────────────────── */

function Snowflake({ x, y }: { x: number; y: number }) {
  const arms = (
    <>
      <line x1={-7} y1={0} x2={7} y2={0} />
      <line x1={-3.5} y1={-6} x2={3.5} y2={6} />
      <line x1={-3.5} y1={6} x2={3.5} y2={-6} />
    </>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(1.3)`} strokeLinecap="round">
      {/* a dark outline under a white flake, so snow reads on a pale sky */}
      <g className="stroke-ill-water-deep" strokeWidth={4.5}>{arms}</g>
      <g className="stroke-ill-cloud" strokeWidth={2}>{arms}</g>
    </g>
  );
}

function FourTypes() {
  const panels = [
    { x: 12, title: "Rain", note: "Warm all the way", sky: "fill-ill-sky-grey", cloud: "fill-ill-cloud-shade stroke-ill-storm" },
    { x: 162, title: "Snow", note: "Freezing all the way", sky: "fill-ill-sky", cloud: "fill-ill-cloud stroke-ill-cloud-shade" },
    { x: 312, title: "Sleet", note: "Cold layer low down", sky: "fill-ill-sky-grey", cloud: "fill-ill-cloud-shade stroke-ill-storm" },
    { x: 462, title: "Hail", note: "Strong storm winds", sky: "fill-ill-sky-grey", cloud: "fill-ill-storm stroke-ill-rock" },
  ];
  return (
    <>
      <defs>
        <ArrowHead id="types-ink" />
      </defs>
      <rect width={600} height={340} className="fill-paper" />
      {panels.map((p, i) => (
        <g key={p.title} transform={`translate(${p.x} 12)`}>
          <rect width={126} height={262} className={p.sky} />
          <Cloud cx={63} cy={48} scale={0.82} className={p.cloud} />
          {i === 0 &&
            [26, 50, 74, 98].flatMap((x) =>
              [104, 160, 216].map((y) => (
                <path key={`${x}-${y}`} d={`M${x + 4} ${y + (x % 3) * 6} l-4 14`} className="stroke-ill-water" strokeWidth={3} strokeLinecap="round" />
              )),
            )}
          {i === 1 && [34, 66, 96].flatMap((x) => [112, 170, 228].map((y) => <Snowflake key={`${x}-${y}`} x={x + ((y / 2) % 14) - 6} y={y} />))}
          {i === 2 && (
            <>
              {[30, 62, 94].map((x) => (
                <path key={x} d={`M${x + 4} 96 l-4 14`} className="stroke-ill-water" strokeWidth={3} strokeLinecap="round" />
              ))}
              <rect x={8} y={142} width={110} height={30} className="fill-ill-ice stroke-ill-water-deep" fillOpacity={0.9} strokeDasharray="4 3" strokeWidth={1.5} />
              <text x={63} y={161} textAnchor="middle" className="fill-ink font-sans" style={{ fontSize: 11 }}>
                cold layer
              </text>
              {[30, 62, 94].map((x) => (
                <circle key={x} cx={x} cy={204 + (x % 20)} r={5} className="fill-ill-ice stroke-ill-water-deep" strokeWidth={2} />
              ))}
            </>
          )}
          {i === 3 && (
            <>
              {[[40, 112], [82, 148], [52, 186], [94, 218], [62, 246]].map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r={9} className="fill-ill-ice stroke-ill-water-deep" strokeWidth={2} />
              ))}
              {/* storm winds toss the hailstones up and down, so they grow in layers */}
              <path d="M110 214 V150" className="stroke-ink" strokeWidth={2} strokeDasharray="3 3" markerEnd="url(#types-ink)" />
              <path d="M18 120 V176" className="stroke-ink" strokeWidth={2} strokeDasharray="3 3" markerEnd="url(#types-ink)" />
            </>
          )}
          <text x={63} y={294} textAnchor="middle" className="fill-ink font-display" style={{ fontSize: 17 }}>
            {p.title}
          </text>
          <text x={63} y={312} textAnchor="middle" className="fill-ink-soft font-sans" style={{ fontSize: 11 }}>
            {p.note}
          </text>
        </g>
      ))}
    </>
  );
}

/* ───────────────────────── Where rain goes ───────────────────────── */

function WhereRainGoes() {
  const hillTop = "M0 150 Q120 118 250 190 Q340 240 432 270";
  return (
    <>
      <defs>
        <ArrowHead id="rain-ink" />
        <ArrowHead id="rain-deep" className="fill-ill-water-deep" />
        <ArrowHead id="rain-light" className="fill-ill-water-light" />
      </defs>
      <rect width={600} height={340} className="fill-ill-sky" />
      <Cloud cx={140} cy={48} className="fill-ill-cloud-shade stroke-ill-storm" />
      {[92, 120, 148, 176, 204].map((x) => (
        <path key={x} d={`M${x} 90 l-5 16`} className="stroke-ill-water" strokeWidth={3} strokeLinecap="round" />
      ))}
      <Label x={226} y={60} halo="stroke-ill-sky">Rain falls</Label>

      {/* the sea, behind the foot of the hill */}
      <rect x={400} y={268} width={200} height={72} className="fill-ill-water" />
      <path d={WAVE(268, 400, 600, 40, 4)} className="fill-none stroke-ill-water-light" strokeWidth={2.5} />

      {/* the hill: soil with a skin of grass, and rock underneath */}
      <path d={`${hillTop} L432 340 L0 340 Z`} className="fill-ill-soil" />
      <path d="M0 292 Q180 266 432 302 L432 340 L0 340 Z" className="fill-ill-rock" />
      <path d={hillTop} className="fill-none stroke-ill-grass" strokeWidth={14} strokeLinecap="round" />
      <path d={hillTop} className="fill-none stroke-ill-grass-dark" strokeWidth={2} transform="translate(0 -7)" />

      {/* runoff: rain running down the surface */}
      <path d="M126 146 Q250 176 372 240" className="fill-none stroke-ill-water-deep" strokeWidth={3.5} markerEnd="url(#rain-deep)" />
      <Label x={236} y={160} rotate={15} halo="stroke-ill-sky">
        Runoff
      </Label>

      {/* soaking in, then moving as groundwater */}
      <path d="M90 172 L90 268" className="fill-none stroke-ill-water-light" strokeWidth={3} strokeDasharray="6 5" markerEnd="url(#rain-light)" />
      <Label x={102} y={226} tone="light">
        Soaks in
      </Label>
      <path d="M100 312 Q250 300 414 318" className="fill-none stroke-ill-water-light" strokeWidth={3} strokeDasharray="6 5" markerEnd="url(#rain-light)" />
      <Label x={160} y={334} tone="light">
        Groundwater
      </Label>
      <Label x={490} y={316} tone="light">
        Sea
      </Label>
    </>
  );
}

/* ───────────────────────── The water cycle ───────────────────────── */

function CycleMap() {
  return (
    <>
      <defs>
        <ArrowHead id="cycle-ink" />
        <ArrowHead id="cycle-deep" className="fill-ill-water-deep" />
      </defs>
      <rect width={600} height={340} className="fill-ill-sky" />
      <Sun cx={60} cy={58} />
      <Cloud cx={376} cy={64} scale={1.15} />

      {/* sea on the left, land rising on the right */}
      <rect x={0} y={268} width={372} height={72} className="fill-ill-water" />
      <path d={WAVE(268, 0, 372, 46, 4)} className="fill-none stroke-ill-water-light" strokeWidth={2.5} />
      <path d="M340 340 L340 254 Q420 214 470 236 Q540 196 600 226 L600 340 Z" className="fill-ill-grass stroke-ill-grass-dark" strokeWidth={2} />

      {/* 1 evaporation: up from the sea */}
      <path d="M150 262 C150 190 210 124 300 98" className="fill-none stroke-ink" strokeWidth={3} strokeDasharray="7 5" markerEnd="url(#cycle-ink)" />
      {/* 3 precipitation */}
      {[384, 410, 436, 462].map((x) => (
        <path key={x} d={`M${x} 104 l-5 18`} className="stroke-ill-water" strokeWidth={3} strokeLinecap="round" />
      ))}
      <path d="M428 136 L448 206" className="fill-none stroke-ink" strokeWidth={3} markerEnd="url(#cycle-ink)" />
      {/* 4 collection: a river runs back to the sea */}
      <path d="M520 248 C462 262 410 284 362 296" className="fill-none stroke-ill-water-deep" strokeWidth={5} strokeLinecap="round" markerEnd="url(#cycle-deep)" />

      {[
        { n: 1, x: 22, y: 206, t: "Evaporation", halo: "stroke-ill-sky" },
        { n: 2, x: 142, y: 32, t: "Condensation", halo: "stroke-ill-sky" },
        { n: 3, x: 476, y: 152, t: "Precipitation", halo: "stroke-ill-sky" },
        { n: 4, x: 412, y: 322, t: "Collection", halo: "stroke-ill-grass" },
      ].map((l) => (
        <g key={l.n}>
          <circle cx={l.x} cy={l.y} r={13} className="fill-postit stroke-ink" strokeWidth={2} />
          <text x={l.x} y={l.y + 5} textAnchor="middle" className="fill-ink font-display" style={{ fontSize: 15 }}>
            {l.n}
          </text>
          <Label x={l.x + 20} y={l.y + 5} halo={l.halo}>
            {l.t}
          </Label>
        </g>
      ))}
      <Label x={22} y={318} tone="light">
        Sea
      </Label>
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

/** The SVG itself. `alt` is read out by screen readers. Pass an empty alt for a purely decorative copy. */
export function Diagram({ id, alt }: { id: DiagramId; alt: string }) {
  const Scene = DIAGRAMS[id];
  return (
    <svg
      viewBox="0 0 600 340"
      // An empty alt means the diagram is decoration (the landing page), so hide it from screen readers
      {...(alt ? { role: "img", "aria-label": alt } : { "aria-hidden": true })}
      className="block h-auto w-full"
    >
      <Scene />
    </svg>
  );
}
