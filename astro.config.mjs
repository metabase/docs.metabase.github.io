// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.metabase.com",
  // Write where Jekyll writes so deploy config stays unchanged at cutover.
  // Note: `astro build` empties this directory first.
  outDir: "./_site",
  // Match Jekyll's /docs/path/ style URLs
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },
});
