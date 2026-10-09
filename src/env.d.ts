// cxkit-js points "types" at dist/embed.d.ts but doesn't publish it.
declare module "@inkeep/cxkit-js";

interface Window {
  // Snowplow's consented tracker, which cookie-consent.js loads (via
  // marketing-snowplow.js) only after marketing cookies are accepted.
  snowplow?: (...args: unknown[]) => void;
  // Sets and stores the docs theme preference: "system", "light" or "dark".
  // Defined by _includes/docs/theme-init.js, inlined on themed docs pages.
  setDocsTheme: (preference: string) => void;
}
