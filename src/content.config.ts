import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const docsLatest = defineCollection({
  loader: glob({
    pattern: ["**/*.md", "!**/embedding/sdk/api/snippets/**"],
    base: "../metabase/docs",
  }),
});

const docsPrevious = defineCollection({
  loader: glob({
    pattern: ["**/docs/**/*.md", "!**/embedding/sdk/api/snippets/**"],
    base: "../metabase/__worktrees_docs",
  }),
});

export const collections = { docsLatest, docsPrevious };
