require('requireindex');

// Track frontmatter for current file
var state = {
  frontMatter: null
};

var transform = {
  /**
  * @args:
  *   text `str` the text from the given file
  * @returns:
  *   `[str]` a list of strings (one per each "logical file" in the file)
  **/

  preprocess: function(text) {
    state.frontMatter = null;

    // Check if the file begins with frontmatter declaration
    if (text.substring(0,3) === '---') {
      // Find end of frontmatter
      var matchedDashes = /^---[\r|\n|\r\n]/m.exec(text.slice(3));
      if (matchedDashes) {
        var dashStartIndex = matchedDashes.index;
        var sliceIndex = dashStartIndex + matchedDashes[0].length;
        state.frontMatter = text.slice(0, sliceIndex + 3);
        return [text.slice(state.frontMatter.length)];
      }
    }

    return [text];  // return an array of strings to lint
  },

  /**
  * @args:
  *   messages `Message[][]` A two-dimensional array of Message objects
  *     where each top-level array item contains array of lint messages related
  *     to the text that was returned in array from preprocess() method
  *   filename `str` The filename of the given file
  * @returns:
  *   `[Message]` a one-dimensional array of the retained messages
  **/

  postprocess: function(messages) {
    var flattenedMessages = messages[0],
      linesInFrontMatter,
      i;

    if (state.frontMatter) {
      linesInFrontMatter = state.frontMatter
        .split(/[\r|\n|\r\n]/)
        .length - 1;   // subtract 1 because frontmatter ends with newline

      for (i = 0; i < flattenedMessages.length; ++i) {
        flattenedMessages[i].line += linesInFrontMatter;
        if ('endLine' in flattenedMessages[i]) {
          flattenedMessages[i].endLine += linesInFrontMatter;
        }
      }
    }

    return flattenedMessages;
  },

  // Don't autofix lint errors
  supportsAutofix: false
}

module.exports = {
  // Specify that this processor transforms .js and .json files
  '.js': transform,
  '.json': transform,
};
