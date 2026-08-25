import path from "node:path";
import { fileURLToPath } from "node:url";
import { DOCS_LATEST_ROOT, DOCS_SRC_ROOT } from "@/constants";
import { defineHastPlugin } from "satteri";

// Resolves relative images from docs md files.
// The images themselves are copied via viteStaticCopy in astro.config.mjs.

// When METABASE_REPO_PATH is set, DOCS_LATEST_ROOT points outside
// DOCS_SRC_ROOT entirely (at <metabaseRepoPath>/docs), so /latest images
// must be resolved against it separately.
const DOCS_LATEST_ROOT_ABS = path.resolve(DOCS_LATEST_ROOT);

const toSitePath = (relPath: string) =>
  relPath.split(path.sep).map(encodeURIComponent).join("/");

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

      const latestRelPath = path.relative(DOCS_LATEST_ROOT_ABS, absPath);
      if (!latestRelPath.startsWith("..") && !path.isAbsolute(latestRelPath)) {
        ctx.setProperty(node, "src", `/docs/latest/${toSitePath(latestRelPath)}`);
        return;
      }

      const relPath = path.relative(DOCS_SRC_ROOT, absPath);
      if (relPath.startsWith("..") || path.isAbsolute(relPath)) return;

      ctx.setProperty(node, "src", `/docs/${toSitePath(relPath)}`);
    },
  },
});
