// @ts-check
import { defineConfig } from "astro/config";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { collectRedirects } from "./src/lib/docs/collectRedirects";
import { noopMarkdownProcessor } from "./src/lib/markdown/noopMarkdownProcessor";

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
          {
            src: "_docs/**/*.{jpg,png,gif,json}",
            dest: "docs",
            rename: { stripBase: 1 }, // strips `_docs/`
          },
          {
            // TypeDoc-generated CSS/JS/icons the SDK API reference .html
            // docs load via relative `assets/...` URLs.
            src: "_docs/**/embedding/sdk/api/assets/*.{css,js,svg,ico}",
            dest: "docs",
            rename: { stripBase: 1 },
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
