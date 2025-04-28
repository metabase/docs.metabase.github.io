const fs = require('fs');

function moveCloudDocsToLatest() {
  const sourceDir = '_cloud-docs';
  const destDir = '_docs/latest/cloud';

  console.log("Copying cloud docs from _cloud-docs to _docs/latest/cloud");
  console.log("If you need to update cloud docs, edit the files in _cloud-docs.");

  // Copy the source directory to the destination directory
  fs.cpSync(sourceDir, destDir, { recursive: true });
}

module.exports = {
  moveCloudDocsToLatest
};
