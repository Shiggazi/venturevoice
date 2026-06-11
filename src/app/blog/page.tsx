import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { safeFetch } from "@/sanity/client";
import { postPreviewsQuery, settingsQuery } from "@/sanity/queries";
import {
  fallbackPosts,
  fallbackSettings,
  type PostPreview,
  type SiteSettings,
} from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog | Venture Voice",
  description:
    "Practical breakdowns of real automation workflows on n8n, Make, and Zapier. No hype.",
};

export default async function BlogIndex() {
  const [posts, settings] = await Promise.all([
    safeFetch<PostPreview[]>(postPreviewsQuery, fallbackPosts),
    safeFetch<SiteSettings>(settingsQuery, fallbackSettings),
  ]);
  const s = { ...fallbackSettings, ...settings };

  return (
    <>
      <Header />
      <main>
        <section className="canvas-grid">
          <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
            <p className="eyebrow text-amber">Blog</p>
            <h1 className="font-display mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Automation, minus the hype
            </h1>
            <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-slate-2">
              Real workflows, honest tool comparisons, and the occasional
              opinion about where AI actually earns its keep.
            </p>
          </div>
        </section>
        <section className="bg-paper">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <div className="grid gap-6 md:grid-cols-2">
              {posts.map((p) => (
                <Link
                  key={p._id}
                  href={`/blog/${p.slug}`}
                  className="group rounded-2xl border border-line bg-white p-8 transition-shadow hover:shadow-[0_16px_40px_rgba(11,18,32,0.08)]"
                >
                  <p className="font-mono text-xs text-slate-2">
                    {new Date(p.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <h2 className="font-display mt-3 text-xl font-bold text-ink group-hover:text-cobalt">
                    {p.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-slate">{p.excerpt}</p>
                  <p className="mt-5 text-sm font-semibold text-cobalt">Read post →</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer contactEmail={s.contactEmail} />
    </>
  );
}
