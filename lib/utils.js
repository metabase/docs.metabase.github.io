const MARKDOWN_LINK_REGEX = /\[(.+?)\]\((.+?)\)/gim;
const FOOTER_LINK_REGEX = /^\[(.+?)\]:\s+(.+?)\n/gim;
const fs = require("fs");
const path = require("path");
const glob = require("glob");
const matter = require("gray-matter");
const yaml = require("yamljs");

function canBeProcessedByFrontmatter(filePath) {
  return path.extname(filePath) === ".md" || path.extname(filePath) === ".html"
}

function reformatMarkdownUrls(filePath, body) {
  let formattedBody = `${body}\n`;

  // "[text](url.md?query=something#hash=else)" => "[text](url?query=something#hash=else)"
  const bodyMatchesReplacements = getReplacements(
    filePath,
    formattedBody.match(MARKDOWN_LINK_REGEX),
  );
  if (bodyMatchesReplacements) {
    bodyMatchesReplacements.forEach(
      (replaceObj) =>
        (formattedBody = formattedBody.replace(
          replaceObj.match,
          replaceObj.updatedMatch,
        )),
    );
  }

  // "[text]: url.md?query=something#hash=else" => "[text]: url?query=something#hash=else"
  const footerMatchesReplacements = getReplacements(
    filePath,
    formattedBody.match(FOOTER_LINK_REGEX),
  );
  if (footerMatchesReplacements) {
    footerMatchesReplacements.forEach(
      (replaceObj) =>
        (formattedBody = formattedBody.replace(
          replaceObj.match,
          replaceObj.updatedMatch,
        )),
    );
  }

  return formattedBody;
}

function replaceVersionInUrls(content, { version }) {
  return content
    .replaceAll('/latest/embedding/', `/${version}/embedding/`)
}

function extractUrl(match) {
  // body
  let url = match.match(/(?<=\[(.+?)\]\()(.+?)(?=\))/gim);
  if (url) {
    return url[0].trim();
  }

  // footer
  url = match.match(/(?<=]: )(.+?)+/gim);
  if (url) {
    return url[0].trim();
  }

  return null;
}

function isRelativeUrl(url) {
  return url.indexOf("http://") === -1 && url.indexOf("https://") === -1;
}

function isMetabaseUrl(url) {
  // - metabase.com/<path>
  // - <protocol>://www.metabase.com/<path>
  // - <protocol>://metabase.com/<path>
  return !!(
    url.indexOf("metabase.") === 0 ||
    url.indexOf("://www.metabase.") === 4 ||
    url.indexOf("://www.metabase.") === 5 ||
    url.indexOf("://metabase.") === 4 ||
    url.indexOf("://metabase.") === 5
  );
}

function formatUrl(url) {
  // <url>.{md,markdown,html,htm}
  url = url
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

  return url;
}

function getReplacements(filePath, matches) {
  if (matches) {
    return matches
      .map((match) => {
        const url = extractUrl(match);
        if (url) {
          // Relative
          if (isRelativeUrl(url)) {
            return {
              match,
              updatedMatch: match.replace(url, formatUrl(url)),
            };
          }
          // Absolute + Metabase
          else if (isMetabaseUrl(url)) {
            // Has an extension?
            const urlPaths = url.match(/(?<=.com)(.*)/gim);
            if (urlPaths && urlPaths.length > 0) {
              // Error if there's an extension
              const [urlPath] = urlPaths;
              if (urlPath.indexOf(".") > -1) {
                console.error(
                  `Error:\n\t${filePath}\n\tMetabase url do not need extension: ${url}`,
                );
              }
            }
            return {
              match,
              updatedMatch: match.replace(url, formatUrl(url)),
            };
          }
        } else {
          console.warn(`Warning:\n\t${filePath}\n\turl not found: ${match}`);
        }

        return null;
      })
      .filter((match) => !!match);
  }

  return null;
}

/**
 * Lops off the last point so that point releases will overwrite (i.e., update) the
 * existing docs for that major release. So docs for 40.3 will update the existing docs for 40.0
 * @param {String} version
 * @returns {String}
 */
function squashVersion(version) {
  const versionPattern = new RegExp(/v\d+\.\d+./);
  if (version.search(versionPattern) < 0) {
    return version;
  } else {
    return version
      .split(".")
      .slice(0, 2)
      .join(".");
  }
}

function stringifyDataAndContent(data, content) {
  const isEmptyData = Object.keys(data).length === 0

  if (isEmptyData) {
    return content;
  }

  const d = yaml.stringify(data);
  return `---\n${d}---\n\n${content}`;
}

// Updates redirects so that instead of
// /docs/latest/file.md they redirect to their version
// number, e.g., /docs/v0.44/file.md
function updateRedirectsAndLinks(dir) {
  console.log("Updating links and redirects");
  const folderPath = path.resolve(dir);
  console.log("Updating links in:", folderPath);
  const allFilePaths = glob.sync(`${folderPath}/**/*.{md,markdown,html}`);

  allFilePaths.forEach((filePath) => {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { content, data } = matter(fileContent);
    // Trim space buffering frontmatter;
    // we'll add it back later in stringifyDataAndContent
    let contentUpdatedLinks = reformatMarkdownUrls(filePath, content.trim());

    if (dir !== "_docs/latest") {
      contentUpdatedLinks = replaceVersionInUrls(contentUpdatedLinks, {
        version: data.version
      })

      if (data.redirect_from) {
        data.redirect_from = data.redirect_from.map((rd) => {
          return rd.replace("/latest", `/${data.version}`);
        });
      }
    }
    fs.writeFileSync(
      filePath,
      stringifyDataAndContent(data, contentUpdatedLinks),
    );
  });
}

module.exports = {
  canBeProcessedByFrontmatter,
  reformatMarkdownUrls,
  squashVersion,
  stringifyDataAndContent,
  updateRedirectsAndLinks,
};
