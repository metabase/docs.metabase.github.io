import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

// Liquid + Markdown rendering for _docs pages happens on demand in
// renderDoc() (src/lib/render-doc.ts), called from the page component, not
// here — see that file for why. This loader only does what glob() always
// does: list files, parse frontmatter, and keep the raw body around.
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
