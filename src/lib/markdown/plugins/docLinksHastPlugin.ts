import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineHastPlugin } from "satteri";
import { DOCS_SRC_ROOT, DOCS_VERSION } from "../../../constants";
import { rewriteDocUrl } from "../../docs/rewriteDocLinks";

// Makes `.md` and `.mdx` docs' links resolve on this site (see rewriteDocUrl).
// Runs on parsed links, so links in code and raw HTML are left alone.

const ROOT_ABS = path.resolve(DOCS_SRC_ROOT);

// Docs live at `<version>/<slug>` under DOCS_SRC_ROOT, except when building
// from a local metabase repo, where the docs dir *is* the one version.
const versionOf = (filePath: string) =>
  DOCS_VERSION ?? path.relative(ROOT_ABS, filePath).split(path.sep)[0];

// TODO: (Grey area) bare metabase.com URLs are now rewritten. Figure out if this is desirable.
// The previous regex method skipped these links because it couldn't detect them,
// not because anyone decided they should stay absolute.
// The plugin handles every link the same way regardless of how it was written.

// TODO: Now that md doc rewriting moved here, HtmlDoc only needs rewriteDocLinks's
// version pinning. Its markdown-link regexes can be deleted.

export const docLinksHastPlugin = defineHastPlugin({
  name: "doc-links",
  element: {
    filter: ["a"],
    visit(node, ctx) {
      const href = node.properties?.href;
      if (typeof href !== "string" || href === "") return;
      if (!ctx.fileURL) return;

      const version = versionOf(fileURLToPath(ctx.fileURL));
      ctx.setProperty(
        node,
        "href",
        rewriteDocUrl(href, { version, latest: version === "latest" }),
      );
    },
  },
});
