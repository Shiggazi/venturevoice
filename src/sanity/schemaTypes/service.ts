import { defineType, defineField } from "sanity";

export const service = defineType({
  name: "service",
  title: "Services",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Service name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tagline", title: "One-line tagline", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({
      name: "bullets",
      title: "What's included (bullet points)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [
          { title: "Workflow (builds)", value: "workflow" },
          { title: "Advisor (AI advisory)", value: "advisor" },
          { title: "Roadmap (strategy)", value: "roadmap" },
        ],
        layout: "radio",
      },
      initialValue: "workflow",
    }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 1 }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
