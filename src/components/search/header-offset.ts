export const MODAL_TOP = "--inkeep-modal-top";
export const GAP = 24;

// `.promo-banner` renders inside `.navigation-header`, above the nav row, and
// `--navigation-header-height` is a static 77/85px that does not account for it —
// nor for the 5px it is already short by. Measure instead.
const HEADER = "header.bootstrap, .navigation-header";
const BANNER_PARENT = ".navigation-header";

// The header is sticky at top: 0, so its bottom edge is where content may start.
export const modalTop = (headerBottom: number): string =>
  `${Math.max(0, Math.round(headerBottom)) + GAP}px`;

export function publishHeaderOffset(doc: Document): string | null {
  const header = doc.querySelector(HEADER);
  if (!header) return null;

  const top = modalTop(header.getBoundingClientRect().bottom);
  doc.documentElement.style.setProperty(MODAL_TOP, top);
  return top;
}

export function trackHeaderOffset(doc: Document): () => void {
  const header = doc.querySelector(HEADER);
  if (!header) return () => {};

  const publish = () => publishHeaderOffset(doc);
  publish();

  // A ResizeObserver on the header does not fire when promo-banner.js removes the
  // banner, even though the header visibly shrinks — measured, not assumed. The
  // banner is a direct child, so childList alone catches it without subtree noise.
  const banners = doc.querySelector(BANNER_PARENT);
  const mutation = new MutationObserver(publish);
  if (banners) mutation.observe(banners, { childList: true });

  // Still worth observing for the 77/85px breakpoint and font reflow.
  const resize = new ResizeObserver(publish);
  resize.observe(header);

  return () => {
    mutation.disconnect();
    resize.disconnect();
  };
}
