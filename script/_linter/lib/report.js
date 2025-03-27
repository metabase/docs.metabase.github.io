/**
 * Order in which to print fields for verbose output.
 */
const VERBOSE_KEYS = ["kind", "file", "message", "num", "text"];

/**
 * Returns a function that prints errors if any, verbosely or not, and returns a status code.
 * {Object} lineResults - lines with issues.
 * {Object} frontMatterResults - front matter issues.
 */
function create(lineResults) {
  return function (verbose) {
    // if no results, return 0 and optional message
    if (lineResults.length === 0) {
      if (!verbose) {
        return 0;
      } else {
        console.log("No issues found. Linter failed successfully!");
        return 0;
      }
    }

    const errormsg = `Linter found at least one error.`;
    // print line-level results
    if (!verbose) {
      lineResults.forEach((line) => {
        line.issues.forEach((issue) => {
          console.log(`+${issue.num} ${issue.file}: ${issue.message}`);
        });
      });
    } else {
      lineResults.forEach((line) => {
        line.issues.forEach((issue) => {
          var dash = "-";
          VERBOSE_KEYS.forEach((key) => {
            console.log(`${dash} ${key}: ${issue[key]}`);
            dash = " ";
          });
        });
      });
    }
    throw new Error(errormsg);
  };
}

module.exports = {
  create,
};
