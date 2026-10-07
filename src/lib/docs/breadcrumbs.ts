// The trail above a doc page in the breadcrumb bar (Breadcrumb.astro) and
// its structured data (jsonLd.ts): the version's docs home, then the page's
// category, which comes from its top-level directory (constructDocMetadata).
export type Crumb = { name: string; url?: string };

type BreadcrumbPage = {
  url: string;
  title?: string;
  category?: string;
  show_category_breadcrumb?: boolean;
};

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Most categories open on their start.md; the troubleshooting guide on its
// index, and the API reference has its own landing page.
const categoryLandingUrl = (version: string, category: string) => {
  const slug = slugify(category);
  if (slug === "troubleshooting-guide") return `/docs/${version}/${slug}/`;
  if (slug === "api") return `/docs/${version}/api-documentation`;
  return `/docs/${version}/${slug}/start`;
};

export const getDocBreadcrumbs = (page: BreadcrumbPage): Crumb[] => {
  // The URL's version segment: "latest" on latest pages, so the trail stays
  // on /docs/latest/.
  const version = page.url.split("/")[2];
  const home = { name: "Home", url: `/docs/${version}/` };
  const category = page.category ?? "";

  // A README is a category's table of contents: name the category, but
  // don't link it to itself.
  if (page.title === "README") return [home, { name: category }];
  if (!page.show_category_breadcrumb) return [home];
  return [home, { name: category, url: categoryLandingUrl(version, category) }];
};
