import { render, type DataEntryMap } from "astro:content";
import { Fragment, jsx, jsxs } from "astro/jsx-runtime";
import { evaluate, type EvaluateOptions } from "satteri";
import { docsMarkdownProcessor } from "./markdownRenderer";

export type MdxRenderResult = Awaited<ReturnType<typeof render>>;

// Renders an `.mdx` collection entry compiled at build time by Astro's
// content pipeline.
export const renderMdxEntry = (
  doc: DataEntryMap["docsMdx"][number],
): Promise<MdxRenderResult> => render(doc);

// Renders a raw MDX string not backed by a collection entry — e.g. fetched
// from a CDN at request time. Uses the same Satteri plugins/features as the
// build-time pipeline (`docsMarkdownProcessor`, shared with `.md` docs via
// `getMarkdownRenderer`) and Astro's own JSX runtime, so the resulting
// `Content` component renders identically to a build-time `.mdx` doc without
// needing a bundler at request time.
//
// `fileURL` should point at the document's own location when hast plugins
// that resolve relative paths (e.g. `relativeImagePlugin`) need it.
export const renderMdxSource = async (
  source: string,
  { fileURL }: { fileURL?: URL } = {},
): Promise<Pick<MdxRenderResult, "Content">> => {
  const { default: Content } = await evaluate(source, {
    ...docsMarkdownProcessor.options,
    fileURL,
    Fragment,
    // Astro's jsx-runtime types its `jsx`/`jsxs` params as `Record<string,
    // any>` rather than `unknown`; satteri always calls them with vnode
    // props, so the mismatch is type-only.
    jsx: jsx as EvaluateOptions["jsx"],
    jsxs: jsxs as EvaluateOptions["jsxs"],
  });
  return { Content: Content as MdxRenderResult["Content"] };
};
