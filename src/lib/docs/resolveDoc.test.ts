import { describe, expect, test } from "vitest";
import {
  findDocInVersion,
  hasMarkdownVersion,
  resolveDocUrl,
  toMarkdownUrl,
  toVersionUrl,
} from "./resolveDoc";

describe("hasMarkdownVersion", () => {
  test.each([
    ["latest", true],
    ["master", true],
    // Older than anything the support data tracks.
    ["v0.30", false],
  ])("%s", (version, expected) => {
    expect(hasMarkdownVersion(version)).toBe(expected);
  });
});

describe("toMarkdownUrl", () => {
  test.each([
    [
      "/docs/latest/questions/introduction",
      "/docs/latest/questions/introduction.md",
    ],
    ["/docs/v0.52/api/", "/docs/v0.52/api/index.md"],
    ["/docs/latest/", "/docs/latest/index.md"],
  ])("%s", (url, markdownUrl) => {
    expect(toMarkdownUrl(url)).toBe(markdownUrl);
  });

  test("matches the path the markdown endpoint builds for an index doc", () => {
    const { version, slug } = resolveDocUrl({
      id: "v0.52/api/index",
      includeTrailingIndex: true,
    });
    expect(toMarkdownUrl(resolveDocUrl({ id: "v0.52/api/index" }).url)).toBe(
      `/docs/${version}/${slug}.md`,
    );
  });
});

describe("resolveDocUrl", () => {
  test.each([
    ["v0.52/api/index", "/docs/v0.52/api/"],
    ["v0.52/index", "/docs/v0.52/"],
    ["v0.52/README", "/docs/v0.52/"],
    ["v0.52/api/index.html", "/docs/v0.52/api/"],
  ])("strips a trailing index segment: %s", (id, url) => {
    expect(resolveDocUrl({ id }).url).toBe(url);
  });

  test.each([
    ["v0.52/api/model-index", "/docs/v0.52/api/model-index"],
    ["v0.52/questions/reindex", "/docs/v0.52/questions/reindex"],
    ["v0.52/api/model-index.html", "/docs/v0.52/api/model-index"],
  ])("keeps slugs that merely end in index: %s", (id, url) => {
    expect(resolveDocUrl({ id }).url).toBe(url);
  });

  test("keeps the trailing index when includeTrailingIndex is set", () => {
    expect(
      resolveDocUrl({ id: "v0.52/README", includeTrailingIndex: true }),
    ).toEqual({
      version: "v0.52",
      slug: "index",
      url: "/docs/v0.52/index",
    });
  });

  test("splits version and slug", () => {
    expect(resolveDocUrl({ id: "v0.52/api/model-index" })).toEqual({
      version: "v0.52",
      slug: "api/model-index",
      url: "/docs/v0.52/api/model-index",
    });
  });
});

describe("toVersionUrl", () => {
  test.each([
    ["/docs/latest/questions/start", "/docs/v0.62/questions/start"],
    ["/docs/latest/api/", "/docs/v0.62/api/"],
    ["/docs/latest/", "/docs/v0.62/"],
  ])("%s", (url, expected) => {
    expect(toVersionUrl(url, "v0.62")).toBe(expected);
  });

  test("is undefined outside a version", () => {
    expect(toVersionUrl("/docs/all", "v0.62")).toBeUndefined();
  });
});

describe("findDocInVersion", () => {
  const urls = new Set([
    "/docs/v0.62/",
    "/docs/v0.62/questions/start",
    "/docs/v0.62/api/",
  ]);

  test("keeps the page when the version has it", () => {
    expect(
      findDocInVersion(urls, "/docs/latest/questions/start", "v0.62"),
    ).toBe("/docs/v0.62/questions/start");
    expect(findDocInVersion(urls, "/docs/latest/api/", "v0.62")).toBe(
      "/docs/v0.62/api/",
    );
  });

  test("falls back to the version's home", () => {
    expect(findDocInVersion(urls, "/docs/latest/ai/mcp", "v0.62")).toBe(
      "/docs/v0.62/",
    );
    expect(findDocInVersion(urls, "/docs/all", "v0.62")).toBe("/docs/v0.62/");
  });
});
