// @ts-check
import path from "node:path";
import { defineConfig } from "astro/config";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { DOCS_LATEST_ROOT } from "./src/constants";
import { collectRedirects } from "./src/lib/docs/collectRedirects";
import { noopMarkdownProcessor } from "./src/lib/markdown/noopMarkdownProcessor";

// vite-plugin-static-copy resolves each matched file's dest as
// `dest + <full dir the glob matched under, relative to cwd>`, then
// `stripBase` walks back up that many segments before re-appending the
// remainder — so this must be the segment count of DOCS_LATEST_ROOT itself
// (relative to cwd, with any leading `../` collapsed) for the stripped
// result to land on `dest` with the original subdirectory structure intact.
const DOCS_LATEST_ROOT_DEPTH = path
  .relative(process.cwd(), path.resolve(DOCS_LATEST_ROOT))
  .replace(/^(?:\.\.[/\\])+/, "")
  .split(/[/\\]/).length;

// One target pair per asset glob: committed _docs assets, plus the
// /docs/latest counterpart sourced from DOCS_LATEST_ROOT (METABASE_REPO_PATH
// when set, for local dev against a metabase checkout).
/** @param {string} globSuffix */
function docsCopyTargets(globSuffix) {
  return [
    {
      src: [`_docs/**/${globSuffix}`, "!_docs/latest/**"],
      dest: "docs",
      rename: { stripBase: 1 },
    },
    {
      src: `${DOCS_LATEST_ROOT}/**/${globSuffix}`,
      dest: "docs/latest",
      rename: { stripBase: DOCS_LATEST_ROOT_DEPTH },
    },
  ];
}

// https://astro.build/config
export default defineConfig({
  site: "https://www.metabase.com",
  outDir: "_site",

  // Static equivalent of the old jekyll-redirect-from plugin: builds one
  // meta-refresh stub page per `redirect_from` entry across all _docs files.
  redirects: collectRedirects(),

  build: {
    // TLDR mimic what jekyll did to prevent broken links.
    // E.g. some old hrefs point to like `start.html` so moving the file to `start/index.html` would break the link.
    // But we also want the ability to have like `about/index.html` instead of `about.html` as well.
    format: "preserve",
  },
  vite: {
    plugins: [
      viteStaticCopy({
        targets: [
          ...docsCopyTargets("*.{jpg,png,gif,json}"),
          // TypeDoc-generated CSS/JS/icons the SDK API reference .html
          // docs load via relative `assets/...` URLs.
          ...docsCopyTargets("embedding/sdk/api/assets/*.{css,js,svg,ico}"),
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
