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
