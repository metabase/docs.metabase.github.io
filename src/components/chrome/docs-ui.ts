// Utility class lists shared by more than one docs chrome component or
// layout. Anything used in a single component stays inline in that component.

/** <body> of the themed docs layouts (DefaultNewLayout.astro, ErrorLayout.astro). */
export const docsBody =
  "tw:bg-page tw:font-sans tw:text-secondary tw:motion-safe:transition-colors tw:motion-safe:duration-200 tw:nav-open:overflow-hidden";

/**
 * Quiet controls: the header's menu, theme, What's new and Metabase home
 * buttons, and the version selector trigger. Each pairs this with its own
 * layout classes.
 */
export const quietControl =
  "tw:cursor-pointer tw:rounded-lg tw:border-0 tw:bg-transparent tw:font-sans tw:text-sm/5 tw:text-secondary tw:transition-colors tw:hover:bg-surface-active tw:hover:text-brand tw:focus-ring tw:aria-expanded:bg-surface-active tw:aria-expanded:text-brand";

/** A page link in the left sidebar (LeftSidebar.astro, NavItem.astro). */
export const navLink =
  "tw:relative tw:block tw:rounded-lg tw:pt-1 tw:pb-1.25 tw:pl-2 tw:text-sm/5 tw:no-underline tw:transition-colors tw:aria-[current=page]:bg-surface-hover tw:aria-[current=page]:font-bold tw:aria-[current=page]:text-brand";

/** An item in the AI tools row under the doc title (DocActions.astro, CopyMarkdownButton.astro). */
export const docAction =
  "tw:flex tw:cursor-pointer tw:items-center tw:gap-1.5 tw:border-0 tw:bg-transparent tw:p-0 tw:font-sans tw:text-sm/5 tw:font-bold tw:whitespace-nowrap tw:text-muted tw:no-underline tw:transition-colors tw:hover:text-brand tw:focus-ring";
