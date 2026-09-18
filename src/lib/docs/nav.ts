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

// A landing page for a nav node: its own url, else (depth-first among its
// descendants) the first docs section that has its own sub-pages, else the
// first docs url, else the first url of any kind. Categories often open with
// links to /learn or to chrome-less pages like the API reference, which make
// poor tab targets.
export const getLandingUrl = (node: NavNode): string | undefined => {
  if (node.url) return node.url;
  const nodes = descendants(node);
  const urls = nodes.map((n) => n.url).filter((url): url is string => !!url);
  return (
    nodes.find((n) => n.url && isDocsUrl(n.url) && n.pages?.length)?.url ??
    urls.find(isDocsUrl) ??
    urls[0]
  );
};

// The top-level category that contains `pageUrl`, falling back to the first
// category for pages outside the nav tree (docs home, /docs/all, 404).
export const getActiveCategory = (
  nav: Nav,
  pageUrl: string,
): NavNode | undefined =>
  nav.categories.find((category) => containsUrl(category, pageUrl)) ??
  nav.categories[0];

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
