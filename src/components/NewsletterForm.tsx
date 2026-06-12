"use client";

import { useState } from "react";

export default function NewsletterForm({ contactEmail }: { contactEmail: string }) {
  const [email, setEmail] = useState("");

  return (
    <form
      className="flex w-full max-w-sm gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        // Works out of the box. Swap for your email provider's embed
        // (ConvertKit, Mailchimp, Beehiiv). See README.
        window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(
          "Newsletter signup"
        )}&body=${encodeURIComponent(`Please add me to the newsletter: ${email}`)}`;
      }}
    >
      <label htmlFor="nl-email" className="sr-only">
        Email address
      </label>
      <input
        id="nl-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        className="w-full rounded-lg border border-line bg-paper px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-primary"
      />
      <button
        type="submit"
        className="btn shrink-0 rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-2"
      >
        Subscribe
      </button>
    </form>
  );
}
