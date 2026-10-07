import type { Crumb } from "@/lib/docs/breadcrumbs";
import { toVersionLabel } from "@/lib/docs/versionSupport";

// schema.org data for a doc page (head.html's `json_ld`): the page as a
// TechArticle of a given Metabase version, and its breadcrumb trail. Search
// engines and agents read it without parsing the page chrome.
type JsonLdPage = {
  title: string;
  url: string;
  version?: string;
  meta_description?: string;
};

export const buildDocJsonLd = ({
  site,
  page,
  breadcrumbs,
  docUrls,
}: {
  site: URL;
  page: JsonLdPage;
  breadcrumbs: Crumb[];
  /** Crumbs that link to a page that doesn't exist are left out. */
  docUrls: ReadonlySet<string>;
}): string => {
  const absolute = (url: string) => new URL(url, site).href;

  const trail = breadcrumbs.filter(
    (crumb): crumb is Required<Crumb> => !!crumb.url && docUrls.has(crumb.url),
  );
  // A category's landing page would otherwise end the trail twice.
  if (trail.at(-1)?.url !== page.url) {
    trail.push({ name: page.title, url: page.url });
  }

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: page.title,
        description: page.meta_description,
        url: absolute(page.url),
        inLanguage: "en-US",
        version: page.version && toVersionLabel(page.version),
        isPartOf: {
          "@type": "WebSite",
          name: "Metabase Documentation",
          url: absolute("/docs/latest/"),
        },
        publisher: {
          "@type": "Organization",
          name: "Metabase",
          url: absolute("/"),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: trail.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: absolute(crumb.url),
        })),
      },
    ],
  };

  // Inside <script>, a "</script>" in a title or description would end the
  // element early.
  return JSON.stringify(data).replaceAll("<", "\\u003c");
};
