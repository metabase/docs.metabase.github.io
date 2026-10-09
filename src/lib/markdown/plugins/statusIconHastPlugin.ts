import type { Element, ElementContent } from "hast";
import { defineHastPlugin } from "satteri";

// Yes/no marks: the docs write ✅ and ❌ in tables (database feature support,
// permissions, data types) and in the lists that explain them. Emoji look
// different on each OS, so this swaps them for Metabase's own `check` and
// `close` icons (metabase/frontend/src/metabase/ui/components/icons/Icon/icons)
// with a visually hidden Yes/No for screen readers and copied text. Code keeps
// its emoji: developers-guide/frontend.md has them in comments, and
// troubleshooting-guide/docker.md in log output. Styled in src/styles/docs.css.

const CHECK_PATH =
  "M13.5762 3.34151C13.9399 3.65973 13.9767 4.21252 13.6585 4.5762L6.65852 12.5762C6.49134 12.7673 6.24942 12.8763 5.99555 12.875C5.74168 12.8737 5.50089 12.7622 5.33567 12.5695L2.33567 9.06945C2.02117 8.70254 2.06366 8.15016 2.43057 7.83566C2.79748 7.52117 3.34987 7.56366 3.66437 7.93057L6.00683 10.6635L12.3415 3.42382C12.6597 3.06014 13.2125 3.02329 13.5762 3.34151Z";
const CLOSE_PATH =
  "M4.53 3.47a.75.75 0 0 0-1.06 1.06L6.94 8l-3.47 3.47a.75.75 0 1 0 1.06 1.06L8 9.06l3.47 3.47a.75.75 0 1 0 1.06-1.06L9.06 8l3.47-3.47a.75.75 0 0 0-1.06-1.06L8 6.94 4.53 3.47z";

const MARKS: Record<string, { status: string; label: string; path: string }> = {
  "\u2705": { status: "yes", label: "Yes", path: CHECK_PATH },
  "\u274C": { status: "no", label: "No", path: CLOSE_PATH },
};

// Either emoji, with the optional emoji-presentation selector after it.
const MARK_RE = /(\u2705|\u274C)\uFE0F?/g;
const CODE_TAGS = new Set(["code", "pre", "kbd", "samp"]);

function el(
  tagName: string,
  properties: Element["properties"],
  children: ElementContent[] = [],
): Element {
  return { type: "element", tagName, properties, children };
}

function statusIcon(emoji: string): Element {
  const { status, label, path } = MARKS[emoji];
  return el("span", { className: ["status-icon", `status-icon-${status}`] }, [
    el(
      "svg",
      {
        viewBox: "0 0 16 16",
        width: 16,
        height: 16,
        fill: "currentColor",
        ariaHidden: "true",
        focusable: "false",
      },
      [el("path", { d: path })],
    ),
    el("span", { className: ["tw:sr-only"] }, [{ type: "text", value: label }]),
  ]);
}

export const statusIconHastPlugin = defineHastPlugin({
  name: "status-icons",
  text(node, ctx) {
    const marks = [...node.value.matchAll(MARK_RE)];
    if (marks.length === 0) return;

    for (
      let p = ctx.parent(node);
      p && p.type === "element";
      p = ctx.parent(p)
    ) {
      if (CODE_TAGS.has(p.tagName)) return;
    }

    const parts: ElementContent[] = [];
    let last = 0;
    for (const mark of marks) {
      if (mark.index > last) {
        parts.push({ type: "text", value: node.value.slice(last, mark.index) });
      }
      parts.push(statusIcon(mark[1]));
      last = mark.index + mark[0].length;
    }
    if (last < node.value.length) {
      parts.push({ type: "text", value: node.value.slice(last) });
    }

    ctx.insertBefore(node, parts);
    ctx.removeNode(node);
  },
});
