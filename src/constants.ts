import { loadEnv } from "vite";

// loadEnv() (rather than import.meta.env) so this resolves the same way here
// and in astro.config.mjs, which runs outside Vite's SSR pipeline and can't
// see import.meta.env values.
const env = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");

export const METABASE_REPO_PATH = env.METABASE_REPO_PATH;

export const DOCS_SRC_ROOT = METABASE_REPO_PATH
  ? `${METABASE_REPO_PATH}/docs`
  : "_docs";

// Only build/watch/serve/etc /docs/latest when pointing at a local metabase repo.
// When previewing those changes, there's very unlikely ever a need to preview old versions at the same time.
// And it's much simpler and faster if the source of truth is EITHER a local metabase repo OR the committed _docs files,
// not an odd mix of both.
export const DOCS_VERSION = METABASE_REPO_PATH ? "latest" : null;

export const DOCS_DEST = DOCS_VERSION ? `docs/${DOCS_VERSION}` : "docs";

export const UNIFY_ENABLED_PAGES = [
  "/docs/latest/embedding/sdk/quickstart",
  "/docs/latest/embedding/full-app-embedding-quick-start-guide",
];
