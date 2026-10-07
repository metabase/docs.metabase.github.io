// The Markdown version of each doc page in a supported version, at the page's
// URL plus `.md` (see `toMarkdownUrl`). The "Copy as Markdown" button fetches
// it, the page's <head> links it (`rel="alternate"`), and it's there for
// anything that would rather read Markdown than HTML. Front matter up top says
// what the page is and where its HTML lives (markdownFrontMatter.ts).
import path from "node:path";
import { pathToFileURL } from "node:url";
import { absolutizeMarkdownUrls } from "@/lib/docs/absolutizeMarkdownUrls";
import { getDocDescription, type MarkdownDoc } from "@/lib/docs/docPages";
import { toFrontMatter } from "@/lib/docs/markdownFrontMatter";
import { renderDocLiquid } from "@/lib/docs/renderDocLiquid";
import { hasMarkdownVersion, resolveDocUrl } from "@/lib/docs/resolveDoc";
import { toVersionLabel } from "@/lib/docs/versionSupport";
import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";

type Props = { doc: MarkdownDoc };

export const getStaticPaths: GetStaticPaths = async () => {
  const docs = await getCollection("docs");

  return docs.flatMap((doc) => {
    // Always keep the trailing index, in dev too: `/docs/latest/index.md`.
    const { version, slug } = resolveDocUrl({
      id: doc.id,
      includeTrailingIndex: true,
    });
    // `_docs/index.md` is only a redirect to /docs/latest/.
    if (!slug || !hasMarkdownVersion(version)) return [];
    return { params: { version, slug }, props: { doc } };
  });
};

export const GET: APIRoute = async ({ params, props, site }) => {
  const { doc } = props as Props;
  const {
    doc: resolved,
    page,
    body,
  } = await renderDocLiquid({
    doc,
    version: params.version!,
    output: "markdown",
  });
  const pageUrl = new URL(page.url, site);

  const frontMatter = toFrontMatter({
    title: page.title,
    description: await getDocDescription(
      page,
      pathToFileURL(path.resolve(resolved.filePath!)),
    ),
    url: pageUrl.href,
    version: toVersionLabel(page.version),
  });

  return new Response(
    `${frontMatter}${absolutizeMarkdownUrls(body, pageUrl).trim()}\n`,
    { headers: { "Content-Type": "text/markdown; charset=utf-8" } },
  );
};
