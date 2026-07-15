// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // copy markdown-referenced images as-is instead of recompressing them through sharp.
  image: { service: passthroughImageService() },
});
