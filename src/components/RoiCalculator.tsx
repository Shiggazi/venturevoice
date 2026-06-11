"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Interactive "hours back" calculator. Pure frontend, no backend involved.
 * Visitors drag two sliders and see what manual work costs them per year.
 */
export default function RoiCalculator() {
  const [hours, setHours] = useState(12);
  const [rate, setRate] = useState(40);

  const weeklyCost = hours * rate;
  const yearlyCost = weeklyCost * 52;
  const yearlyHours = hours * 52;
  // Conservative automation capture: ~70% of repetitive hours
  const recovered = Math.round(yearlyHours * 0.7);
  const recoveredValue = Math.round(yearlyCost * 0.7);

  const fill = (val: number, min: number, max: number) =>
    `${((val - min) / (max - min)) * 100}%`;

  return (
    <section id="calculator" className="canvas-grid">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-amber">Try it yourself</p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
              What is manual work costing you?
            </h2>
            <p className="mt-4 max-w-md text-[17px] leading-relaxed text-slate-2">
              Drag the sliders. Most teams are surprised by the yearly number,
              and that is before counting the errors, delays, and morale cost
              of repetitive work.
            </p>

            <div className="mt-9 space-y-8">
              <div>
                <div className="mb-3 flex items-baseline justify-between">
                  <label htmlFor="roi-hours" className="text-sm font-medium text-white">
                    Hours your team spends on repetitive tasks each week
                  </label>
                  <span className="font-mono text-lg font-semibold text-amber">{hours}h</span>
                </div>
                <input
                  id="roi-hours"
                  type="range"
                  min={2}
                  max={60}
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  style={{ ["--fill" as string]: fill(hours, 2, 60) }}
                  aria-valuetext={`${hours} hours per week`}
                />
              </div>

              <div>
                <div className="mb-3 flex items-baseline justify-between">
                  <label htmlFor="roi-rate" className="text-sm font-medium text-white">
                    Average hourly cost of that time (USD)
                  </label>
                  <span className="font-mono text-lg font-semibold text-amber">${rate}</span>
                </div>
                <input
                  id="roi-rate"
                  type="range"
                  min={10}
                  max={150}
                  step={5}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  style={{ ["--fill" as string]: fill(rate, 10, 150) }}
                  aria-valuetext={`${rate} dollars per hour`}
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-line-dark bg-ink-2 p-8 md:p-10">
            <p className="eyebrow text-slate-2">Your numbers</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p
                  className="font-display text-4xl font-bold text-white tabular-nums md:text-[2.6rem]"
                  aria-live="polite"
                >
                  ${yearlyCost.toLocaleString()}
                </p>
                <p className="mt-1.5 text-sm text-slate-2">
                  spent on manual work per year
                </p>
              </div>
              <div>
                <p className="font-display text-4xl font-bold text-mint tabular-nums md:text-[2.6rem]">
                  {recovered.toLocaleString()}h
                </p>
                <p className="mt-1.5 text-sm text-slate-2">
                  recoverable each year with automation*
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-line-dark bg-ink p-5">
              <p className="text-[15px] leading-relaxed text-slate-2">
                That is roughly{" "}
                <span className="font-semibold text-white">
                  ${recoveredValue.toLocaleString()}
                </span>{" "}
                of capacity your team could point at work that actually grows
                the business.
              </p>
            </div>

            <Link
              href="/#contact"
              className="btn mt-7 block rounded-lg bg-cobalt px-6 py-3.5 text-center text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(46,91,255,0.35)] hover:bg-cobalt-deep"
            >
              Find my recoverable hours
            </Link>
            <p className="mt-4 text-center text-xs text-slate-2">
              *Assumes 70% of repetitive hours can be automated, our
              conservative average across past builds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
