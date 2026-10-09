// Markdown copied off a doc page loses the URL its relative links resolve
// against, so the published Markdown spells every link and image out in full.

const FENCE_REGEX = /^\s*(`{3,}|~{3,})(.*)$/;
const CODE_SPAN_REGEX = /(`+)[^`]*?\1/g;
const INLINE_LINK_REGEX = /(\]\(\s*<?)([^\s)>]+)/g;
const LINK_DEFINITION_REGEX = /^(\s{0,3}\[[^\]]+\]:\s+<?)([^\s>]+)/;
// Kramdown's `[text](url){:target="_blank"}`. Only the HTML renderer can act
// on it (ialHastPlugin), so in published Markdown it's just noise.
const LINK_ATTRIBUTE_LIST_REGEX = /(\]\([^()]*\))\{:[^}]*\}/g;
const HAS_SCHEME_REGEX = /^[a-z][a-z0-9+.-]*:/i;

const absolutize = (url: string, baseUrl: URL): string => {
  // In-page anchors still work inside the copied document.
  if (
    url.startsWith("#") ||
    url.startsWith("//") ||
    HAS_SCHEME_REGEX.test(url)
  ) {
    return url;
  }
  return URL.canParse(url, baseUrl) ? new URL(url, baseUrl).href : url;
};

const absolutizeText = (text: string, baseUrl: URL): string =>
  text
    .replace(LINK_ATTRIBUTE_LIST_REGEX, "$1")
    .replace(
      LINK_DEFINITION_REGEX,
      (_, prefix: string, url: string) => prefix + absolutize(url, baseUrl),
    )
    .replace(
      INLINE_LINK_REGEX,
      (_, prefix: string, url: string) => prefix + absolutize(url, baseUrl),
    );

// Rewrites the text around a line's code spans, leaving the spans themselves
// alone: `[text](url)` inside backticks is sample Markdown, not a link.
const absolutizeLine = (line: string, baseUrl: URL): string => {
  let result = "";
  let lastIndex = 0;
  for (const match of line.matchAll(CODE_SPAN_REGEX)) {
    result +=
      absolutizeText(line.slice(lastIndex, match.index), baseUrl) + match[0];
    lastIndex = match.index + match[0].length;
  }
  return result + absolutizeText(line.slice(lastIndex), baseUrl);
};

export const absolutizeMarkdownUrls = (
  markdown: string,
  baseUrl: URL,
): string => {
  let openFence: string | null = null;

  return markdown
    .split("\n")
    .map((line) => {
      const [, fence, info = ""] = FENCE_REGEX.exec(line) ?? [];
      if (openFence) {
        // A fence closes on a bare run of the same character at least as long.
        if (fence?.startsWith(openFence) && !info.trim()) openFence = null;
        return line;
      }
      // A backtick fence can't have a backtick in its info string, so a line
      // like "```code``` and text" starts with a code span, not a fence.
      if (fence && !(fence.startsWith("`") && info.includes("`"))) {
        openFence = fence;
        return line;
      }
      return absolutizeLine(line, baseUrl);
    })
    .join("\n");
};
