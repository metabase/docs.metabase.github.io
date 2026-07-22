import { defineHastPlugin } from "satteri";

// Kramdown/Rouge (the old Jekyll pipeline) defaulted undeclared-language
// code to a plaintext lexer; Sätteri leaves it bare instead. Two knock-on
// effects this restores:
// - Inline spans get `language-plaintext highlighter-rouge` unconditionally,
//   since js/new-docs-code-snippet-copy.js skips the copy-button overlay on
//   `language-plaintext` and js/syntax-highlight.js only highlights
//   `.highlighter-rouge` elements.
// - Fenced blocks with no declared language get hljs's own `nohighlight`
//   marker instead, so `highlightAll()` doesn't auto-detect (and sometimes
//   misdetect, e.g. a table read as SQL) a language for them. This is kept
//   distinct from `language-plaintext` so blocks still get a copy button —
//   only inline spans should lose it.
export const codeDefaultsHastPlugin = defineHastPlugin({
  name: "code-defaults",
  element: {
    filter: ["code"],
    visit(node, ctx) {
      const parent = ctx.parent(node);
      const isBlock =
        !!parent && "tagName" in parent && parent.tagName === "pre";
      const existing = Array.isArray(node.properties?.className)
        ? (node.properties.className as unknown[])
        : [];

      if (isBlock) {
        const hasLanguage = existing.some(
          (cls) => typeof cls === "string" && cls.startsWith("language-"),
        );
        if (hasLanguage) return;
        ctx.setProperty(node, "className", [...existing, "nohighlight"]);
      } else {
        ctx.setProperty(node, "className", [
          ...existing,
          "language-plaintext",
          "highlighter-rouge",
        ]);
      }
    },
  },
});
