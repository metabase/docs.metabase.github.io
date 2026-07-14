// Unit tests for the pure helpers and the band algebra. The on-disk fixture-tree walk
// (collectPairs/generate over a real _docs tree) lives in generate-redirects.fixtures.test.ts.
import { test, expect } from "bun:test";
import {
  stripDocsVersion,
  normalizeRedirectFrom,
  deriveTargetPath,
  computeBands,
  type RedirectPair,
} from "./generate-redirects";

const VERSIONS = Array.from({ length: 52 }, (_, i) => `v0.${12 + i}`); // v0.12 … v0.63

test("stripDocsVersion splits version and path, ignores non-/docs sources", () => {
  expect(stripDocsVersion("/docs/v0.62/a/b")).toEqual({
    version: "v0.62",
    rest: "a/b",
  });
  expect(stripDocsVersion("/docs/v0.62/a/b/")).toEqual({
    version: "v0.62",
    rest: "a/b",
  });
  expect(stripDocsVersion("/docs/latest/x")).toEqual({
    version: "latest",
    rest: "x",
  });
  expect(stripDocsVersion("/learn/basics/maps")).toBeNull();
  expect(stripDocsVersion("/docs/v0.62")).toBeNull(); // no path segment
});

test("normalizeRedirectFrom handles string, list, and junk", () => {
  expect(normalizeRedirectFrom("/docs/v0.62/x")).toEqual(["/docs/v0.62/x"]);
  expect(normalizeRedirectFrom(["/a", "/b"])).toEqual(["/a", "/b"]);
  expect(normalizeRedirectFrom([1, "/b", null])).toEqual(["/b"]);
  expect(normalizeRedirectFrom(undefined)).toEqual([]);
});

test("deriveTargetPath: explicit permalink wins, index collapses to root", () => {
  expect(
    deriveTargetPath("v0.62/README.md", {
      permalink: "/docs/v0.62/index.html",
    }),
  ).toBe("");
  expect(
    deriveTargetPath("v0.62/databases/ssh-tunnel.md", {
      permalink: "/docs/v0.62/databases/ssh-tunnel",
    }),
  ).toBe("databases/ssh-tunnel");
});

test("deriveTargetPath: derived from filename when no permalink", () => {
  expect(deriveTargetPath("v0.62/databases/ssh-tunnel.md", {})).toBe(
    "databases/ssh-tunnel",
  );
  expect(deriveTargetPath("v0.62/README.md", {})).toBe("");
  expect(deriveTargetPath("v0.62/embedding/index.md", {})).toBe("embedding");
  expect(deriveTargetPath("v0.62/api.html", {})).toBe("api");
});

test("computeBands: single open-ended band when it reaches the newest version", () => {
  const pairs: RedirectPair[] = VERSIONS.slice(
    VERSIONS.indexOf("v0.60"),
  ).map((version) => ({ version, srcPath: "old/path", tgtPath: "new/path" }));
  expect(computeBands(pairs, VERSIONS)).toEqual([
    {
      source: "/docs/<version>/old/path",
      minVersion: "0.60",
      target: "/docs/<version>/new/path",
    },
  ]);
});

test("computeBands: bounded band when the pair stops before newest", () => {
  const pairs: RedirectPair[] = ["v0.44", "v0.45", "v0.46"].map((version) => ({
    version,
    srcPath: "contributing",
    tgtPath: "developers-guide/contributing",
  }));
  expect(computeBands(pairs, VERSIONS)).toEqual([
    {
      source: "/docs/<version>/contributing",
      minVersion: "0.44",
      maxVersion: "0.46",
      target: "/docs/<version>/developers-guide/contributing",
    },
  ]);
});

test("computeBands: a gap in the versions splits into two rules", () => {
  const pairs: RedirectPair[] = ["v0.44", "v0.45", "v0.48", "v0.49"].map(
    (version) => ({ version, srcPath: "x", tgtPath: "y" }),
  );
  expect(computeBands(pairs, VERSIONS)).toEqual([
    {
      source: "/docs/<version>/x",
      minVersion: "0.44",
      maxVersion: "0.45",
      target: "/docs/<version>/y",
    },
    {
      source: "/docs/<version>/x",
      minVersion: "0.48",
      maxVersion: "0.49",
      target: "/docs/<version>/y",
    },
  ]);
});

test("computeBands: same source, different target per band (the contributing case)", () => {
  const pairs: RedirectPair[] = [
    ...["v0.44", "v0.45"].map((version) => ({
      version,
      srcPath: "contributing",
      tgtPath: "developers-guide/contributing",
    })),
    ...["v0.52", "v0.53"].map((version) => ({
      version,
      srcPath: "contributing",
      tgtPath: "CONTRIBUTING",
    })),
  ];
  const rules = computeBands(pairs, VERSIONS);
  expect(rules).toContainEqual({
    source: "/docs/<version>/contributing",
    minVersion: "0.44",
    maxVersion: "0.45",
    target: "/docs/<version>/developers-guide/contributing",
  });
  expect(rules).toContainEqual({
    source: "/docs/<version>/contributing",
    minVersion: "0.52",
    maxVersion: "0.53",
    target: "/docs/<version>/CONTRIBUTING",
  });
});

test("computeBands: target root collapses to /docs/<version>/", () => {
  const pairs: RedirectPair[] = [{ version: "v0.63", srcPath: "faq", tgtPath: "" }];
  expect(computeBands(pairs, VERSIONS)).toEqual([
    {
      source: "/docs/<version>/faq",
      minVersion: "0.63",
      target: "/docs/<version>/",
    },
  ]);
});
