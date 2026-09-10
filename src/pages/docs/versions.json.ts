import type { VersionSupport } from "@/lib/docs/versionSupport";
import { baseCtx } from "@/lib/liquid/liquidRenderer";
import type { APIRoute } from "astro";

const { docs_version, available_versions } = baseCtx.site;
const { version_support } = baseCtx.site.data;

export interface VersionsInfo {
  docs_version: string;
  available_versions: string[];
  version_support: Record<string, VersionSupport>;
}

export const GET: APIRoute = async () => {
  const data: VersionsInfo = {
    docs_version,
    available_versions,
    version_support,
  };
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
};
