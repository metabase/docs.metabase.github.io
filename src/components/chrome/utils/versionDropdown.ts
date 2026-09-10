import type { VersionSupport } from "@/lib/docs/versionSupport";

// Renders the <li> items for the version dropdown as an HTML string, so the
// same markup can be produced server-side (initial render) and client-side
// (re-rendered after fetching /docs/versions.json).
export const renderVersionListItems = (
  availableVersions: string[],
  excludeVersion: string | null | undefined,
  versionSupport: Record<string, VersionSupport | undefined>,
): string => {
  const items = [...availableVersions]
    .reverse()
    .slice(0, 10)
    .filter((v) => v !== excludeVersion)
    .map((v) => {
      const support = versionSupport[v];
      const tag =
        support?.status === "unsupported"
          ? `<span class="version__tag version__tag--unsupported">unsupported</span>`
          : support?.lts
            ? `<span class="version__tag version__tag--lts">lts</span>`
            : "";
      return `<li><a href="/docs/${v}/"><div class="version__dropdown--item"><span>${v}</span>${tag}</div></a></li>`;
    })
    .join("");

  return `${items}<li><a href="/docs/all">See more</a></li>`;
};
