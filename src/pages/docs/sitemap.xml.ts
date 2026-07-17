import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const SITE_URL = "https://www.metabase.com";

const escapeXml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const GET: APIRoute = async () => {
  const docs = await getCollection(
    "docs",
    (doc) => doc.id === "latest" || doc.id.startsWith("latest/"),
  );

  const paths = docs
    .map((doc) => {
      const slug = doc.id.slice("latest".length).replace(/^\//, "");
      return slug ? `/docs/latest/${slug}` : "/docs/latest";
    })
    .sort();

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <url>\n    <loc>${escapeXml(`${SITE_URL}${path}`)}</loc>\n  </url>`).join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
};
