// All site content types + fallback content.
// The site pulls from Sanity first; if a document type is empty
// (e.g. before you've populated the CMS) it falls back to this,
// so the site never renders blank.

export type Service = {
  _id: string;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  icon: "workflow" | "advisor" | "roadmap";
  order: number;
};

export type Testimonial = {
  _id: string;
  quote: string;
  name: string;
  role: string;
  result?: string;
  order: number;
};

export type Faq = {
  _id: string;
  question: string;
  answer: string;
  order: number;
};

export type PostPreview = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  featuredImage?: string | null;
  featuredAlt?: string;
  tags?: string[];
};

export type SiteSettings = {
  logoUrl?: string | null;
  heroEyebrow: string;
  heroHeadline: string;
  heroSubheadline: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  vimeoId: string;
  videoTitle: string;
  videoCaption: string;
  contactEmail: string;
  newsletterHeadline: string;
  newsletterSub: string;
  gaId?: string;
  formspreeId?: string;
};

export const fallbackSettings: SiteSettings = {
  heroEyebrow: "AI & Automation Consultancy",
  heroHeadline: "The work still gets done. Just not by hand.",
  heroSubheadline:
    "Venture Voice designs and builds AI-powered automations on n8n and Claude Code, so your agency or operations team stops losing hours every week to work software should be doing.",
  primaryCtaLabel: "Book a free automation audit",
  secondaryCtaLabel: "Watch how it works",
  vimeoId: "1161430461",
  videoTitle: "See it before you book a call",
  videoCaption:
    "Three minutes on how we find the repetitive work hiding in your operations, and what it looks like once a machine is doing it.",
  contactEmail: "hello@venturevoice.ai",
  newsletterHeadline: "One automation idea, every week.",
  newsletterSub:
    "A short email showing one real workflow you could automate this week, with the tools to do it. No fluff, unsubscribe anytime.",
};

export const fallbackServices: Service[] = [
  {
    _id: "svc-1",
    title: "Automation Builds",
    tagline: "We build it. You run it.",
    description:
      "We connect the tools you already use, from your CRM and inbox to spreadsheets, Slack, and invoicing, into workflows that run on their own. Built on n8n and Claude Code, documented and handed over so your team owns every piece.",
    bullets: [
      "Lead intake, enrichment, and routing",
      "Client onboarding and reporting handoffs",
      "Support triage and ticket summarization",
      "Content production and publishing pipelines",
    ],
    icon: "workflow",
    order: 1,
  },
  {
    _id: "svc-2",
    title: "AI Advisory",
    tagline: "The right model for the job, not the loudest one.",
    description:
      "There are thousands of AI tools and most of them won't move your numbers. We test against your actual workflows, recommend what fits your stack and budget, then implement it. Advisory that ends in working software, not a slide deck.",
    bullets: [
      "Tool and model selection for your use case",
      "Prompt and workflow design for your team",
      "Implementation inside your existing systems",
      "Team training so adoption actually sticks",
    ],
    icon: "advisor",
    order: 2,
  },
  {
    _id: "svc-3",
    title: "Automation Roadmap",
    tagline: "Know what to automate first, and what to skip.",
    description:
      "We audit your operations end to end, find every task a machine could take over, and rank the list by hours saved against build effort. You leave with a prioritized plan you can execute with us or on your own.",
    bullets: [
      "Full operations audit, mapped process by process",
      "Each opportunity scored by ROI",
      "Quick wins separated from long-term plays",
      "A plan you own, whoever builds it",
    ],
    icon: "roadmap",
    order: 3,
  },
];

export const fallbackTestimonials: Testimonial[] = [
  {
    _id: "t-1",
    quote:
      "Venture Voice saved me hours of work per week. I was about to hire a team just to keep up with content for my clients. Now the workflow they built handles it.",
    name: "Liz",
    role: "Instagram Influencer",
    result: "Hours saved weekly, no new hires",
    order: 1,
  },
  {
    _id: "t-2",
    quote:
      "They streamlined our customer support workflow and automated most of the manual steps in the process. Highly recommend.",
    name: "Operations Lead",
    role: "Media Agency",
    result: "Support triage automated end to end",
    order: 2,
  },
  {
    _id: "t-3",
    quote: "Test third review to verify carousel activation.",
    name: "Test",
    role: "QA",
    result: "carousel check",
    order: 3,
  },
];

export const fallbackFaqs: Faq[] = [
  {
    _id: "f-1",
    question: "Which tools and platforms do you work with?",
    answer:
      "We build primarily on n8n and Claude Code, and integrate them with whatever you already run: CRMs like HubSpot and Pipedrive, Google Workspace, Notion, Airtable, Slack, and email platforms. If your stack has an API, we can almost certainly connect it.",
    order: 1,
  },
  {
    _id: "f-2",
    question: "Do we own the automations you build?",
    answer:
      "Yes, fully. Everything is built in your accounts, documented, and handed over with training. If we part ways tomorrow, every workflow keeps running and your team knows how to maintain it. No lock-in, ever.",
    order: 2,
  },
  {
    _id: "f-3",
    question: "How long does a typical build take?",
    answer:
      "Quick wins ship in days. A typical workflow build runs one to three weeks from kickoff to handover, depending on how many systems it touches. A full automation roadmap takes about a week of audit work before you see the prioritized plan.",
    order: 3,
  },
  {
    _id: "f-4",
    question: "What does it cost?",
    answer:
      "It depends on scope, which is exactly why the audit comes first, and free. After the audit you get a fixed quote per workflow or roadmap, so you know the full cost before any build starts. No retainers required, no surprise invoices.",
    order: 4,
  },
  {
    _id: "f-5",
    question: "Is our data safe in these workflows?",
    answer:
      "Workflows run inside your own accounts under your own credentials. We don't route your data through ours. For sensitive operations we can build on self-hosted n8n, keeping everything on infrastructure you control.",
    order: 5,
  },
];

export const fallbackPosts: PostPreview[] = [];

export const processSteps = [
  {
    n: "01",
    title: "Audit",
    body: "A free 30-minute call. We map where your team's hours actually go and flag what's automatable. You keep the findings either way.",
  },
  {
    n: "02",
    title: "Roadmap",
    body: "Every opportunity ranked by hours saved against build effort, with a fixed quote per workflow. You see the full cost before anything starts.",
  },
  {
    n: "03",
    title: "Build",
    body: "We build in your accounts, on your stack. Quick wins ship in days; most workflows go live within one to three weeks.",
  },
  {
    n: "04",
    title: "Handover",
    body: "Documentation, training, and full ownership. Your team can run and modify everything without us, and we're here if you'd rather we did.",
  },
];

export const problemItems = [
  {
    stat: "Copy. Paste. Repeat.",
    title: "Data moved by hand",
    body: "Leads retyped from forms into the CRM. Numbers copied from dashboards into client reports. Every transfer is minutes lost and a typo waiting to happen.",
  },
  {
    stat: "Same answer, 40th time",
    title: "Support on manual triage",
    body: "Someone reads every ticket, decides where it goes, and types the same response they typed yesterday. Software can sort, summarize, and draft. Your team should be approving, not producing.",
  },
  {
    stat: "Hiring to keep up",
    title: "Headcount as a patch",
    body: "When throughput is the problem, a new hire is the expensive fix. Often the role being scoped is three repetitive workflows in a trench coat.",
  },
];
