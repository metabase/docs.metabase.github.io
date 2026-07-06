import { pathToFileURL } from "node:url";
import path from "node:path";
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import type { Loader } from "astro/loaders";
import { renderDocsLiquid } from "./lib/docs-liquid";

const globLoader = glob({
  // Same exclusion as Jekyll's `exclude` for SDK API snippets
  pattern: ["**/*.md", "!**/embedding/sdk/api/snippets/**"],
  base: "./_docs",
  // Jekyll's :path placeholder is the file path verbatim (minus extension),
  // not slugified — so skip Astro's default slugification for URL parity.
  generateId: ({ entry }) => entry.replace(/\.md$/, ""),
});

// Wraps the glob loader to run Liquid over each entry's markdown before it
// is parsed — the same processing order as Jekyll. The __liquidRendered flag
// keeps already-processed bodies from being run through Liquid a second time
// when the persisted data store carries entries across builds (a second pass
// would mangle {% raw %} content that legitimately contains {{...}}).
const docsLoader: Loader = {
  name: "docs-jekyll-liquid",
  load: async (ctx) => {
    await globLoader.load(ctx);
    let failed = 0;
    for (const entry of ctx.store.values()) {
      if (!entry.body || !entry.filePath || entry.data.__liquidRendered) {
        continue;
      }
      const data = { ...entry.data, __liquidRendered: true };
      try {
        const body = await renderDocsLiquid(entry.body, entry.filePath, entry.data);
        // The glob loader renders markdown eagerly at load time, so the
        // pre-liquid HTML is already baked into entry.rendered — re-render
        // from the liquid-processed body (same pipeline, incl. image refs).
        const rendered = await ctx.renderMarkdown(body, {
          fileURL: pathToFileURL(path.resolve(entry.filePath)),
        });
        // store.set() silently drops writes whose digest matches the existing
        // entry — delete first so the update lands while keeping the digest
        // (which the glob loader needs for incremental skips) intact.
        ctx.store.delete(entry.id);
        ctx.store.set({
          ...entry,
          body,
          rendered,
          assetImports: rendered.metadata?.imagePaths,
          data,
        });
      } catch (e) {
        failed++;
        ctx.logger.warn(
          `Liquid failed for ${entry.id} (left unprocessed): ${(e as Error).message}`
        );
        ctx.store.delete(entry.id);
        ctx.store.set({ ...entry, data });
      }
    }
    if (failed > 0) {
      ctx.logger.warn(`Liquid rendering failed for ${failed} docs`);
    }
  },
};

const docs = defineCollection({ loader: docsLoader });

export const collections = { docs };
