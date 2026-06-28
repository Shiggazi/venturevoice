import { groq } from "next-sanity";

export const settingsQuery = groq`*[_type == "siteSettings"][0]{
  "logoUrl": logo.asset->url,
  heroEyebrow, heroHeadline, heroSubheadline,
  primaryCtaLabel, secondaryCtaLabel,
  vimeoId, videoTitle, videoCaption,
  contactEmail, newsletterHeadline, newsletterSub,
  gaId, formspreeId
}`;

export const servicesQuery = groq`*[_type == "service"] | order(order asc){
  _id, title, tagline, description, bullets, icon, order
}`;

export const testimonialsQuery = groq`*[_type == "testimonial"] | order(order asc){
  _id, quote, name, role, result, order
}`;

export const faqsQuery = groq`*[_type == "faq"] | order(order asc){
  _id, question, answer, order
}`;

export const postPreviewsQuery = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
  _id, title, "slug": slug.current, excerpt, publishedAt,
  "featuredImage": featuredImage.asset->url,
  "featuredAlt": coalesce(featuredImage.alt, title),
  tags
}`;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, excerpt, publishedAt, body,
  "featuredImage": featuredImage.asset->url,
  "featuredAlt": coalesce(featuredImage.alt, title),
  tags
}`;
