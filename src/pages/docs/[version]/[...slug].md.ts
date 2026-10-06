// The Markdown version of each doc page in a supported version, at the page's
// URL plus `.md` (see `toMarkdownUrl`). The "Copy Markdown" button fetches it,
// and it's there for anything that would rather read Markdown than HTML.
import { absolutizeMarkdownUrls } from "@/lib/docs/absolutizeMarkdownUrls";
import type { MarkdownDoc } from "@/lib/docs/docPages";
import { renderDocLiquid } from "@/lib/docs/renderDocLiquid";
import { hasMarkdownVersion, resolveDocUrl } from "@/lib/docs/resolveDoc";
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
  const { page, body } = await renderDocLiquid({
    doc,
    version: params.version!,
    output: "markdown",
  });

  return new Response(
    `${absolutizeMarkdownUrls(body, new URL(page.url, site)).trim()}\n`,
    { headers: { "Content-Type": "text/markdown; charset=utf-8" } },
  );
};
