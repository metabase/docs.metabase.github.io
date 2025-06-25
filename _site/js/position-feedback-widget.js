function getFeedbackWidget() {
  return (
    document.getElementById("right-hand-newsletter-subscribe-widget") ||
    document.getElementById("was-this-helpful-widget")
  );
}

function initLearnRightSidebarPositionFeedbackWidget() {
  resizeLearnRightSidebar();

  document.addEventListener("scroll", resizeLearnRightSidebar);
  window.addEventListener("resize", resizeLearnRightSidebar);
}

function resizeLearnRightSidebar() {
  const $subNavigationContent = document.getElementById(
    "sub-navigation-content",
  );

  const feedbackWidget = getFeedbackWidget();

  const feedbackWidgetHeight = feedbackWidget.checkVisibility()
    ? feedbackWidget.offsetHeight
    : 0;

  const bottomOfHeader = document
    .querySelector(".navigation-header")
    .getBoundingClientRect().bottom;

  const bottomOfTopBar = document
    .querySelector(".top-bar")
    .getBoundingClientRect().bottom;

  $subNavigationContent.style.height = `calc(100vh - ${Math.max(
    bottomOfTopBar,
    bottomOfHeader,
  )}px - ${feedbackWidgetHeight}px - 5px)`;

  maybeRestyleFeedbackWidget();
}

function maybeRestyleFeedbackWidget() {
  const extraTopPadding = 0;

  const feedbackWidget = getFeedbackWidget();

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
