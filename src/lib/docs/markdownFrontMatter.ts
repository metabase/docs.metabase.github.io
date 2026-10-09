// The YAML front matter at the top of a doc's Markdown version
// (`[...slug].md.ts`): what the page is, which version it documents, and
// where its HTML lives, so the Markdown still says so once it's copied or
// fetched on its own. Each value is a JSON string, which YAML reads as a
// double-quoted scalar: no quoting rules to get wrong. Undefined fields are
// left out.
export const toFrontMatter = (
  fields: Record<string, string | undefined>,
): string => {
  const lines = Object.entries(fields).flatMap(([key, value]) =>
    value === undefined ? [] : [`${key}: ${JSON.stringify(value)}`],
  );
  return `---\n${lines.join("\n")}\n---\n\n`;
};
