export const DOCS_NAV_EVENT = "docs-nav:set";

export const setDocsNavOpen = (open: boolean) =>
  document.dispatchEvent(new CustomEvent(DOCS_NAV_EVENT, { detail: { open } }));

declare global {
  interface DocumentEventMap {
    [DOCS_NAV_EVENT]: CustomEvent<{ open: boolean }>;
  }
}
