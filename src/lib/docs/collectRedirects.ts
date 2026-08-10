import fs from "node:fs";
import path from "node:path";
import glob from "glob";
import matter from "gray-matter";
import { DOCS_SRC_ROOT } from "../../constants";
import { resolveDocUrl } from "./resolveDoc";

const EXCLUDE = ["**/embedding/sdk/api/snippets/**"];

type ScanTarget = { extension: "md" | "html"; stripExtension: boolean };

const SCAN_TARGETS: ScanTarget[] = [
  { extension: "md", stripExtension: true },
  { extension: "html", stripExtension: false },
];

// Builds a flat { [oldPath]: canonicalUrl } map from every doc's
// `redirect_from` frontmatter, for use as Astro's `redirects` config.
export const collectRedirects = (): Record<string, string> => {
  const redirects: Record<string, string> = {};
  const claimedBy = new Map<string, string>();

  for (const { extension, stripExtension } of SCAN_TARGETS) {
    const base = path.resolve(DOCS_SRC_ROOT);
    const entries: string[] = glob.sync(`**/*.${extension}`, {
      cwd: base,
      ignore: EXCLUDE,
    });

    for (const relPath of entries) {
      const absPath = path.join(base, relPath);
      const { data } = matter(fs.readFileSync(absPath, "utf8"));
      const redirectFrom: string[] | undefined = data.redirect_from;
      if (!redirectFrom?.length) continue;

      const id = stripExtension ? relPath.replace(/\.md$/, "") : relPath;
      const { url } = resolveDocUrl({ id, permalink: data.permalink });

      for (const source of redirectFrom) {
        if (source === url) {
          console.warn(
            `[collectRedirects] ${relPath} redirects to itself; skipping.`,
          );
          continue;
        }

        const existingOwner = claimedBy.get(source);
        if (existingOwner && redirects[source] !== url) {
          console.warn(
            `[collectRedirects] "${source}" is claimed by both ${existingOwner} (-> ${redirects[source]}) and ${relPath} (-> ${url}); keeping the latest.`,
          );
        }
        claimedBy.set(source, relPath);
        redirects[source] = url;
      }
    }
  }

  return redirects;
};
