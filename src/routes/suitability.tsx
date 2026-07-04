import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CheckCircle2, AlertTriangle, ArrowDown, ArrowUp } from "lucide-react";
import { CROPS, suitability, type CropName, type SoilInput } from "@/lib/crop-data";

export const Route = createFileRoute("/suitability")({
  head: () => ({
    meta: [
      { title: "Crop Suitability — OptiCrop" },
      { name: "description", content: "Check how well a specific crop fits your current soil and climate conditions." },
    ],
  }),
  component: Suitability,
});

const DEFAULT_INPUT: SoilInput = { N: 80, P: 40, K: 40, temperature: 25, humidity: 75, ph: 6.5, rainfall: 150 };

function Suitability() {
  const [crop, setCrop] = useState<CropName>("rice");
  const [input, setInput] = useState<SoilInput>(DEFAULT_INPUT);

  const selected = CROPS.find((c) => c.name === crop)!;
  const result = useMemo(() => suitability(input, selected), [input, selected]);

  const fields: { key: keyof SoilInput; label: string; unit: string }[] = [
    { key: "N", label: "Nitrogen (N)", unit: "kg/ha" },
    { key: "P", label: "Phosphorous (P)", unit: "kg/ha" },
    { key: "K", label: "Potassium (K)", unit: "kg/ha" },
    { key: "temperature", label: "Temperature", unit: "°C" },
    { key: "humidity", label: "Humidity", unit: "%" },
    { key: "ph", label: "Soil pH", unit: "" },
    { key: "rainfall", label: "Rainfall", unit: "mm" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <header className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">Suitability Analysis</p>
        <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Can I grow this crop here?</h1>
        <p className="mt-3 text-muted-foreground">
          Pick a crop and compare your conditions to its ideal profile, factor by factor.
        </p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <label className="block text-sm font-medium">Select crop</label>
            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value as CropName)}
              className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
            >
              {CROPS.map((c) => (
                <option key={c.name} value={c.name}>{c.emoji}  {c.label}</option>
              ))}
            </select>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h3 className="font-display text-lg font-semibold">Your field conditions</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {fields.map((f) => (
                <label key={f.key} className="block">
                  <span className="text-sm font-medium">{f.label} <span className="text-xs text-muted-foreground">{f.unit}</span></span>
                  <input
                    type="number"
                    step="0.1"
                    value={input[f.key]}
                    onChange={(e) => setInput((s) => ({ ...s, [f.key]: e.target.valueAsNumber }))}
                    className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        <aside className="lg:col-span-2 space-y-4">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-crop">
            <div className={result.suitable ? "bg-leaf p-6 text-primary-foreground" : "bg-earth p-6 text-primary-foreground"}>
              <div className="flex items-center gap-3">
                <span className="text-5xl">{selected.emoji}</span>
                <div>
                  <h3 className="font-display text-2xl font-bold">{selected.label}</h3>
                  <p className="text-sm opacity-90">
                    {result.suitable ? "Suitable for your field" : "Needs adjustment"}
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-wider opacity-80">Suitability</span>
                  <span className="font-display text-3xl font-bold">{result.score}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/20">
                  <div className="h-full rounded-full bg-white" style={{ width: `${result.score}%` }} />
                </div>
              </div>
            </div>
            <ul className="divide-y divide-border">
              {result.factors.map((f) => (
                <li key={f.key} className="flex items-center justify-between px-6 py-3 text-sm">
                  <div>
                    <p className="font-medium">{f.label}</p>
                    <p className="text-xs text-muted-foreground">
                      Yours: {f.input} · Ideal: {f.ideal}
                    </p>
                  </div>
                  {f.status === "ok" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                      <CheckCircle2 className="h-3.5 w-3.5" /> OK
                    </span>
                  )}
                  {f.status === "low" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent/30 px-2.5 py-1 text-xs font-medium text-accent-foreground">
                      <ArrowDown className="h-3.5 w-3.5" /> Too low
                    </span>
                  )}
                  {f.status === "high" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-destructive/15 px-2.5 py-1 text-xs font-medium text-destructive">
                      <ArrowUp className="h-3.5 w-3.5" /> Too high
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {!result.suitable && (
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <AlertTriangle className="h-4 w-4 text-accent-foreground" /> Suggestions
              </div>
              <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {result.factors.filter((f) => f.status !== "ok").map((f) => (
                  <li key={f.key}>
                    {f.status === "low" ? "Increase" : "Reduce"} {f.label.toLowerCase()} toward ~{f.ideal}.
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
