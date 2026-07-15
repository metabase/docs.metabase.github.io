import { defineHastPlugin } from "satteri";

// Kramdown (Jekyll's Markdown converter) routes every code span through its
// syntax highlighter (Rouge in Jekyll's config), even inline ones with no
// declared language — Rouge falls back to its plaintext lexer and kramdown
// wraps the result as `<code class="language-plaintext highlighter-rouge">`.
// CommonMark/Sätteri has no such hook for inline code (only fenced blocks
// carry a language), so plain `<code>` comes out bare. Two site scripts rely
// on kramdown's classes being there: js/syntax-highlight.js only
// syntax-highlights `.highlighter-rouge` elements, and
// js/new-docs-code-snippet-copy.js attaches a copy-button overlay to every
// `<code>` *except* ones classed `language-plaintext` — without this plugin,
// every inline code span across the site would get a copy button.
export const inlineCodeHastPlugin = defineHastPlugin({
  name: "inline-code",
  element: {
    filter: ["code"],
    visit(node, ctx) {
      const parent = ctx.parent(node);
      if (parent && "tagName" in parent && parent.tagName === "pre") return;
      const existing = Array.isArray(node.properties?.className)
        ? (node.properties.className as unknown[])
        : [];
      ctx.setProperty(node, "className", [
        ...existing,
        "language-plaintext",
        "highlighter-rouge",
      ]);
    },
  },
});
