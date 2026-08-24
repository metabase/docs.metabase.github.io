import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { DOCS_LATEST_ROOT, DOCS_SRC_ROOT } from "./constants";
import { docsHtmlLoader } from "./lib/docs/docsHtmlLoader";

const docs = defineCollection({
  loader: glob({
    pattern: ["**/*.md", "!**/embedding/sdk/api/snippets/**", "!latest/**"],
    base: DOCS_SRC_ROOT,

    // Preserves dots (.) in pathnames
    generateId: ({ entry }) => entry.replace(/\.md$/, ""),
  }),
});

const docsLatest = defineCollection({
  loader: glob({
    pattern: [
      "**/*.md",
      "!**/embedding/sdk/api/snippets/**",
      "!**/_includes/**",
    ],
    base: DOCS_LATEST_ROOT,

    // Preserves dots (.) in pathnames
    generateId: ({ entry }) => `latest/${entry.replace(/\.md$/, "")}`,
  }),
});

// Raw, standalone HTML docs (TypeDoc-generated SDK API reference pages,
// per-version api.html ToC pages) that the glob() loader can't parse.
const docsHtml = defineCollection({
  loader: docsHtmlLoader(),
});

export const collections = { docs, docsLatest, docsHtml };
