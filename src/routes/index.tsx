import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf, Sprout, LineChart, ShieldCheck, Droplets, Sun, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-field.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}
          aria-hidden
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/70 to-background" aria-hidden />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Leaf className="h-3.5 w-3.5" /> Smart Agricultural Production Optimization
            </span>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] text-foreground sm:text-6xl md:text-7xl">
              Grow the <span className="bg-hero bg-clip-text text-transparent">right crop</span>,
              for the right soil.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              OptiCrop analyzes soil nutrients (N, P, K), temperature, humidity, pH and rainfall to
              recommend the most suitable crop for maximum yield and sustainable farming.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/recommend"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-crop transition-transform hover:scale-[1.03]"
              >
                Predict my crop <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-card"
              >
                View dashboard
              </Link>
            </div>
            <dl className="mt-12 grid max-w-xl grid-cols-3 gap-6">
              {[
                { k: "22", v: "Crops modeled" },
                { k: "7", v: "Soil signals" },
                { k: "~95%", v: "Model accuracy" },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="font-display text-3xl font-bold text-foreground">{s.k}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Farming, made intelligent</h2>
          <p className="mt-3 text-muted-foreground">
            Three purpose-built modules turn raw soil and climate data into actionable decisions.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Sprout,
              title: "Crop Recommendation",
              body: "Enter your soil and climate readings — get the best crop, confidence score, and agronomic notes.",
              to: "/recommend",
            },
            {
              icon: ShieldCheck,
              title: "Suitability Analysis",
              body: "Pick any crop and see how well it matches your current field conditions, factor by factor.",
              to: "/suitability",
            },
            {
              icon: LineChart,
              title: "Insights Dashboard",
              body: "Track your predictions, nutrient trends, and most-recommended crops over time.",
              to: "/dashboard",
            },
          ].map((f) => (
            <Link
              to={f.to}
              key={f.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-crop"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-leaf text-primary-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Try it <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Signals */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-leaf p-8 text-primary-foreground shadow-crop sm:p-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold sm:text-4xl">Seven signals. One decision.</h2>
              <p className="mt-3 max-w-lg text-primary-foreground/85">
                We weigh nitrogen, phosphorous, potassium, temperature, humidity, soil pH and rainfall
                against 22 crop profiles to find the strongest match for your field.
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-3 text-sm">
              {[
                { icon: Leaf, l: "Nitrogen (N)" },
                { icon: Leaf, l: "Phosphorous (P)" },
                { icon: Leaf, l: "Potassium (K)" },
                { icon: Sun, l: "Temperature" },
                { icon: Droplets, l: "Humidity" },
                { icon: Sprout, l: "Soil pH" },
                { icon: Droplets, l: "Rainfall" },
              ].map((s) => (
                <li key={s.l} className="flex items-center gap-2 rounded-lg bg-primary-foreground/10 px-3 py-2">
                  <s.icon className="h-4 w-4" /> {s.l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
