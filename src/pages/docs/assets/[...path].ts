import type { APIRoute } from "astro";
import fs from "node:fs/promises";
import path from "node:path";
import { METABASE_ROOT } from "../../../lib/metabase-paths";

// Serves images referenced by _docs markdown files relative to their own
// location (e.g. `dashboards/actions.md` linking `./images/foo.png`). The
// localDocImagePlugin hast plugin (src/lib/markdown-plugins.ts) rewrites
// those relative links to `/docs/assets/<path relative to METABASE_ROOT>`
// at render time; this route resolves that path back to a file on disk and
// streams it as-is (no astro:assets optimization — see the
// passthroughImageService comment in astro.config.mjs).
//
// Lives at `docs/assets/...`, not `docs/_assets/...`: Astro excludes any
// path segment starting with `_` from routing (its "private" convention),
// so an `_assets` route would silently never match and fall through to the
// `[version]/[...slug]` catch-all instead.
const MIME_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
};

export const GET: APIRoute = async ({ params }) => {
  const relPath = params.path;
  if (!relPath) return new Response("Not found", { status: 404 });

  const ext = path.extname(relPath).toLowerCase();
  const mimeType = MIME_TYPES[ext];
  if (!mimeType) return new Response("Not found", { status: 404 });

  const absPath = path.resolve(METABASE_ROOT, relPath);
  if (absPath !== METABASE_ROOT && !absPath.startsWith(METABASE_ROOT + path.sep)) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const data = await fs.readFile(absPath);
    return new Response(data, {
      headers: { "Content-Type": mimeType, "Cache-Control": "public, max-age=3600" },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
};
