// Generator for the version-conditional /docs redirect table, derived from the
// `redirect_from:` frontmatter that lives in every _docs/**/*.md file. This is the
// data that `jekyll-redirect-from` currently turns into per-version static stub pages;
// we collect it here into version-banded rules so the edge (a CloudFront Function +
// KeyValueStore) can serve the same redirects without baking thousands of stub pages.
//
// Output is an array of rules in the SAME schema as conditional-redirects.json
// ({ source, minVersion, maxVersion?, target } with a `<version>` placeholder), so the
// KVS builder can consume the hand-authored and generated rules through one code path.
//
// Keying model (verified against the tree): a `redirect_from` source always names the
// same version as the file it lives in, so a rule fires for exactly the versions where
// the (source → target) pair appears. Bands are the contiguous runs of those versions
// over _config.yml's ordered `available_versions`; a run that reaches the newest version
// is left open-ended (no maxVersion) so `latest`/`master`/future versions resolve too.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { VERSION_PLACEHOLDER } from "./build-docs-redirect-fn";

// A single (source → target) observation for one concrete version.
export interface RedirectPair {
  version: string; // "v0.62"
  srcPath: string; // version-stripped source, e.g. "administration-guide/ssh-tunnel..."
  tgtPath: string; // version-stripped target, e.g. "databases/ssh-tunnel" ("" = version root)
}

// A rule in conditional-redirects.json's schema (what this generator emits).
export interface GeneratedRule {
  source: string;
  minVersion: string;
  maxVersion?: string;
  target: string;
}

// Split "/docs/v0.62/a/b" into { version: "v0.62", rest: "a/b" }. Returns null for any
// path that is not `/docs/<version>/<something>` (e.g. cross-site `/learn/...` sources,
// which the /docs* edge function does not serve).
export function stripDocsVersion(
  url: string,
): { version: string; rest: string } | null {
  const m = url.match(/^\/docs\/(v\d+\.\d+|latest|master)\/(.*)$/);
  if (!m) return null;
  return { version: m[1], rest: m[2].replace(/\/+$/, "") };
}

// Normalize a `redirect_from` frontmatter value (Jekyll allows a bare string or a list)
// into a list of strings.
export function normalizeRedirectFrom(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.filter((v): v is string => typeof v === "string");
  return [];
}

// Turn a file's on-disk location (relative to _docs) plus its frontmatter into the
// version-stripped target path the redirect should point at. An explicit `permalink`
// wins; otherwise the path is derived from the filename. README/index and any
// `.../index.html` permalink collapse to "" (the version root, served at /docs/<v>/).
export function deriveTargetPath(
  relPath: string,
  frontmatter: Record<string, unknown>,
): string | null {
  const permalink = frontmatter.permalink;
  if (typeof permalink === "string") {
    const stripped = stripDocsVersion(permalink);
    if (!stripped) return null;
    const rest = stripped.rest.replace(/\.html$/, "");
    return rest === "index" ? "" : rest;
  }
  const parts = relPath.split("/");
  const rest = parts.slice(1).join("/").replace(/\.(md|markdown|html)$/, "");
  const base = rest.split("/").pop() ?? "";
  if (base === "README" || base === "index") {
    return rest.split("/").slice(0, -1).join("/");
  }
  return rest;
}

// Walk _docs/<concrete-version>/** and collect every (version, src, target) redirect
// observation. `latest`/`master` are intentionally skipped: `latest` duplicates the
// current release (open-ended bands cover its alias), and `master` is bleeding-edge
// (also covered by open-ended bands).
export function collectPairs(docsDir: string): RedirectPair[] {
  const pairs: RedirectPair[] = [];
  const versionDirs = fs
    .readdirSync(docsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^v\d+\.\d+$/.test(d.name))
    .map((d) => d.name);

  for (const version of versionDirs) {
    const root = path.join(docsDir, version);
    for (const file of walk(root)) {
      if (!/\.(md|markdown|html)$/.test(file)) continue;
      let frontmatter: Record<string, unknown>;
      try {
        frontmatter = matter(fs.readFileSync(file, "utf8")).data;
      } catch {
        continue; // malformed frontmatter — nothing to collect
      }
      const froms = normalizeRedirectFrom(frontmatter.redirect_from);
      if (froms.length === 0) continue;
      const relPath = path.relative(docsDir, file);
      const tgtPath = deriveTargetPath(relPath, frontmatter);
      if (tgtPath === null) continue;
      for (const from of froms) {
        const src = stripDocsVersion(from);
        if (!src || src.version !== version || src.rest === "") continue;
        pairs.push({ version, srcPath: src.rest, tgtPath });
      }
    }
  }
  return pairs;
}

// Group observations into version bands and emit rules. For each source, and within it
// each distinct target, the versions carrying that pair are split into contiguous runs
// over `availableVersions`; each run becomes one rule. A run ending at the newest known
// version is open-ended so aliases and future versions keep resolving.
export function computeBands(
  pairs: RedirectPair[],
  availableVersions: string[],
): GeneratedRule[] {
  const order = new Map(availableVersions.map((v, i) => [v, i]));
  const newest = availableVersions[availableVersions.length - 1];

  // srcPath -> tgtPath -> Set<version>
  const bySrc = new Map<string, Map<string, Set<string>>>();
  // Detect a source mapping to two different targets within the SAME version (a stub
  // conflict jekyll could not have produced) so it surfaces instead of silently picking one.
  const seen = new Map<string, string>(); // `${version}\u0000${srcPath}` -> tgtPath
  for (const { version, srcPath, tgtPath } of pairs) {
    if (!order.has(version)) continue;
    const key = `${version}\u0000${srcPath}`;
    const prev = seen.get(key);
    if (prev !== undefined && prev !== tgtPath) {
      process.stderr.write(
        `warning: ${version} /docs/<version>/${srcPath} maps to both "${prev}" and "${tgtPath}"; keeping "${prev}"\n`,
      );
      continue;
    }
    seen.set(key, tgtPath);
    let byTgt = bySrc.get(srcPath);
    if (!byTgt) bySrc.set(srcPath, (byTgt = new Map()));
    let versions = byTgt.get(tgtPath);
    if (!versions) byTgt.set(tgtPath, (versions = new Set()));
    versions.add(version);
  }

  const rules: GeneratedRule[] = [];
  const stripV = (v: string) => v.replace(/^v/, "");
  // Deterministic output ordering for reviewable diffs.
  for (const srcPath of [...bySrc.keys()].sort()) {
    const byTgt = bySrc.get(srcPath)!;
    for (const tgtPath of [...byTgt.keys()].sort()) {
      const indices = [...byTgt.get(tgtPath)!]
        .map((v) => order.get(v)!)
        .sort((a, b) => a - b);
      const source = `/docs/${VERSION_PLACEHOLDER}/${srcPath}`;
      const target =
        tgtPath === ""
          ? `/docs/${VERSION_PLACEHOLDER}/`
          : `/docs/${VERSION_PLACEHOLDER}/${tgtPath}`;
      // Emit one rule per contiguous run of version indices.
      let runStart = 0;
      for (let i = 1; i <= indices.length; i++) {
        if (i === indices.length || indices[i] !== indices[i - 1] + 1) {
          const min = availableVersions[indices[runStart]];
          const maxIdx = indices[i - 1];
          const rule: GeneratedRule = {
            source,
            minVersion: stripV(min),
            target,
          };
          if (availableVersions[maxIdx] !== newest) {
            rule.maxVersion = stripV(availableVersions[maxIdx]);
          }
          rules.push(rule);
          runStart = i;
        }
      }
    }
  }
  return rules;
}

// Orchestrate: scan the docs tree and return the generated rule set.
export function generate(
  docsDir: string,
  availableVersions: string[],
): GeneratedRule[] {
  return computeBands(collectPairs(docsDir), availableVersions);
}

// Depth-first file walk yielding absolute file paths. Entries are sorted so that when
// two files declare a redirect for the same old path in the same version, "first wins"
// resolves deterministically regardless of the host filesystem's readdir order.
function* walk(dir: string): Generator<string> {
  const entries = fs
    .readdirSync(dir, { withFileTypes: true })
    .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.isFile()) yield full;
  }
}
