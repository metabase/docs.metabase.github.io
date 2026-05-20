/**
 * Reads checks from the config file and maps checks to functions.
 */
const path = require("path");
const disabledPrefix = "_";

function createValidator(prefix) {
  return (check) => check.charAt(0) != prefix;
}

// Check for disabled checks
const isEnabled = createValidator(disabledPrefix);

// Checks that read line by line, not file by file.
const lineCheckSet = new Set(["toc"]);

function commands(options) {
  return options.config.checks.reduce((accum, name) => {
    const checkPath = require(path.join(__dirname, `../lib/checks/${name}.js`));
    accum[name] = checkPath.check;
    return accum;
  }, {});
}
module.exports = {
  commands,
  isEnabled,
  lineCheckSet,
};
