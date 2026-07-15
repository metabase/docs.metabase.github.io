import { satteri } from "@astrojs/markdown-satteri";
import { ialHastPlugin } from "./plugins/ialHastPlugin";
import { inlineCodeHastPlugin } from "./plugins/inlineCodeHastPlugin";

const docsMarkdownProcessor = satteri({
  hastPlugins: [ialHastPlugin, inlineCodeHastPlugin],
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
