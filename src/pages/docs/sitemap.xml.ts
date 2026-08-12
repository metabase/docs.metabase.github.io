import { resolveDocUrl } from "@/lib/docs/resolveDoc";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const SITE_URL = import.meta.env.SITE;

const isLatest = ({ id }: { id: string }) =>
  id === "latest" || id.startsWith("latest/");

export const GET: APIRoute = async () => {
  const [docs, docsHtml] = await Promise.all([
    getCollection("docs", isLatest),
    getCollection("docsHtml", isLatest),
  ]);

  const paths = [...docs, ...docsHtml]
    .map(
      (doc) => resolveDocUrl({ id: doc.id, permalink: doc.data.permalink }).url,
    )
    .sort();

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <url>\n    <loc>${`${SITE_URL}${path}`}</loc>\n  </url>`).join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
};
