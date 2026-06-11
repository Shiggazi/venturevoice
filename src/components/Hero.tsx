import Link from "next/link";
import type { SiteSettings } from "@/lib/content";

function WorkflowDiagram() {
  return (
    <svg
      viewBox="0 0 520 360"
      className="w-full max-w-[520px]"
      role="img"
      aria-label="An automated workflow: a new lead triggers AI qualification, which updates the CRM and notifies the team in Slack"
    >
      {/* wires */}
      <path d="M150 96 C 200 96, 200 96, 250 96" className="wire" stroke="#2e5bff" strokeWidth="2" fill="none" />
      <path d="M390 96 C 430 96, 430 60, 430 60 L 430 190 C 430 218, 410 218, 390 218" className="wire" stroke="#2e5bff" strokeWidth="2" fill="none" opacity="0" />
      <path d="M320 124 C 320 160, 250 160, 220 190" className="wire" stroke="#ffb224" strokeWidth="2" fill="none" />
      <path d="M320 124 C 320 160, 390 160, 420 190" className="wire" stroke="#ffb224" strokeWidth="2" fill="none" style={{ animationDelay: "0.4s" }} />

      {/* node: trigger */}
      <g className="node-pop">
        <rect x="30" y="68" width="120" height="56" rx="12" fill="#111a2e" stroke="#1f2a44" />
        <circle cx="52" cy="96" r="7" fill="none" stroke="#2fd180" strokeWidth="2" />
        <circle cx="52" cy="96" r="2.5" fill="#2fd180" />
        <text x="68" y="91" fill="#98a2b3" fontFamily="IBM Plex Mono, monospace" fontSize="9">TRIGGER</text>
        <text x="68" y="106" fill="#ffffff" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="600">New lead</text>
      </g>

      {/* node: AI step */}
      <g className="node-pop" style={{ animationDelay: "0.25s" }}>
        <rect x="250" y="62" width="140" height="62" rx="12" fill="#111a2e" stroke="#2e5bff" />
        <rect x="266" y="84" width="16" height="16" rx="4" fill="#2e5bff" />
        <text x="270" y="96" fill="#fff" fontFamily="IBM Plex Mono, monospace" fontSize="9">AI</text>
        <text x="292" y="87" fill="#98a2b3" fontFamily="IBM Plex Mono, monospace" fontSize="9">STEP 02</text>
        <text x="292" y="102" fill="#ffffff" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="600">Qualify + enrich</text>
        <text x="292" y="116" fill="#98a2b3" fontFamily="Instrument Sans, sans-serif" fontSize="10">runs in 4s</text>
      </g>

      {/* node: CRM */}
      <g className="node-pop" style={{ animationDelay: "0.5s" }}>
        <rect x="100" y="190" width="130" height="56" rx="12" fill="#111a2e" stroke="#1f2a44" />
        <text x="118" y="213" fill="#98a2b3" fontFamily="IBM Plex Mono, monospace" fontSize="9">OUTPUT</text>
        <text x="118" y="229" fill="#ffffff" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="600">CRM updated</text>
        <circle cx="212" cy="218" r="6" fill="none" stroke="#2fd180" strokeWidth="2" />
        <path d="M209.5 218l2 2 3.5-4" stroke="#2fd180" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </g>

      {/* node: Slack */}
      <g className="node-pop" style={{ animationDelay: "0.65s" }}>
        <rect x="300" y="190" width="150" height="56" rx="12" fill="#111a2e" stroke="#1f2a44" />
        <text x="318" y="213" fill="#98a2b3" fontFamily="IBM Plex Mono, monospace" fontSize="9">OUTPUT</text>
        <text x="318" y="229" fill="#ffffff" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="600">Team notified</text>
        <circle cx="432" cy="218" r="6" fill="none" stroke="#2fd180" strokeWidth="2" />
        <path d="M429.5 218l2 2 3.5-4" stroke="#2fd180" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </g>

      {/* run badge */}
      <g className="node-pop" style={{ animationDelay: "0.9s" }}>
        <rect x="100" y="286" width="350" height="40" rx="10" fill="#0b1220" stroke="#1f2a44" />
        <circle cx="124" cy="306" r="4" fill="#2fd180" />
        <text x="138" y="310" fill="#98a2b3" fontFamily="IBM Plex Mono, monospace" fontSize="10.5">
          while your team does the work that needs them
        </text>
      </g>
    </svg>
  );
}

export default function Hero({ settings }: { settings: SiteSettings }) {
  return (
    <section className="canvas-grid relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-16 md:grid-cols-[1.05fr_0.95fr] md:pb-28 md:pt-24">
        <div>
          <p className="eyebrow text-amber">{settings.heroEyebrow}</p>
          <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-[3.4rem]">
            {settings.heroHeadline}
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-slate-2">
            {settings.heroSubheadline}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/#contact"
              className="rounded-lg bg-cobalt px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(46,91,255,0.35)] transition-colors hover:bg-cobalt-deep"
            >
              {settings.primaryCtaLabel}
            </Link>
            <Link
              href="/#video"
              className="rounded-lg border border-line-dark px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:border-slate-2"
            >
              {settings.secondaryCtaLabel}
            </Link>
          </div>
          <p className="mt-5 text-sm text-slate-2">
            30 minutes. No pitch deck. You keep the findings either way.
          </p>

          <div className="mt-10 border-t border-line-dark pt-5">
            <p className="eyebrow text-slate-2">Built on the platforms you already trust</p>
            <p className="font-mono mt-3 text-sm text-white/80">
              n8n&ensp;·&ensp;Make&ensp;·&ensp;Zapier&ensp;·&ensp;OpenAI&ensp;·&ensp;Anthropic
            </p>
          </div>
        </div>

        <div className="justify-self-center md:justify-self-end">
          <WorkflowDiagram />
        </div>
      </div>
    </section>
  );
}
