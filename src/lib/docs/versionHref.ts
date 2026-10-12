// The current stable version links to /docs/latest/, so shared links stay
// current after the next release instead of pinning a version number.
export const docsVersionHref = (
  version: string,
  docsVersion: string,
): string => (version === docsVersion ? "/docs/latest/" : `/docs/${version}/`);
