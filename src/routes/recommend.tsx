import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Sparkles, RotateCcw } from "lucide-react";
import { CROPS, predictCrop, saveHistoryEntry, type Prediction, type SoilInput } from "@/lib/crop-data";

export const Route = createFileRoute("/recommend")({
  head: () => ({
    meta: [
      { title: "Crop Recommendation — OptiCrop" },
      { name: "description", content: "Get an AI-powered crop recommendation based on your soil nutrients and climate." },
    ],
  }),
  component: Recommend,
});

const DEFAULTS: SoilInput = { N: 90, P: 42, K: 43, temperature: 21, humidity: 82, ph: 6.5, rainfall: 200 };
const PRESETS: { label: string; values: SoilInput }[] = [
  { label: "Rice paddy", values: { N: 85, P: 45, K: 40, temperature: 24, humidity: 82, ph: 6.4, rainfall: 230 } },
  { label: "Dry lentil field", values: { N: 20, P: 68, K: 20, temperature: 24, humidity: 65, ph: 6.9, rainfall: 46 } },
  { label: "Tropical orchard", values: { N: 30, P: 25, K: 40, temperature: 30, humidity: 88, ph: 6.2, rainfall: 150 } },
];

const FIELDS: { key: keyof SoilInput; label: string; unit: string; min: number; max: number; step: number; help: string }[] = [
  { key: "N", label: "Nitrogen (N)", unit: "kg/ha", min: 0, max: 140, step: 1, help: "0–140" },
  { key: "P", label: "Phosphorous (P)", unit: "kg/ha", min: 0, max: 145, step: 1, help: "0–145" },
  { key: "K", label: "Potassium (K)", unit: "kg/ha", min: 0, max: 205, step: 1, help: "0–205" },
  { key: "temperature", label: "Temperature", unit: "°C", min: 5, max: 45, step: 0.1, help: "5–45" },
  { key: "humidity", label: "Humidity", unit: "%", min: 10, max: 100, step: 0.1, help: "10–100" },
  { key: "ph", label: "Soil pH", unit: "", min: 3, max: 10, step: 0.01, help: "3–10" },
  { key: "rainfall", label: "Rainfall", unit: "mm", min: 20, max: 300, step: 1, help: "20–300" },
];

function Recommend() {
  const [input, setInput] = useState<SoilInput>(DEFAULTS);
  const [result, setResult] = useState<Prediction | null>(null);

  const isValid = useMemo(() => FIELDS.every((f) => {
    const v = input[f.key];
    return typeof v === "number" && !Number.isNaN(v) && v >= f.min && v <= f.max;
  }), [input]);

  function onPredict(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) { toast.error("Please check your inputs — some values are out of range."); return; }
    const pred = predictCrop(input);
    setResult(pred);
    saveHistoryEntry({
      id: crypto.randomUUID(),
      at: Date.now(),
      input,
      crop: pred.crop.name,
      confidence: pred.confidence,
    });
    toast.success(`Recommended: ${pred.crop.label}`);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <header className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">Recommendation Engine</p>
        <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Predict the best crop for your field</h1>
        <p className="mt-3 text-muted-foreground">
          Enter your soil test and climate readings. Our model compares them against 22 crop profiles
          and returns the strongest match with a confidence score.
        </p>
      </header>

      <div className="mt-8 flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => { setInput(p.values); setResult(null); }}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            {p.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => { setInput(DEFAULTS); setResult(null); }}
          className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <RotateCcw className="h-3 w-3" /> Reset
        </button>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-5">
        <form onSubmit={onPredict} className="lg:col-span-3 rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            {FIELDS.map((f) => (
              <label key={f.key} className="block">
                <span className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-foreground">{f.label}</span>
                  <span className="text-xs text-muted-foreground">{f.help} {f.unit}</span>
                </span>
                <div className="mt-1.5 flex items-center gap-2">
                  <input
                    type="number"
                    min={f.min} max={f.max} step={f.step}
                    value={input[f.key]}
                    onChange={(e) => setInput((s) => ({ ...s, [f.key]: e.target.valueAsNumber }))}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-ring/40"
                    required
                  />
                  {f.unit && <span className="text-xs text-muted-foreground">{f.unit}</span>}
                </div>
                <input
                  type="range"
                  min={f.min} max={f.max} step={f.step}
                  value={input[f.key]}
                  onChange={(e) => setInput((s) => ({ ...s, [f.key]: e.target.valueAsNumber }))}
                  className="mt-2 w-full accent-[var(--color-primary)]"
                />
              </label>
            ))}
          </div>
          <button
            type="submit"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-crop transition-transform hover:scale-[1.02]"
          >
            <Sparkles className="h-4 w-4" /> Predict Crop
          </button>
        </form>

        <aside className="lg:col-span-2">
          {result ? <ResultCard result={result} /> : <EmptyResult />}
        </aside>
      </div>
    </div>
  );
}

function EmptyResult() {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-2xl">🌱</div>
      <h3 className="font-display text-lg font-semibold">Awaiting your inputs</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Fill the form and hit <span className="font-medium text-foreground">Predict Crop</span> to see a recommendation here.
      </p>
    </div>
  );
}

function ResultCard({ result }: { result: Prediction }) {
  const { crop, confidence, top } = result;
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-crop">
      <div className="bg-leaf p-6 text-primary-foreground">
        <p className="text-xs uppercase tracking-wider text-primary-foreground/80">Recommended crop</p>
        <div className="mt-1 flex items-center gap-3">
          <span className="text-5xl">{crop.emoji}</span>
          <div>
            <h3 className="font-display text-3xl font-bold">{crop.label}</h3>
            <p className="text-sm text-primary-foreground/85">Confidence {(confidence * 100).toFixed(1)}%</p>
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-primary-foreground/20">
          <div className="h-full rounded-full bg-primary-foreground" style={{ width: `${Math.max(6, confidence * 100)}%` }} />
        </div>
      </div>
      <div className="space-y-4 p-6">
        <p className="text-sm text-muted-foreground">{crop.description}</p>
        <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <Info label="Season" value={crop.season} />
          <Info label="Water" value={crop.water} />
          <Info label="Fertilizer" value={crop.fertilizer} />
        </dl>
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Other strong matches</p>
          <div className="flex flex-wrap gap-2">
            {top.slice(1).map((t) => (
              <span key={t.crop.name} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs">
                <span>{t.crop.emoji}</span> {t.crop.label} · {(t.confidence * 100).toFixed(0)}%
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-secondary/60 p-3">
      <dt className="text-xs uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 font-medium text-foreground">{value}</dd>
    </div>
  );
}
