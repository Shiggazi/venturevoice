"use client";

import { useState } from "react";
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

  return (
    <header className="sticky top-0 z-50 border-b border-line-dark bg-ink/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Venture Voice home">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-cobalt">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M2 3l4.5 10h3L14 3h-2.8L8 11.2 4.8 3H2z" fill="#fff" />
            </svg>
          </span>
          <span className="font-display text-[17px] font-bold tracking-tight text-white">
            Venture Voice
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-slate-2 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="rounded-lg bg-cobalt px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cobalt-deep"
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
            {open ? (
              <path d="M5 5l12 12M17 5L5 17" />
            ) : (
              <path d="M3 6h16M3 11h16M3 16h16" />
            )}
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
            className="mt-2 block rounded-lg bg-cobalt px-4 py-3 text-center text-sm font-semibold text-white"
          >
            Book a free audit
          </Link>
        </nav>
      )}
    </header>
  );
}
