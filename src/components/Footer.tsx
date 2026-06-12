import Link from "next/link";

export default function Footer({ contactEmail }: { contactEmail: string }) {
  return (
    <footer className="border-t border-line-dark bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 py-12 md:flex-row md:items-center">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-white.png" alt="Venture Voice" className="h-6 w-auto" />
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
