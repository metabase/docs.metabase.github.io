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

// Category containing pageUrl; undefined for pages outside the nav (home,
// /docs/all, 404), so callers decide whether to fall back.
export const getActiveCategory = (
  nav: Nav,
  pageUrl: string,
): NavNode | undefined =>
  nav.categories.find((category) => containsUrl(category, pageUrl));

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
