import toTitleCase from "titlecase";

// In local dev (METABASE_REPO_PATH set), the docsLatest collection reads
// docs/ straight out of a metabase checkout, so none of these fields have
// been baked into frontmatter yet by `script/docs` (see
// buildDocsMetadata/constructDocMetadata in ../../../lib/fetch-docs.js,
// which does the equivalent for the deployed site). This mirrors that
// defaulting logic so local /latest pages get real titles, categories, and
// breadcrumbs. Existing frontmatter always wins.
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

const formatDocTitle = (name: string): string =>
  toTitleCase(name.replace(/-/g, " "))
    .split(" ")
    .map((word) => {
      const acronym = ACRONYMS.find((a) => a.toUpperCase() === word.toUpperCase());
      return acronym ?? word;
    })
    .join(" ");

/**
 * @param docPath Path to the doc, relative to the metabase repo's `docs/`
 *   dir and without extension, e.g. "databases/connecting" or "README".
 */
export const buildRawDocMetadata = (
  docPath: string,
  data: Record<string, unknown>,
): Record<string, unknown> => {
  const pathArray = docPath.split("/");

  const metadata: Record<string, unknown> = {
    version: "latest",
    has_magic_breadcrumbs: true,
    show_category_breadcrumb: true,
    show_title_breadcrumb: true,
    layout: "new-docs",
    source_url: `https://github.com/metabase/metabase/blob/master/docs/${docPath}.md`,
  };

  if (pathArray.length === 1) {
    metadata.show_category_breadcrumb = false;
    metadata.category = "Table of Contents";
    metadata.title = formatDocTitle(pathArray[0]);
  } else {
    metadata.category =
      pathArray[0] === "faq"
        ? "FAQ"
        : toTitleCase(pathArray[0].replace(/-/g, " "));
    metadata.title = formatDocTitle(pathArray[pathArray.length - 1]);
  }

  if (pathArray.length > 1 && /^(index|start)$/.test(pathArray[1])) {
    metadata.show_title_breadcrumb = false;
  }

  if (pathArray[pathArray.length - 1] === "README") {
    metadata.permalink = "/docs/latest/index.html";
  }

  return { ...metadata, ...data };
};
