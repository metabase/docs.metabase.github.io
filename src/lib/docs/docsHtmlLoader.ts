import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DOCS_SRC_ROOT } from "@/constants";
import type { Loader } from "astro/loaders";
import glob from "glob";
import matter from "gray-matter";

// Astro's built-in glob() loader only parses frontmatter and body content for
// *markdown* files, but our docs root also contains HTML files (TypeDoc-generated
// SDK API reference pages and per-version api.html pages) that use the same
// frontmatter-plus-Liquid conventions as the Markdown docs. This custom loader
// lets us process both file types consistently.
//
// `base` and `generateId` mirror the options of Astro's glob() loader, so
// callers can point this at a local metabase checkout (METABASE_REPO_PATH)
// the same way the `docs` collection does.
export const docsHtmlLoader = (options?: {
  base?: string;
  generateId?: (entry: string) => string;
}): Loader => {
  const baseDirName = options?.base ?? DOCS_SRC_ROOT;
  const generateId = options?.generateId ?? ((entry: string) => entry);

  return {
    name: "docs-html-loader",
    load: async ({ config, store, parseData, generateDigest, logger }) => {
      store.clear();

      const base = new URL(`${baseDirName}/`, config.root);
      const baseDir = fileURLToPath(base);
      const rootDir = fileURLToPath(config.root);
      const entries: string[] = glob.sync("**/*.html", {
        cwd: baseDir,
        ignore: ["**/embedding/sdk/api/snippets/**"],
      });

      for (const entry of entries) {
        const absPath = path.join(baseDir, entry);
        const contents = await fs.readFile(absPath, "utf-8");
        const { data, content: body } = matter(contents);
        const id = generateId(entry);

        const parsedData = await parseData({ id, data, filePath: absPath });
        store.set({
          id,
          data: parsedData,
          body,
          filePath: path.relative(rootDir, absPath).split(path.sep).join("/"),
          digest: generateDigest(contents),
        });
      }

      logger.info(`Loaded ${entries.length} html docs`);
    },
  };
};
