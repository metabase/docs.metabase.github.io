import { describe, expect, test } from "bun:test";
import { getMarkdownRenderer } from "../markdownRenderer";

const render = async (md: string) => (await getMarkdownRenderer()).render(md);

const html = (rendered: Awaited<ReturnType<typeof render>>) =>
  typeof rendered === "string" ? rendered : rendered.code;

describe("referenceTableHastPlugin", () => {
  test("restructures a Property / Type / Description table", async () => {
    const out = html(
      await render(`| Property | Type | Description |
|---|---|---|
| <a id="foo"></a> \`foo?\` | \`string\`[] | Body text.<br>---<br>Optional<br>Default: \`x\`<br>Available in Pro/Enterprise. |
| <a id="bar"></a> \`bar\` | \`"a" \\| "b"\` | Plain body.<br>---<br>Required<br>Possible values: \`a\`, \`b\` |
`),
    );

    expect(out).toContain('<table class="table-reference">');

    // Row anchor moves onto the <tr>, with a hover permalink after the name.
    expect(out).toContain('<tr id="foo">');
    expect(out).toContain(
      '<a class="table-reference-anchor" href="#foo" aria-label="Link to foo">#</a>',
    );
    expect(out).not.toContain('<a id="foo">');

    // typedoc's `foo?` becomes a plain name plus an Optional flag, once.
    expect(out).toContain(">foo</code>");
    expect(out.match(/prop-meta-flag is-optional/g)).toHaveLength(1);

    // `string`[] folds into one code span.
    expect(out).toContain(">string[]</code>");
    expect(out).toContain('class="prop-type is-short"');

    // Metadata lines after the rule become labeled items.
    expect(out).toContain('<div class="prop-desc">Body text.</div>');
    expect(out).toContain('<span class="prop-meta-label">Default</span>');
    expect(out).toContain(
      '<span class="prop-meta-label">Available in</span><span class="prop-meta-value">Pro/Enterprise</span>',
    );
    expect(out).toContain("prop-meta-flag is-required");
    expect(out).toContain(
      '<span class="prop-meta-label">Possible values</span>',
    );
  });

  test("leaves other tables alone", async () => {
    const out = html(
      await render(`| Name | Type | Required |
|---|---|---|
| \`a\` | \`string\` | yes |
`),
    );
    expect(out).not.toContain("table-reference");
    expect(out).not.toContain("prop-type");
  });
});
