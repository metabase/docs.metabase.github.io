import { describe, expect, test } from "vitest";
import { getLiquidRenderer } from "./liquidRenderer";

const renderMarkdown = (source: string) =>
  getLiquidRenderer({ page: {}, dirname: "", output: "markdown" }).render(
    source,
  );

// The stand-ins in `_includes/markdown` lean on Liquid whitespace control to
// come out as a single clean block, so pin down what they render.
describe("markdown include stand-ins", () => {
  const PLANS =
    "[Pro](/product/pro) and [Enterprise](/product/enterprise) plans";

  test.each([
    [
      "{% include plans-blockquote.html %}",
      `> This feature is only available on ${PLANS} (both self-hosted and on Metabase Cloud).`,
    ],
    [
      '{% include plans-blockquote.html feature="Usage analytics" %}',
      `> Usage analytics is only available on ${PLANS} (both self-hosted and on Metabase Cloud).`,
    ],
    [
      '{% include plans-blockquote.html feature="Interactive dashboards" convert_pro_link_to_embedding=true is_plural=true%}',
      "> Interactive dashboards are only available on [Pro](https://store.metabase.com/checkout/embedding) and [Enterprise](/product/enterprise) plans (both self-hosted and on Metabase Cloud).",
    ],
    [
      '{% include plans-blockquote.html feature="IAM authentication" self-hosted-only="true" %}',
      `> IAM authentication is only available on ${PLANS} (only on self-hosted plans).`,
    ],
    [
      "{% include plans-blockquote.html enterprise-only=true %}",
      "> This feature is only available on [Enterprise](/product/enterprise) plans (both self-hosted and on Metabase Cloud).",
    ],
    [
      "{% include beta-blockquote.html %}",
      "> ⚠️ This feature is in beta. Feel free to play around with it, but be aware that things might change (and may not work as expected).",
    ],
    [
      '{% include beta-blockquote.html message="Tell us what you think." %}',
      [
        "> ⚠️ This feature is in beta. Feel free to play around with it, but be aware that things might change (and may not work as expected).",
        ">",
        "> Tell us what you think.",
      ].join("\n"),
    ],
    [
      "{% include youtube.html id='AtMn-G-Al80' %}",
      "[Watch the video on YouTube](https://www.youtube.com/watch?v=AtMn-G-Al80)",
    ],
    ["{% include svg-icons/cross.svg %}", "❌"],
    ["{% include shared/in-page-promo.html %}", ""],
    ["{% include shared/in-page-promo-embedding-workshop.html %}", ""],
  ])("%s", async (source, expected) => {
    expect(await renderMarkdown(source)).toBe(expected);
  });

  test("falls back to the HTML include when there's no stand-in", async () => {
    expect(
      await renderMarkdown("{% include svg-icons/chevron.html %}"),
    ).toMatch(/^<svg/);
  });

  test("leaves the HTML output on the HTML include", async () => {
    const html = await getLiquidRenderer({ page: {}, dirname: "" }).render(
      "{% include youtube.html id='AtMn-G-Al80' %}",
    );
    expect(html).toContain("https://www.youtube.com/embed/AtMn-G-Al80");
  });
});
