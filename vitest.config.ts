/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

// getViteConfig gives tests Astro's Vite setup (the `@/` alias, astro:* modules).
export default getViteConfig({
  test: {
    include: ["src/**/*.test.ts"],
  },
});
