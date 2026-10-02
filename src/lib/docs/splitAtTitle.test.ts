import { describe, expect, test } from "vitest";
import { splitAtTitle } from "./splitAtTitle";

describe("splitAtTitle", () => {
  test("splits after the first h1", () => {
    expect(
      splitAtTitle('<p>a</p><h1 id="x">Title</h1><p>b</p><h1>c</h1>'),
    ).toEqual(['<p>a</p><h1 id="x">Title</h1>', "<p>b</p><h1>c</h1>"]);
  });

  test("puts everything in the body when there is no h1", () => {
    expect(splitAtTitle("<p>b</p>")).toEqual(["", "<p>b</p>"]);
  });
});
