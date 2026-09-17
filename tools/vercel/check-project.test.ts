import { describe, expect, test } from "bun:test";
import { assertDocsProjectRoot } from "./check-project.ts";

describe("assertDocsProjectRoot", () => {
  test("requires the linked Vercel project to use the repository root", () => {
    expect(() =>
      assertDocsProjectRoot({
        settings: { rootDirectory: null },
      }),
    ).not.toThrow();
    expect(() =>
      assertDocsProjectRoot({ settings: { rootDirectory: "apps/docs" } }),
    ).toThrow("repository root");
    expect(() => assertDocsProjectRoot({})).toThrow("repository root");
  });
});
