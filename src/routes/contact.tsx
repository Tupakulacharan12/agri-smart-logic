import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, MapPin, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — OptiCrop" },
      { name: "description", content: "Get in touch with the OptiCrop team." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80, "Name too long"),
  email: z.string().trim().email("Invalid email").max(200),
  message: z.string().trim().min(5, "Message too short").max(1000, "Message too long"),
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    toast.success("Thanks — we'll get back to you shortly.");
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <header>
        <p className="text-sm font-medium uppercase tracking-wider text-primary">Contact</p>
        <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Let's grow together</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Questions, feedback, or a research partnership in mind? Drop us a note.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
          <InfoBlock icon={Mail} title="Email" value="team@opticrop.dev" />
          <InfoBlock icon={MapPin} title="Location" value="Andhra Pradesh, India" />
        </div>
        <form onSubmit={submit} className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" error={errors.name}>
              <input
                value={form.name}
                onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
                maxLength={80}
              />
            </Field>
            <Field label="Email" error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
                maxLength={200}
              />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Message" error={errors.message}>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
                maxLength={1000}
              />
            </Field>
          </div>
          <button
            type="submit"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-crop transition-transform hover:scale-[1.02]"
          >
            <Send className="h-4 w-4" /> Send message
          </button>
        </form>
      </div>
    </div>
  );
}

function InfoBlock({ icon: Icon, title, value }: { icon: React.ComponentType<{ className?: string }>; title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-leaf text-primary-foreground">
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{title}</p>
      <p className="mt-0.5 font-medium">{value}</p>
    </div>
  );
}
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </label>
  );
}
