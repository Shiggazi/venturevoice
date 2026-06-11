# Venture Voice — Website + CMS

A B2B redesign of venturevoice.ai built on **Next.js** (the website) and **Sanity.io** (the CMS), with Sanity Studio embedded at `/studio`. After the one-time setup below, all content — blog posts, testimonials, services, FAQs, hero copy, even the Vimeo video ID — is managed visually in the Studio. No code needed for day-to-day updates.

**Hosting cost: $0.** Vercel's free tier hosts the site; Sanity's free tier handles the CMS.

---

## One-time setup (about 20 minutes)

### 1. Create the Sanity project (free)

1. Go to [sanity.io](https://www.sanity.io) and sign up (Google login works).
2. Go to [sanity.io/manage](https://www.sanity.io/manage) → **Create new project**. Name it "Venture Voice". Choose the **production** dataset.
3. Copy the **Project ID** shown on the project page (looks like `ab12cd34`).

### 2. Connect the project locally

```bash
npm install
cp .env.local.example .env.local
# open .env.local and paste your Project ID
npm run dev
```

Site runs at http://localhost:3000 and the CMS at http://localhost:3000/studio.

### 3. Allow the Studio to talk to Sanity

In [sanity.io/manage](https://www.sanity.io/manage) → your project → **API** → **CORS origins**, add:
- `http://localhost:3000` (allow credentials: ON)
- Your production URL once deployed, e.g. `https://venturevoice.ai` (allow credentials: ON)

### 4. Load the starter content (optional but recommended)

The site already renders with built-in fallback content, but importing the seed file puts every piece of copy into the CMS so you can edit it:

```bash
npx sanity@latest dataset import seed/venturevoice-seed.ndjson production --project YOUR_PROJECT_ID
```

This loads: site settings (hero copy, video, CTAs), 3 services, 2 testimonials, 5 FAQs, and 2 blog posts.

### 5. Deploy to Vercel (free)

1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = your project ID
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
4. Deploy. Point the venturevoice.ai domain at Vercel (Vercel walks you through the DNS records).
5. Add your production URL to Sanity CORS origins (step 3).

---

## Day-to-day content management (no code)

Open `yoursite.com/studio`, log in, and edit:

| What | Where in Studio |
|---|---|
| Hero headline, subheadline, buttons | Site Settings |
| **The Vimeo video** | Site Settings → Vimeo video ID |
| Newsletter copy, contact email | Site Settings |
| Services | Services |
| Testimonials (add new client wins here) | Testimonials |
| FAQs | FAQs |
| Blog posts (rich text editor, images supported) | Blog Posts |

Changes go live within ~60 seconds (the site revalidates content every minute).

**Resilience note:** if a content type is empty in Sanity, the site falls back to built-in default copy — it never renders blank.

---

## The forms

The contact and newsletter forms ship with a zero-backend default: submitting opens the visitor's email client addressed to your contact email. This works immediately, but for serious lead capture swap in a form service:

- **Contact form:** create a free [Formspree](https://formspree.io) form, then in `src/components/ContactSection.tsx` replace the `mailto:` submit handler with a `fetch` POST to your Formspree endpoint (Formspree's docs show the exact three lines).
- **Newsletter:** replace the handler in `src/components/NewsletterForm.tsx` with your email provider's embed (Beehiiv, ConvertKit, Mailchimp all provide one).

---

## Project structure

```
src/
  app/
    page.tsx              ← landing page
    blog/                 ← blog index + post pages
    studio/               ← embedded Sanity Studio (/studio)
  components/             ← header, hero, sections, forms, footer
  lib/content.ts          ← fallback content + types (edit default copy here)
  sanity/
    schemaTypes/          ← CMS content models
    client.ts             ← Sanity client with safe fallback fetching
sanity.config.ts          ← Studio configuration
seed/                     ← starter content for the CMS
```
