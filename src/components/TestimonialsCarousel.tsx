"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { Testimonial } from "@/lib/content";

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-line bg-paper p-8">
      {t.result && (
        <p className="font-mono mb-4 inline-flex w-fit rounded-full bg-ink px-3.5 py-1.5 text-xs text-accent">
          {t.result}
        </p>
      )}
      <blockquote className="text-[17px] leading-relaxed text-ink">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-auto pt-6">
        <span className="block border-t border-line pt-4 text-sm">
          <span className="font-semibold text-ink">{t.name}</span>
          <span className="text-slate"> · {t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Shows a 2-up static grid for <= 2 testimonials.
 * Above that, becomes a swipeable carousel (2 per slide on desktop, 1 on mobile)
 * with autoplay, dots, and arrows. Keeps the section compact as reviews grow.
 */
export default function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(2);
  const [paused, setPaused] = useState(false);

  // 1 card per view on mobile, 2 on desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setPerView(mq.matches ? 2 : 1);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const slideCount = Math.max(1, Math.ceil(testimonials.length / perView));

  const go = useCallback(
    (i: number) => setIndex(((i % slideCount) + slideCount) % slideCount),
    [slideCount]
  );

  useEffect(() => {
    if (index > slideCount - 1) setIndex(slideCount - 1);
  }, [slideCount, index]);

  // autoplay, respects reduced motion and pause-on-hover
  useEffect(() => {
    if (paused || slideCount <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((p) => (p + 1) % slideCount), 6000);
    return () => clearInterval(id);
  }, [paused, slideCount]);

  // touch swipe
  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) go(dx < 0 ? index + 1 : index - 1);
    touchX.current = null;
  };

  // 2 or fewer: simple static grid, no carousel chrome
  if (testimonials.length <= 2) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((t) => (
          <Card key={t._id} t={t} />
        ))}
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          ref={trackRef}
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {Array.from({ length: slideCount }).map((_, s) => (
            <div key={s} className="grid w-full shrink-0 gap-6 md:grid-cols-2">
              {testimonials.slice(s * perView, s * perView + perView).map((t) => (
                <Card key={t._id} t={t} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous reviews"
          className="btn grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-ink hover:border-primary hover:text-primary"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4l-5 5 5 5" />
          </svg>
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Review slides">
          {Array.from({ length: slideCount }).map((_, s) => (
            <button
              key={s}
              type="button"
              role="tab"
              aria-selected={s === index}
              aria-label={`Go to slide ${s + 1}`}
              onClick={() => go(s)}
              className={`h-2 rounded-full transition-all duration-300 ${
                s === index ? "w-6 bg-primary" : "w-2 bg-line hover:bg-slate-2"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next reviews"
          className="btn grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-ink hover:border-primary hover:text-primary"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 4l5 5-5 5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
