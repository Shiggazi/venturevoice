import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { safeFetch } from "@/sanity/client";
import { settingsQuery } from "@/sanity/queries";
import { fallbackSettings, type SiteSettings } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  title: "Venture Voice | AI & Automation for Agencies and Ops Teams",
  description:
    "Venture Voice designs and builds AI-powered automations on n8n and Claude Code, so your team stops losing hours to repetitive work. Book a free automation audit.",
  openGraph: {
    title: "Venture Voice | AI & Automation for Agencies and Ops Teams",
    description:
      "We design and build AI-powered automations on n8n and Claude Code. Book a free automation audit.",
    url: "https://venturevoice.ai",
    siteName: "Venture Voice",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await safeFetch<SiteSettings>(settingsQuery, fallbackSettings);
  const gaId = settings.gaId || process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&family=Instrument+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
