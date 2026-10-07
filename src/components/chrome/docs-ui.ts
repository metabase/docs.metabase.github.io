// Utility class lists shared by more than one docs chrome component or
// layout. Anything used in a single component stays inline in that component.

/**
 * Quiet controls: the header's menu button and the version selector trigger.
 * Each pairs this with its own layout classes.
 */
export const quietControl =
  "tw:cursor-pointer tw:rounded-lg tw:border-0 tw:bg-transparent tw:font-sans tw:text-sm/5 tw:text-secondary tw:transition-colors tw:hover:bg-surface-active tw:hover:text-brand tw:focus-ring tw:aria-expanded:bg-surface-active tw:aria-expanded:text-brand";

/** Outlined 40px icon buttons in the header: search (below xl) and ⋯. */
export const iconButton =
  "tw:flex tw:size-10 tw:shrink-0 tw:cursor-pointer tw:items-center tw:justify-center tw:rounded-lg tw:border tw:border-border tw:bg-surface tw:p-0 tw:text-secondary tw:transition-colors tw:hover:bg-surface-hover tw:hover:text-brand tw:focus-ring tw:aria-expanded:bg-surface-active tw:aria-expanded:text-brand";

/**
 * A dropdown's menu (DocsVersionSelector.astro, DocsMoreMenu.astro). It
 * follows its trigger, which carries `peer` and the aria-expanded state
 * (dropdown.ts). Callers add the side: `tw:left-0` or `tw:right-0`.
 *
 * visibility keeps the closed menu's links out of the tab order. It
 * transitions with the fade: a transitioning visibility counts as visible
 * until the end, so the menu disappears only once the fade-out has played.
 * With reduced motion it opens and closes at once.
 */
export const menuPanel =
  "tw:pointer-events-none tw:invisible tw:absolute tw:top-[calc(100%+6px)] tw:z-5 tw:m-0 tw:min-w-40 tw:scale-[0.97] tw:list-none tw:overflow-hidden tw:rounded-lg tw:border tw:border-border tw:bg-surface-elevated tw:px-0 tw:py-1 tw:opacity-0 tw:shadow-card tw:peer-aria-expanded:pointer-events-auto tw:peer-aria-expanded:visible tw:peer-aria-expanded:scale-100 tw:peer-aria-expanded:opacity-100 tw:motion-safe:transition-[scale,opacity,visibility] tw:motion-safe:duration-200 tw:motion-safe:ease-in-out";

/**
 * An item in a `menuPanel`: a link or button. It is a flex row, so an icon or
 * a tag can go beside the label. Callers add the text color. The focus ring
 * sits inside: the panel clips its overflow.
 */
export const menuItem =
  "tw:flex tw:items-center tw:gap-2 tw:px-4 tw:py-2 tw:text-sm tw:no-underline tw:hover:bg-page tw:focus-ring tw:focus-visible:-outline-offset-2";

/** A page link in the left sidebar (LeftSidebar.astro, NavItem.astro). */
export const navLink =
  "tw:relative tw:block tw:rounded-lg tw:pt-1 tw:pb-1.25 tw:pl-2 tw:text-sm/5 tw:no-underline tw:transition-colors tw:focus-ring tw:focus-visible:-outline-offset-2 tw:aria-[current=page]:bg-surface-hover tw:aria-[current=page]:font-bold tw:aria-[current=page]:text-brand";

/** An item in the AI tools row under the doc title (DocActions.astro, CopyMarkdownButton.astro). */
export const docAction =
  "tw:flex tw:cursor-pointer tw:items-center tw:gap-1.5 tw:rounded-sm tw:border-0 tw:bg-transparent tw:p-0 tw:font-sans tw:text-sm/5 tw:font-bold tw:whitespace-nowrap tw:text-muted tw:no-underline tw:transition-colors tw:hover:text-brand tw:focus-ring";
