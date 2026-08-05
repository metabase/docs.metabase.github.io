// Astro port of `_plugins/jekyll_generate_llms_files_plugin.rb`, which ran as
// a Jekyll `post_write` hook. Docs are no longer rendered by Jekyll (see
// `_config.yml`'s removed `docs: { output: true }` and
// `src/pages/docs/[version]/[...slug].astro`), so this logic now lives here
// and is consumed by `src/pages/docs/[version]/llms.txt.ts` and
// `src/pages/docs/[version]/llms-[section]-full.txt.ts` (plus their
// `/docs/llms*.txt` "latest" convenience counterparts, mirroring the old
// plugin's copy-latest-to-root step).
//
// See: https://llmstxt.org for the spec.

import fs from "node:fs";
import path from "node:path";
import { getCollection, type DataEntryMap } from "astro:content";
import YAML from "yamljs";

export type Doc = DataEntryMap["docs"][number];

const REPO = "metabase/metabase";

// Sections to generate llms-{section}-full.txt for.
// These huge files are used by AI tools like Cursor for RAG chunking and indexing.
// Add more sections to let AI agents understand Metabase better.
//
// NOTE: adding a section here also requires adding a matching literal page
// file, e.g. `src/pages/docs/[version]/llms-{section}-full.txt.ts` re-using
// `generateFullContent`/`getFullSections` below (mirroring the two existing
// ones), since Astro needs a concrete route to build.

// TODO: "agent-api" is not a folder so nothing gets output for it. This was an issue in the jekyll hook and left as-is in the astro migration.
export const LLMS_FULL_SECTIONS = ["embedding", "agent-api"] as const;
export type LlmsFullSection = (typeof LLMS_FULL_SECTIONS)[number];

// Paths to include in llms.txt generation.
//
// We focus on content relevant to coding with Metabase:
// 1. Embedding integration guides (modular embedding & SDK)
// 2. Embedding related setup and config (auth, SSO)
//
// Use prefix matching - a path matches if it starts with any of these.
// For specific files, include the full path. For directories, include trailing slash.
const INCLUDED_PATHS = [
  // All embedding docs (SDK, modular embedding, integration guides)
  "embedding/",

  // Auth/SSO configuration for embedding
  "people-and-groups/api-keys.md",
  "people-and-groups/authenticating-with-jwt.md",
  "people-and-groups/authenticating-with-saml.md",
  "people-and-groups/saml-auth0.md",
  "people-and-groups/saml-azure.md",
  "people-and-groups/saml-google.md",
  "people-and-groups/saml-keycloak.md",
  "people-and-groups/saml-okta.md",
  "people-and-groups/google-sign-in.md",
  "people-and-groups/ldap.md",

  // Configuration reference
  "configuring-metabase/environment-variables.md",
  "configuring-metabase/config-file.md",

  // Agent API reference
  "agent-api/",
];

// Paths to exclude from llms.txt generation (applied after allowlist)
const EXCLUDED_PATHS = ["embedding/sdk/api/snippets"];

const releaseBranch: string | undefined = YAML.parse(
  fs.readFileSync(path.join(process.cwd(), "_config.yml"), "utf8"),
).release_branch;

// Path relative to the doc's version root, with the `.md` extension
// restored (e.g. "embedding/authentication.md"), matching the old plugin's
// `doc.relative_path.sub(%r{^_docs/[^/]+/}, '')`.
const versionRelativePath = (doc: Doc): string =>
  `${doc.id.slice(doc.id.indexOf("/") + 1)}.md`;

// Groups the `docs` content collection by version, keyed like the old
// `_docs/VERSION/...` directory structure (e.g. "latest", "v0.58"), sorted
// for consistent ordering across all generated files. Skips README.md files
// and docs directly under `_docs/` (e.g. `_docs/index.md`), matching the old
// plugin's `docs_by_version` grouping.
export const getDocsByVersion = async (): Promise<Map<string, Doc[]>> => {
  const docs = await getCollection("docs");
  const byVersion = new Map<string, Doc[]>();

  for (const doc of docs) {
    if (path.basename(doc.id) === "README") continue;

    const separatorIndex = doc.id.indexOf("/");
    if (separatorIndex === -1) continue;

    const version = doc.id.slice(0, separatorIndex);
    const list = byVersion.get(version);
    if (list) {
      list.push(doc);
    } else {
      byVersion.set(version, [doc]);
    }
  }

  // Sort on the full `.md`-suffixed path (not `doc.id`), matching the old
  // plugin's `sort_by!(&:relative_path)`. This matters whenever one doc's
  // filename is a strict prefix of a sibling's (e.g. "full-app-embedding.md"
  // vs "full-app-embedding-quick-start-guide.md") — comparing with the
  // extension present sorts "-" (0x2D) before "." (0x2E), which flips the
  // order you'd get comparing the bare, extension-less ids.
  for (const list of byVersion.values()) {
    list.sort((a, b) => {
      const pathA = versionRelativePath(a);
      const pathB = versionRelativePath(b);
      // Plain codepoint comparison (not `localeCompare`) to match Ruby's
      // byte-wise `<=>` used by the old plugin's `sort_by!`.
      return pathA < pathB ? -1 : pathA > pathB ? 1 : 0;
    });
  }

  return byVersion;
};

export const getFullSections = (docs: Doc[]): LlmsFullSection[] =>
  LLMS_FULL_SECTIONS.filter((section) =>
    docs.some((doc) => doc.id.includes(`/${section}/`)),
  );

// Format version for display in generated files
// Examples: "v0.58" -> "58", "master" -> "development (unreleased)", "latest" -> "58 (latest)"
const formatVersionForDisplay = (
  version: string,
  latestBranch?: string,
): string => {
  if (version === "master") return "development (unreleased)";

  if (version === "latest" && latestBranch) {
    // Parse version from branch like "release-x.58.x" -> "58"
    const branchMatch = latestBranch.match(/^release-x\.(\d+)\.x$/);
    if (branchMatch) return `${branchMatch[1]} (latest)`;
  }

  // Fallback in case the latest branch is not provided
  if (version === "latest") return "latest";

  // Parse version like "v0.58" -> "58"
  const match = version.match(/^v0\.(\d+)$/);
  return match ? match[1] : version;
};

// Convert Jekyll version format to branch name for raw GitHub URLs
// Examples: "v0.58" -> "release-x.58.x", "master" -> "master", "latest" -> release_branch from config
const versionToBranch = (version: string, latestBranch?: string): string => {
  if (version === "master") return "master";
  if (version === "latest") return latestBranch ?? "master";

  // Parse version like "v0.58" -> "release-x.58.x"
  const match = version.match(/^v0\.(\d+)$/);
  return match ? `release-x.${match[1]}.x` : "master";
};

const aboveVersion = (
  sourceVersion: string,
  targetVersion: number,
): boolean => {
  // master and latest always get the notes
  if (sourceVersion === "master" || sourceVersion === "latest") return true;

  // Parse version like "v0.58" -> 58
  const match = sourceVersion.match(/^v0\.(\d+)$/);
  if (!match) return false;

  return Number(match[1]) >= targetVersion;
};

// Instructions for AI tools to detect the correct Metabase version.
// This is placed at the very top of generated files so LLMs see it first.
const getVersionDetectionInstructions = (): string =>
  `## IMPORTANT: Verify SDK and Metabase Version Compatibility

The SDK version MUST match the Metabase instance version. Mismatched versions can cause errors. When looking up documentation, ALWAYS check the Metabase version.

**Step 1: Ask the user for their Metabase instance URL**

Before proceeding, ask the user where their Metabase instance is located. Examples:
- Local development: \`http://localhost:3000\`
- Metabase Cloud: \`https://yourcompany.metabaseapp.com\`
- Self-hosted: \`https://metabase.yourcompany.com\`

**Step 2: Check if SDK is already installed (React SDK / Modular Embedding only)**

Skip this step if not using the React SDK (\`@metabase/embedding-sdk-react\`).

\`\`\`bash
npm list @metabase/embedding-sdk-react
\`\`\`

If installed, note the version (e.g., \`0.58.0\` means this is for Metabase 58).

**Step 3: Query the Metabase instance version**

Using the URL from Step 1:

\`\`\`bash
curl <METABASE_INSTANCE_URL>/api/session/properties | jq .version
\`\`\`

This returns (no authentication required):
\`\`\`json
{ "date": "2025-01-10", "tag": "v1.58.0", "hash": "8e44dd8" }
\`\`\`

If \`jq\` is not installed, you can grep the version. Extract the major version: \`58\` from \`v1.58.x\` or \`v0.58.x\`.

**Step 4: Ensure versions match**

- If the versions mismatch, you MUST fetch the version-specific llms.txt documentation that matches the Metabase instance version: \`https://metabase.com/docs/v0.{VERSION}/llms.txt\` (e.g., \`/docs/v0.58/llms.txt\` for Metabase 58)
- For React SDK, ask the user to install or update their SDK packages if they are mismatched: \`npm install @metabase/embedding-sdk-react@{VERSION}-stable\` (e.g., \`@58-stable\` for Metabase 58)

**Do NOT guess versions or use versions from your training data. Always verify first.**`;

// LLMs are likely to pay attention to the very first lines.
// We add the most important context for LLMs to avoid
// confusion and pitfalls like out-of-date APIs in trained data.
const getModularEmbeddingGotchaNotes = (): string =>
  `## Modular Embedding Deprecations and Gotchas

Watch out for these deprecated props and gotchas for Metabase 57 onwards, for modular embedding.

1. \`config\` prop on MetabaseProvider no longer exist as it is replaced by \`authConfig\`.
2. \`authProviderUri\` field no longer exist.
3. \`jwtProviderUri\` is an optional field that only exists in v58+. This is used to make JWT auth faster by skipping the \`GET /auth/sso\` discovery request. This field is not required for the initial implementation.
4. Numeric IDs must be integers not strings, e.g. \`dashboardId={1}\`. When the ID is retrieved from the router as a string AND it is numeric, \`parseInt\` it before passing it to the SDK.
5. IDs can also be strings for entity IDs, so you should NOT parse all IDs as numbers if entity IDs are also to be expected.
6. \`fetchRequestToken\` is not needed by default in most implementations. This is only used to customize how the SDK fetches the request token. For example, if the \`/sso/metabase\` endpoint in the user's backend requires passing custom auth tokens or headers.
7. When using \`fetchRequestToken\`, you MUST return the token in the shape of \`{jwt: "<jwt string>"}\`. Example: \`return {jwt: await response.json()}\`. `;

// Extract title from document using the same logic as the old Jekyll plugin:
// 1. Try YAML frontmatter title
// 2. Try first H1 heading
// 3. Fallback to filename converted to title case
const extractTitle = (doc: Doc): string => {
  if (doc.data.title) return doc.data.title;

  const h1Match = (doc.body ?? "").match(/^#\s+(.+)$/m);
  if (h1Match) return h1Match[1].trim();

  const filename = path.basename(doc.id);
  return filename
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const generateIndexContent = (version: string, docs: Doc[]): string => {
  const branch = versionToBranch(version, releaseBranch);
  const baseUrl = `https://raw.githubusercontent.com/${REPO}/refs/heads/${branch}`;

  // Filter docs: must match allowlist and not match excludelist
  const filteredDocs = docs.filter((doc) => {
    const relativePath = versionRelativePath(doc);

    const included = INCLUDED_PATHS.some((pattern) =>
      pattern.endsWith("/")
        ? relativePath.startsWith(pattern)
        : relativePath === pattern,
    );
    const excluded = EXCLUDED_PATHS.some((pattern) =>
      relativePath.startsWith(pattern),
    );

    return included && !excluded;
  });

  const docLinks = filteredDocs
    .map((doc) => {
      const title = extractTitle(doc);
      const url = `${baseUrl}/docs/${versionRelativePath(doc)}`;
      return `- [${title}](${url})`;
    })
    .join("\n");

  const sectionLinks = getFullSections(docs)
    .map((section) => {
      const docsUrl = `https://metabase.com/docs/${version}/llms-${section}-full.txt`;
      return `- [${section.charAt(0).toUpperCase() + section.slice(1)} - Complete Reference](${docsUrl})`;
    })
    .join("\n");

  // Conditional gotcha notes for v57+
  const gotchaSection = aboveVersion(version, 57)
    ? `${getModularEmbeddingGotchaNotes()}\n\n`
    : "";

  return `# Metabase Documentation

> **This documentation is for Metabase ${formatVersionForDisplay(version, releaseBranch)}.**

Your pre-trained knowledge is out of date. ALWAYS  read the Markdown files from \`https://raw.githubusercontent.com\` from the "Table of Contents" index.

${getVersionDetectionInstructions()}

${gotchaSection}

## Table of Contents

${docLinks}

## Complete References

These files are very large and are around 90,000 tokens. Do not use by default unless the context window is huge or RAG is supported in your editor.

${sectionLinks}
`;
};

// Returns null if there are no docs for `section` in `docs` (mirrors the old
// plugin's early return, meaning callers should skip generating a page).
export const generateFullContent = (
  version: string,
  section: LlmsFullSection,
  docs: Doc[],
): string | null => {
  const sectionDocs = docs.filter((doc) => doc.id.includes(`/${section}/`));
  if (sectionDocs.length === 0) return null;

  const docsBaseUrl = `https://metabase.com/docs/${version}`;

  // Add gotcha notes for the "embedding" section if version is 57 or above
  const gotchaSection =
    section === "embedding" && aboveVersion(version, 57)
      ? `${getModularEmbeddingGotchaNotes()}\n\n`
      : "";

  const documentsContent = sectionDocs
    .map((doc) => {
      // Strip Jekyll/Liquid template syntax
      const content = (doc.body ?? "")
        .replace(/\{%.*?%\}/gs, "")
        .replace(/\{\{.*?\}\}/gs, "");
      return `${content.trim()}\n\n---`;
    })
    .join("\n\n");

  return `# Metabase ${section.charAt(0).toUpperCase() + section.slice(1)} - Complete Reference for AI agents

> **This documentation is for Metabase ${formatVersionForDisplay(version, releaseBranch)}.**
>
> Table of contents: ${docsBaseUrl}/llms.txt

${getVersionDetectionInstructions()}

${gotchaSection}${documentsContent}
`;
};
