function resizeHeadOnlyTable(headOnlyTable, originalTable) {
  headOnlyTable.style.width = originalTable.offsetWidth + "px";
}

function initPricingPlanCompareStickyHeader() {
  const table = document.querySelector(".plans-compare.full");

  const headOnlyTable = document.querySelector(".plans-compare.header-only");

  headOnlyTable.style.top = "62px";

  window.addEventListener("scroll", function() {
    if (
      window.scrollY > table.offsetTop + 46 &&
      window.scrollY < table.offsetTop + table.offsetHeight - 170
    ) {
      headOnlyTable.classList.add("show");
    } else {
      headOnlyTable.classList.remove("show");
    }
  });

  resizeHeadOnlyTable(headOnlyTable, table);

  window.addEventListener("resize", function() {
    resizeHeadOnlyTable(headOnlyTable, table);
  });
}

function initPricingPlanCompareRowHover() {
  const cells = document.querySelectorAll(".plans-compare.full div");

  [...cells].forEach((cell) => {
    cell.addEventListener("mouseover", function() {
      const row = cell.getAttribute("data-row");

      if (!row || !row.length) return;

      document.querySelectorAll(`[data-row="${row}"]`).forEach((item) => {
        item.classList.add("hovering");
      });
    });

    cell.addEventListener("mouseout", function() {
      const row = cell.getAttribute("data-row");

      document.querySelectorAll(`[data-row="${row}"]`).forEach((item) => {
        item.classList.remove("hovering");
      });
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  initPricingPlanCompareStickyHeader();
  initPricingPlanCompareRowHover();
});
