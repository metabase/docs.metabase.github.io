import { satteri } from "@astrojs/markdown-satteri";
import { codeDefaultsHastPlugin } from "./plugins/codeDefaultsHastPlugin";
import { ialHastPlugin } from "./plugins/ialHastPlugin";
import { relativeImagePlugin } from "./plugins/relativeImagePlugin";
import { responsiveTableLabelsHastPlugin } from "./plugins/responsiveTableLabelsHastPlugin";

const docsMarkdownProcessor = satteri({
  hastPlugins: [
    ialHastPlugin,
    codeDefaultsHastPlugin,
    responsiveTableLabelsHastPlugin,
    relativeImagePlugin,
  ],
  features: {
    headingAttributes: true,
  },
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
