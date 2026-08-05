import {
  generateIndexContent,
  getDocsByVersion,
  type Doc,
} from "@/lib/docs/llmsTxt";
import type { APIRoute, GetStaticPaths } from "astro";

export const getStaticPaths: GetStaticPaths = async () => {
  const docsByVersion = await getDocsByVersion();
  return [...docsByVersion.entries()].map(([version, docs]) => ({
    params: { version },
    props: { docs },
  }));
};

export const GET: APIRoute = async ({ params, props }) => {
  const { docs } = props as { docs: Doc[] };
  return new Response(generateIndexContent(params.version!, docs), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
