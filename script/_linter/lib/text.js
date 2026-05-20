/**
 * Reading files and creating lines to check.
 */

// External libraries
const fs = require("fs");
const glob = require("glob");
const path = require("path");

/**
 * Is this path a file?
 */
function isFile(path) {
  return fs.existsSync(path) && fs.statSync(path).isFile();
}

/**
 * Suffixes identifying files to check.
 */
const VALID_FILE_TYPES = new Set([".md", ".html"]);

/**
 * Should the linter examine this file?
 * @param {String} path - The path of the file
 */
function validFile(filepath) {
  const fileType = path.extname(filepath);
  return VALID_FILE_TYPES.has(fileType);
}

/**
 * Create array of files to check.
 * @param {String} filePath - The path of the single file or the root directory.
 */
function listFiles(filePath) {
  filePath = path.resolve(filePath);
  // Single file.
  if (fs.statSync(filePath).isFile()) {
    return [filePath];
  }
  // Directory.
  return glob.sync(`${filePath}/**/*.*`);
}

/**
 * Checks if line is in a code block, and returns a boolean
 * @param {String} line - The text of a line to check
 * @param {Boolean} Code - Are we currently in the code block?
 */
function isCode(line, code) {
  // we are either entering or exiting a codeblock
  if (line.substring(0, 3) === "```") {
    return !code;
    // otherwise no change
  } else {
    return code;
  }
}

const TOC_CLASS = 'class="learn-toc"';

/**
 * Checks if line is in a table of contents, and returns a boolean
 * @param {String} line - The text of a line to check
 * @param {Boolean} code - Are we currently in the code block?
 */
function isTocEntry(line, tocEntry) {
  if (tocEntry && line.split(" ")[0] === "</div>") {
    return false;
  } else if (line.includes(TOC_CLASS)) {
    return true;
  } else {
    return tocEntry;
  }
}

/**
 * Checks if line is a heading, and returns a boolean
 * @param {String} line - The text of a line to check
 * @param {Boolean} code - Are we currently in the code block?
 * @returns {Boolean} code - Are we currently in the code block?
 */
function isHeading(line, code) {
  // if we're in a code block, it's not a heading
  return line.charAt(0) == "#" && code == false;
}

/**
 * Returns an array of lines with file (path), text, issues, and other metadata for each line
 * @param {String} filepath - The path of the file (or directory)
 * @returns {Object} - Decorated line object
 */
function createLines(filepath) {
  // Read the file and return a string to parse
  filepath = path.resolve(filepath);
  let fileText = "";
  try {
    fileText = fs.readFileSync(filepath, "utf8");
  } catch (err) {
    console.error("Failed to read file:", filepath, err);
    process.exit(1);
  }

  // At start of a file, we aren't in a table of contents or codeblock
  let code = false;
  let tocEntry = false;
  let heading = false;

  // Return array of lines decorated with metadata
  return fileText.split("\n").map((line, idx) => {
    // update enclosed values
    code = isCode(line, code);
    heading = isHeading(line, code);
    tocEntry = isTocEntry(line, tocEntry);
    // Return line object initialized with empty issues array
    return {
      file: filepath,
      text: line,
      num: idx + 1,
      code: code,
      heading: heading,
      tocEntry: tocEntry,
      issues: [],
    };
  });
}

module.exports = {
  createLines,
  isFile,
  isHeading,
  listFiles,
  validFile
};
