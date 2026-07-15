import fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";
import type { APIRoute, GetStaticPaths } from "astro";

// TODO: Would be nice if this didn't blindly copy everything, just copied over what's needed

const ROOT = process.cwd();

// Serves images referenced by _docs markdown files relative to their own
// location (e.g. `dashboards/actions.md` linking `./images/foo.png`). The
// localImagePlugin hast plugin (src/lib/markdown-plugins.ts) rewrites
// those relative links to `/docs/assets/<path relative to ROOT>`
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

export const getStaticPaths: GetStaticPaths = () => {
  const roots = [path.join(ROOT, "_docs")];
  const images = roots.flatMap((root) => walkImages(root));
  return images.map((absPath) => ({
    params: { path: path.relative(ROOT, absPath).split(path.sep).join("/") },
  }));
};

export const GET: APIRoute = async ({ params }) => {
  const relPath = params.path;
  if (!relPath) return new Response("Not found", { status: 404 });

  const ext = path.extname(relPath).toLowerCase();
  const mimeType = MIME_TYPES[ext];
  if (!mimeType) return new Response("Not found", { status: 404 });

  const absPath = path.resolve(ROOT, relPath);
  if (absPath !== ROOT && !absPath.startsWith(ROOT + path.sep)) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const data = await fsPromises.readFile(absPath);
    return new Response(data, {
      headers: {
        "Content-Type": mimeType,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
};
