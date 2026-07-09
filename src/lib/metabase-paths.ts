import path from "node:path";

// The metabase/metabase checkout that _docs content is read from (see
// readDocSource in render-doc.ts). Shared with markdown-plugins.ts (to
// resolve image paths relative to the source .md file) and the
// docs/_assets route (to serve those images back out), so both sides
// agree on what a rewritten image src is relative to.
export const METABASE_ROOT = path.resolve(process.cwd(), "../metabase");
