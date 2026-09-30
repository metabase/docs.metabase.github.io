const MARKDOWN_LINK_REGEX = /\[(.+?)\]\((.+?)\)/gim;
const FOOTER_LINK_REGEX = /^\[(.+?)\]:\s+(.+?)\n/gim;

const extractUrl = (match: string): string | null => {
  const bodyMatch = match.match(/(?<=\[(.+?)\]\()(.+?)(?=\))/gim);
  if (bodyMatch) {
    return bodyMatch[0].trim();
  }
  const footerMatch = match.match(/(?<=]: )(.+?)+/gim);
  if (footerMatch) {
    return footerMatch[0].trim();
  }
  return null;
};

const isRelativeUrl = (url: string): boolean =>
  !url.includes("http://") && !url.includes("https://");

const isMetabaseUrl = (url: string): boolean =>
  url.indexOf("metabase.") === 0 ||
  url.indexOf("://www.metabase.") === 4 ||
  url.indexOf("://www.metabase.") === 5 ||
  url.indexOf("://metabase.") === 4 ||
  url.indexOf("://metabase.") === 5;

const formatUrl = (url: string): string =>
  url
    // Remove extensions
    .replace(".md", "")
    .replace(".markdown", "")
    .replace(".html", "")
    .replace(".htm", "")
    // Remove metabase.com
    .replace("http://metabase.com", "")
    .replace("https://metabase.com", "")
    .replace("http://www.metabase.com", "")
    .replace("https://www.metabase.com", "");

const getReplacements = (
  matches: RegExpMatchArray | null,
): { match: string; updatedMatch: string }[] | null => {
  if (!matches) {
    return null;
  }
  return matches
    .map((match) => {
      const url = extractUrl(match);
      if (!url) {
        return null;
      }
      if (isRelativeUrl(url) || isMetabaseUrl(url)) {
        return { match, updatedMatch: match.replace(url, formatUrl(url)) };
      }
      return null;
    })
    .filter((replacement) => replacement !== null);
};

// Rewrites relative and metabase.com links (inline and footer-style) to site-relative
// paths by stripping file extensions and the metabase.com origin.
const reformatMarkdownUrls = (body: string): string => {
  // Trailing newline lets FOOTER_LINK_REGEX match a footer link on the last line; removed on return.
  let formattedBody = `${body}\n`;

  const bodyReplacements = getReplacements(
    formattedBody.match(MARKDOWN_LINK_REGEX),
  );
  bodyReplacements?.forEach(({ match, updatedMatch }) => {
    formattedBody = formattedBody.replace(match, updatedMatch);
  });

  const footerReplacements = getReplacements(
    formattedBody.match(FOOTER_LINK_REGEX),
  );
  footerReplacements?.forEach(({ match, updatedMatch }) => {
    formattedBody = formattedBody.replace(match, updatedMatch);
  });

  return formattedBody.slice(0, -1);
};

// Non-latest versions link to their own embedding docs rather than /latest.
const replaceVersionInUrls = (
  body: string,
  { version }: { version: string },
): string => body.replaceAll("/latest/embedding/", `/${version}/embedding/`);

// Makes a doc's links resolve on this site.
// Strips extensions and pins embedding links to the doc's version.
// Apply to any markdown that ends up in a doc page, including snippets.
export const rewriteDocLinks = (
  body: string,
  { version, latest }: { version: string; latest: boolean },
): string => {
  const reformatted = reformatMarkdownUrls(body);
  return latest ? reformatted : replaceVersionInUrls(reformatted, { version });
};
