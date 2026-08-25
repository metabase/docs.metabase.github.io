import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { DOCS_LATEST_ROOT, DOCS_SRC_ROOT } from "./constants";
import { docsHtmlLoader } from "./lib/docs/docsHtmlLoader";

// FIXME: This is a big collection and it slows down dev builds. Maybe we can disable it by default for dev in .env?
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
      // FIXME: Should this be ignored in the "docs" collection? (Is this a regression?)
      // script/docs (lib/fetch-docs.js) ignores this dir too — it has its
      // own README.md, which would otherwise collide with the root one.
      "!util/**",
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
