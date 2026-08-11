import {
  generateFullContent,
  getDocsByVersion,
  getFullSections,
  type Doc,
  type LlmsFullSection,
} from "@/lib/docs/llmsTxt";
import type { APIRoute, GetStaticPaths } from "astro";

export const getStaticPaths: GetStaticPaths = async () => {
  const docsByVersion = await getDocsByVersion();
  const docs = docsByVersion.get("latest") ?? [];
  return getFullSections(docs).map((section) => ({
    params: { section },
    props: { docs },
  }));
};

export const GET: APIRoute = async ({ params, props }) => {
  const { docs } = props as { docs: Doc[] };
  const content = generateFullContent(
    "latest",
    params.section as LlmsFullSection,
    docs,
  )!;
  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
