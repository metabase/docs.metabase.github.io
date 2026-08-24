export const DOCS_SRC_ROOT = "_docs";

export const DOCS_LATEST_ROOT = import.meta.env.METABASE_REPO_PATH
  ? `${import.meta.env.METABASE_REPO_PATH}/docs`
  : `${DOCS_SRC_ROOT}/latest`;

export const UNIFY_ENABLED_PAGES = [
  "/docs/latest/embedding/modular-embedding",
  "/docs/latest/embedding/sdk/quickstart-with-sample-app",
  "/docs/latest/embedding/sdk/quickstart-cli",
  "/docs/latest/embedding/full-app-embedding-quick-start-guide",
];
