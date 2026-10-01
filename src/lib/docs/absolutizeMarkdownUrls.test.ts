import { describe, expect, test } from "vitest";
import { absolutizeMarkdownUrls } from "./absolutizeMarkdownUrls";

const BASE = new URL("https://www.metabase.com/docs/latest/questions/start");
const absolutize = (markdown: string) => absolutizeMarkdownUrls(markdown, BASE);

describe("absolutizeMarkdownUrls", () => {
  test.each([
    [
      "[Intro](./introduction)",
      "[Intro](https://www.metabase.com/docs/latest/questions/introduction)",
    ],
    [
      "[SSO](../people-and-groups/start#sso)",
      "[SSO](https://www.metabase.com/docs/latest/people-and-groups/start#sso)",
    ],
    ["[Pricing](/pricing/)", "[Pricing](https://www.metabase.com/pricing/)"],
    [
      '![Chart](./images/chart.png "A chart")',
      '![Chart](https://www.metabase.com/docs/latest/questions/images/chart.png "A chart")',
    ],
    [
      "## [`code` title](./editor)",
      "## [`code` title](https://www.metabase.com/docs/latest/questions/editor)",
    ],
    [
      "[editor]: ./query-builder/editor",
      "[editor]: https://www.metabase.com/docs/latest/questions/query-builder/editor",
    ],
    [
      "See [one](./one) and [two](./two).",
      "See [one](https://www.metabase.com/docs/latest/questions/one) and [two](https://www.metabase.com/docs/latest/questions/two).",
    ],
  ])("resolves %s", (markdown, expected) => {
    expect(absolutize(markdown)).toBe(expected);
  });

  test.each([
    "[Store](https://store.metabase.com/checkout)",
    "[Email](mailto:help@metabase.com)",
    "[Below](#saving-questions)",
    "[CDN](//cdn.example.com/x.js)",
    "Use `[text](./relative)` to write a link.",
  ])("leaves %s alone", (markdown) => {
    expect(absolutize(markdown)).toBe(markdown);
  });

  test("drops kramdown attribute lists after links, but not in code", () => {
    expect(
      absolutize(
        'Hire an [Expert](/partners/){:target="\\_blank"} or [two](./two){:target="_blank"}.',
      ),
    ).toBe(
      "Hire an [Expert](https://www.metabase.com/partners/) or [two](https://www.metabase.com/docs/latest/questions/two).",
    );

    const code = 'Write `[text](url){:target="_blank"}` or `{:select [1]}`.';
    expect(absolutize(code)).toBe(code);
  });

  test("resolves against a directory-style page URL", () => {
    expect(
      absolutizeMarkdownUrls(
        "[Questions](./questions/start)",
        new URL("https://www.metabase.com/docs/latest/"),
      ),
    ).toBe("[Questions](https://www.metabase.com/docs/latest/questions/start)");
  });

  test("skips fenced code blocks, including indented and nested fences", () => {
    const markdown = [
      "[before](./before)",
      "",
      "   ````md",
      "   [sample](./sample)",
      "   ```",
      "   [still code](./still-code)",
      "   ````",
      "",
      "~~~",
      "[tilde](./tilde)",
      "~~~",
      "",
      "[after](./after)",
    ].join("\n");

    expect(absolutize(markdown)).toBe(
      markdown
        .replace(
          "(./before)",
          "(https://www.metabase.com/docs/latest/questions/before)",
        )
        .replace(
          "(./after)",
          "(https://www.metabase.com/docs/latest/questions/after)",
        ),
    );
  });

  test("doesn't take a line-leading triple-backtick code span for a fence", () => {
    const markdown = [
      "```metabot show [name]``` where ```name``` is a [question](./question).",
      "",
      "[after](./after)",
    ].join("\n");

    expect(absolutize(markdown)).toBe(
      markdown
        .replace(
          "(./question)",
          "(https://www.metabase.com/docs/latest/questions/question)",
        )
        .replace(
          "(./after)",
          "(https://www.metabase.com/docs/latest/questions/after)",
        ),
    );
  });
});
