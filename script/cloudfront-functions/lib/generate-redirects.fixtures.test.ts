// End-to-end extraction test over an on-disk fixture `_docs` tree
// (__fixtures__/docs/). Where generate-redirects.test.ts unit-tests the pure helpers,
// this file drives the real filesystem walk (collectPairs) and banding (generate) across
// every shape of `redirect_from` the docs can express — so a regression in how any one of
// them is extracted shows up here. The fixture files are the readable source of truth;
// each declares one scenario (see __fixtures__/docs/**). Skip-cases assert the extractor
// drops what jekyll-redirect-from would never have turned into a live redirect.

import { test, expect, spyOn, beforeAll, afterAll } from "bun:test";
import path from "path";
import {
  collectPairs,
  generate,
  type RedirectPair,
  type GeneratedRule,
} from "./generate-redirects";

const DOCS = path.join(import.meta.dir, "__fixtures__", "docs");
// The fixture tree spans v0.44 … v0.50 (newest = v0.50), with a deliberate gap at v0.47.
const VERSIONS = Array.from({ length: 7 }, (_, i) => `v0.${44 + i}`);

// computeBands warns to stderr on same-version source→target conflicts (the aaa/zzz-dupe
// fixture). Capture those writes so the suite output stays clean and the conflict test can
// assert the warning fired.
const stderrWrites: string[] = [];
let stderrSpy: ReturnType<typeof spyOn>;
beforeAll(() => {
  stderrSpy = spyOn(process.stderr, "write").mockImplementation((chunk) => {
    stderrWrites.push(String(chunk));
    return true;
  });
});
afterAll(() => stderrSpy.mockRestore());

test("collectPairs extracts every redirect shape from the fixture tree", () => {
  const pairs = collectPairs(DOCS);
  const has = (p: RedirectPair) => expect(pairs).toContainEqual(p);

  // Derived target from filename (single string source).
  has({ version: "v0.50", srcPath: "administration-guide/ssh-tunnel", tgtPath: "databases/ssh-tunnel" });
  // List source: two old URLs collapsing onto one target.
  has({ version: "v0.50", srcPath: "administration-guide/managing", tgtPath: "people-and-groups/managing" });
  has({ version: "v0.50", srcPath: "people-and-groups/managing-people", tgtPath: "people-and-groups/managing" });
  // Explicit permalink wins over the filename-derived path.
  has({ version: "v0.50", srcPath: "embedding/03-static-embedding", tgtPath: "embedding/static-embedding" });
  // README.md collapses to the version root ("").
  has({ version: "v0.50", srcPath: "home", tgtPath: "" });
  // index.md collapses to its parent directory.
  has({ version: "v0.50", srcPath: "embedding-old", tgtPath: "embedding" });
  // .html and .markdown are extracted just like .md.
  has({ version: "v0.50", srcPath: "api-reference", tgtPath: "api" });
  has({ version: "v0.50", srcPath: "old-notes", tgtPath: "notes" });
  // Trailing slash on the source is normalized away.
  has({ version: "v0.50", srcPath: "trailing-old", tgtPath: "trailing" });
  // Self-referential source is kept (parity handles it; extraction records it).
  has({ version: "v0.50", srcPath: "self", tgtPath: "self" });
  // Multi-version pair (bounded band's underlying observations).
  has({ version: "v0.44", srcPath: "contributing", tgtPath: "developers-guide/contributing" });
});

test("collectPairs drops sources jekyll would never have redirected", () => {
  const pairs = collectPairs(DOCS);

  // Cross-site /learn/... source — the /docs edge function does not serve it.
  expect(pairs.some((p) => p.srcPath === "old")).toBe(false);
  // A source naming a different version than the file it lives in.
  expect(pairs.some((p) => p.srcPath === "whatever")).toBe(false);
  // A version-root source (empty rest, "/docs/v0.50/").
  expect(pairs.some((p) => p.srcPath === "")).toBe(false);
  // Malformed frontmatter is skipped without throwing.
  expect(pairs.some((p) => p.srcPath === "broken-src")).toBe(false);
  // The `latest` and `master` alias dirs are never scanned.
  expect(pairs.some((p) => p.version === "latest" || p.version === "master")).toBe(false);
  expect(pairs.some((p) => p.srcPath === "old-latest" || p.srcPath === "old-master")).toBe(false);
});

test("generate bands the fixture observations into the expected rule table", () => {
  const rules = generate(DOCS, VERSIONS);
  const has = (r: GeneratedRule) => expect(rules).toContainEqual(r);

  // A pair present only at the newest version → open-ended (no maxVersion).
  has({ source: "/docs/<version>/administration-guide/ssh-tunnel", minVersion: "0.50", target: "/docs/<version>/databases/ssh-tunnel" });
  // Target root collapses to "/docs/<version>/".
  has({ source: "/docs/<version>/home", minVersion: "0.50", target: "/docs/<version>/" });
  // Permalink-derived target survives banding.
  has({ source: "/docs/<version>/embedding/03-static-embedding", minVersion: "0.50", target: "/docs/<version>/embedding/static-embedding" });
  // Bounded band: present v0.44–v0.46 only, so it stops before the newest version.
  has({ source: "/docs/<version>/contributing", minVersion: "0.44", maxVersion: "0.46", target: "/docs/<version>/developers-guide/contributing" });
  // Same source, a gap at v0.47, and a different target → a second, disjoint rule.
  has({ source: "/docs/<version>/contributing", minVersion: "0.48", maxVersion: "0.49", target: "/docs/<version>/CONTRIBUTING" });

  // The full table is exactly these 13 rules — no stray extraction from any skip-case.
  expect(rules).toHaveLength(13);
});

test("a same-version source→target conflict is resolved deterministically (first wins)", () => {
  const rules = generate(DOCS, VERSIONS);
  // aaa-dupe.md and zzz-dupe.md both claim /docs/v0.50/dupe-source; the sorted walk visits
  // aaa-dupe first, so its target is the one that survives — regardless of readdir order.
  const dupe = rules.filter((r) => r.source === "/docs/<version>/dupe-source");
  expect(dupe).toEqual([
    { source: "/docs/<version>/dupe-source", minVersion: "0.50", target: "/docs/<version>/aaa-dupe" },
  ]);
  // ...and the conflict is surfaced, not silently swallowed.
  expect(stderrWrites.join("")).toContain(
    'v0.50 /docs/<version>/dupe-source maps to both "aaa-dupe" and "zzz-dupe"',
  );
});
