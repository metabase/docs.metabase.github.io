import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { DOCS_SRC_ROOT, DOCS_VERSION } from "./constants";
import { docsHtmlLoader } from "./lib/docs/docsHtmlLoader";

const PREFIX = DOCS_VERSION ? `${DOCS_VERSION}/` : "";

const docs = defineCollection({
  loader: glob({
    pattern: ["**/*.md", "!**/embedding/sdk/api/snippets/**", "!util/**"],
    base: DOCS_SRC_ROOT,

    // Preserves dots (.) in pathnames
    generateId: ({ entry }) => `${PREFIX}${entry.replace(/\.md$/, "")}`,
  }),
});

// Raw, standalone HTML docs (TypeDoc-generated SDK API reference pages,
// per-version api.html ToC pages) that the glob() loader can't parse.
const docsHtml = defineCollection({
  loader: docsHtmlLoader({
    base: DOCS_SRC_ROOT,
    generateId: (entry) => `${PREFIX}${entry}`,
  }),
});

export const collections = { docs, docsHtml };
