export const MODAL_TOP = "--inkeep-modal-top";
export const GAP = 24;

// `.promo-banner` renders inside `.navigation-header`, above the nav row, and
// `--navigation-header-height` is a static 77/85px that does not account for it —
// nor for the 5px it is already short by. Measure instead.
const HEADER = "header.bootstrap, .navigation-header";
const BANNER_REMOVAL_DELAY = 2500;

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

  const resize = new ResizeObserver(publish);
  resize.observe(header);

  // promo-banner.js removes the banner on a timer after transitioning it to zero
  // height, which does not always fire the ResizeObserver.
  const mutation = new MutationObserver(() => {
    publish();
    setTimeout(publish, BANNER_REMOVAL_DELAY);
  });
  mutation.observe(header, { childList: true, subtree: true });

  return () => {
    resize.disconnect();
    mutation.disconnect();
  };
}
