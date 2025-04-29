function initLearnSearchKeyboardShortcut() {
  document.addEventListener("keydown", handleKeyboard);
}

const handleKeyboard = ({ repeat, metaKey, ctrlKey, key }) => {
  if (repeat) return;

  // Handle both, `ctrl` and `meta`.
  if ((metaKey || ctrlKey) && key === "k") {
    learnSearchFocusOnInput();
  }
};

function learnSearchFocusOnInput() {
  const $searchInput = document.querySelector("#learn-search-box");

  $searchInput.focus();
}

function initLearnSearchSetShortcutLabel() {
  if (!navigator.platform.includes("Mac")) {
    document.querySelector(".learn-search input[type=submit]").value =
      "ctrl + K";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  initLearnSearchKeyboardShortcut();
  initLearnSearchSetShortcutLabel();
});
