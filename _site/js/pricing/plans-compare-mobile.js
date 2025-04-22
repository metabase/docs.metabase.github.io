function initPricingPlanCompareAccordion() {
  const titles = document.querySelectorAll(
    ".plans-compare-mobile .accordion-toggler",
  );

  [...titles].forEach((title) => {
    title.addEventListener("click", () => {
      title
        .closest(".row")
        .querySelector(".accordion")
        .classList.toggle("open");

      title.classList.toggle("open");
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  initPricingPlanCompareAccordion();
});
