import { defineType, defineField } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "name", title: "Client name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role / company", type: "string" }),
    defineField({
      name: "result",
      title: "Headline result (optional)",
      type: "string",
      description: "A short outcome shown above the quote, e.g. 'Hours saved weekly, no new hires'",
    }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 1 }),
  ],
  preview: { select: { title: "name", subtitle: "role" } },
});
