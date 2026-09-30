import type { DocPage } from "@/lib/docs/constructDocMetadata";
import { getLiquidRenderer } from "@/lib/liquid/liquidRenderer";

// The Liquid step shared by `.md` and `.html` docs: control flow, includes,
// variables.
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
    body,
    undefined,
    { maxSyntaxErrors: page.latest ? 0 : 3 },
  );
