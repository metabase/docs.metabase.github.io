import { getCategoryUrl, type Nav } from "@/lib/docs/nav";

// The trail above a doc page in the breadcrumb bar (Breadcrumb.astro) and
// its structured data (jsonLd.ts): the version's docs home, then the page's
// category, which comes from its top-level directory (constructDocMetadata).
export type Crumb = { name: string; url?: string };

type BreadcrumbPage = {
  url: string;
  category?: string;
  show_category_breadcrumb?: boolean;
};

// For categories the nav has no section for: most open on start.md; the
// troubleshooting guide on its index, and the API reference has its own
// landing page.
const fallbackCategoryPath = (dir: string) => {
  if (dir === "api") return "api-documentation";
  if (dir === "troubleshooting-guide") return `${dir}/`;
  return `${dir}/start`;
};

// `nav` is the page's version's (getNavForVersion): the category links to
// its nav section, which may not be its directory's start page.
export const getDocBreadcrumbs = (page: BreadcrumbPage, nav: Nav): Crumb[] => {
  // The URL's version segment ("latest" on latest pages, so the trail stays
  // on /docs/latest/), then the page's top-level directory.
  const [, , version, dir = ""] = page.url.split("/");
  const root = `/docs/${version}/`;
  const home = { name: "Home", url: root };

  if (!page.show_category_breadcrumb || !page.category) return [home];
  return [
    home,
    {
      name: page.category,
      url:
        getCategoryUrl(nav, page.category) ?? root + fallbackCategoryPath(dir),
    },
  ];
};
