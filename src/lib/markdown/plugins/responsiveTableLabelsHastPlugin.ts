import { defineHastPlugin } from "satteri";
import type { Element, ElementContent } from "hast";

// Ported from _plugins/jekyll_responsive_table_labels_plugin.rb: the site's
// responsive CSS shows a `data-label` before each `<td>`'s content when a
// table collapses to a stacked layout on narrow screens. Kramdown/Jekyll
// stamped that attribute on with a post-render Nokogiri pass; Sätteri has no
// such pass, so this plugin stamps it on during the hast phase instead.
function isElement(node: ElementContent): node is Element {
  return node.type === "element";
}

function findFirstDescendant(
  node: Element,
  tagName: string,
): Element | undefined {
  for (const child of node.children) {
    if (!isElement(child)) continue;
    if (child.tagName === tagName) return child;
    const found = findFirstDescendant(child, tagName);
    if (found) return found;
  }
  return undefined;
}

function findAllDescendants(node: Element, tagName: string): Element[] {
  const results: Element[] = [];
  for (const child of node.children) {
    if (!isElement(child)) continue;
    if (child.tagName === tagName) results.push(child);
    results.push(...findAllDescendants(child, tagName));
  }
  return results;
}

export const responsiveTableLabelsHastPlugin = defineHastPlugin({
  name: "responsive-table-labels",
  element: {
    filter: ["table"],
    visit(node, ctx) {
      const thead = findFirstDescendant(node, "thead");
      const headerRow = thead
        ? findFirstDescendant(thead, "tr")
        : findFirstDescendant(node, "tr");
      if (!headerRow) return;

      const headerTags = thead ? ["th"] : ["th", "td"];
      const headerCells = headerRow.children.filter(
        (child): child is Element =>
          isElement(child) && headerTags.includes(child.tagName),
      );
      if (headerCells.length === 0) return;

      const headers = headerCells.map((cell) => ctx.textContent(cell).trim());

      for (const tr of findAllDescendants(node, "tr")) {
        const dataCells = tr.children.filter(
          (child): child is Element =>
            isElement(child) && child.tagName === "td",
        );
        dataCells.forEach((td, idx) => {
          const label = headers[idx];
          if (!label) return;
          ctx.setProperty(td, "dataLabel", label);
        });
      }
    },
  },
});
