import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextBlock } from "next-sanity";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TagPills } from "@/components/BlogCard";
import { safeFetch } from "@/sanity/client";
import { postBySlugQuery, settingsQuery } from "@/sanity/queries";
import { fallbackPosts, fallbackSettings, type SiteSettings } from "@/lib/content";

export const revalidate = 60;

type FullPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  body?: PortableTextBlock[];
  featuredImage?: string | null;
  featuredAlt?: string;
  tags?: string[];
};

// Local bodies for the two seed posts, so the blog works before
// Sanity is populated. Once you publish posts in the CMS, those win.
const fallbackBodies: Record<string, string[]> = {
  "five-workflows-every-agency-should-automate": [
    "Hiring is the most expensive way to solve a throughput problem. Before you post the listing, check whether the role you're scoping is actually a stack of repetitive workflows that software could absorb. These five show up in almost every audit we run.",
    "1. Lead intake and routing. A form submission should create the CRM record, enrich it, score it, and notify the right person, without anyone retyping a thing. This is usually the highest-ROI build on the list and rarely takes more than a week.",
    "2. Client reporting. If someone on your team copies numbers from dashboards into a slide deck every month, that's a workflow. Pull the data automatically, draft the commentary with AI, and let a human approve instead of assemble.",
    "3. Support triage. Incoming tickets can be categorized, summarized, and routed before a person ever opens them. Your team answers the hard ones; the workflow drafts the easy ones.",
    "4. Content production handoffs. Brief approved, draft written, assets requested, post scheduled. Each handoff is a place work stalls. Automating the handoffs alone often cuts production time in half.",
    "5. Invoicing and follow-up. Send, track, remind, reconcile. None of this needs a human until something goes wrong, and the workflow can tell you when it does.",
    "The pattern across all five: software does the moving, your team does the judging. If you want to know which of these would save your team the most hours, that's exactly what our free audit maps out.",
  ],
  "n8n-vs-make-vs-zapier": [
    "Every week someone asks us which platform is best. Wrong question. The right question is which platform is best for this workflow, this team, and this budget, and the answer changes more often than the marketing suggests.",
    "Zapier wins on speed and simplicity. The connector library is the biggest in the business, and a non-technical team can maintain Zaps without calling us. The trade-off is cost at volume: per-task pricing gets painful once a workflow runs thousands of times a month.",
    "Make wins on visual complexity at a fair price. Branching, iteration, and data transformation are genuinely pleasant to build, and the per-operation pricing is friendlier than Zapier's at mid volume. The trade-off is a steeper learning curve for the team that inherits it.",
    "n8n wins on control and economics at scale. Self-hosted, it runs unlimited workflows for the cost of a small server, keeps sensitive data on your infrastructure, and handles custom code natively. The trade-off: someone has to own the instance.",
    "Our actual decision tree: low volume and a non-technical team, Zapier. Mid volume with complex branching, Make. High volume, sensitive data, or custom logic, n8n. And yes, we regularly recommend the cheapest option, because the audit is about your hours, not our invoice.",
  ],
};

function localPost(slug: string): FullPost | null {
  const preview = fallbackPosts.find((p) => p.slug === slug);
  if (!preview) return null;
  return { ...preview };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await safeFetch<FullPost | null>(postBySlugQuery, localPost(slug), { slug });
  if (!post) return { title: "Post not found | Venture Voice" };
  return {
    title: `${post.title} | Venture Voice`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    safeFetch<FullPost | null>(postBySlugQuery, localPost(slug), { slug }),
    safeFetch<SiteSettings>(settingsQuery, fallbackSettings),
  ]);
  const s = { ...fallbackSettings, ...settings };

  if (!post) notFound();

  const localBody = fallbackBodies[slug];

  return (
    <>
      <Header logoUrl={s.logoUrl} />
      <main>
        <section className="canvas-grid">
          <div className="mx-auto max-w-3xl px-5 py-16 md:py-20">
            <Link href="/blog" className="font-mono text-xs text-accent hover:underline">
              ← All posts
            </Link>
            <h1 className="font-display mt-4 text-3xl font-bold leading-tight tracking-tight text-white md:text-[2.6rem]">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <p className="font-mono text-xs text-slate-2">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <TagPills tags={post.tags} light />
            </div>
          </div>
        </section>
        <article className="bg-white">
          <div className="mx-auto max-w-3xl px-5">
            {post.featuredImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.featuredImage}
                alt={post.featuredAlt || post.title}
                className="-mt-10 w-full rounded-2xl border border-line object-cover shadow-[0_24px_60px_rgba(20,14,36,0.18)]"
              />
            )}
          </div>
          <div className="prose-vv mx-auto max-w-3xl px-5 py-14">
            {post.body ? (
              <PortableText value={post.body} />
            ) : (
              localBody?.map((para, i) => <p key={i}>{para}</p>)
            )}
            <div className="mt-12 rounded-2xl border border-line bg-paper p-8">
              <h2 className="font-display !mt-0 text-xl font-bold text-ink">
                Want this running in your business?
              </h2>
              <p>
                Book a free 30-minute automation audit. We&apos;ll map your most
                automatable workflows. You keep the findings either way.
              </p>
              <Link
                href="/#contact"
                className="mt-2 inline-block rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white no-underline transition-colors hover:bg-primary-deep"
              >
                Book a free audit
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer contactEmail={s.contactEmail} />
    </>
  );
}
