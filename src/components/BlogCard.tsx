import Link from "next/link";
import type { PostPreview } from "@/lib/content";

/** Branded placeholder shown when a post has no featured image yet. */
export function CardPlaceholder() {
  return (
    <div className="canvas-grid relative flex aspect-[16/9] w-full items-center justify-center">
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#7e52c1" strokeWidth="1.4" aria-hidden>
        <rect x="2" y="9" width="6" height="6" rx="1.5" />
        <rect x="16" y="3" width="6" height="6" rx="1.5" />
        <rect x="16" y="15" width="6" height="6" rx="1.5" />
        <path d="M8 12h4m0 0V6h4m-4 6v6h4" />
      </svg>
      <span className="absolute bottom-3 right-4 font-mono text-[10px] uppercase tracking-widest text-[#9a93ae]">
        Venture Voice
      </span>
    </div>
  );
}

export function TagPills({ tags, light }: { tags?: string[]; light?: boolean }) {
  if (!tags?.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className={`font-mono rounded-full px-3 py-1 text-[11px] ${
            light
              ? "border border-white/25 text-white/90"
              : "bg-primary-soft text-primary-deep"
          }`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export default function BlogCard({ post }: { post: PostPreview }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="lift group block h-full overflow-hidden rounded-2xl border border-line bg-white"
    >
      <div className="overflow-hidden">
        {post.featuredImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.featuredImage}
            alt={post.featuredAlt || post.title}
            loading="lazy"
            className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <CardPlaceholder />
        )}
      </div>
      <div className="p-7">
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-mono text-xs text-slate-2">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <TagPills tags={post.tags} />
        </div>
        <h3 className="font-display mt-3 text-xl font-bold text-ink transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        <p className="mt-3 leading-relaxed text-slate">{post.excerpt}</p>
        <p className="arrow-link mt-5 text-sm font-semibold text-primary">
          Read post <span className="arr">→</span>
        </p>
      </div>
    </Link>
  );
}
