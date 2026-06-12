"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "How it works" },
  { href: "/#results", label: "Results" },
  { href: "/blog", label: "Blog" },
  { href: "/#faq", label: "FAQ" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-ink/85 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "border-line-dark shadow-[0_8px_30px_rgba(0,0,0,0.35)]" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="group flex items-center" aria-label="Venture Voice home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-white.png"
            alt="Venture Voice"
            className="h-6 w-auto transition-transform duration-300 group-hover:scale-[1.03] md:h-7"
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative text-sm text-slate-2 transition-colors hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="btn rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-deep"
          >
            Book a free audit
          </Link>
        </nav>

        <button
          className="grid h-10 w-10 place-items-center rounded-lg text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M5 5l12 12M17 5L5 17" /> : <path d="M3 6h16M3 11h16M3 16h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-line-dark bg-ink px-5 pb-5 pt-2 md:hidden" aria-label="Mobile">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-[15px] text-slate-2 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-white"
          >
            Book a free audit
          </Link>
        </nav>
      )}
    </header>
  );
}
