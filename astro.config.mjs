// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";

export default defineConfig({
  // TEMPORARY until image handling is decided: copy markdown-referenced
  // images as-is instead of recompressing them through sharp.
  image: { service: passthroughImageService() },
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
