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
    console.log("COMPUTE!");
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
