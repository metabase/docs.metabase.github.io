import { describe, expect, test } from "vitest";
import { docsVersionHref } from "./versionHref";

describe("docsVersionHref", () => {
  test("links the current stable version to latest", () => {
    expect(docsVersionHref("v0.63", "v0.63")).toBe("/docs/latest/");
  });

  test.each([
    ["v0.64", "/docs/v0.64/"],
    ["v0.58", "/docs/v0.58/"],
  ])("links other versions to their own docs: %s", (version, href) => {
    expect(docsVersionHref(version, "v0.63")).toBe(href);
  });
});
