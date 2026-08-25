import path from "node:path";
import { fileURLToPath } from "node:url";
import { DOCS_SRC_ROOT } from "../../../constants";
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

      const absPath = fileURLToPath(new URL(decodeURI(rawSrc), ctx.fileURL));
      const relPath = path.relative(DOCS_SRC_ROOT, absPath);
      if (relPath.startsWith("..") || path.isAbsolute(relPath)) return;

      const newSrc = `/docs/${relPath.split(path.sep).map(encodeURIComponent).join("/")}`;
      ctx.setProperty(node, "src", newSrc);
    },
  },
});
