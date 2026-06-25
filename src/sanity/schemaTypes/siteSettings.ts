import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description:
        "Shown in the site header and footer. Upload a transparent PNG or SVG of your full-color or dark wordmark (the header background is white). If empty, the built-in logo is used.",
    }),
    defineField({ name: "heroEyebrow", title: "Hero eyebrow (small label above headline)", type: "string" }),
    defineField({ name: "heroHeadline", title: "Hero headline", type: "string", validation: (r) => r.required() }),
    defineField({ name: "heroSubheadline", title: "Hero subheadline", type: "text", rows: 3 }),
    defineField({ name: "primaryCtaLabel", title: "Primary button label", type: "string", initialValue: "Book a free automation audit" }),
    defineField({ name: "secondaryCtaLabel", title: "Secondary button label", type: "string", initialValue: "Watch how it works" }),
    defineField({
      name: "vimeoId",
      title: "Vimeo video ID",
      type: "string",
      description: "Just the number from the Vimeo URL, e.g. 1161430461",
    }),
    defineField({ name: "videoTitle", title: "Video section title", type: "string" }),
    defineField({ name: "videoCaption", title: "Video caption", type: "text", rows: 2 }),
    defineField({ name: "contactEmail", title: "Contact email", type: "string" }),
    defineField({ name: "newsletterHeadline", title: "Newsletter headline", type: "string" }),
    defineField({ name: "newsletterSub", title: "Newsletter subtext", type: "text", rows: 2 }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
