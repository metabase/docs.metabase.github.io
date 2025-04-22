function initAddReferralParamsToAnchors() {
  const targetPagesToAddReferralTo = ["/sales", "/talk-to-a-person"];
  const anchors = document.querySelectorAll("a");

  anchors.forEach((anchor) => {
    targetPagesToAddReferralTo.forEach((targetPage) => {
      if (anchor.href.includes(targetPage)) {
        anchor.href = `${anchor.href}?prev_page_title=${document.title}`;
      }
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  initAddReferralParamsToAnchors();
});
