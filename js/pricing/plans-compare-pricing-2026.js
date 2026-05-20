function initColumnHover() {
  const tables = document.querySelectorAll(".js-column-hover");
  tables.forEach((table) => {
    table.addEventListener("mouseover", function(e) {
      const trigger = e.target.closest(".js-column-hover-trigger");
      if (!trigger) return;
      table.setAttribute("data-highlighted-column", trigger.cellIndex);
    });

    table.addEventListener("mouseleave", function() {
      table.removeAttribute("data-highlighted-column");
    });
  });
}

function initUseCaseReorder() {
  const tables = document.body.querySelectorAll(".js-use-case-reorder");
  tables.forEach((table) => {
    const thead = table.querySelector("thead");
    const tBodies = Array.from(table.querySelectorAll("tbody"));

    function reorderForUseCase(useCase) {
      tBodies.forEach((tbody) => {
        const tbodyUseCase = tbody.getAttribute("data-primary-use-case");
        if (tbodyUseCase === useCase) {
          thead.insertAdjacentElement("afterend", tbody);
        } else {
          table.appendChild(tbody);
        }
      });
    }

    window.addEventListener("useCase", ({ detail }) => {
      reorderForUseCase(detail.useCase);
    });
    const initialUseCase =
      new URL(window.location).searchParams.get("use_case") || "bi";
    reorderForUseCase(initialUseCase);
  });
}

function initToggleStuck() {
  const navHeight = getComputedStyle(document.documentElement)
    .getPropertyValue("--navigation-header-height");
  document.querySelectorAll(".js-toggle-stuck").forEach((el) => {
    const sentinel = document.createElement("div");
    el.parentElement.insertBefore(sentinel, el);
    new IntersectionObserver(
      ([entry]) => el.classList.toggle("stuck", !entry.isIntersecting),
      { rootMargin: `-${navHeight} 0px 0px 0px`, threshold: [1] }
    ).observe(sentinel);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  initColumnHover();
  initUseCaseReorder();
  initToggleStuck();
});
