import { describe, expect, test } from "vitest";
import { htmlToText, toExcerpt } from "./plainText";

describe("htmlToText", () => {
  test("drops tags and collapses whitespace", () => {
    expect(
      htmlToText("<p>Use the\n  <code>useAction</code> <em>hook</em>.</p>"),
    ).toBe("Use the useAction hook.");
  });

  test("decodes named and numeric entities", () => {
    expect(
      htmlToText("Tom &amp; Jerry &lt;3 &quot;hi&quot; &#39;x&#x27;"),
    ).toBe(`Tom & Jerry <3 "hi" 'x'`);
  });

  test("drops an unclosed tag at the end", () => {
    expect(htmlToText("Use the <code>a</code> <script")).toBe("Use the a");
  });

  test("leaves unknown entities alone", () => {
    expect(htmlToText("a &bogus; b")).toBe("a &bogus; b");
  });
});

describe("toExcerpt", () => {
  test("takes the first paragraph with text", () => {
    expect(
      toExcerpt(
        '<p><img alt="Question" src="q.png"></p>\n<p>Questions are queries.</p><p>More.</p>',
      ),
    ).toBe("Questions are queries.");
  });

  test("skips callouts", () => {
    expect(
      toExcerpt(
        "<blockquote><p>Only on Pro plans.</p></blockquote><p>Sandboxing limits rows.</p>",
      ),
    ).toBe("Sandboxing limits rows.");
    expect(
      toExcerpt(
        '<div class="plans-blockquote"><p class="m-0">Only on Pro plans.</p></div><p>Sandboxing limits rows.</p>',
      ),
    ).toBe("Sandboxing limits rows.");
  });

  test("cuts long paragraphs", () => {
    expect(toExcerpt("<p>one two three four</p>", 3)).toBe("one two three…");
    expect(toExcerpt("<p>one two three</p>", 3)).toBe("one two three");
  });

  test("falls back to any text when there is no paragraph", () => {
    expect(toExcerpt("<ul><li>First item</li></ul>")).toBe("First item");
  });

  test("is undefined when there is no text", () => {
    expect(toExcerpt("")).toBeUndefined();
    expect(toExcerpt('<p><img src="x.png"></p>')).toBeUndefined();
  });
});
