import type { APIRoute, GetStaticPaths } from "astro";
import fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";
import { METABASE_ROOT } from "../../../lib/metabase-paths";

// Serves images referenced by _docs markdown files relative to their own
// location (e.g. `dashboards/actions.md` linking `./images/foo.png`). The
// localDocImagePlugin hast plugin (src/lib/markdown-plugins.ts) rewrites
// those relative links to `/docs/assets/<path relative to METABASE_ROOT>`
// at render time; this route resolves that path back to a file on disk.
//
// Statically prerendered (getStaticPaths below) rather than served
// on-demand: this project builds to a plain static `_site` (see
// astro.config.mjs — no adapter, no `output: "server"`), so a dynamic route
// with no getStaticPaths simply wouldn't be included in the build. Walking
// the docs image trees is cheap (a few hundred files per version), and
// prerendering means `astro build` writes the actual image bytes into
// `_site/docs/assets/...` — the same mechanism it already uses for the
// ~9,800 rendered doc pages — so deploy artifact steps that just upload
// whatever's in `_site` pick these up with no extra config.
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

function walkImages(dir: string, out: string[] = []): string[] {
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkImages(full, out);
    } else if (MIME_TYPES[path.extname(entry.name).toLowerCase()]) {
      out.push(full);
    }
  }
  return out;
}

// Each previous-version worktree keeps its own docs/ subtree; walk only
// those (not the whole checkout, which also contains source code).
function worktreeDocRoots(): string[] {
  const worktreesDir = path.join(METABASE_ROOT, "__worktrees_docs");
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(worktreesDir, { withFileTypes: true });
  } catch {
    return [];
  }
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(worktreesDir, entry.name, "docs"));
}

export const getStaticPaths: GetStaticPaths = () => {
  const roots = [path.join(METABASE_ROOT, "docs"), ...worktreeDocRoots()];
  const images = roots.flatMap((root) => walkImages(root));
  return images.map((absPath) => ({
    params: { path: path.relative(METABASE_ROOT, absPath).split(path.sep).join("/") },
  }));
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
    const data = await fsPromises.readFile(absPath);
    return new Response(data, {
      headers: { "Content-Type": mimeType, "Cache-Control": "public, max-age=3600" },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
};
