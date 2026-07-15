import { satteri } from "@astrojs/markdown-satteri";

const docsMarkdownProcessor = satteri({
  hastPlugins: [],
});

let rendererPromise:
  ReturnType<typeof docsMarkdownProcessor.createRenderer> | undefined;

export const getMarkdownRenderer = () => {
  if (!rendererPromise) {
    rendererPromise = docsMarkdownProcessor.createRenderer({
      shikiConfig: {
        theme: "github-light",
        wrap: true,
      },
    });
  }
  return rendererPromise;
};
