// Canonical default input locations + AWS region for the redirect CLIs. Kept in one place
// so renaming an input file or changing the region is a single edit instead of a hunt
// across every bin/ script.

// AWS region hosting the docs distribution, KeyValueStore, and Amplify app.
export const REGION = "us-east-1";

// Hand-authored version-banded redirect rules.
export const MANUAL_RULES = "conditional-redirects.json";
// Rules derived from `redirect_from` frontmatter by generate-redirects.
export const GENERATED_RULES = "generated-redirects.json";
// Jekyll config declaring `available_versions` + `docs_version`.
export const VERSIONS_CONFIG = "_config.yml";
// Docs collection scanned for `redirect_from` frontmatter.
export const DOCS_DIR = "_docs";
// Amplify custom rewrite/redirect rules.
export const AMPLIFY_RULES = "redirects.json";
