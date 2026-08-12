import { generateIndexContent, getDocsByVersion } from "@/lib/docs/llmsTxt";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const docsByVersion = await getDocsByVersion();
  const docs = docsByVersion.get("latest") ?? [];
  return new Response(generateIndexContent("latest", docs), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
