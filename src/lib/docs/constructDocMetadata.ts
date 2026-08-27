import path from "node:path";
import toTitleCase from "titlecase";

const ACRONYMS = [
  "API",
  "AWS",
  "DB",
  "GTAP",
  "JMX",
  "JWT",
  "LDAP",
  "RDS",
  "SAML",
  "SQL",
  "SSL",
  "SSO",
];

function formatDocTitle(filename: string) {
  filename = filename.replace(".md", "");
  filename = filename.replace(/-/g, " ");
  filename = toTitleCase(filename);
  return filename
    .split(" ")
    .map((word) => {
      const wordIndex = ACRONYMS.findIndex(
        (acronym) => acronym.toUpperCase() === word.toUpperCase(),
      );
      if (wordIndex > -1) {
        return ACRONYMS[wordIndex];
      }

      return word;
    })
    .join(" ");
}

function constructSourceUrl(path: string) {
  const baseUrl = "https://github.com/metabase/metabase/blob/master/";
  const source = path.split("/");
  source.splice(0, 1);
  return baseUrl + source.join("/");
}

export type DocMetadata = {
  version: string;
  has_magic_breadcrumbs: true;
  show_category_breadcrumb: boolean;
  show_title_breadcrumb: boolean;
  category: string;
  title: string;
  source_url: string;
  layout: "docs" | "new-docs";
  permalink?: string;
};

// The `page` shape passed to doc layouts: metadata plus the resolved page URL.
export type DocPage = DocMetadata & { url: string };

export function constructDocMetadata(
  docPath: string,
  version: string,
): DocMetadata {
  const versionNumber = parseInt(version.split(".").pop() || "", 10);
  const metadata: Partial<DocMetadata> = {
    version,
    has_magic_breadcrumbs: true,
    // We default to showing both category and title breadcrumbs, then toggle either a category and/or title breadcrumb in certain scenarios
    // For documentation TOC pages, we _only_ use the title in the breadcrumb
    // For _category_ TOC pages (one level below the root), we only use the category in the breadcrumb
    show_category_breadcrumb: true,
    show_title_breadcrumb: true,
  };

  // Remove prefixes to docs directory, making all paths below relative
  const pathArray = docPath.split("/");
  pathArray.splice(0, 2);

  // #breadcrumb and title/category logic
  if (pathArray.length === 1) {
    metadata.show_category_breadcrumb = false;
    metadata.category = "Table of Contents";
    metadata.title = formatDocTitle(pathArray[0]);
  } else {
    if (pathArray[0] === "faq") metadata.category = "FAQ";
    else metadata.category = toTitleCase(pathArray[0]).replace(/-/g, " ");
    metadata.title = formatDocTitle(pathArray[pathArray.length - 1]);
  }

  // MOST categories use start.md, except for the troubleshooting guide :)
  if (pathArray.length > 1 && pathArray[1].match(/^(index|start)\.md$/))
    metadata.show_title_breadcrumb = false;

  metadata.source_url = constructSourceUrl(docPath);
  metadata.layout = versionNumber > 43 ? "new-docs" : "docs";

  if (path.basename(docPath, ".md") === "README") {
    metadata.permalink =
      "/" + path.join("docs", version, "index.html").split(path.sep).join("/");
  }

  return metadata as DocMetadata;
}
