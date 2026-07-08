/*
 * Inkeep widget settings (cxkit-js)
 */
import "https://cdn.jsdelivr.net/npm/@inkeep/cxkit-js@0.5.117/dist/embed.js";

const baseConfig = {
  baseSettings: {
    apiKey: "6dd55673e83be3649d9ef8281b40795329b492a8fc320985",
    organizationDisplayName: "Metabase",
    primaryBrandColor: "#509EE3",
    theme: {
      styles: [{ type: "link", value: "/css/inkeep.css" }],
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
  forceDefaultView: "search",
  modalSettings: { shortcutKey: "k" },
};

const getSearchQuery = () =>
  new URLSearchParams(window.location.search).get("query") || "";

let inkeepWidget;

const handleOpenChange = (isOpen) => {
  inkeepWidget?.update({
    modalSettings: { isOpen, onOpenChange: handleOpenChange },
  });
};

const initializeInkeep = () => {
  const initialQuery = getSearchQuery();
  const shouldOpenOnLoad =
    window.location.pathname.startsWith("/search") && initialQuery.length > 0;

  const config = shouldOpenOnLoad
    ? {
        ...baseConfig,
        modalSettings: {
          ...baseConfig.modalSettings,
          isOpen: true,
          onOpenChange: handleOpenChange,
        },
        searchSettings: { ...baseConfig.searchSettings, defaultQuery: initialQuery },
      }
    : baseConfig;

  inkeepWidget = window.Inkeep.SearchBar("#inkeep", config);

  if (shouldOpenOnLoad) {
    try {
      inkeepWidget.setView("search");
      inkeepWidget.search.updateQuery(initialQuery);
    } catch (_e) {
      // Widget still mounts even if these helpers aren't ready on first paint.
    }
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeInkeep);
} else {
  initializeInkeep();
}
