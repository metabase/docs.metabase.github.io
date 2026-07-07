// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import { docsMarkdownProcessor, shikiConfig } from "./src/lib/render-doc.ts";

export default defineConfig({
  // TEMPORARY until image handling is decided: copy markdown-referenced
  // images as-is instead of recompressing them through sharp.
  image: { service: passthroughImageService() },
  markdown: {
    // _docs pages render through renderDoc() (src/lib/render-doc.ts) on
    // demand instead of through this config, but other markdown content
    // (if any is added outside _docs) should get the same Kramdown-compat
    // plugins and theme, so this reuses the same processor/config.
    processor: docsMarkdownProcessor,
    shikiConfig,
  },
  vite: {
    // Don't resolve TS path aliases from tsconfigs — _docs contains vendored
    // tsconfig.json files whose `extends` targets don't exist, which crashes
    // Vite's resolver. We use no path aliases, so this loses nothing.
    resolve: { tsconfigPaths: false },
  },
  site: "https://www.metabase.com",
  // Write where Jekyll writes so deploy config stays unchanged at cutover.
  // Note: `astro build` empties this directory first.
  outDir: "./_site",
  trailingSlash: "ignore",
  build: {
    // Jekyll's extensionless permalinks emit foo.html (not foo/index.html),
    // and its "/docs/…/index.html" permalinks emit directory indexes.
    // "preserve" reproduces both: basename(path).html in dirname(path).
    // ("file" breaks on slugs ending in "index": the render request URL
    // /docs/index.html normalizes to /docs/ and no longer matches params.)
    format: "preserve",
  },
});
