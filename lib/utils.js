const fs = require("fs");
const path = require("path");
const glob = require("glob");
const matter = require("gray-matter");
const yaml = require("yamljs");
const { reformatMarkdownUrls } = require('../src/lib/docs/reformatMarkdownUrls');

function canBeProcessedByFrontmatter(filePath) {
  return path.extname(filePath) === ".md" || path.extname(filePath) === ".html"
}

function replaceVersionInUrls(content, { version }) {
  return content
    .replaceAll('/latest/embedding/', `/${version}/embedding/`)
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
  squashVersion,
  stringifyDataAndContent,
  updateRedirectsAndLinks,
};
