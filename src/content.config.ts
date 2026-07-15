import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const examples = defineCollection({
  loader: glob({
    pattern: ["src/example-collection/**/*.md"],
  }),
});


export const collections = { examples };
