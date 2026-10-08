import fs from "node:fs";
import path from "node:path";
import { DOCS_SRC_ROOT, METABASE_REPO_PATH } from "@/constants";
import { parseDocUrl } from "@/lib/docs/resolveDoc";
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

const descendants = (node: NavNode): NavNode[] =>
  node.pages?.flatMap((child) => [child, ...descendants(child)]) ?? [];

const isDocsUrl = (url: string) => url.startsWith("/docs/");

// Tab target for a category: prefer a docs section with sub-pages, then any
// docs url, then anything. Categories often open with /learn links or
// chrome-less pages like the API reference.
export const getLandingUrl = (node: NavNode): string | undefined => {
  if (node.url) return node.url;
  const linked = descendants(node).filter(
    (n): n is NavNode & { url: string } => !!n.url,
  );
  return (
    linked.find((n) => isDocsUrl(n.url) && n.pages?.length) ??
    linked.find((n) => isDocsUrl(n.url)) ??
    linked[0]
  )?.url;
};

// For pages the nav doesn't list (about a third of the docs): the category
// that lists the most pages from the page's directory, or else from the
// nearest parent directory that has any. Ties go to the earlier category.
// It stops at the version root, so the docs home and pages outside a version
// (/docs/all, 404) get none.
export const getCategoryByDirectory = (
  nav: Nav,
  pageUrl: string,
): NavNode | undefined => {
  const version = parseDocUrl(pageUrl)?.version;
  if (!version) return undefined;
  const root = `/docs/${version}/`;

  for (
    let dir = pageUrl.slice(0, pageUrl.lastIndexOf("/") + 1);
    dir.length > root.length;
    dir = dir.slice(0, dir.lastIndexOf("/", dir.length - 2) + 1)
  ) {
    let best: NavNode | undefined;
    let bestCount = 0;
    for (const category of nav.categories) {
      const count = [category, ...descendants(category)].filter((node) =>
        node.url?.split("#")[0].startsWith(dir),
      ).length;
      if (count > bestCount) {
        best = category;
        bestCount = count;
      }
    }
    if (best) return best;
  }
  return undefined;
};

// Category containing pageUrl, or for pages the nav doesn't list, the one
// that lists their neighbors (getCategoryByDirectory). Undefined for the docs
// home, /docs/all and 404, so callers decide whether to fall back.
export const getActiveCategory = (
  nav: Nav,
  pageUrl: string,
): NavNode | undefined =>
  nav.categories.find((category) => containsUrl(category, pageUrl)) ??
  getCategoryByDirectory(nav, pageUrl);

type NavLink = { name: string; url: string };

// The pages before and after pageUrl in reading order: the category's nav,
// depth first. Only docs pages count, once each; links to a section of a
// page (`#…`) and to other sites are skipped. Empty for pages the category
// doesn't list.
export const getPrevNext = (
  category: NavNode | undefined,
  pageUrl: string,
): { prev?: NavLink; next?: NavLink } => {
  if (!category) return {};

  const pages: NavLink[] = [];
  const seen = new Set<string>();
  for (const { name, url } of [category, ...descendants(category)]) {
    if (!url || !isDocsUrl(url) || url.includes("#") || seen.has(url)) continue;
    seen.add(url);
    pages.push({ name, url });
  }
  const index = pages.findIndex((page) => page.url === pageUrl);
  if (index === -1) return {};

  return { prev: pages[index - 1], next: pages[index + 1] };
};

// Header tabs and the drawer's section list, with the page's category
// (getActiveCategory) marked. A category with no linked pages has nowhere to
// go, so it gets no entry.
export type Section = { name: string; href: string; active: boolean };

export const getSections = (nav: Nav, active?: NavNode): Section[] =>
  nav.categories.flatMap((category) => {
    const href = getLandingUrl(category);
    return href
      ? [{ name: category.name, href, active: category === active }]
      : [];
  });

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
  nav: Nav,
  category: string,
): string | undefined => {
  const target = category.toLowerCase();
  return nav.categories
    .flatMap((c) => c.pages ?? [])
    .find(
      (node) =>
        !!node.url && !!node.pages && node.name.toLowerCase() === target,
    )?.url;
};
