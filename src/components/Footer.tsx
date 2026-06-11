import Link from "next/link";

export default function Footer({ contactEmail }: { contactEmail: string }) {
  return (
    <footer className="border-t border-line-dark bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 py-12 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-cobalt">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M2 3l4.5 10h3L14 3h-2.8L8 11.2 4.8 3H2z" fill="#fff" />
              </svg>
            </span>
            <span className="font-display text-[17px] font-bold text-white">Venture Voice</span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-2">
            AI-powered automation for agencies, enterprises, and operators who&apos;d
            rather build than babysit busywork.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-2" aria-label="Footer">
          <Link href="/#services" className="hover:text-white">Services</Link>
          <Link href="/#process" className="hover:text-white">How it works</Link>
          <Link href="/blog" className="hover:text-white">Blog</Link>
          <Link href="/#contact" className="hover:text-white">Contact</Link>
          <a href={`mailto:${contactEmail}`} className="hover:text-white">{contactEmail}</a>
        </nav>
      </div>
      <div className="border-t border-line-dark">
        <p className="mx-auto max-w-6xl px-5 py-5 font-mono text-xs text-slate-2">
          © {new Date().getFullYear()} Venture Voice. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
