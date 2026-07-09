import { defineHastPlugin } from "satteri";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { METABASE_ROOT } from "./metabase-paths";

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
export const jekyllInlineCodePlugin = defineHastPlugin({
  name: "jekyll-inline-code-class",
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

// Kramdown's inline attribute list (IAL) syntax lets a `{: key="value" ...}`
// immediately after a span-level element (link, image, code span, emphasis)
// attach HTML attributes to it, e.g. `[text](url){:target="_blank"}` becomes
// `<a href="url" target="_blank">`. This repo only uses it for
// `{:target="_blank"}` after links. CommonMark/Sätteri has no concept of IAL,
// so without this plugin that text renders literally after the link instead
// of being consumed.
const IAL_RE = /^\{:\s*([^}]*)\}/;
// Smartypants runs before this plugin sees the text, so a straight `"` in the
// source markdown has already become a curly “ ” pair by the time we match.
const ATTR_RE = /([a-zA-Z_:][-\w:.]*)\s*=\s*["“]([^"”]*)["”]/g;

export const jekyllAttributeListPlugin = defineHastPlugin({
  name: "jekyll-inline-attribute-list",
  text(node, ctx) {
    const match = IAL_RE.exec(node.value);
    if (!match) return;
    const parent = ctx.parent(node);
    const index = ctx.indexOf(node);
    if (!parent || !index) return;
    const prevSibling = parent.children[index - 1];
    if (!prevSibling || prevSibling.type !== "element") return;
    for (const [, key, value] of match[1].matchAll(ATTR_RE)) {
      ctx.setProperty(prevSibling, key, value);
    }
    const rest = node.value.slice(match[0].length);
    if (rest === "") {
      ctx.removeNode(node);
    } else {
      return { type: "text", value: rest };
    }
  },
});

// _docs markdown is read straight off disk (see readDocSource in
// render-doc.ts) instead of going through Astro's content-collection/Vite
// pipeline, so the usual astro:assets image handling (which resolves
// relative image paths via static imports) never sees these files. Doc
// images are referenced relative to the source .md file, e.g.
// `dashboards/actions.md` links `./images/foo.png` meaning
// `dashboards/images/foo.png` — this plugin resolves that relative link
// (using ctx.fileURL, the source file's location) against METABASE_ROOT and
// rewrites it to a URL served by src/pages/docs/assets/[...path].ts, which
// reads the same file straight off disk.
export const localDocImagePlugin = defineHastPlugin({
  name: "local-doc-image-resolver",
  element: {
    filter: ["img"],
    visit(node, ctx) {
      const rawSrc = node.properties?.src;
      if (typeof rawSrc !== "string" || rawSrc === "") return;
      // Absolute site paths, absolute URLs, and data: URIs need no rewriting.
      if (rawSrc.startsWith("/") || URL.canParse(rawSrc)) return;
      if (!ctx.fileURL) return;

      const absPath = fileURLToPath(new URL(decodeURI(rawSrc), ctx.fileURL));
      const relPath = path.relative(METABASE_ROOT, absPath);
      if (relPath.startsWith("..") || path.isAbsolute(relPath)) return;

      const newSrc =
        "/docs/assets/" +
        relPath.split(path.sep).map(encodeURIComponent).join("/");
      ctx.setProperty(node, "src", newSrc);
    },
  },
});
