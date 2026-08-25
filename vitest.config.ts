/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

// `getViteConfig` is what makes `.astro` imports compile; plain Vite resolves them
// to a path string and the container renders nothing.
export default getViteConfig({
  test: {
    // Node by default. Tests needing DOM globals opt in with:
    //   // @vitest-environment happy-dom
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
