// @ts-check
import path from "node:path";
import mdx from "@astrojs/mdx";
import { defineConfig } from "astro/config";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { DOCS_DEST, DOCS_SRC_ROOT } from "./src/constants";
import { collectRedirects } from "./src/lib/docs/collectRedirects";
import { docsMarkdownProcessor } from "./src/lib/markdown/markdownRenderer";
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

  integrations: [
    // `.mdx` docs are compiled by Astro at build time (not rendered at request
    // time like `.md` docs), so they skip Liquid and use components instead.
    // They share the `.md` docs' hast plugins via the same satteri processor.
    mdx({
      processor: docsMarkdownProcessor,
      syntaxHighlight: false, // Match `.md` docs; see getMarkdownRenderer
    }),
  ],

  build: {
    // TLDR mimic what jekyll did to prevent broken links.
    // E.g. some old hrefs point to like `start.html` so moving the file to `start/index.html` would break the link.
    // But we also want the ability to have like `about/index.html` instead of `about.html` as well.
    format: "preserve",
    // production routes only /docs/* to this site
    // root-level /_astro/ would 404
    assets: "docs/_astro",
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
