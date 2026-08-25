export const MODAL_TOP = "--inkeep-modal-top";
export const GAP = 24;

// `.promo-banner` renders inside `.navigation-header`, above the nav row, and
// `--navigation-header-height` is a static 77/85px that does not account for it —
// nor for the 5px it is already short by. Measure instead.
const HEADER = "header.bootstrap, .navigation-header";
const BANNER_PARENT = ".navigation-header";

export const modalTop = (headerBottom: number): string =>
  `${Math.max(0, Math.round(headerBottom)) + GAP}px`;

// The header is sticky at `top: -48px` so the promo banner scrolls away while the
// nav row stays pinned — its bottom edge moves between 130px and 82px. Read the
// live rect rather than assuming a resting height.
export function publishHeaderOffset(doc: Document): string | null {
  const header = doc.querySelector(HEADER);
  if (!header) return null;

  const top = modalTop(header.getBoundingClientRect().bottom);
  doc.documentElement.style.setProperty(MODAL_TOP, top);
  return top;
}

export function trackHeaderOffset(doc: Document): () => void {
  const header = doc.querySelector(HEADER);
  const view = doc.defaultView;
  if (!header || !view) return () => {};

  let last = publishHeaderOffset(doc);

  // Scrolling moves the header's bottom edge without firing either observer. The
  // browser already caps scroll events at one per frame, so read straight through
  // and skip the style write while the value holds.
  const onScroll = () => {
    const top = modalTop(header.getBoundingClientRect().bottom);
    if (top === last) return;
    last = top;
    doc.documentElement.style.setProperty(MODAL_TOP, top);
  };
  view.addEventListener("scroll", onScroll, { passive: true });

  const republish = () => {
    last = publishHeaderOffset(doc);
  };

  // A ResizeObserver on the header does not fire when promo-banner.js removes the
  // banner, even though the header visibly shrinks — measured, not assumed. The
  // banner is a direct child, so childList alone catches it without subtree noise.
  const bannerParent = doc.querySelector(BANNER_PARENT);
  const mutation = new MutationObserver(republish);
  if (bannerParent) mutation.observe(bannerParent, { childList: true });

  // Still worth observing for the 77/85px breakpoint and font reflow.
  const resize = new ResizeObserver(republish);
  resize.observe(header);

  return () => {
    view.removeEventListener("scroll", onScroll);
    mutation.disconnect();
    resize.disconnect();
  };
}
