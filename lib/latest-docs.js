// Update cloud docs and apply latest frontmatter
const fs = require("fs");
const path = require("path");

const { moveCloudDocsToLatest } = require("./cloud.js");
const { addFrontmatter } = require("./frontmatter.js");
const { updateRedirectsAndLinks } = require("./utils.js");

// Copy cloud docs and add latest frontmatter
moveCloudDocsToLatest();
updateRedirectsAndLinks("_docs/latest");
const frontmatter = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "./latest-frontmatter.json"), "utf8"),
);
addFrontmatter("_docs/latest", frontmatter);
