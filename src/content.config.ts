import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { DOCS_SRC_ROOT } from "./constants";

const docs = defineCollection({
  loader: glob({
    pattern: ["**/*.md", "!**/embedding/sdk/api/snippets/**"],
    base: DOCS_SRC_ROOT,
  }),
});

export const collections = { docs };
