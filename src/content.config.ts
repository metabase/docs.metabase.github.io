import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const docs = defineCollection({
  loader: glob({
    // Same exclusion as Jekyll's `exclude` for SDK API snippets
    pattern: ["**/*.md", "!**/embedding/sdk/api/snippets/**"],
    base: "./_docs",
    // Jekyll's :path placeholder is the file path verbatim (minus extension),
    // not slugified — so skip Astro's default slugification for URL parity.
    generateId: ({ entry }) => entry.replace(/\.md$/, ""),
  }),
});

export const collections = { docs };
