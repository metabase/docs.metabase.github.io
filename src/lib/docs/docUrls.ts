import { resolveDocUrl } from "@/lib/docs/resolveDoc";
import { getCollection } from "astro:content";

// Every doc page's URL, across versions ("/docs/v0.62/questions/start"), so
// links can check that a page exists before pointing at it: the version
// selector keeps readers on the same page (findDocInVersion), and the AI
// tools row links to the MCP page only in versions that have one.
const collectDocUrls = async (): Promise<ReadonlySet<string>> => {
  const [docs, docsHtml] = await Promise.all([
    getCollection("docs"),
    getCollection("docsHtml"),
  ]);
  return new Set(
    [...docs, ...docsHtml].map((doc) => resolveDocUrl({ id: doc.id }).url),
  );
};

let docUrls: Promise<ReadonlySet<string>> | undefined;

// Not cached in dev, like getNavForVersion: docs added while the server runs
// should show up.
export const getDocUrls = (): Promise<ReadonlySet<string>> =>
  import.meta.env.MODE === "development"
    ? collectDocUrls()
    : (docUrls ??= collectDocUrls());
