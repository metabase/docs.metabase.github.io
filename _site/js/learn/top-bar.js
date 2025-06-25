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

window.addEventListener("DOMContentLoaded", () => {
  initLearnSearchKeyboardShortcut();
});
