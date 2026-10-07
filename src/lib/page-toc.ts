// The article's section headings, for the two "On this page" lists: the
// right sidebar's from lg up (PageNav.astro) and the section bar's dropdown
// below it (TocToggle.astro).
export const pageHeadings = (): HTMLHeadingElement[] =>
  Array.from(
    document.querySelectorAll<HTMLHeadingElement>(".docs-prose h2[id]"),
  );

/** Appends a link to each heading to `container`, in order. */
export const appendHeadingLinks = (
  container: HTMLElement,
  headings: HTMLHeadingElement[],
  className: string,
): HTMLAnchorElement[] =>
  headings.map((heading) => {
    const link = document.createElement("a");
    link.href = `#${heading.id}`;
    link.innerText = heading.innerText;
    link.className = className;
    container.appendChild(link);
    return link;
  });

/**
 * The section being read: the last heading that has scrolled up to where
 * anchor links land (scroll-padding-top, src/styles/docs.css), or the first.
 */
export const currentHeadingIndex = (headings: HTMLHeadingElement[]): number => {
  const line =
    (parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) ||
      0) + 8;
  return Math.max(
    headings.findLastIndex(
      (heading) => heading.getBoundingClientRect().top <= line,
    ),
    0,
  );
};
