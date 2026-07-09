import fs from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";
import { load as loadYaml } from "js-yaml";
import { satteri } from "@astrojs/markdown-satteri";
import { renderDocsLiquid } from "./docs-liquid";
import {
  jekyllInlineCodePlugin,
  jekyllAttributeListPlugin,
  localDocImagePlugin,
} from "./markdown-plugins";
import { METABASE_ROOT } from "./metabase-paths";

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

// Shared with astro.config.mjs so the on-demand renderer below and Astro's
// own markdown handling stay configured identically from one definition.
export const shikiConfig = {
  // Light theme to match the live docs (white code blocks with a soft shadow).
  theme: "github-light",
  wrap: true,
} as const;

export const docsMarkdownProcessor = satteri({
  hastPlugins: [jekyllInlineCodePlugin, jekyllAttributeListPlugin, localDocImagePlugin],
});

let rendererPromise: ReturnType<typeof docsMarkdownProcessor.createRenderer> | undefined;
function getRenderer() {
  rendererPromise ??= docsMarkdownProcessor.createRenderer({ shikiConfig });
  return rendererPromise;
}

// "v0.63" -> "release-x.63.x"
// TODO: This could be more robust
const versionToReleaseBranch = (version: string) => {
  return `release-x.${version.split('.')[1]}.x`
}

// Reads a _docs entry straight off disk, bypassing astro:content's
// getCollection/getEntry entirely. Those read from a module-level singleton
// (globalDataStore in astro/dist/content/data-store.js) that's loaded once
// and cached for the life of the dev process — a different object from the
// mutable store the loader's file-watcher updates, and it doesn't reliably
// pick up edits without a full server restart. Reading the file ourselves,
// fresh, on every call sidesteps that cache entirely.
function readDocSource(version: string, slug: string) {
  const subdir = version === 'latest' ? "docs" : `__worktrees_docs/${versionToReleaseBranch(version)}/docs`
  const filePath = path.join(METABASE_ROOT, subdir, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const fmMatch = FRONTMATTER_RE.exec(raw);
  const data = (fmMatch ? loadYaml(fmMatch[1]) : {}) as Record<string, unknown>;
  const body = fmMatch ? raw.slice(fmMatch[0].length) : raw;
  return { data, body, filePath };
}

// _docs pages run Liquid + Markdown here, at page-render time, rather than
// eagerly for all ~9,800 files during content-collection sync (which is what
// a wrapped loader in content.config.ts used to do). Doing it on demand means
// only the page actually being requested pays the cost — dev builds start
// fast, and editing a _docs file is picked up on the next request with no
// dev-server restart, since there's no separate "already processed" cache to
// go stale (see readDocSource above for why we read the file ourselves
// instead of going through astro:content for this part).
export async function renderDoc(doc: {}) {
  const liquidBody = await renderDocsLiquid(doc.body, doc.filePath, doc.data);
  const renderer = await getRenderer();
  const { code, metadata } = await renderer.render(liquidBody, {
    fileURL: pathToFileURL(path.resolve(doc.filePath)),
  });
  return { html: code };
}
