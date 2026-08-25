import type { MarkdownProcessor } from "astro/markdown";
import { docsMarkdownProcessor } from "./markdownRenderer";
import { noopMarkdownProcessor } from "./noopMarkdownProcessor";

// The thousands of top-level docs `.md` files stay on the noop processor (see
// `noopMarkdownProcessor.ts`) since `[...slug].astro` renders them manually via
// `getMarkdownRenderer()` after running Liquid. `_includes/*.md` files are only
// ever reached by being ES-imported directly from an `.mdx` doc though, so
// they need the real processor to actually produce HTML when imported.
export const includesAwareMarkdownProcessor: MarkdownProcessor = {
  name: "includes-aware",
  options: {},
  createRenderer: async (shared) => {
    const [real, noop] = await Promise.all([
      docsMarkdownProcessor.createRenderer(shared),
      noopMarkdownProcessor.createRenderer(shared),
    ]);

    return {
      render: (content, opts) => {
        const isInclude = opts?.fileURL?.pathname.includes("/_includes/");
        return (isInclude ? real : noop).render(content, opts);
      },
    };
  },
};
