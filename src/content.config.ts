import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { docsHtmlLoader } from "./lib/docs/docsHtmlLoader";
import { DOCS_SRC_ROOT } from "./constants";

const docs = defineCollection({
  loader: glob({
    pattern: ["**/*.md", "!**/embedding/sdk/api/snippets/**", "!**/_includes/**"],
    base: DOCS_SRC_ROOT,

    // Preserves dots (.) in pathnames
    generateId: ({ entry }) => entry.replace(/\.md$/, ""),
  }),
});

const docsMdx = defineCollection({
  loader: glob({
    pattern: ["**/*.mdx", "!**/_includes/**"],
    base: DOCS_SRC_ROOT,

    // Preserves dots (.) in pathnames
    generateId: ({ entry }) => entry.replace(/\.mdx$/, ""),
  }),
});

// Raw, standalone HTML docs (TypeDoc-generated SDK API reference pages,
// per-version api.html ToC pages) that the glob() loader can't parse.
const docsHtml = defineCollection({
  loader: docsHtmlLoader(),
});

export const collections = { docs, docsMdx, docsHtml };
