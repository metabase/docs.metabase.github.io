import type { DocPage } from "@/lib/docs/constructDocMetadata";
import { rewriteDocLinks } from "@/lib/docs/rewriteDocLinks";
import { getLiquidRenderer } from "@/lib/liquid/liquidRenderer";

// The Liquid step shared by `.md` and `.html` docs: makes the source's links
// resolve on this site, then runs Liquid (control flow, includes, variables).
export const renderDocLiquid = ({
  body,
  page,
  dirname,
}: {
  body: string;
  page: DocPage;
  dirname: string;
}) =>
  getLiquidRenderer({ page, dirname }).render(
    rewriteDocLinks(body, { version: page.version, latest: !!page.latest }),
    undefined,
    { maxSyntaxErrors: page.latest ? 0 : 3 },
  );
