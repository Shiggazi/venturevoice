import type { Metadata } from "next";
import Header from "@/components/Header";
import BlogList from "@/components/BlogList";
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
            <p className="eyebrow text-accent">Blog</p>
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
            <BlogList posts={posts} />
          </div>
        </section>
      </main>
      <Footer contactEmail={s.contactEmail} />
    </>
  );
}
