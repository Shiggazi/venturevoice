import Link from "next/link";
import type { SiteSettings } from "@/lib/content";
import CountUp from "./CountUp";

function WorkflowDiagram() {
  return (
    <svg
      viewBox="0 0 520 360"
      className="w-full max-w-[520px]"
      role="img"
      aria-label="An automated workflow: a new lead triggers AI qualification, which updates the CRM and notifies the team in Slack"
    >
      {/* wires */}
      <path id="w1" d="M150 96 C 200 96, 200 96, 250 96" className="wire" stroke="#7e52c1" strokeWidth="2" fill="none" />
      <path id="w2" d="M320 124 C 320 160, 250 160, 220 190" className="wire" stroke="#3299d3" strokeWidth="2" fill="none" />
      <path id="w3" d="M320 124 C 320 160, 390 160, 420 190" className="wire" stroke="#3299d3" strokeWidth="2" fill="none" style={{ animationDelay: "0.4s" }} />

      {/* traveling pulse dots */}
      <circle r="4" fill="#c3a6ee" className="pulse-dot">
        <animateMotion dur="3s" repeatCount="indefinite">
          <mpath href="#w1" />
        </animateMotion>
      </circle>
      <circle r="4" fill="#8fd0f0" className="pulse-dot">
        <animateMotion dur="3s" begin="1s" repeatCount="indefinite">
          <mpath href="#w2" />
        </animateMotion>
      </circle>
      <circle r="4" fill="#8fd0f0" className="pulse-dot">
        <animateMotion dur="3s" begin="1.5s" repeatCount="indefinite">
          <mpath href="#w3" />
        </animateMotion>
      </circle>

      {/* node: trigger */}
      <g className="node-pop">
        <rect x="30" y="68" width="120" height="56" rx="12" fill="#1d1530" stroke="#2d2347" />
        <circle cx="52" cy="96" r="7" fill="none" stroke="#3299d3" strokeWidth="2" />
        <circle cx="52" cy="96" r="2.5" fill="#3299d3" className="live-dot" />
        <text x="68" y="91" fill="#9a93ae" fontFamily="IBM Plex Mono, monospace" fontSize="9">TRIGGER</text>
        <text x="68" y="106" fill="#ffffff" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="600">New lead</text>
      </g>

      {/* node: AI step */}
      <g className="node-pop" style={{ animationDelay: "0.25s" }}>
        <rect x="250" y="62" width="140" height="62" rx="12" fill="#1d1530" stroke="#7e52c1" />
        <rect x="266" y="84" width="16" height="16" rx="4" fill="#7e52c1" />
        <text x="270" y="96" fill="#fff" fontFamily="IBM Plex Mono, monospace" fontSize="9">AI</text>
        <text x="292" y="87" fill="#9a93ae" fontFamily="IBM Plex Mono, monospace" fontSize="9">STEP 02</text>
        <text x="292" y="102" fill="#ffffff" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="600">Qualify + enrich</text>
        <text x="292" y="116" fill="#9a93ae" fontFamily="Instrument Sans, sans-serif" fontSize="10">runs in 4s</text>
      </g>

      {/* node: CRM */}
      <g className="node-pop" style={{ animationDelay: "0.5s" }}>
        <rect x="100" y="190" width="130" height="56" rx="12" fill="#1d1530" stroke="#2d2347" />
        <text x="118" y="213" fill="#9a93ae" fontFamily="IBM Plex Mono, monospace" fontSize="9">OUTPUT</text>
        <text x="118" y="229" fill="#ffffff" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="600">CRM updated</text>
        <circle cx="212" cy="218" r="6" fill="none" stroke="#3299d3" strokeWidth="2" />
        <path d="M209.5 218l2 2 3.5-4" stroke="#3299d3" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </g>

      {/* node: Slack */}
      <g className="node-pop" style={{ animationDelay: "0.65s" }}>
        <rect x="300" y="190" width="150" height="56" rx="12" fill="#1d1530" stroke="#2d2347" />
        <text x="318" y="213" fill="#9a93ae" fontFamily="IBM Plex Mono, monospace" fontSize="9">OUTPUT</text>
        <text x="318" y="229" fill="#ffffff" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="600">Team notified</text>
        <circle cx="432" cy="218" r="6" fill="none" stroke="#3299d3" strokeWidth="2" />
        <path d="M429.5 218l2 2 3.5-4" stroke="#3299d3" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </g>

      {/* run badge */}
      <g className="node-pop" style={{ animationDelay: "0.9s" }}>
        <rect x="100" y="286" width="350" height="40" rx="10" fill="#140e24" stroke="#2d2347" />
        <circle cx="124" cy="306" r="4" fill="#3299d3" className="live-dot" />
        <text x="138" y="310" fill="#9a93ae" fontFamily="IBM Plex Mono, monospace" fontSize="10.5">
          while your team does the work that needs them
        </text>
      </g>
    </svg>
  );
}

export default function Hero({ settings }: { settings: SiteSettings }) {
  return (
    <section className="canvas-grid relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-16 md:grid-cols-[1.05fr_0.95fr] md:pb-20 md:pt-24">
        <div>
          <p className="eyebrow node-pop text-accent">{settings.heroEyebrow}</p>
          <h1
            className="font-display node-pop mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-[3.4rem]"
            style={{ animationDelay: "0.1s" }}
          >
            {settings.heroHeadline}
          </h1>
          <p
            className="node-pop mt-5 max-w-xl text-[17px] leading-relaxed text-slate-2"
            style={{ animationDelay: "0.2s" }}
          >
            {settings.heroSubheadline}
          </p>
          <div className="node-pop mt-8 flex flex-wrap items-center gap-4" style={{ animationDelay: "0.3s" }}>
            <Link
              href="/#contact"
              className="btn rounded-lg bg-primary px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(126,82,193,0.35)] hover:bg-primary-deep hover:shadow-[0_12px_32px_rgba(126,82,193,0.45)]"
            >
              {settings.primaryCtaLabel}
            </Link>
            <Link
              href="/#video"
              className="btn rounded-lg border border-line-dark px-6 py-3.5 text-[15px] font-semibold text-white hover:border-slate-2 hover:bg-white/5"
            >
              {settings.secondaryCtaLabel}
            </Link>
          </div>
          <p className="node-pop mt-5 text-sm text-slate-2" style={{ animationDelay: "0.4s" }}>
            30 minutes. No pitch deck. You keep the findings either way.
          </p>
        </div>

        <div className="justify-self-center md:justify-self-end">
          <WorkflowDiagram />
        </div>
      </div>

      {/* stat strip */}
      <div className="border-t border-line-dark bg-ink/60 backdrop-blur-sm">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-6 px-5 py-8 sm:grid-cols-4">
          <div>
            <p className="font-display text-2xl font-bold text-white md:text-3xl">
              <CountUp end={70} suffix="%" />
            </p>
            <p className="mt-1 text-xs text-slate-2 md:text-sm">of repetitive hours automatable</p>
          </div>
          <div>
            <p className="font-display text-2xl font-bold text-white md:text-3xl">
              <CountUp end={3} suffix=" wks" />
            </p>
            <p className="mt-1 text-xs text-slate-2 md:text-sm">typical build, kickoff to handover</p>
          </div>
          <div>
            <p className="font-display text-2xl font-bold text-white md:text-3xl">
              <CountUp end={100} suffix="%" />
            </p>
            <p className="mt-1 text-xs text-slate-2 md:text-sm">client ownership, zero lock-in</p>
          </div>
          <div>
            <p className="font-mono text-2xl font-bold text-accent md:text-3xl">n8n · Claude Code</p>
            <p className="mt-1 text-xs text-slate-2 md:text-sm">plus OpenAI and Anthropic models</p>
          </div>
        </div>
      </div>
    </section>
  );
}
