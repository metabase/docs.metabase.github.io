function initLearnLeftSidebarToggleVisibility() {
  const $expandableLinks = document.querySelectorAll(
    ".learn #main-navigation-content ul a",
  );

  $expandableLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (e.target.querySelector("svg")) {
        e.preventDefault();
        e.target.closest("li").classList.toggle("expanded");
      }
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  initLearnLeftSidebarToggleVisibility();
});
