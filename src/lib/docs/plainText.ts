// Plain text from a doc's rendered HTML, for places that can't hold markup:
// meta descriptions, structured data, the `.md` front matter.

const TAG_REGEX = /<[^>]*>/g;
const ENTITY_REGEX = /&(#x[0-9a-f]+|#\d+|[a-z]+);/gi;
const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  apos: "'",
  gt: ">",
  lt: "<",
  nbsp: " ",
  quot: '"',
};
// Callouts (plans, beta, notes) open many docs; they don't say what the page
// is about.
const BLOCKQUOTE_REGEX = /<blockquote\b[\s\S]*?<\/blockquote>/gi;
// Only plain paragraphs: the plans callout include is a <div> of classed <p>s.
const PARAGRAPH_REGEX = /<p>([\s\S]*?)<\/p>/gi;

const decodeEntity = (entity: string, name: string): string => {
  if (name.startsWith("#")) {
    const codePoint =
      name[1].toLowerCase() === "x"
        ? Number.parseInt(name.slice(2), 16)
        : Number.parseInt(name.slice(1), 10);
    return codePoint <= 0x10ffff ? String.fromCodePoint(codePoint) : entity;
  }
  return NAMED_ENTITIES[name.toLowerCase()] ?? entity;
};

export const htmlToText = (html: string): string =>
  html
    .replace(TAG_REGEX, "")
    .replace(ENTITY_REGEX, decodeEntity)
    .replace(/\s+/g, " ")
    .trim();

// The opening words of a doc's body (the HTML after its h1): its first
// paragraph with text, past any callouts. Paragraphs that hold only an image
// have no text, so they're skipped too.
export const toExcerpt = (html: string, words = 25): string | undefined => {
  const body = html.replace(BLOCKQUOTE_REGEX, "");
  const paragraph = [...body.matchAll(PARAGRAPH_REGEX)]
    .map(([, inner]) => htmlToText(inner))
    .find(Boolean);
  const text = paragraph ?? htmlToText(body);
  if (!text) return undefined;

  const all = text.split(" ");
  return all.length > words ? `${all.slice(0, words).join(" ")}…` : text;
};
