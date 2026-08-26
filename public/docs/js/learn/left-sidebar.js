function initLearnLeftSidebarToggleVisibility() {
  const $expandableLinks = document.querySelectorAll(
    ".learn #main-navigation-content ul a",
  );

  $expandableLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (e.target.querySelector("svg")) {
        e.preventDefault();

        $expandableLinks.forEach((linkToContract) => {
          const $listItem = linkToContract.closest("li");

          if (!$listItem || !$listItem.contains(e.target)) {
            $listItem.classList.remove("expanded");
          }
        });

        e.target.closest("li").classList.toggle("expanded");
      }
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  initLearnLeftSidebarToggleVisibility();
});
