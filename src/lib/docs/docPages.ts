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
import { htmlToText, toExcerpt } from "@/lib/docs/plainText";
import { renderDocLiquid, resolveDocData } from "@/lib/docs/renderDocLiquid";
import { resolveDocUrl } from "@/lib/docs/resolveDoc";
import { splitAtTitle } from "@/lib/docs/splitAtTitle";
import { getMarkdownRenderer } from "@/lib/markdown/markdownRenderer";
import type { DataEntryMap } from "astro:content";

export type MarkdownDoc = DataEntryMap["docs"][number];
export type HtmlDoc = DataEntryMap["docsHtml"][number];

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

const nonEmpty = (value: unknown): string | undefined =>
  typeof value === "string" && value.trim() ? value : undefined;

// A front matter string (summary, description) as inline HTML: summaries can
// hold inline code.
const renderInlineMarkdown = async (text: string, fileURL: URL) => {
  const md = await getMarkdownRenderer();
  const { code } = await md.render(text, { fileURL });
  return code.trim().replace(/^<p>([\s\S]*)<\/p>$/, "$1");
};

// What a doc says it's about, as plain text, for meta descriptions and the
// `.md` front matter: its description, else its summary (docs-metadata.html's
// order). Undefined when it has neither.
export const getDocDescription = async (
  page: Record<string, unknown>,
  fileURL: URL,
): Promise<string | undefined> => {
  const text = nonEmpty(page.description) ?? nonEmpty(page.summary);
  return text && htmlToText(await renderInlineMarkdown(text, fileURL));
};

// Liquid, then Markdown to HTML.
export const renderMarkdownDoc = async (doc: MarkdownDoc, version: string) => {
  const { page, dirname, body, fileURL } = await renderDocLiquid({
    doc,
    version,
  });
  const md = await getMarkdownRenderer();
  const { code: html } = await md.render(body, { fileURL });

  // The subheading under the title (NewDocsLayout.astro).
  const text = nonEmpty(page.summary) ?? nonEmpty(page.description);
  const summary = text && (await renderInlineMarkdown(text, fileURL));

  // Most docs have no description, so the meta description falls back to the
  // opening words of the body, past the h1 that repeats the title.
  const meta_description =
    (await getDocDescription(page, fileURL)) ??
    toExcerpt(splitAtTitle(html)[1]);

  return { page: { ...page, meta_description }, dirname, html, summary };
};

// `.html` docs (TypeDoc SDK API reference pages, api.html ToC pages) are
// already complete standalone HTML documents — only Liquid needs to run on
// them (e.g. the embedded-analytics-sdk-metadata include), no markdown
// conversion, and no NewDocsLayout chrome (mirrors the old Jekyll
// `docs-api` layout, which was a bare passthrough).
export const renderHtmlDoc = async (doc: HtmlDoc, version: string) => {
  const { body } = await renderDocLiquid({ doc, version });
  // TypeDoc's standalone HTML is generated upstream with root-relative asset
  // paths. In production, those paths resolve against the marketing site, so
  // keep the generated sources untouched and scope their local assets here.
  return body
    .replaceAll('"/gdpr-cookie-notice/', '"/docs/gdpr-cookie-notice/')
    .replaceAll('"/js/', '"/docs/js/')
    .replaceAll('"/css/', '"/docs/css/');
};
