// Derives a doc's version/slug/URL from its content collection id, since
// docs are stored as `<version>/<slug>.md` but need a canonical
// `/docs/<version>/<slug>` URL for routing, sitemaps, and redirects.
export const resolveDocUrl = ({
  id,
  includeTrailingIndex,
}: {
  id: string;
  includeTrailingIndex?: boolean;
}): { version: string; slug: string; url: string } => {
  let resolvedId = id.replace(/\.html$/, "").replace(/\/README$/, "/index");
  if (!includeTrailingIndex) {
    resolvedId = resolvedId.replace(/index$/, "");
  }
  const separatorIndex = resolvedId.indexOf("/");
  const version =
    (separatorIndex !== -1
      ? resolvedId.slice(0, separatorIndex)
      : resolvedId) || "latest";
  const slug =
    separatorIndex !== -1 ? resolvedId.slice(separatorIndex + 1) : "";
  return { version, slug, url: `/docs/${version}/${slug}` };
};
