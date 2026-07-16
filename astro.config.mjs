// @ts-check
import { defineConfig } from "astro/config";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { noopMarkdownProcessor } from "./src/lib/markdown/noopMarkdownProcessor";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      viteStaticCopy({
        targets: [
          {
            // TODO: What other extensions?
            src: "_docs/**/*.{jpg,png}",
            dest: "docs",
            rename: { stripBase: 1 }, // strips `_docs/`
          },
        ],
      }),
    ],
  },
  markdown: {
    // Use `getMarkdownRenderer` instead for faster dev builds. There are
    // thousands of docs md files, and astro processes the markdown for all of
    // them even if you don't even navigate to a markdown-generated page. Also,
    // docs md files use liquid syntax which must be processed before the
    // markdown is converted to html. Processing liquid as part of a satteri
    // plugin would be unnecessarily and frustratingly slow for dev builds
    // since it would need to resolve all the includes for thousands of
    // markdown files.
    processor: noopMarkdownProcessor,
  },
});
