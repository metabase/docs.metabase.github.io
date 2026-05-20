/**
 * Creates an issue by adding the kind and message to a line.
 * @param {Object} line - Line with text, file, and line number
 * @param {String} kind - The type of issue
 * @param {String} message - Test explaining the issue
 */
function create(line, kind, message) {
  return {
    file: line.file,
    message: message,
    kind: kind,
    num: line.num,
    text: line.text,
  };
}

module.exports = {
  create,
};
