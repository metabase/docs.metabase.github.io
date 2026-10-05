// Shared by the two routes that build doc pages, which split the docs between
// them by layout:
// - `src/pages/docs/[version]/[...slug].astro`: the themed NewDocsLayout, plus
//   the standalone `.html` docs.
// - `src/pages/docs/[version]/[...legacySlug].astro`: the legacy
//   `layout: docs` versions (OldDocsLayout).
//
// They are separate routes because Astro bundles CSS per route by import
// graph, not by what a page renders: one route importing both layouts would
// ship the Tailwind bundle (with its copy of the vendored CSS) to legacy pages
// and Header.astro's unlayered styles to themed ones.
import path from "node:path";
import { pathToFileURL } from "node:url";
import { renderDocLiquid, resolveDocData } from "@/lib/docs/renderDocLiquid";
import { resolveDocUrl } from "@/lib/docs/resolveDoc";
import { getMarkdownRenderer } from "@/lib/markdown/markdownRenderer";
import type { DataEntryMap } from "astro:content";

export type MarkdownDoc = DataEntryMap["docs"][number];

// A doc's route params. For prod builds, we want to output like
// folder/index.html, but for the dev server, the route should exclude /index.
export const toDocParams = (id: string) => {
  const { version, slug } = resolveDocUrl({
    id,
    includeTrailingIndex: import.meta.env.MODE !== "development",
  });
  return { version, slug };
};

export const isLegacyDoc = (doc: MarkdownDoc, version: string): boolean =>
  resolveDocData(doc, version).layout === "docs";

// Liquid, then Markdown to HTML.
export const renderMarkdownDoc = async (doc: MarkdownDoc, version: string) => {
  const {
    doc: resolved,
    page,
    dirname,
    body,
  } = await renderDocLiquid({ doc, version });
  const md = await getMarkdownRenderer();
  const fileURL = pathToFileURL(path.resolve(resolved.filePath!));
  const { code: html } = await md.render(body, { fileURL });

  // The subheading under the title (NewDocsLayout.astro), as inline HTML:
  // summaries can hold inline code.
  const text = page.summary ?? page.description;
  const summary =
    typeof text === "string" && text.trim()
      ? (await md.render(text, { fileURL })).code
          .trim()
          .replace(/^<p>([\s\S]*)<\/p>$/, "$1")
      : undefined;

  return { page: { ...page, content: html }, dirname, html, summary };
};
