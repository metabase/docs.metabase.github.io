import matter from "gray-matter";
import { describe, expect, test } from "vitest";
import { toFrontMatter } from "./markdownFrontMatter";

describe("toFrontMatter", () => {
  test("round-trips values YAML would otherwise misread", () => {
    const fields = {
      title: 'Embedding: the "SDK" #1',
      description: "Use `useAction`: it's\nfast — and - safe \\ ok",
      url: "https://www.metabase.com/docs/latest/embedding/sdk",
      version: "63",
    };
    const { data, content } = matter(`${toFrontMatter(fields)}# Title\n`);

    expect(data).toEqual(fields);
    // The blank line after the closing --- separates it from the body.
    expect(content).toBe("\n# Title\n");
  });

  test("leaves out undefined fields", () => {
    expect(toFrontMatter({ title: "Alerts", description: undefined })).toBe(
      '---\ntitle: "Alerts"\n---\n\n',
    );
  });
});
