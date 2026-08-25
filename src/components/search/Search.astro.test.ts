import { describe, expect, test } from "vitest";
import { renderToDocument } from "../../test/render-astro";
import Search from "./Search.astro";

describe("Search.astro", () => {
  test("renders the node the widget mounts into", async () => {
    const { doc } = await renderToDocument(Search, {});

    expect(doc.querySelector("#inkeep")).not.toBeNull();
  });
});
