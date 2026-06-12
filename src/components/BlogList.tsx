"use client";

import { useMemo, useState } from "react";
import type { PostPreview } from "@/lib/content";
import BlogCard from "./BlogCard";

/** Blog list with interactive tag filtering. Pure frontend on top of CMS data. */
export default function BlogList({ posts }: { posts: PostPreview[] }) {
  const [active, setActive] = useState<string>("All");

  const tags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags?.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set).sort()];
  }, [posts]);

  const visible =
    active === "All" ? posts : posts.filter((p) => p.tags?.includes(active));

  return (
    <div>
      {tags.length > 1 && (
        <div className="mb-10 flex flex-wrap gap-2.5" role="group" aria-label="Filter posts by tag">
          {tags.map((tag) => {
            const on = tag === active;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActive(tag)}
                aria-pressed={on}
                className={`btn font-mono rounded-full border px-4 py-2 text-xs transition-colors ${
                  on
                    ? "border-primary bg-primary text-white"
                    : "border-line bg-white text-slate hover:border-primary hover:text-primary"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {visible.map((p) => (
          <BlogCard key={p._id} post={p} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="rounded-2xl border border-line bg-white p-10 text-center text-slate">
          No posts with this tag yet.
        </p>
      )}
    </div>
  );
}
