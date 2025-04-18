function startupGuideInitLeftNav() {
  const { pathname } = new URL(window.location.href);

  const navItems = document.querySelectorAll("#main-navigation-content a");

  navItems.forEach((item) => {
    const anchorPathname = new URL(item.href).pathname;
    if (pathname === anchorPathname) {
      item.closest("li, h5").classList.add("selected");
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  startupGuideInitLeftNav();
});
