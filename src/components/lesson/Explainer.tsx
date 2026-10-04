"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useMotionOff } from "@/hooks/useMotionOff";
import { copy } from "@/lib/copy";

type ExplainerProps = {
  scene: "puddle" | "drop";
  /** One caption per step. The scene changes with each step. */
  steps: string[];
};

const STEP_MS = 3400;
const SPRING = { type: "spring", stiffness: 70, damping: 18 } as const;

/**
 * A short animated explainer in steps, with captions. No sound, so the captions carry everything.
 * The student controls it: Back, Next, or Play to let it run. The full text is in the transcript too.
 */
export function Explainer({ scene, steps }: ExplainerProps) {
  const motionOff = useMotionOff();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const last = steps.length - 1;

  // Auto-advance while playing, and stop at the last step
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setStep((s) => {
        if (s >= last) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, STEP_MS);
    return () => clearInterval(id);
  }, [playing, last]);

  const play = () => {
    if (step >= last) setStep(0);
    setPlaying((p) => !p);
  };

  return (
    <div role="group" aria-label={copy.lesson.explainerLabel}>
      <div className="overflow-hidden rounded-[2px] shadow-[0_1px_2px_rgb(36_25_19/0.3)]">
        <svg viewBox="0 0 600 320" role="img" aria-label={steps[step]} className="block h-auto w-full bg-ill-sky">
          {scene === "puddle" ? <PuddleScene step={step} off={motionOff} /> : <DropScene step={step} off={motionOff} />}
        </svg>
      </div>

      <p className="mt-4 min-h-14 rounded-[3px] bg-paper p-4 text-lg" aria-live="polite">
        <span className="label mr-2 text-ink-soft">
          {copy.lesson.stepOf(step + 1, steps.length)}
        </span>
        {steps[step]}
      </p>

      <div className="mt-2 flex flex-wrap gap-2">
        <Button variant="secondary" onClick={() => { setPlaying(false); setStep((s) => Math.max(0, s - 1)); }} disabled={step === 0}>
          {copy.common.back}
        </Button>
        <Button variant="secondary" onClick={() => { setPlaying(false); setStep((s) => Math.min(last, s + 1)); }} disabled={step === last}>
          {copy.common.next}
        </Button>
        <Button variant="highlight" onClick={play}>
          {playing ? copy.lesson.pause : step >= last ? copy.lesson.playAgain : copy.lesson.play}
        </Button>
      </div>

      <details className="mt-4">
        <summary className="inline-flex min-h-11 cursor-pointer items-center py-2 font-semibold text-coffee">{copy.lesson.transcript}</summary>
        <ol className="list-decimal space-y-1 pl-6 text-ink-soft">
          {steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </details>
    </div>
  );
}

/* ---------------- Scenes ---------------- */

const PUDDLE = {
  sun: [
    { cx: 70, cy: 150 },
    { cx: 300, cy: 50 },
    { cx: 520, cy: 130 },
    { cx: 520, cy: 130 },
  ],
  rx: [170, 115, 45, 0],
  ry: [16, 12, 6, 0],
  vapour: [0, 0.35, 0.8, 1],
  time: ["9 am", "12 noon", "3 pm", "Later"],
};

function PuddleScene({ step, off }: { step: number; off: boolean }) {
  // MotionConfig only stops movement (x, y, scale). Size and position of SVG shapes need this too.
  const move = off ? { duration: 0 } : SPRING;
  return (
    <>
      {/* The group is moved with x/y so the rays travel with the sun */}
      <motion.g
        initial={false}
        animate={{ x: PUDDLE.sun[step].cx, y: PUDDLE.sun[step].cy }}
        transition={move}
      >
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i * Math.PI) / 4;
          return (
            <line
              key={i}
              x1={Math.round(Math.cos(a) * 3400) / 100}
              y1={Math.round(Math.sin(a) * 3400) / 100}
              x2={Math.round(Math.cos(a) * 4600) / 100}
              y2={Math.round(Math.sin(a) * 4600) / 100}
              className="stroke-ill-sun-ray"
              strokeWidth={3.5}
              strokeLinecap="round"
            />
          );
        })}
        <circle r={26} className="fill-ill-sun stroke-ill-sun-ray" strokeWidth={2} />
      </motion.g>

      {/* ground and puddle */}
      <rect x={0} y={252} width={600} height={68} className="fill-ill-earth" />
      <line x1={0} y1={252.5} x2={600} y2={252.5} className="stroke-ill-soil" strokeWidth={1.5} />
      <motion.ellipse
        cx={300}
        cy={268}
        initial={false}
        animate={{ rx: PUDDLE.rx[step], ry: PUDDLE.ry[step] }}
        transition={move}
        className="fill-ill-water stroke-ill-water-deep"
        strokeWidth={2}
      />

      {/* water vapour: dashed wisps, because you can't really see it */}
      <motion.g initial={false} animate={{ opacity: PUDDLE.vapour[step] }} transition={off ? { duration: 0 } : { duration: 0.8 }}>
        {[240, 300, 360].map((x, i) => (
          <path
            key={x}
            d={`M${x} 240 q14 -24 0 -46 t0 -46 t0 -46`}
            className="fill-none stroke-ill-water-deep"
            strokeWidth={3}
            strokeDasharray="4 7"
            strokeLinecap="round"
            transform={`translate(0 ${i % 2 ? 8 : 0})`}
          />
        ))}
      </motion.g>
      {step >= 2 && (
        <text x={24} y={150} className="fill-ink font-sans text-[15px] font-semibold">
          Water vapour (invisible)
        </text>
      )}

      <text x={20} y={34} className="fill-ink font-display text-[22px]">
        {PUDDLE.time[step]}
      </text>
    </>
  );
}

const DROPLETS: [number, number][] = [
  [220, 88], [250, 66], [282, 96], [312, 70], [344, 100], [376, 78],
  [236, 118], [268, 124], [300, 112], [332, 126], [364, 116], [256, 92],
];

function DropScene({ step, off }: { step: number; off: boolean }) {
  const move = off ? { duration: 0 } : SPRING;
  return (
    <>
      <rect x={0} y={286} width={600} height={34} className="fill-ill-grass" />
      <line x1={0} y1={286.5} x2={600} y2={286.5} className="stroke-ill-grass-dark" strokeWidth={2} />
      {/* cloud */}
      <g className="fill-ill-cloud stroke-ill-cloud-shade" strokeWidth={2.5}>
        <ellipse cx={230} cy={100} rx={62} ry={40} />
        <ellipse cx={300} cy={84} rx={74} ry={50} />
        <ellipse cx={376} cy={104} rx={60} ry={38} />
        <rect x={190} y={100} width={230} height={40} rx={20} stroke="none" />
      </g>

      {/* tiny cloud droplets drift together and fade as the big drop forms */}
      {DROPLETS.map(([x, y], i) => (
        <motion.circle
          key={i}
          r={6}
          className="fill-ill-water"
          initial={false}
          animate={{
            cx: step === 0 ? x : x + (300 - x) * (step === 1 ? 0.55 : 1),
            cy: step === 0 ? y : y + (104 - y) * (step === 1 ? 0.55 : 1),
            opacity: step >= 2 ? 0 : 1,
          }}
          transition={move}
        />
      ))}

      {/* the big drop forms, then falls */}
      <motion.circle
        cx={300}
        className="fill-ill-water stroke-ill-water-deep"
        strokeWidth={2}
        initial={false}
        animate={{ r: step === 0 || step === 1 ? 0 : step === 2 ? 20 : 14, cy: step === 3 ? 262 : 104, opacity: step >= 2 ? 1 : 0 }}
        transition={off ? move : { ...SPRING, stiffness: 50 }}
      />
      {step === 3 && (
        <>
          {[-16, 0, 16].map((dx) => (
            <line key={dx} x1={300 + dx} y1={196} x2={300 + dx} y2={226} className="stroke-ill-water" strokeWidth={3} strokeLinecap="round" />
          ))}
          <text x={336} y={250} className="fill-ink font-sans text-[15px] font-semibold">
            A raindrop
          </text>
        </>
      )}
      {step === 0 && (
        <text x={440} y={108} className="fill-ink font-sans text-[15px] font-semibold">
          Tiny cloud droplets
        </text>
      )}
    </>
  );
}
