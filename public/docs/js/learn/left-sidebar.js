function initLearnLeftSidebarToggleVisibility() {
  const nav = document.querySelector(".learn #main-navigation-content");
  if (!nav) return;

  // Links navigate; only the chevron button toggles a branch.
  nav.addEventListener("click", (e) => {
    const item = e.target.closest("button")?.closest("li");
    if (!item) return;

    nav.querySelectorAll("li.expanded").forEach((open) => {
      if (!open.contains(item)) open.classList.remove("expanded");
    });

    const expanded = item.classList.toggle("expanded");
    item
      .querySelector(":scope > button")
      ?.setAttribute("aria-expanded", String(expanded));
  });
}

window.addEventListener("DOMContentLoaded", () => {
  initLearnLeftSidebarToggleVisibility();
});
