import { createFileRoute } from "@tanstack/react-router";
import { Brain, Leaf, Users, Sparkles } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — OptiCrop" },
      { name: "description", content: "OptiCrop's mission, technology stack, and the team behind the project." },
    ],
  }),
  component: About,
});

const TEAM = [
  { name: "Charan Tupakula", role: "Team Lead" },
  { name: "Dronavalli Bhargavi", role: "Member" },
  { name: "Tutaram Pavan Vilesh", role: "Member" },
  { name: "Nuthakki Ritheesh Babu", role: "Member" },
  { name: "Saran Banisetti", role: "Member" },
];

function About() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <header>
        <p className="text-sm font-medium uppercase tracking-wider text-primary">About OptiCrop</p>
        <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Data-driven farming for everyone</h1>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
          OptiCrop is a Smart Agricultural Production Optimization Engine that turns soil test results
          and local climate readings into actionable crop recommendations. It helps farmers maximize
          yields, and gives researchers and policymakers a lens on crop-environment interactions.
        </p>
      </header>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {[
          { icon: Leaf, title: "The mission", body: "Improve resource efficiency and productivity across smallholder and industrial farms alike." },
          { icon: Brain, title: "The model", body: "A Random-Forest inspired classifier trained on the Crop Recommendation dataset covering 22 crops." },
          { icon: Sparkles, title: "The signals", body: "Nitrogen, Phosphorous, Potassium, Temperature, Humidity, Soil pH and Rainfall — seven proven inputs." },
          { icon: Users, title: "The users", body: "Farmers optimizing next season's planting, plus researchers analyzing regional patterns." },
        ].map((c) => (
          <div key={c.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-leaf text-primary-foreground">
              <c.icon className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-semibold">{c.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{c.body}</p>
          </div>
        ))}
      </div>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-bold">Technology</h2>
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Flask", "React", "TypeScript", "Recharts"].map((t) => (
            <span key={t} className="rounded-full border border-border bg-card px-3 py-1 text-muted-foreground">{t}</span>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-bold">Team</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {TEAM.map((m) => (
            <div key={m.name} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-leaf font-display text-lg font-bold text-primary-foreground">
                {m.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div>
                <p className="font-medium">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
