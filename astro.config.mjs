// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import { docsMarkdownProcessor, shikiConfig } from "./src/lib/render-doc.ts";
import awsAmplify from "astro-aws-amplify";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log(__dirname);

export default defineConfig({
  output: "server",
  adapter: awsAmplify(),
  integrations: [
    {
      name: "heavy-folder-watcher",
      hooks: {
        "astro:server:setup": ({ server }) => {
          // 1. Only run this heavy process during local development
          if (server.config.mode !== "development") return;

          // 2. Resolve your target massive directory
          const folderPaths = [
            path.resolve(__dirname, "../metabase/docs"),
            path.resolve(__dirname, "../metabase/__worktrees_docs"),
          ];

          // 3. Register the path to Vite's root file watcher (Chokidar instance)
          folderPaths.forEach((folderPath) => {
            server.watcher.add(folderPath);
          });

          // 5. Throttling / Stability tweaks for large file counts
          // server.watcher.options.stabilityThreshold = 100; // Waits for changes to stop
          // server.watcher.options.awaitWriteFinish = {
          //   stabilityThreshold: 200,
          //   pollInterval: 100,
          // };

          // 6. Handle the event and trigger a smart browser refresh
          server.watcher.on("change", (filePath) => {
            if (
              folderPaths.some((folderPath) => filePath.startsWith(folderPath))
            ) {
              console.log(
                `\x1b[32m[Watcher]\x1b[0m File changed: ${path.relative(
                  __dirname,
                  filePath,
                )}`,
              );

              // Safely tell Vite's Hot Module Replacement to refresh the current page
              server.ws.send({
                type: "full-reload",
              });
            }
          });
        },
      },
    },
  ],

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
