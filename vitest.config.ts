/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

// getViteConfig gives tests Astro's Vite setup (the `@/` alias, astro:* modules).
export default getViteConfig({
  test: {
    // node, not happy-dom: Liquid includes read files off process.cwd()
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
