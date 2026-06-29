"use client";

import { useEffect, useRef } from "react";

export default function NewsletterForm() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const script = document.createElement("script");
    script.src = "https://venturevoice.kit.com/1443fc6876/index.js";
    script.setAttribute("data-uid", "1443fc6876");
    script.async = true;
    containerRef.current.appendChild(script);
  }, []);

  return <div ref={containerRef} className="w-full max-w-sm" />;
}
