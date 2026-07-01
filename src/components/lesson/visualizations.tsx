"use client";

import * as React from "react";
import {
  ComposedChart,
  Scatter,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { motion } from "framer-motion";
import type { LessonVisualization } from "@/types";

/** Router: pick the interactive widget for a lesson's visualization type. */
export function Visualization({ viz }: { viz: LessonVisualization }) {
  switch (viz.type) {
    case "linear-regression":
      return <LinearRegressionViz />;
    case "neuron":
      return <NeuronViz />;
    case "gradient-descent":
      return <GradientDescentViz />;
    default:
      return <LinearRegressionViz />;
  }
}

/* ---------------- Linear regression: drag sliders to fit the line ------------- */
const POINTS = [
  { x: 1, y: 2.1 },
  { x: 2, y: 3.9 },
  { x: 3, y: 6.2 },
  { x: 4, y: 7.8 },
  { x: 5, y: 10.1 },
];

function LinearRegressionViz() {
  const [w, setW] = React.useState(1);
  const [b, setB] = React.useState(1);

  const mse =
    POINTS.reduce((acc, p) => acc + (p.y - (w * p.x + b)) ** 2, 0) / POINTS.length;

  const line = [
    { x: 0, yLine: b },
    { x: 6, yLine: w * 6 + b },
  ];
  const merged = [...POINTS.map((p) => ({ ...p })), ...line];

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="mb-3 text-sm font-medium">
        🎚️ Drag the sliders to fit the line. Watch the error shrink!
      </p>
      <ResponsiveContainer width="100%" height={220}>
        <ComposedChart data={merged} margin={{ top: 6, right: 12, bottom: 0, left: -18 }}>
          <XAxis dataKey="x" type="number" domain={[0, 6]} fontSize={12} stroke="hsl(var(--muted-foreground))" />
          <YAxis type="number" domain={[0, 12]} fontSize={12} stroke="hsl(var(--muted-foreground))" />
          <Scatter dataKey="y" fill="hsl(var(--primary))" />
          <Line
            dataKey="yLine"
            stroke="hsl(var(--accent))"
            strokeWidth={3}
            dot={false}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <SliderRow label={`Slope (w) = ${w.toFixed(2)}`} min={0} max={3} step={0.05} value={w} onChange={setW} />
        <SliderRow label={`Intercept (b) = ${b.toFixed(2)}`} min={-2} max={4} step={0.1} value={b} onChange={setB} />
      </div>

      <div className="mt-3 flex items-center justify-between rounded-xl bg-secondary/60 px-4 py-2.5 text-sm">
        <span className="text-muted-foreground">Mean Squared Error</span>
        <span className={`font-mono font-bold ${mse < 0.3 ? "text-success" : mse < 2 ? "text-warning" : "text-danger"}`}>
          {mse.toFixed(3)}
        </span>
      </div>
      {mse < 0.3 && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-center text-sm text-success">
          🎉 Nearly perfect fit — that&apos;s exactly what training does automatically!
        </motion.p>
      )}
    </div>
  );
}

/* ---------------- Neuron: weighted vote demo -------------------------------- */
function NeuronViz() {
  const [rain, setRain] = React.useState(-2);
  const [sleep, setSleep] = React.useState(1.5);
  const inputs = { rain: 0.2, sleep: 0.9 };
  const z = inputs.rain * rain + inputs.sleep * sleep - 0.5;
  const out = 1 / (1 + Math.exp(-z));

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="mb-3 text-sm font-medium">🧠 Tune the weights — will the neuron decide to “go for a run”?</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <SliderRow label={`Rain weight = ${rain.toFixed(1)}`} min={-4} max={2} step={0.1} value={rain} onChange={setRain} />
        <SliderRow label={`Sleep weight = ${sleep.toFixed(1)}`} min={-2} max={4} step={0.1} value={sleep} onChange={setSleep} />
      </div>
      <div className="mt-4 flex items-center gap-4">
        <div className="flex-1">
          <div className="h-3 overflow-hidden rounded-full bg-secondary">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-danger via-warning to-success"
              animate={{ width: `${out * 100}%` }}
            />
          </div>
        </div>
        <span className="w-24 text-right font-mono text-sm font-bold">
          {(out * 100).toFixed(0)}% {out > 0.5 ? "🏃 Run!" : "😴 Rest"}
        </span>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        output = sigmoid(rain·{rain.toFixed(1)} + sleep·{sleep.toFixed(1)} − 0.5)
      </p>
    </div>
  );
}

/* ---------------- Gradient descent: step size demo ------------------------- */
function GradientDescentViz() {
  const [lr, setLr] = React.useState(0.1);
  const [steps, setSteps] = React.useState<number[]>([]);

  const runDescent = React.useCallback(() => {
    // Minimize f(x) = x^2, start at x = 4.
    let x = 4;
    const path = [x];
    for (let i = 0; i < 15; i++) {
      x = x - lr * (2 * x); // gradient of x^2 is 2x
      path.push(x);
    }
    setSteps(path);
  }, [lr]);

  const data = steps.map((x, i) => ({ i, loss: x * x }));

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="mb-3 text-sm font-medium">⛷️ Pick a step size (learning rate) and roll downhill.</p>
      <SliderRow label={`Learning rate = ${lr.toFixed(2)}`} min={0.01} max={1.1} step={0.01} value={lr} onChange={setLr} />
      <button
        onClick={runDescent}
        className="mt-3 rounded-lg bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground"
      >
        Run descent
      </button>
      {data.length > 0 && (
        <ResponsiveContainer width="100%" height={180}>
          <ComposedChart data={data} margin={{ top: 10, right: 12, bottom: 0, left: -18 }}>
            <XAxis dataKey="i" fontSize={12} stroke="hsl(var(--muted-foreground))" />
            <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" />
            <Line dataKey="loss" stroke="hsl(var(--primary))" strokeWidth={2.5} dot />
          </ComposedChart>
        </ResponsiveContainer>
      )}
      {lr > 1 && steps.length > 0 && (
        <p className="mt-1 text-sm text-danger">😵 Too big! The steps overshoot and the loss explodes.</p>
      )}
      {lr <= 1 && lr > 0.05 && steps.length > 0 && (
        <p className="mt-1 text-sm text-success">✅ Nice — the loss slides smoothly down to zero.</p>
      )}
    </div>
  );
}

/* ---------------- shared slider ------------------------------------------- */
function SliderRow({
  label,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-mono text-xs text-muted-foreground">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
      />
    </label>
  );
}
