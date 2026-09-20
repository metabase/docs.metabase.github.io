import type { Element } from "hast";

// Tree-walking helpers shared by the hast plugins. Satteri hands plugins
// read-only views of the tree; these only read.

export function isElement(node: { type: string }): node is Element {
  return node.type === "element";
}

/** First descendant element with the given tag, depth first. */
export function findFirstDescendant(
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

/** Every descendant element with the given tag, in document order. */
export function findAllDescendants(node: Element, tagName: string): Element[] {
  const results: Element[] = [];
  for (const child of node.children) {
    if (!isElement(child)) continue;
    if (child.tagName === tagName) results.push(child);
    results.push(...findAllDescendants(child, tagName));
  }
  return results;
}

/** Direct child elements whose tag is one of `tagNames`. */
export function childElements(node: Element, tagNames: string[]): Element[] {
  return node.children.filter(
    (child): child is Element =>
      isElement(child) && tagNames.includes(child.tagName),
  );
}
