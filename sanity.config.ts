"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { projectId, dataset, apiVersion } from "./src/sanity/env";

export default defineConfig({
  name: "venturevoice",
  title: "Venture Voice CMS",
  basePath: "/studio",
  projectId: projectId || "placeholder",
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site Settings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.divider(),
            S.documentTypeListItem("service").title("Services"),
            S.documentTypeListItem("testimonial").title("Testimonials"),
            S.documentTypeListItem("faq").title("FAQs"),
            S.documentTypeListItem("post").title("Blog Posts"),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
