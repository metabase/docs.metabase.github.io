/*
  Basic script we can use to modify frontmatter in Markdown files.
*/

const yaml = require("yamljs");
const fs = require("fs");
const glob = require("glob");
const path = require("path");
const matter = require("gray-matter");

function stringifyDataAndContent(data, content) {
  const d = yaml.stringify(data);
  const page = content.trimLeft();
  return `---\n${d}---\n\n${page}`;
}

function addKeyValues(dir, key, value) {
  const folderPath = path.resolve(`_docs/${dir}`);
  console.log("Updating frontmatter links in:", folderPath);
  console.log(`Adding ${key}: "${value}" to frontmatter."`);
  const allFilePaths = glob.sync(`${folderPath}/**/*.md`);

  allFilePaths.forEach((filePath) => {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { content, data } = matter(fileContent);
    // Trim space buffering frontmatter;
    // we'll add it back later in stringifyDataAndContent
    data[key] = value;
    fs.writeFileSync(filePath, stringifyDataAndContent(data, content));
  });
}

const configPath = path.resolve("_config.yml");
const config = yaml.load(configPath);

const newVersions = new Set(["master", "v0.44"]);
const versionsToUpdate = config.available_versions.filter((version) => {
  return !newVersions.has(version);
});

console.log("versionsToUpdate", versionsToUpdate);

versionsToUpdate.forEach((version) => {
  addKeyValues(version, "layout", "docs");
});
