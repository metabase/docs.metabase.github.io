// Postprocessing for latest directory

const path = require("path");
const fs = require("fs");
const matter = require("gray-matter");
const { canBeProcessedByFrontmatter } = require("./utils");

// Add metadata to the frontmatter
function addFrontmatter(directory, frontmatter) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      addFrontmatter(filePath, frontmatter);
    } else if (canBeProcessedByFrontmatter(filePath)) {
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);
      // Merge the keys with the existing frontmatter.
      // Will overwrite existing keys with the same name.
      const updatedData = Object.assign(data, frontmatter);
      const updatedFileContents = matter.stringify(content, updatedData);
      fs.writeFileSync(filePath, updatedFileContents, "utf8");
    }
  }
}

module.exports = { addFrontmatter };
