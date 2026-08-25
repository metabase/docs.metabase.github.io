import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Node, not a DOM environment: the suite asserts on files read from disk.
    // `_site`/`tmp` hold build copies of source files, so scope the glob.
    environment: "node",
    include: ["test/**/*.test.ts", "src/**/*.test.ts"],
  },
});
