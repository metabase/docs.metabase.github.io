import { describe, expect, test } from "vitest";
import { resolveDocUrl } from "./resolveDoc";

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
