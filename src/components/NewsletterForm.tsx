"use client";

import Script from "next/script";

export default function NewsletterForm() {
  return (
    <div className="w-full max-w-sm">
      <Script
        async
        data-uid="1443fc6876"
        src="https://venturevoice.kit.com/1443fc6876/index.js"
        strategy="lazyOnload"
      />
    </div>
  );
}
