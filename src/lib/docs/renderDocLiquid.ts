import path from "node:path";
import { DOCS_SRC_ROOT, METABASE_REPO_PATH } from "@/constants";
import { constructDocMetadata } from "@/lib/docs/constructDocMetadata";
import { resolveDocUrl } from "@/lib/docs/resolveDoc";
import { rewriteDocLinks } from "@/lib/docs/rewriteDocLinks";
import {
  baseCtx,
  getLiquidRenderer,
  type LiquidOutput,
} from "@/lib/liquid/liquidRenderer";
import type { DataEntryMap } from "astro:content";

type DocEntry = DataEntryMap["docs"][number] | DataEntryMap["docsHtml"][number];

// A doc's metadata: what its path and version imply (title, category,
// layout, …), overridden by its front matter.
export const resolveDocData = (entry: DocEntry, version: string) => ({
  ...constructDocMetadata(
    METABASE_REPO_PATH
      ? `/${path.relative(METABASE_REPO_PATH, entry.filePath!)}`
      : `/docs/${path.relative(`${DOCS_SRC_ROOT}/${version}`, entry.filePath!)}`,
    version === "latest" ? baseCtx.site.docs_version : version,
    version === "latest",
  ),
  ...entry.data,
});

// The first rendering stage of a doc, shared by its page and its Markdown
// version: resolves the doc's metadata, then runs Liquid over its body (e.g.
// control flow, includes, variables, etc).
export const renderDocLiquid = async ({
  doc: entry,
  version,
  output,
}: {
  doc: DocEntry;
  version: string;
  output?: LiquidOutput;
}) => {
  const { url } = resolveDocUrl({ id: entry.id });
  const doc = {
    ...entry,
    data: resolveDocData(entry, version),
    body: rewriteDocLinks(entry.body ?? "", {
      version,
      latest: version === "latest",
    }),
  };
  const dirname = path.dirname(doc.filePath!);
  const page = { url, ...doc.data };

  const lq = getLiquidRenderer({ page, dirname, output });
  const body = await lq.render(doc.body, undefined, {
    maxSyntaxErrors: version === "latest" ? 0 : 3,
  });

  return { doc, page, dirname, body };
};
