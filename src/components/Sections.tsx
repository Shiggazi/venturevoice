import Link from "next/link";
import type {
  Service,
  Testimonial,
  Faq,
  PostPreview,
  SiteSettings,
} from "@/lib/content";
import { processSteps, problemItems } from "@/lib/content";
import NewsletterForm from "./NewsletterForm";
import Reveal from "./Reveal";
import FaqAccordion from "./FaqAccordion";
import BlogCard from "./BlogCard";
import TestimonialsCarousel from "./TestimonialsCarousel";

/* ---------- shared bits ---------- */

function SectionHead({
  eyebrow,
  title,
  sub,
  light,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  light?: boolean;
}) {
  return (
    <Reveal className="max-w-2xl">
      <p className={`eyebrow ${light ? "text-accent" : "text-primary"}`}>{eyebrow}</p>
      <h2
        className={`font-display mt-3 text-3xl font-bold tracking-tight md:text-4xl ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p className={`mt-4 text-[17px] leading-relaxed ${light ? "text-slate-2" : "text-slate"}`}>
          {sub}
        </p>
      )}
    </Reveal>
  );
}

const icons: Record<string, React.ReactNode> = {
  workflow: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="2" y="9" width="6" height="6" rx="1.5" />
      <rect x="16" y="3" width="6" height="6" rx="1.5" />
      <rect x="16" y="15" width="6" height="6" rx="1.5" />
      <path d="M8 12h4m0 0V6h4m-4 6v6h4" />
    </svg>
  ),
  advisor: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M9 9.5h.01M15 9.5h.01M8.5 14.5c1 1 2.2 1.5 3.5 1.5s2.5-.5 3.5-1.5" strokeLinecap="round" />
    </svg>
  ),
  roadmap: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M4 19V5m0 0h9l-2 3 2 3H4" strokeLinejoin="round" />
      <circle cx="18" cy="17" r="3" />
      <path d="M4 19h11" />
    </svg>
  ),
};

/* ---------- sections ---------- */

export function VideoSection({ settings }: { settings: SiteSettings }) {
  return (
    <section id="video" className="border-b border-line bg-white">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHead
              eyebrow="Watch first"
              title={settings.videoTitle}
              sub={settings.videoCaption}
            />
            <Reveal delay={120}>
              <Link
                href="/#contact"
                className="btn mt-7 inline-block rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-ink-2"
              >
                Then book your audit
              </Link>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <div className="overflow-hidden rounded-2xl border border-line bg-ink shadow-[0_24px_60px_rgba(20,14,36,0.18)]">
              <div className="relative aspect-video">
                <iframe
                  src={`https://player.vimeo.com/video/${settings.vimeoId}?dnt=1`}
                  className="absolute inset-0 h-full w-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Venture Voice: AI and automations, explained in three minutes"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function ProblemSection() {
  return (
    <section className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <SectionHead
          eyebrow="The leak"
          title="Where your team's week actually goes"
          sub="Most teams don't have a talent problem. They have a throughput problem, and it hides in the small, repetitive tasks nobody put on the org chart."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {problemItems.map((p, i) => (
            <Reveal key={p.title} delay={i * 110}>
              <div className="lift h-full rounded-2xl border border-line bg-white p-7">
                <p className="font-mono text-xs font-medium uppercase tracking-wider text-primary">
                  {p.stat}
                </p>
                <h3 className="font-display mt-3 text-xl font-semibold text-ink">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-slate">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesSection({ services }: { services: Service[] }) {
  return (
    <section id="services" className="border-b border-line bg-white">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <SectionHead
          eyebrow="Services"
          title="Three ways we take work off your plate"
          sub="Every engagement starts with the same question: which hours can software give you back this quarter?"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s._id} delay={i * 110} as="article" className="h-full">
              <div className="lift group flex h-full flex-col rounded-2xl border border-line bg-paper p-8">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-ink text-accent transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]">
                  {icons[s.icon] ?? icons.workflow}
                </div>
                <h3 className="font-display mt-5 text-[22px] font-bold text-ink">{s.title}</h3>
                <p className="font-mono mt-1 text-[13px] text-primary">{s.tagline}</p>
                <p className="mt-4 leading-relaxed text-slate">{s.description}</p>
                <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                  {s.bullets?.map((b) => (
                    <li key={b} className="flex gap-2.5 text-[15px] text-slate">
                      <svg className="mt-1 shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                        <path d="M2 7.5l3 3 7-7" stroke="#3299d3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section id="process" className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <SectionHead
          eyebrow="How it works"
          title="From audit to handover in four steps"
          sub="No retainers required, no black boxes. You see the cost before any build starts, and you own everything when it ships."
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal key={step.n} delay={i * 110} as="li" className="h-full">
              <div className="lift relative h-full rounded-2xl border border-line bg-white p-7">
                <p className="font-mono text-sm font-semibold text-primary">{step.n}</p>
                <h3 className="font-display mt-3 text-xl font-semibold text-ink">{step.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate">{step.body}</p>
                {i < processSteps.length - 1 && (
                  <svg
                    className="absolute -right-5 top-1/2 hidden -translate-y-1/2 text-slate-2 lg:block"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden
                  >
                    <path d="M4 10h10m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section id="results" className="border-b border-line bg-white">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <SectionHead
          eyebrow="Results"
          title="What clients got back"
          sub="Real engagements, in the client's own words."
        />
        <Reveal className="mt-12">
          <TestimonialsCarousel testimonials={testimonials} />
        </Reveal>
      </div>
    </section>
  );
}

export function BlogTeaser({ posts }: { posts: PostPreview[] }) {
  if (posts.length === 0) return null;
  return (
    <section className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="From the blog"
            title="Automation, minus the hype"
            sub="Practical breakdowns of real workflows, managed entirely from the CMS."
          />
          <Reveal delay={120}>
            <Link href="/blog" className="arrow-link text-sm font-semibold text-primary hover:text-primary-deep">
              All posts <span className="arr">→</span>
            </Link>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {posts.slice(0, 2).map((p, i) => (
            <Reveal key={p._id} delay={i * 110} className="h-full">
              <BlogCard post={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection({ faqs }: { faqs: Faq[] }) {
  return (
    <section id="faq" className="border-b border-line bg-white">
      <div className="mx-auto max-w-6xl gap-12 px-5 py-20 md:grid md:grid-cols-[0.8fr_1.2fr] md:py-24">
        <SectionHead
          eyebrow="FAQ"
          title="The questions every ops lead asks"
          sub="If yours isn't here, the audit call is the fastest place to ask it."
        />
        <Reveal delay={120} className="mt-10 md:mt-0">
          <FaqAccordion faqs={faqs} />
        </Reveal>
      </div>
    </section>
  );
}

export function NewsletterSection({ settings }: { settings: SiteSettings }) {
  return (
    <section id="newsletter" className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-line bg-white p-8 shadow-[var(--shadow-card)] md:flex-row md:items-center md:p-10">
            <div className="max-w-md">
              <h2 className="font-display text-2xl font-bold text-ink">{settings.newsletterHeadline}</h2>
              <p className="mt-2 leading-relaxed text-slate">{settings.newsletterSub}</p>
            </div>
            <NewsletterForm contactEmail={settings.contactEmail} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
