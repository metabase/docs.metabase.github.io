/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

// getViteConfig is what makes `.astro` imports compile in tests.
export default getViteConfig({
  test: {
    // node, not happy-dom: Liquid includes read files off process.cwd()
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
