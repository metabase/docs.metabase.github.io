/**
 * Run all checks on all files.
 */

// Our own utilities
const text = require("./text.js");
const cmd = require("./cmd.js");

/**
 * Examines all files in the supplied paths using a set of checks and returns the checked lines.
 * If a check finds an issue, it adds the issue to the line's issue array.
 * @param {Object} options - Data from command-line options.
 * @param {Object} checks - Array of names of checks to perform.
 * @param {Object} paths - Array of filepaths to check.
 */
function lintLines(options, paths) {
  options.cmds = cmd.commands(options);

  return (
    paths
      // grab lines from each file and decorate them with line number and other metadata
      .map((filename) => text.createLines(filename))
      .flat()

      // run all checks for each line
      .map((line) => {
        options.config.checks
          .filter((check) => cmd.lineCheckSet.has(check))
          .forEach((check) => options.cmds[check](options, line));
        return line;
      })

      // only return lines with issues
      .filter((line) => line.issues.length)
  );
}

module.exports = {
  lintLines,
};
