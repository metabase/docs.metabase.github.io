import { describe, expect, test } from "vitest";
import { getMarkdownRenderer } from "../markdownRenderer";

const render = async (md: string) =>
  (await (await getMarkdownRenderer()).render(md)).code;

describe("referenceTableHastPlugin", () => {
  test("restructures a Property / Type / Description table", async () => {
    const out = await render(`| Property | Type | Description |
|---|---|---|
| <a id="foo"></a> \`foo?\` | \`string\`[] | Body text.<br>---<br>Default: \`x\`<br>Available in Pro/Enterprise. |
| <a id="bar"></a> \`bar\` | \`"a" \\| "b"\` | Plain body.<br>---<br>Optional<br>Possible values: \`a\`, \`b\`<br>Default: none. |
`);

    expect(out).toContain('<table class="table-reference">');

    // Row anchor moves onto the <tr>, with a hover permalink after the name.
    expect(out).toContain('<tr id="foo">');
    expect(out).toContain(
      '<a class="table-reference-anchor" href="#foo" aria-label="Link to foo">#</a>',
    );
    expect(out).not.toContain('<a id="foo">');

    // An Optional flag for typedoc's `foo?` and for bar's `Optional` line.
    expect(out).toContain(">foo</code>");
    expect(out.match(/prop-meta-flag/g)).toHaveLength(2);

    // `string`[] folds into one code span.
    expect(out).toContain(">string[]</code>");
    expect(out).toContain('class="prop-type is-short"');

    // Metadata lines after the rule become labeled items.
    expect(out).toContain('<div class="prop-desc">Body text.</div>');
    expect(out).toContain('<span class="prop-meta-label">Default</span>');
    expect(out).toContain(
      '<span class="prop-meta-label">Available in</span>Pro/Enterprise</div>',
    );
    expect(out).toContain(
      '<span class="prop-meta-label">Possible values</span>',
    );
    expect(out).toContain('<span class="prop-meta-label">Default</span>none<');
  });

  test("keeps the optional marker in a two-column table", async () => {
    const out = await render(`| Property | Type |
|---|---|
| <a id="foo"></a> \`foo?\` | \`string\` |
`);
    expect(out).toContain('<table class="table-reference">');
    expect(out).toContain('<tr id="foo">');
    expect(out).toContain(">foo?</code>");
    expect(out).not.toContain("prop-meta");
  });

  test("leaves other tables alone", async () => {
    const out = await render(`| Name | Type | Required |
|---|---|---|
| \`a\` | \`string\` | yes |
`);
    expect(out).not.toContain("table-reference");
    expect(out).not.toContain("prop-type");
  });
});
