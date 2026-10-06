export const pageHeadings = (): HTMLHeadingElement[] =>
  Array.from(document.querySelectorAll("h2"));

export function appendHeadingLinks(
  container: HTMLElement,
  headings: HTMLHeadingElement[],
): Map<HTMLHeadingElement, HTMLAnchorElement> {
  const links = new Map<HTMLHeadingElement, HTMLAnchorElement>();
  for (const heading of headings) {
    const link = document.createElement("a");
    link.href = `#${heading.id}`;
    link.innerText = heading.innerText;
    container.appendChild(link);
    links.set(heading, link);
  }
  return links;
}

/** The first section heading still below the top of the viewport. */
export const currentHeading = (headings: HTMLHeadingElement[]) =>
  headings.find((heading) => heading.getBoundingClientRect().top > 0);
