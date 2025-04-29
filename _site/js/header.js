function initNavigationHeaderResponsiveness() {
  const $header = document.querySelector(".navigation-header");

  $header.style.transition = "background 0.3s";
  $header.style.backgroundColor = "#FAFBFE";

  let headerRect = null;
  let headerHeight = null;

  function onResize() {
    headerRect = $header.getBoundingClientRect();
    headerHeight = headerRect.height;

    onScroll();
  }

  function onScroll() {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    if (winScroll >= headerHeight * 2) {
      $header.style.backgroundColor = "#FFFFFF";
    } else {
      $header.style.backgroundColor = "#FAFBFE";
    }
  }

  window.addEventListener("resize", onResize);
  document.addEventListener("scroll", onScroll);

  onResize();
}

window.addEventListener("DOMContentLoaded", () => {
  initNavigationHeaderResponsiveness();
});
