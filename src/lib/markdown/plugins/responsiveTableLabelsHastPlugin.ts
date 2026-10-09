import { defineHastPlugin } from "satteri";
import {
  childElements,
  findAllDescendants,
  findFirstDescendant,
} from "./hastUtils";

// Ported from _plugins/jekyll_responsive_table_labels_plugin.rb: the site's
// responsive CSS shows a `data-label` before each `<td>`'s content when a
// table collapses to a stacked layout on narrow screens. Kramdown/Jekyll
// stamped that attribute on with a post-render Nokogiri pass; Sätteri has no
// such pass, so this plugin stamps it on during the hast phase instead.
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
      const headerCells = childElements(headerRow, headerTags);
      if (headerCells.length === 0) return;

      const headers = headerCells.map((cell) => ctx.textContent(cell).trim());

      for (const tr of findAllDescendants(node, "tr")) {
        const dataCells = childElements(tr, ["td"]);
        dataCells.forEach((td, idx) => {
          const label = headers[idx];
          if (!label) return;
          ctx.setProperty(td, "dataLabel", label);
        });
      }
    },
  },
});
