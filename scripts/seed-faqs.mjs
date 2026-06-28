/**
 * Seeds the 5 default FAQs into your Sanity dataset.
 * Run once: node scripts/seed-faqs.mjs
 *
 * Requires in .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET   (defaults to "production")
 *   SANITY_API_TOKEN             (write token from sanity.io/manage)
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../.env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local"
  );
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2026-06-01", useCdn: false });

const faqs = [
  {
    _type: "faq",
    question: "Which tools and platforms do you work with?",
    answer:
      "We build primarily on n8n and Claude Code, and integrate them with whatever you already run: CRMs like HubSpot and Pipedrive, Google Workspace, Notion, Airtable, Slack, and email platforms. If your stack has an API, we can almost certainly connect it.",
    order: 1,
  },
  {
    _type: "faq",
    question: "Do we own the automations you build?",
    answer:
      "Yes, fully. Everything is built in your accounts, documented, and handed over with training. If we part ways tomorrow, every workflow keeps running and your team knows how to maintain it. No lock-in, ever.",
    order: 2,
  },
  {
    _type: "faq",
    question: "How long does a typical build take?",
    answer:
      "Quick wins ship in days. A typical workflow build runs one to three weeks from kickoff to handover, depending on how many systems it touches. A full automation roadmap takes about a week of audit work before you see the prioritized plan.",
    order: 3,
  },
  {
    _type: "faq",
    question: "What does it cost?",
    answer:
      "It depends on scope, which is exactly why the audit comes first, and free. After the audit you get a fixed quote per workflow or roadmap, so you know the full cost before any build starts. No retainers required, no surprise invoices.",
    order: 4,
  },
  {
    _type: "faq",
    question: "Is our data safe in these workflows?",
    answer:
      "Workflows run inside your own accounts under your own credentials. We don't route your data through ours. For sensitive operations we can build on self-hosted n8n, keeping everything on infrastructure you control.",
    order: 5,
  },
];

const tx = client.transaction();
faqs.forEach((faq) => tx.create(faq));

try {
  await tx.commit();
  console.log(`✓ Seeded ${faqs.length} FAQs into Sanity (${dataset})`);
} catch (err) {
  console.error("Seed failed:", err.message);
  process.exit(1);
}
