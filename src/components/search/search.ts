import sharedCss from "../inkeep/shared.css?raw";
import { trackHeaderOffset } from "./header-offset";
import shadowCss from "./inkeep-shadow.css?raw";

const EMBED_URL =
  "https://cdn.jsdelivr.net/npm/@inkeep/cxkit-js@0.5.117/dist/embed.js";

const MOUNT = "#inkeep";

interface SearchBarConfig {
  baseSettings: {
    theme?: {
      styles?: { key?: string; type: "link" | "style"; value: string }[];
    };
    [key: string]: unknown;
  };
  modalSettings: Record<string, unknown>;
  searchSettings: Record<string, unknown>;
  [key: string]: unknown;
}

interface SearchWidget {
  update: (settings: Record<string, unknown>) => void;
  setView: (view: string) => void;
  search: { updateQuery: (query: string) => void };
}

declare global {
  interface Window {
    Inkeep?: { SearchBar: (selector: string, config: object) => SearchWidget };
  }
}

export const baseConfig: SearchBarConfig = {
  baseSettings: {
    apiKey: "6dd55673e83be3649d9ef8281b40795329b492a8fc320985",
    organizationDisplayName: "Metabase",
    primaryBrandColor: "#509EE3",
    theme: {
      styles: [
        { key: "metabase-shared", type: "style", value: sharedCss },
        { key: "metabase-search", type: "style", value: shadowCss },
      ],
    },
  },
  aiChatSettings: {
    aiAssistantName: "Metabase",
    chatSubjectName: "Metabase",
    placeholder: "How long does it take to bake a pie chart?",
    introMessage:
      "Hi! You can ask me about Metabase. <em>(Please check the sources; I'm still learning.)</em>",
    prompts: ["Be succinct"],
    aiAssistantAvatar: {
      light: "/images/icons/metabase-icon.svg",
      dark: "/images/icons/metabase-icon.svg",
    },
    userAvatar: "/images/icons/person.svg",
  },
  searchSettings: {
    placeholder: "Search",
  },
  shouldShowAskAICard: false,
  askAILabel: "Ask",
  forceDefaultView: true,
  modalSettings: { shortcutKey: "k" },
};

export const deepLinkQuery = (url: URL): string =>
  url.pathname.startsWith("/search")
    ? new URLSearchParams(url.search).get("query") || ""
    : "";

export function configFor(
  url: URL,
  onOpenChange: (isOpen: boolean) => void,
): SearchBarConfig {
  const query = deepLinkQuery(url);
  if (!query) return baseConfig;

  return {
    ...baseConfig,
    modalSettings: { ...baseConfig.modalSettings, isOpen: true, onOpenChange },
    searchSettings: { ...baseConfig.searchSettings, defaultQuery: query },
  };
}

let widget: SearchWidget | undefined;

const handleOpenChange = (isOpen: boolean) => {
  widget?.update({ modalSettings: { isOpen, onOpenChange: handleOpenChange } });
};

export async function mountSearch(): Promise<void> {
  if (widget || !document.querySelector(MOUNT)) return;

  await import(/* @vite-ignore */ EMBED_URL);
  if (!window.Inkeep) return;

  trackHeaderOffset(document);

  const url = new URL(window.location.href);
  const query = deepLinkQuery(url);
  widget = window.Inkeep.SearchBar(MOUNT, configFor(url, handleOpenChange));

  if (query) {
    try {
      widget.setView("search");
      widget.search.updateQuery(query);
    } catch {
      // The widget still mounts if these helpers aren't ready on first paint.
    }
  }
}
