"use client";

import { useState } from "react";

export default function ContactSection({
  contactEmail,
  formspreeId,
}: {
  contactEmail: string;
  formspreeId?: string;
}) {
  const FORMSPREE_ID = formspreeId || process.env.NEXT_PUBLIC_FORMSPREE_ID || "xlgyndvk";
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const inputCls =
    "w-full rounded-lg border border-line-dark bg-ink-2 px-4 py-3 text-[15px] text-white placeholder:text-slate-2/60 outline-none transition-colors focus:border-primary";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!FORMSPREE_ID) {
      const body = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`;
      window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(
        "Automation audit request from " + form.name
      )}&body=${encodeURIComponent(body)}`;
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="canvas-grid">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2 md:py-24">
        <div>
          <p className="eyebrow text-accent">Free automation audit</p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Find out what your team could stop doing by hand.
          </h2>
          <p className="mt-4 max-w-md text-[17px] leading-relaxed text-slate-2">
            Tell us a little about your operations. We&apos;ll reply within one
            business day with a time for your 30-minute audit, and you keep the
            findings whether or not we ever build anything together.
          </p>
          <ul className="mt-8 space-y-3 text-[15px] text-slate-2">
            {[
              "30 minutes, on your calendar",
              "A map of your most automatable workflows",
              "Fixed quotes before any build starts",
            ].map((x) => (
              <li key={x} className="flex gap-2.5">
                <svg className="mt-1 shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M2 7.5l3 3 7-7" stroke="#3299d3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {x}
              </li>
            ))}
          </ul>
        </div>

        {status === "success" ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-line-dark bg-ink/60 p-7 text-center md:p-8">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
              <circle cx="20" cy="20" r="20" fill="#3299d3" fillOpacity=".15" />
              <path d="M12 20.5l5 5 11-11" stroke="#3299d3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-lg font-semibold text-white">Request sent!</p>
            <p className="text-[15px] text-slate-2">We&apos;ll be in touch within one business day.</p>
          </div>
        ) : (
          <form
            className="space-y-4 rounded-2xl border border-line-dark bg-ink/60 p-7 md:p-8"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="c-name" className="mb-1.5 block text-sm font-medium text-white">Name *</label>
              <input id="c-name" required value={form.name} onChange={set("name")} className={inputCls} placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="c-email" className="mb-1.5 block text-sm font-medium text-white">Work email *</label>
              <input id="c-email" type="email" required value={form.email} onChange={set("email")} className={inputCls} placeholder="you@company.com" />
            </div>
            <div>
              <label htmlFor="c-phone" className="mb-1.5 block text-sm font-medium text-white">Phone (optional)</label>
              <input id="c-phone" value={form.phone} onChange={set("phone")} className={inputCls} placeholder="+1 ..." />
            </div>
            <div>
              <label htmlFor="c-msg" className="mb-1.5 block text-sm font-medium text-white">
                What eats the most time in your week? *
              </label>
              <textarea id="c-msg" required rows={4} value={form.message} onChange={set("message")} className={inputCls} placeholder="e.g. We copy lead data from web forms into HubSpot by hand, then write the same intro email every time..." />
            </div>
            {status === "error" && (
              <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
                Something went wrong — please try again or email us directly.
              </p>
            )}
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn w-full rounded-lg bg-primary px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-primary-deep disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Request my free audit"}
            </button>
            <p className="text-center text-xs text-slate-2">
              No spam, no obligation. We reply within one business day.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
