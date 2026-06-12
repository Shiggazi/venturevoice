import { defineType, defineField } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog Posts",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured image",
      type: "image",
      options: { hotspot: true },
      description: "Shown on blog cards and at the top of the post. Recommended: 1200x675 or larger.",
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Describe the image for accessibility and SEO.",
        }),
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Type a tag and press Enter. Used for filtering on the blog page, e.g. n8n, Playbooks, Tool Comparison.",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary shown on the blog index and in link previews.",
    }),
    defineField({ name: "publishedAt", title: "Publish date", type: "date", validation: (r) => r.required() }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "featuredImage" },
  },
});
