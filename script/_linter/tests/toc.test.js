const toc = require("../lib/checks/toc.js");

const text = require("../lib/text.js");
const path = require("path");
const testFile = path.resolve(
  "script/_linter/tests/sample-dir/secret-dir/custom-destinations.md"
);

const lines = text.createLines(testFile);

const results = lines
  .map((line) => toc.check([], line))
  .filter((l) => l.issues.length > 0);

test("toc finds issues with two lines in custom destinations.", () => {
  expect(results).toHaveLength(1);
});

test("Toc finds heading doesn't match link in table of contents on line 120 in custom destinations", () => {
  expect(results[0].issues.pop().num).toBe(120);
});
