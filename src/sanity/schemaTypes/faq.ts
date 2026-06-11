import { defineType, defineField } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQs",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 5, validation: (r) => r.required() }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 1 }),
  ],
  preview: { select: { title: "question" } },
});
