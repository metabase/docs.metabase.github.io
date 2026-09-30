// cxkit-js points "types" at dist/embed.d.ts but doesn't publish it.
declare module "@inkeep/cxkit-js";

// Snowplow's consented tracker, which cookie-consent.js loads (via
// marketing-snowplow.js) only after marketing cookies are accepted.
interface Window {
  snowplow?: (...args: unknown[]) => void;
}
