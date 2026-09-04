// @ts-check
import path from "node:path";
import { defineConfig } from "astro/config";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { DOCS_DEST, DOCS_SRC_ROOT } from "./src/constants";
import { collectRedirects } from "./src/lib/docs/collectRedirects";
import { noopMarkdownProcessor } from "./src/lib/markdown/noopMarkdownProcessor";

// The number of leading path segments to strip from each copied file's directory.
// Computes the directory relative to the project root and strips any leading `../`.
// e.g. `_docs` -> 1, `../metabase/docs` -> 2
const docsSrcStripBase = path
  .relative(process.cwd(), path.resolve(DOCS_SRC_ROOT))
  .replace(/^(?:\.\.\/)+/, "")
  .split("/")
  .filter(Boolean).length;

// https://astro.build/config
export default defineConfig({
  site: "https://www.metabase.com",
  outDir: "_site",

  // Static equivalent of the old jekyll-redirect-from plugin: builds one
  // meta-refresh stub page per `redirect_from` entry across all _docs files.
  redirects: collectRedirects(),

  build: {
    // Use `directory` so archived pages can be more easily served from s3
    format: "directory",
  },
  vite: {
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: `${DOCS_SRC_ROOT}/**/*.{jpg,png,gif,json}`,
            dest: DOCS_DEST,
            rename: { stripBase: docsSrcStripBase },
          },
          {
            // TypeDoc-generated CSS/JS/icons the SDK API reference .html
            // docs load via relative `assets/...` URLs.
            src: `${DOCS_SRC_ROOT}/**/embedding/sdk/api/assets/*.{css,js,svg,ico}`,
            dest: DOCS_DEST,
            rename: { stripBase: docsSrcStripBase },
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
