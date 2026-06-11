"use client";

import { useState } from "react";
import type { Faq } from "@/lib/content";

/** Smoothly animated accordion. Content comes from Sanity, untouched. */
export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?._id ?? null);

  return (
    <div>
      {faqs.map((f) => {
        const open = openId === f._id;
        return (
          <div key={f._id} className={`faq-item border-b border-line ${open ? "open" : ""}`}>
            <button
              type="button"
              onClick={() => setOpenId(open ? null : f._id)}
              aria-expanded={open}
              className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-[17px] font-semibold text-ink transition-colors hover:text-cobalt"
            >
              {f.question}
              <span className="faq-icon font-mono shrink-0 text-cobalt" aria-hidden>
                +
              </span>
            </button>
            <div className="faq-answer">
              <div>
                <p className="max-w-xl pb-5 leading-relaxed text-slate">{f.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
