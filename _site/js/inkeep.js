/*
 * Inkeep widget settings
 */
const config = {
  base: {
    apiKey: "6dd55673e83be3649d9ef8281b40795329b492a8fc320985", // required
    integrationId: "cm17yw0my01sudk1c6fk02qar",
    organizationId: "org_zVsv0TnN7NYoHvOq",
    organizationDisplayName: "Metabase",
    primaryBrandColor: "#509EE3",
    theme: {
      stylesheetUrls: ["/css/inkeep.css"],
    },
  },
  search: {
    placeholder: "Search",
    shouldShowAskAICard: false,
  },
  aiChat: {
    placeholder: "How long does it take to bake a pie chart?",
    chatSubjectName: "Metabase",
    botName: "Metabase",
    introMessage:
      "Hi! You can ask me about Metabase. <em>(Please check the sources; I'm still learning.)</em>",
    guidance: "Be succinct",
    botAvatarSrcUrl: "/images/icons/metabase-icon.svg",
    botAvatarDarkSrcUrl: "/images/icons/metabase-icon.svg",
    userAvatarSrcUrl: "/images/icons/person.svg",
  },
  modal: {
    defaultView: "SEARCH",
    askAILabel: "Ask",
  },
};

const getSearchQuery = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("query");
};

// "componentType" is either "SearchBar" or "CustomTrigger"
// We'll use the "customTrigger" component to open the widget with a search query
// See https://docs.inkeep.com/ui-components/js-snippet/custom-trigger
const createWidgetConfig = (
  componentType,
  isOpen = false,
  prefilledQuery = "",
) => ({
  componentType,
  targetElement: document.getElementById("inkeep"),
  properties: {
    isOpen,
    onClose: handleClose,
    baseSettings: config.base,
    searchSettings: {
      ...config.search,
      prefilledQuery,
    },
    aiChatSettings: config.aiChat,
    modalSettings: config.modal,
  },
});

let inkeepWidget;

const handleOpen = (query) => {
  inkeepWidget.render(createWidgetConfig("CustomTrigger", true, query));
};

const handleClose = () => {
  inkeepWidget.render(createWidgetConfig("CustomTrigger", false));
  inkeepWidget = window.Inkeep().embed(createWidgetConfig("SearchBar"));
};

const initializeWidget = () => {
  // if we're on the search page, open the widget with the search query
  if (window.location.href.includes("search?query=")) {
    const query = getSearchQuery();
    inkeepWidget = window.Inkeep().embed(
      createWidgetConfig("CustomTrigger", true, query),
    );
    handleOpen(query);
  } else {
    inkeepWidget = window.Inkeep().embed(createWidgetConfig("SearchBar"));
  }
};

initializeWidget();
