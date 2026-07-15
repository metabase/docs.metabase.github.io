import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineHastPlugin } from "satteri";

const ROOT = process.cwd();

// _docs markdown is read straight off disk (see readDocSource in
// render-doc.ts) instead of going through Astro's content-collection/Vite
// pipeline, so the usual astro:assets image handling (which resolves
// relative image paths via static imports) never sees these files. Doc
// images are referenced relative to the source .md file, e.g.
// `dashboards/actions.md` links `./images/foo.png` meaning
// `dashboards/images/foo.png` — this plugin resolves that relative link
// (using ctx.fileURL, the source file's location) against ROOT and
// rewrites it to a URL served by src/pages/docs/assets/[...path].ts, which
// reads the same file straight off disk.
export const localImagePlugin = defineHastPlugin({
  name: "local-image-resolver",
  element: {
    filter: ["img"],
    visit(node, ctx) {
      const rawSrc = node.properties?.src;
      if (typeof rawSrc !== "string" || rawSrc === "") return;
      // Absolute site paths, absolute URLs, and data: URIs need no rewriting.
      if (rawSrc.startsWith("/") || URL.canParse(rawSrc)) return;
      if (!ctx.fileURL) return;

      const absPath = fileURLToPath(new URL(decodeURI(rawSrc), ctx.fileURL));
      const relPath = path.relative(ROOT, absPath);
      if (relPath.startsWith("..") || path.isAbsolute(relPath)) return;

      const newSrc =
        "/docs/assets/" +
        relPath.split(path.sep).map(encodeURIComponent).join("/");
      ctx.setProperty(node, "src", newSrc);
    },
  },
});
