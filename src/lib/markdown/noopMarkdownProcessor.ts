import type { MarkdownProcessor } from "astro/markdown";

export const noopMarkdownProcessor: MarkdownProcessor = {
  name: "no-op",
  options: {},
  createRenderer: async () => ({
    render: async () => ({
      code: "",
      metadata: {
        headings: [],
        localImagePaths: [],
        remoteImagePaths: [],
        frontmatter: {},
      },
    }),
  }),
};
