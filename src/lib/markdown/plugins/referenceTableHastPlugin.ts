import type { Element, ElementContent, Text } from "hast";
import { defineHastPlugin } from "satteri";
import {
  childElements,
  findAllDescendants,
  findFirstDescendant,
  isElement,
} from "./hastUtils";

// Reference tables (Property / Type / Description) come from generators in the
// metabase repo: the web-component attribute snippets
// (docs/embedding/eajs/snippets/*.md) and the typedoc SDK snippets
// (docs/embedding/sdk/api/snippets/*.md). Both pack structured facts into the
// Description cell as `<br>`-separated lines after a `---` rule
// (`Optional`, `Default: ...`, `Possible values: ...`, `Available in ...`),
// and typedoc marks optional props with a trailing `?` on the name.
//
// This plugin tags such tables `table-reference`, lifts the metadata lines
// into a `div.prop-meta` block, wraps the type in `div.prop-type`, moves each
// row's `<a id>` anchor onto the `<tr>` and adds a hover permalink. Layout
// for those hooks lives in public/docs/css/docs-tables.css. Tables whose
// header row doesn't match are left untouched.
//
// By the time hast plugins run, inline HTML is opaque `raw` nodes: `<br>` is
// one, and `<a id="…"></a>` is two (`<a id="…">` then `</a>`), never an element
// with children. Smartypants turns the `---` rule into an em dash, so the rule
// is matched in both forms. Source nodes are read-only (see hastUtils.ts), so
// every edit builds a new node and applies it through `ctx`.

type RawNode = { type: "raw"; value: string };
type Node = ElementContent | RawNode;

const NAME_HEADERS = new Set(["property", "parameter", "name", "prop"]);
const BR_RE = /^<br\s*\/?>$/i;
const RULES = new Set(["---", "\u2014"]);
const ANCHOR_OPEN_RE = /^<a\s+id=["']([^"']+)["']\s*>$/i;
const ANCHOR_CLOSE_RE = /^<\/a>$/i;
const FLAG_RE = /^(optional|required)\.?$/i;
const AVAILABLE_RE = /^Available in\s+/i;
const LABEL_RE = /^([A-Z][\w ]{0,30}?):\s*/;
const SHORT_TYPE_LENGTH = 24;

function isRaw(node: Node): node is RawNode {
  return node.type === "raw";
}

function isText(node: Node): node is Text {
  return node.type === "text";
}

function isBr(node: Node | undefined): boolean {
  return !!node && isRaw(node) && BR_RE.test(node.value.trim());
}

function isBlank(node: Node): boolean {
  return isText(node) && node.value.trim() === "";
}

function el(
  tagName: string,
  properties: Record<string, unknown>,
  children: Node[] = [],
): Element {
  return { type: "element", tagName, properties, children } as Element;
}

function text(value: string): Text {
  return { type: "text", value };
}

function withChildren(node: Element, children: Node[]): Element {
  return { ...node, children } as Element;
}

function textOf(nodes: Node[]): string {
  return nodes
    .map((n) =>
      isText(n) ? n.value : isElement(n) ? textOf(n.children as Node[]) : "",
    )
    .join("");
}

function classNames(node: Element): unknown[] {
  return Array.isArray(node.properties?.className)
    ? (node.properties.className as unknown[])
    : [];
}

/** Split nodes on `<br>`, dropping whitespace-only lines. */
function splitOnBr(nodes: Node[]): Node[][] {
  const lines: Node[][] = [[]];
  for (const n of nodes) {
    if (isBr(n)) lines.push([]);
    else lines[lines.length - 1].push(n);
  }
  return lines.filter((line) => !line.every(isBlank));
}

/** Find the `<br>—<br>` rule and split a description into body and metadata lines. */
function splitDescription(
  children: Node[],
): { body: Node[]; meta: Node[][] } | undefined {
  for (let i = 1; i < children.length - 1; i++) {
    const n = children[i];
    if (
      isText(n) &&
      RULES.has(n.value.trim()) &&
      isBr(children[i - 1]) &&
      isBr(children[i + 1])
    ) {
      return {
        body: children.slice(0, i - 1),
        meta: splitOnBr(children.slice(i + 2)),
      };
    }
  }
  return undefined;
}

function flagItem(flag: string): Element {
  return el(
    "div",
    { className: ["prop-meta-item", "prop-meta-flag", `is-${flag}`] },
    [text(flag.charAt(0).toUpperCase() + flag.slice(1))],
  );
}

function withoutTrailingPeriod(nodes: Node[]): Node[] {
  const last = nodes.at(-1);
  if (!last || !isText(last)) return nodes;
  return [...nodes.slice(0, -1), text(last.value.replace(/\.\s*$/, ""))];
}

function labeledItem(label: string, value: Node[]): Element {
  return el("div", { className: ["prop-meta-item"] }, [
    el("span", { className: ["prop-meta-label"] }, [text(label)]),
    el(
      "span",
      { className: ["prop-meta-value"] },
      withoutTrailingPeriod(value),
    ),
  ]);
}

/** Turn one metadata line into a `.prop-meta-item`. */
function metaItem(line: Node[]): Element {
  const plain = textOf(line).trim();
  const flag = FLAG_RE.exec(plain);
  if (flag) return flagItem(flag[1].toLowerCase());

  const first = line[0];
  if (first && isText(first)) {
    if (AVAILABLE_RE.test(first.value)) {
      const rest = first.value.replace(AVAILABLE_RE, "");
      return labeledItem("Available in", [text(rest), ...line.slice(1)]);
    }
    const labeled = LABEL_RE.exec(first.value);
    if (labeled) {
      const rest = first.value.slice(labeled[0].length);
      const value: Node[] = rest
        ? [text(rest), ...line.slice(1)]
        : line.slice(1);
      return labeledItem(labeled[1], value);
    }
  }
  return el("div", { className: ["prop-meta-item"] }, line);
}

/** Strip the row anchor from a name cell; returns its id and the remaining nodes. */
function extractAnchor(nodes: Node[]): { id?: string; rest: Node[] } {
  let id: string | undefined;
  const rest: Node[] = [];
  for (const n of nodes) {
    if (isRaw(n)) {
      const open = ANCHOR_OPEN_RE.exec(n.value.trim());
      if (open && !id) {
        id = open[1];
        continue;
      }
      if (id && ANCHOR_CLOSE_RE.test(n.value.trim())) continue;
    }
    rest.push(n);
  }
  while (rest.length && isBlank(rest[0])) rest.shift();
  return { id, rest };
}

/** Fold typedoc's array suffix into the code span: `` `string`[] `` → `string[]`. */
function foldArraySuffix(nodes: Node[]): Node[] {
  const out: Node[] = [];
  for (const n of nodes) {
    const prev = out[out.length - 1];
    const suffix = isText(n) ? /^(\[\])+/.exec(n.value)?.[0] : undefined;
    if (suffix && prev && isElement(prev) && prev.tagName === "code") {
      out[out.length - 1] = withChildren(prev, [
        ...prev.children,
        text(suffix),
      ]);
      const rest = (n as Text).value.slice(suffix.length);
      if (rest) out.push(text(rest));
    } else {
      out.push(n);
    }
  }
  return out;
}

/** Strip typedoc's trailing `?` from the name's code span: `` `foo?` `` → `foo`. */
function stripOptionalMarker(nodes: Node[]): {
  nodes: Node[];
  optional: boolean;
} {
  const idx = nodes.findIndex((n) => isElement(n) && n.tagName === "code");
  const code = nodes[idx] as Element | undefined;
  const last = code?.children.at(-1);
  if (!code || !last || !isText(last) || !last.value.endsWith("?")) {
    return { nodes, optional: false };
  }
  const stripped = withChildren(code, [
    ...code.children.slice(0, -1),
    text(last.value.slice(0, -1)),
  ]);
  return {
    nodes: [...nodes.slice(0, idx), stripped, ...nodes.slice(idx + 1)],
    optional: true,
  };
}

function permalink(id: string): Element {
  return el(
    "a",
    {
      className: ["table-reference-anchor"],
      href: `#${id}`,
      ariaLabel: `Link to ${id}`,
    },
    [text("#")],
  );
}

export const referenceTableHastPlugin = defineHastPlugin({
  name: "reference-table",
  element: {
    filter: ["table"],
    visit(table, ctx) {
      const thead = findFirstDescendant(table, "thead");
      const headerRow = thead
        ? findFirstDescendant(thead, "tr")
        : findFirstDescendant(table, "tr");
      if (!headerRow) return;

      const headers = childElements(headerRow, ["th", "td"]).map((c) =>
        ctx.textContent(c).trim().toLowerCase(),
      );
      const isReference =
        NAME_HEADERS.has(headers[0] ?? "") &&
        headers[1] === "type" &&
        (headers.length === 2 ||
          (headers.length === 3 && headers[2] === "description"));
      if (!isReference) return;

      ctx.setProperty(table, "className", [
        ...classNames(table),
        "table-reference",
      ]);

      for (const tr of findAllDescendants(table, "tr")) {
        if (tr === headerRow) continue;
        const [nameCell, typeCell, descCell] = childElements(tr, ["td"]);
        if (!nameCell) continue;

        // Name cell: anchor onto the row, permalink after the name. The `?`
        // only comes off when there is a description cell to show the
        // Optional flag in; a two-column table keeps it.
        const anchor = extractAnchor(nameCell.children as Node[]);
        const name = descCell
          ? stripOptionalMarker(anchor.rest)
          : { nodes: anchor.rest, optional: false };
        if (anchor.id) {
          ctx.setProperty(tr, "id", anchor.id);
          name.nodes.push(permalink(anchor.id));
        }
        ctx.replaceNode(
          nameCell,
          el("td", { ...(nameCell.properties ?? {}) }, name.nodes),
        );

        // Type cell: a block wrapper so CSS can cap the column width. Short
        // types (`string | number`) are flagged so they never wrap; long
        // typedoc signatures wrap inside the cap instead.
        if (typeCell) {
          const typeNodes = foldArraySuffix(typeCell.children as Node[]);
          const isShort = textOf(typeNodes).trim().length <= SHORT_TYPE_LENGTH;
          ctx.replaceNode(
            typeCell,
            el("td", { ...(typeCell.properties ?? {}) }, [
              el(
                "div",
                { className: ["prop-type", ...(isShort ? ["is-short"] : [])] },
                typeNodes,
              ),
            ]),
          );
        }

        // Description cell: `<br>—<br>` metadata lines → `.prop-meta`.
        if (!descCell) continue;
        const split = splitDescription(descCell.children as Node[]);
        if (!split && !name.optional) continue;

        const items: Element[] = [];
        if (name.optional) items.push(flagItem("optional"));
        for (const line of split?.meta ?? []) {
          if (name.optional && FLAG_RE.test(textOf(line).trim())) continue;
          items.push(metaItem(line));
        }
        const body = split ? split.body : (descCell.children as Node[]);
        const children: Node[] = [
          el("div", { className: ["prop-desc"] }, body),
        ];
        if (items.length) {
          children.push(el("div", { className: ["prop-meta"] }, items));
        }
        ctx.replaceNode(
          descCell,
          el("td", { ...(descCell.properties ?? {}) }, children),
        );
      }
    },
  },
});
