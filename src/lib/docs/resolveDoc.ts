// Pure, framework-agnostic: no `astro:content` import. Used both by the
// `[...slug].astro` route (at Astro/Vite runtime) and by `collectRedirects.ts`
// (at plain Node/bun config-evaluation time, where `astro:content` isn't
// available). Keep it that way.

export const resolveDocUrl = ({
  id,
  permalink,
  includeTrailingIndex,
}: {
  id: string;
  permalink?: string;
  includeTrailingIndex?: boolean;
}): { version: string; slug: string; url: string } => {
  let resolvedId = (permalink?.replace(/^\/docs\//, "") ?? id).replace(
    /\.html$/,
    "",
  );
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
