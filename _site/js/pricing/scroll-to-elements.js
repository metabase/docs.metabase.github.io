function initPricingScrollToCompareTable() {
  document.querySelectorAll(".compare-button").forEach(($button) => {
    $button.addEventListener("click", () => {
      const $compare = document.getElementById("compare");
      if ($compare) {
        window.scrollIntoView($compare, {
          cancellable: true,
          time: 500,
          maxSynchronousAlignments: 1,
        });
      }
    });
  });
}

function initPricingScrollToAnchors() {
  const $anchors = document.querySelectorAll(
    ".plans-selection__plan__details .apply-tooltip a",
  );

  $anchors.forEach(($anchor) => {
    $anchor.addEventListener("click", (event) => {
      event.preventDefault();

      const targetId = $anchor.href.split("#")[1];
      const $featureList =
        document.querySelector(".plans-compare-mobile").offsetParent === null
          ? ".plans-compare.full"
          : ".plans-compare-mobile";

      const $elementToScrollTo = document.querySelector(
        $featureList + " #" + targetId,
      );
      if ($elementToScrollTo) {
        $elementToScrollTo.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  initPricingScrollToCompareTable();
  initPricingScrollToAnchors();
});
