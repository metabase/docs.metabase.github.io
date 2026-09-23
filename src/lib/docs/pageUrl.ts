/**
 * Normalizes `Astro.url.pathname` so it's the same in dev and static builds.
 *
 * Dev reports the request path (`/docs/all`), but static builds with
 * `build.format: "preserve"` add a trailing slash (`/docs/all/`) so we strip it.
 *
 * Index pages are the exception: `/docs/latest/index` becomes `/docs/latest/`.
 * The trailing slash stays so relative links on the page resolve correctly.
 */
export const getPageUrl = (url: URL): string => {
  return url.pathname.replace(/\/$/, "").replace(/\/index$/, "/");
};
