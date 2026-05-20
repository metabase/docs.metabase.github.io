const text = require("../lib/text");

test("/wizard/spell.md is a valid file", () => {
  expect(text.validFile("/wizard/spell.md")).toBe(true);
});

test("/wizard/spell.clj is invalid", () => {
  expect(text.validFile("/wizard/spell.clj")).toBe(false);
});

const filesToCheck = text.listFiles("./script/_linter/tests/sample-dir");

test("listFiles lists 4 files", () => {
  expect(filesToCheck).toHaveLength(4);
});

test("listFiles lists the correct files", () => {
  expect(filesToCheck.pop().split("/").pop()).toBe("custom-destinations.md");
});

const heading = `## I am a heading`;

test("isHeading can identify a heading", () => {
  const headingFound = text.isHeading(heading, false);
  const comment = text.isHeading(heading, true);

  expect(headingFound).toBe(true);
  expect(comment).toBe(false);
});
