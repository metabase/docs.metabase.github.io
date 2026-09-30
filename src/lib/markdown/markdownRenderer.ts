import path from "node:path";
import { pathToFileURL } from "node:url";
import { satteri } from "@astrojs/markdown-satteri";
import { codeDefaultsHastPlugin } from "./plugins/codeDefaultsHastPlugin";
import { docLinksHastPlugin } from "./plugins/docLinksHastPlugin";
import { ialHastPlugin } from "./plugins/ialHastPlugin";
import { relativeImagePlugin } from "./plugins/relativeImagePlugin";
import { responsiveTableLabelsHastPlugin } from "./plugins/responsiveTableLabelsHastPlugin";

// Shared by `.md` docs (rendered at request time, see getMarkdownRenderer) and
// `.mdx` docs (compiled by Astro, see astro.config.mjs).
export const docsMarkdownProcessor = satteri({
  hastPlugins: [
    ialHastPlugin,
    codeDefaultsHastPlugin,
    responsiveTableLabelsHastPlugin,
    relativeImagePlugin,
    docLinksHastPlugin,
  ],
  features: { headingAttributes: true },
});

let rendererPromise:
  ReturnType<typeof docsMarkdownProcessor.createRenderer> | undefined;

export const getMarkdownRenderer = () => {
  if (!rendererPromise) {
    rendererPromise = docsMarkdownProcessor.createRenderer({
      syntaxHighlight: false, // Preserve syntax highlighting added when this was a jekyll site
    });
  }
  return rendererPromise;
};

// Renders a `.md` doc's (already Liquid-processed) source to HTML.
export const renderMarkdown = async (source: string, filePath: string) => {
  const md = await getMarkdownRenderer();
  const { code } = await md.render(source, {
    fileURL: pathToFileURL(path.resolve(filePath)),
  });
  return code;
};
