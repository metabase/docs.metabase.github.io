import path from "node:path";
import { fileURLToPath } from "node:url";
import { DOCS_SRC_ROOT } from "@/constants";
import { defineHastPlugin } from "satteri";

// Resolves relative images from docs md files.
// The images themselves are copied via viteStaticCopy in astro.config.mjs.

export const relativeImagePlugin = defineHastPlugin({
  name: "relative-image-resolver",
  element: {
    filter: ["img"],
    visit(node, ctx) {
      const rawSrc = node.properties?.src;
      if (typeof rawSrc !== "string" || rawSrc === "") return;
      // Absolute site paths, absolute URLs, and data: URIs need no rewriting.
      if (rawSrc.startsWith("/") || URL.canParse(rawSrc)) return;
      if (!ctx.fileURL) return;

      // Old-version docs are fetched on demand from docs.metabase.github.io
      // (see [version]/[...slug].astro) and were never checked out under
      // DOCS_SRC_ROOT, so a relative image resolves to a real, fetchable URL
      // in that repo rather than a locally copied asset.
      if (ctx.fileURL.protocol !== "file:") {
        const newSrc = new URL(decodeURI(rawSrc), ctx.fileURL).href;
        ctx.setProperty(node, "src", newSrc);
        return;
      }

      const absPath = fileURLToPath(new URL(decodeURI(rawSrc), ctx.fileURL));
      const relPath = path.relative(DOCS_SRC_ROOT, absPath);
      if (relPath.startsWith("..") || path.isAbsolute(relPath)) return;

      const version = ctx.data.astro?.frontmatter?.version ?? "latest";
      const newSrc = `/docs/${version}/${relPath.split(path.sep).map(encodeURIComponent).join("/")}`;
      console.log('newSrc:', newSrc)
      ctx.setProperty(node, "src", newSrc);
    },
  },
});
