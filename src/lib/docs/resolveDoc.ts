// Pure, framework-agnostic: no `astro:content` import. Used both by the
// `[...slug].astro` route (at Astro/Vite runtime) and by `collectRedirects.ts`
// (at plain Node/bun config-evaluation time, where `astro:content` isn't
// available). Keep it that way.

export const resolveDocUrl = ({
  id,
  permalink,
}: {
  id: string;
  permalink?: string;
}): { version: string; slug: string; url: string } => {
  const resolvedId =
    permalink?.replace(/^\/docs\//, "").replace(/\/index\.html$/, "") ?? id;
  const separatorIndex = resolvedId.indexOf("/");
  const version =
    (separatorIndex !== -1
      ? resolvedId.slice(0, separatorIndex)
      : resolvedId) || "latest";
  const slug = separatorIndex !== -1 ? resolvedId.slice(separatorIndex + 1) : "";
  return { version, slug, url: `/docs/${version}/${slug}` };
};
