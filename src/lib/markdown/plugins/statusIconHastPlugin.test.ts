import { describe, expect, test } from "vitest";
import { getMarkdownRenderer } from "../markdownRenderer";

const render = async (md: string) =>
  (await (await getMarkdownRenderer()).render(md)).code;

const YES = '<span class="status-icon status-icon-yes">';
const NO = '<span class="status-icon status-icon-no">';

describe("statusIconHastPlugin", () => {
  test("swaps ✅ and ❌ in table cells for icons", async () => {
    const out = await render(`| Feature | Athena | MongoDB |
|---|---|---|
| Right outer join | ✅ | ❌ |
`);

    expect(out).not.toMatch(/[✅❌]/);
    expect(out).toContain(YES);
    expect(out).toContain(NO);
    expect(out).toContain('<svg viewBox="0 0 16 16"');
    expect(out).toContain('aria-hidden="true"');
    expect(out).toContain('<span class="tw:sr-only">Yes</span>');
    expect(out).toContain('<span class="tw:sr-only">No</span>');
  });

  test("keeps the text around a mark", async () => {
    const out = await render(`| Feature | MongoDB |
|---|---|
| Custom columns | ✅ (1) |
`);
    expect(out).toMatch(/Yes<\/span><\/span> \(1\)<\/td>/);
  });

  test("replaces every mark in a paragraph, with or without U+FE0F", async () => {
    const out = await render("A ✅️ means yes, a ❌ means no.");
    expect(out).not.toMatch(/[✅❌️]/);
    expect(out).toMatch(/^<p>A <span class="status-icon status-icon-yes">/);
    expect(out).toContain("</span></span> means yes, a ");
    expect(out).toContain(NO);
    expect(out).toMatch(/<\/span><\/span> means no\.<\/p>/);
  });

  test("leaves code alone", async () => {
    const out = await render(`Inline \`// ✅\` code.

\`\`\`js
// ❌
const x = 1;
\`\`\`
`);
    expect(out).toContain(">// ✅</code>");
    expect(out).toContain(">// ❌\n");
    expect(out).not.toContain("status-icon");
  });
});
