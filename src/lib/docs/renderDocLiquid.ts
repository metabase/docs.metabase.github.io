import path from "node:path";
import { METABASE_REPO_PATH } from "@/constants";
import { constructDocMetadata } from "@/lib/docs/constructDocMetadata";
import { reformatMarkdownUrls } from "@/lib/docs/reformatMarkdownUrls";
import { resolveDocUrl } from "@/lib/docs/resolveDoc";
import {
  baseCtx,
  getLiquidRenderer,
  type LiquidOutput,
} from "@/lib/liquid/liquidRenderer";
import type { DataEntryMap } from "astro:content";

type DocEntry = DataEntryMap["docs"][number] | DataEntryMap["docsHtml"][number];

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
  // TODO: GRO-688 Remove processing from /script/docs so src files are raw whether reading from _docs or METABASE_REPO_PATH
  // The only known gap is updateRedirectsAndLinks for non-latest versions, which is two separate fixes:
  // 1. replaceVersionInUrls belongs alongside reformatMarkdownUrls
  // 2. redirect_from rewriting belongs in collectRedirects
  const isRaw = !!METABASE_REPO_PATH;
  const doc = !isRaw
    ? entry
    : {
        ...entry,
        data: {
          ...constructDocMetadata(
            `/${path.relative(METABASE_REPO_PATH, entry.filePath!)}`,
            version === "latest" ? baseCtx.site.docs_version : version,
            version === "latest",
          ),
          ...entry.data,
        },
        body: reformatMarkdownUrls(entry.body ?? ""),
      };
  const dirname = path.dirname(doc.filePath!);
  const page = { url, ...doc.data };

  const lq = getLiquidRenderer({ page, dirname, output });
  const body = await lq.render(doc.body!, undefined, {
    maxSyntaxErrors: version === "latest" ? 0 : 3,
  });

  return { doc, page, dirname, body };
};
