function initLearnRightSidebarPositionFeedbackWidget() {
  resizeLearnRightSidebar();

  document.addEventListener("scroll", resizeLearnRightSidebar);
  window.addEventListener("resize", resizeLearnRightSidebar);
}

function resizeLearnRightSidebar() {
  const $subNavigationContent = document.getElementById(
    "sub-navigation-content",
  );

  const feedbackWidgetHeight = document.getElementById(
    "feedback-widget-container",
  ).offsetHeight;

  const bottomOfHeader = document
    .querySelector(".navigation-header")
    .getBoundingClientRect().bottom;

  const bottomOfTopBar = document
    .querySelector(".top-bar")
    .getBoundingClientRect().bottom;

  $subNavigationContent.style.height = `calc(100vh - ${Math.max(
    bottomOfTopBar,
    bottomOfHeader,
  )}px - ${feedbackWidgetHeight}px - 30px)`;

  maybeRestyleFeedbackWidget();
}

function maybeRestyleFeedbackWidget() {
  // HACK: shouldRestyleFeedbackWidget was not calculated correctly
  // when the text input is visible
  const isTextInputVisible = document
    .querySelector("#feedback-comment-text")
    .checkVisibility();

  const extraTopPadding = isTextInputVisible ? 130 : 30;

  const feedbackWidget = document.getElementById("feedback-widget-container");
  const subnavigationContent = document.getElementById(
    "sub-navigation-content",
  );

  const lastAnchorInSubnavigationContent =
    subnavigationContent.lastElementChild;

  const shouldRestyleFeedbackWidget =
    lastAnchorInSubnavigationContent.getBoundingClientRect().bottom >
    subnavigationContent.offsetHeight +
      feedbackWidget.offsetHeight -
      extraTopPadding;

  if (shouldRestyleFeedbackWidget) {
    feedbackWidget.classList.add("add-border-top");
  } else {
    feedbackWidget.classList.remove("add-border-top");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  initLearnRightSidebarPositionFeedbackWidget();
});
