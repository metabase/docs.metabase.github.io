import fs from "node:fs";
import path from "node:path";
import { DOCS_SRC_ROOT, METABASE_REPO_PATH } from "@/constants";
import YAML from "yamljs";

export type NavNode = {
  name: string;
  url?: string;
  pages?: NavNode[];
};

export type Nav = { categories: NavNode[] };

export const containsUrl = (n: NavNode, targetUrl: string): boolean =>
  n.url === targetUrl ||
  (n.pages?.some((child) => containsUrl(child, targetUrl)) ?? false);

const isRelativeUrl = (url: string) => !/^(\/|[a-z][a-z0-9+.-]*:)/i.test(url);

const navCache: Record<string, Nav> = {};

export const getNavForVersion = (version: string): Nav => {
  const resolveUrls = (node: NavNode): NavNode => ({
    ...node,
    url:
      node.url && isRelativeUrl(node.url)
        ? `/docs/${version}/${node.url}`
        : node.url,
    pages: node.pages?.map(resolveUrls),
  });

  const computeNav = (): Nav => {
    const navPath = path.resolve(
      process.cwd(),
      DOCS_SRC_ROOT,
      METABASE_REPO_PATH ? "" : version,
      "util/data/nav.yml",
    );
    const navRaw: Nav = fs.existsSync(navPath)
      ? YAML.parse(fs.readFileSync(navPath, "utf8"))
      : { categories: [] };
    return { categories: navRaw.categories.map(resolveUrls) };
  };

  const shouldCache = import.meta.env.MODE !== "development";
  return shouldCache ? (navCache[version] ??= computeNav()) : computeNav();
};

// Depth-first search for the first node matching `predicate`.
export const findNavNode = (
  nodes: NavNode[] = [],
  predicate: (node: NavNode) => boolean,
): NavNode | undefined => {
  for (const node of nodes) {
    if (predicate(node)) return node;
    const match = findNavNode(node.pages, predicate);
    if (match) return match;
  }
};

// Finds the url of the nav section (a node with child pages) named `category`.
// Sections only live one level below the top-level categories.
export const getCategoryUrl = (
  version: string,
  category: string,
): string | undefined => {
  const target = category.toLowerCase();
  return getNavForVersion(version)
    .categories.flatMap((c) => c.pages ?? [])
    .find(
      (node) =>
        !!node.url && !!node.pages && node.name.toLowerCase() === target,
    )?.url;
};
