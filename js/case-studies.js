/* global List */

function initCaseStudiesIndex() {
  const caseList = new List("case-list", {
    valueNames: ["industry-name"],
    page: 12,
    pagination: [
      {
        item: '<li><div class="page btn-base btn-base-circle mx-1"></div></li>',
      },
    ],
  });

  let selectedIndustry = null; // "All Stories" => null
  let selectedUseCase = null; // "All" => null ("Business Intelligence" | "Embedded Analytics")

  const applyFilters = () => {
    caseList.filter(function(caseStudyItem) {
      const industryRaw = caseStudyItem.values()["industry-name"];
      const industry = industryRaw.replaceAll("&amp;", "&");

      const useCasesAttr = caseStudyItem.elm.dataset.useCases || "";
      const useCases = useCasesAttr
        .split("|")
        .map((s) => s.trim())
        .filter(Boolean);

      const matchIndustry = !selectedIndustry || industry === selectedIndustry;
      const matchUseCase = !selectedUseCase
        ? true
        : useCases.includes(selectedUseCase);

      return matchIndustry && matchUseCase;
    });
  };

  const selectIndustry = (element) => {
    document.querySelectorAll(".btn-base-toggle").forEach((button) => {
      if (button !== element) button.classList.remove("selected");
    });

    if (element.innerText.trim() === "All Stories") {
      selectedIndustry = null;
      element.classList.add("selected");
    } else {
      const togglingOff = element.classList.contains("selected");

      const allStoriesButton = document.getElementById("All Stories-filter");
      if (allStoriesButton)
        allStoriesButton.classList.toggle("selected", togglingOff);

      element.classList.toggle("selected", !togglingOff);
      selectedIndustry = togglingOff ? null : element.innerText.trim();
    }
    applyFilters();
  };

  const setupUseCaseToggler = () => {
    const toggler = document.getElementById("use-case-toggler");
    if (!toggler) return;

    const links = toggler.querySelectorAll("a");

    const setActive = (clickedLink) => {
      links.forEach((link) => link.classList.remove("active"));
      clickedLink.classList.add("active");

      const value = clickedLink.dataset.useCase || "All";
      selectedUseCase = value === "All" ? null : value;

      applyFilters();
    };

    if (links.length > 0) setActive(links[0]); // default "All"

    toggler.addEventListener("click", function(event) {
      const element = event.target.closest("a");
      if (!element) return;
      event.preventDefault();
      setActive(element);
    });
  };

  document.addEventListener(
    "click",
    function(event) {
      const element = event.target;

      if (element.matches(".btn-base-toggle")) {
        event.preventDefault();
        selectIndustry(element);
        return;
      }

      if (element.matches(".btn-base-circle")) {
        const filtersHeader = document.getElementById("filters-header");
        if (filtersHeader) filtersHeader.scrollIntoView();
      }
    },
    false,
  );

  setupUseCaseToggler();
}

document.addEventListener("DOMContentLoaded", initCaseStudiesIndex);
