import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import glob from "glob";
import matter from "gray-matter";
import type { Loader } from "astro/loaders";
import { DOCS_SRC_ROOT } from "@/constants";

// Astro's built-in glob() loader only parses frontmatter/body for
// markdown-family files, so the TypeDoc-generated SDK API reference pages
// and per-version api.html ToC pages under _docs (raw, standalone HTML
// documents with the same frontmatter shape as the .md docs) need their own
// loader. Unlike the `docs` collection's ids, these ids KEEP the `.html`
// extension, since that's what identifies the source file on disk. The
// `.html` is stripped back off when resolving the doc's URL (see
// `resolveDocUrl`) — `build.format: "file"` always appends its own `.html`
// suffix to the output filename, so leaving it in the slug would double it
// up (`api.html.html`).
export const docsHtmlLoader = (): Loader => ({
  name: "docs-html-loader",
  load: async ({ config, store, parseData, generateDigest, logger }) => {
    store.clear();

    const base = new URL(`${DOCS_SRC_ROOT}/`, config.root);
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
      const id = entry;

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
});
