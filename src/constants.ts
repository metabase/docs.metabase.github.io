import { loadEnv } from "vite";

export const DOCS_SRC_ROOT = "_docs";

// loadEnv() (rather than import.meta.env) so this resolves the same way here
// and in astro.config.mjs, which runs outside Vite's SSR pipeline and can't
// see import.meta.env values.
const env = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");

export const DOCS_LATEST_ROOT = env.METABASE_REPO_PATH
  ? `${env.METABASE_REPO_PATH}/docs`
  : `${DOCS_SRC_ROOT}/latest`;

export const UNIFY_ENABLED_PAGES = [
  "/docs/latest/embedding/modular-embedding",
  "/docs/latest/embedding/sdk/quickstart-with-sample-app",
  "/docs/latest/embedding/sdk/quickstart-cli",
  "/docs/latest/embedding/full-app-embedding-quick-start-guide",
];
