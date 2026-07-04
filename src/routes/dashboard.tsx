import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Trash2 } from "lucide-react";
import { CROPS, clearHistory, loadHistory, type HistoryEntry } from "@/lib/crop-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Insights Dashboard — OptiCrop" },
      { name: "description", content: "Track predictions, most-recommended crops, and average nutrient trends over time." },
    ],
  }),
  component: Dashboard,
});

const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)"];

function Dashboard() {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  useEffect(() => { setEntries(loadHistory()); }, []);

  const stats = useMemo(() => {
    const total = entries.length;
    const counts = new Map<string, number>();
    entries.forEach((e) => counts.set(e.crop, (counts.get(e.crop) || 0) + 1));
    const pieData = [...counts.entries()]
      .map(([name, value]) => ({ name: CROPS.find((c) => c.name === name)?.label || name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
    const avg = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"] as const;
    const avgs = Object.fromEntries(avg.map((k) => [k, total ? entries.reduce((s, e) => s + e.input[k], 0) / total : 0])) as Record<(typeof avg)[number], number>;
    const barData = [
      { name: "N", value: avgs.N },
      { name: "P", value: avgs.P },
      { name: "K", value: avgs.K },
    ];
    const rainfallData = entries.slice().reverse().map((e, i) => ({ i: i + 1, rainfall: e.input.rainfall }));
    return { total, pieData, avgs, barData, rainfallData };
  }, [entries]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-primary">Insights</p>
          <h1 className="mt-1 font-display text-4xl font-bold sm:text-5xl">Your prediction dashboard</h1>
          <p className="mt-2 text-muted-foreground">Aggregate view of your OptiCrop activity on this device.</p>
        </div>
        {entries.length > 0 && (
          <button
            onClick={() => { clearHistory(); setEntries([]); }}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5" /> Clear history
          </button>
        )}
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Total predictions" value={stats.total.toString()} />
        <Stat label="Avg. Nitrogen" value={`${stats.avgs.N.toFixed(0)} kg/ha`} />
        <Stat label="Avg. Humidity" value={`${stats.avgs.humidity.toFixed(0)}%`} />
        <Stat label="Avg. Rainfall" value={`${stats.avgs.rainfall.toFixed(0)} mm`} />
      </div>

      {entries.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-card/60 p-12 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-3xl">📊</div>
          <h3 className="font-display text-xl font-semibold">No predictions yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">Run a crop recommendation to start populating your dashboard.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Card title="Top recommended crops" className="lg:col-span-1">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={stats.pieData} dataKey="value" nameKey="name" outerRadius={90} innerRadius={55} paddingAngle={2}>
                  {stats.pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
          <Card title="Average NPK levels" className="lg:col-span-1">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={stats.barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip />
                <Bar dataKey="value" fill="var(--color-chart-1)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card title="Rainfall input trend" className="lg:col-span-1">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={stats.rainfallData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="i" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip />
                <Line type="monotone" dataKey="rainfall" stroke="var(--color-chart-4)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Recent predictions" className="lg:col-span-3">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="py-2 pr-4">When</th>
                    <th className="py-2 pr-4">Crop</th>
                    <th className="py-2 pr-4">Confidence</th>
                    <th className="py-2 pr-4">N/P/K</th>
                    <th className="py-2 pr-4">Temp</th>
                    <th className="py-2 pr-4">Humidity</th>
                    <th className="py-2 pr-4">pH</th>
                    <th className="py-2 pr-4">Rainfall</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {entries.slice(0, 10).map((e) => {
                    const crop = CROPS.find((c) => c.name === e.crop);
                    return (
                      <tr key={e.id}>
                        <td className="py-2.5 pr-4 text-muted-foreground">{new Date(e.at).toLocaleString()}</td>
                        <td className="py-2.5 pr-4 font-medium">{crop?.emoji} {crop?.label}</td>
                        <td className="py-2.5 pr-4">{(e.confidence * 100).toFixed(0)}%</td>
                        <td className="py-2.5 pr-4">{e.input.N}/{e.input.P}/{e.input.K}</td>
                        <td className="py-2.5 pr-4">{e.input.temperature}°C</td>
                        <td className="py-2.5 pr-4">{e.input.humidity}%</td>
                        <td className="py-2.5 pr-4">{e.input.ph}</td>
                        <td className="py-2.5 pr-4">{e.input.rainfall} mm</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-3xl font-bold">{value}</p>
    </div>
  );
}
function Card({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border bg-card p-5 shadow-soft ${className}`}>
      <h3 className="mb-3 font-display text-base font-semibold">{title}</h3>
      {children}
    </div>
  );
}
