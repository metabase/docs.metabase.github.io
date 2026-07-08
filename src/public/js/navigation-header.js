function maybeHideNavigationHeader() {
  const urlParams = new URLSearchParams(window.location.search);
  const hideNav = urlParams.get("hide_nav");

  if (hideNav === "true") {
    const header = document.querySelector(".navigation-header");

    if (header) {
      header.style.display = "none";
      displayRoadmapPageWhenNavigationHeaderIsHidden();
    }
  }
}

function maybeHideFooterLinks() {
  const urlParams = new URLSearchParams(window.location.search);
  const hideFooter = urlParams.get("hide_nav");

  if (hideFooter === "true") {
    const footerLinks = document.querySelector(".body-footer .links");
    if (footerLinks) {
      footerLinks.style.display = "none";
    }
  }
}

// Roadmap page embedded in core product
function displayRoadmapPageWhenNavigationHeaderIsHidden() {
  const roadmapPage = document.querySelector(".roadmap");

  if (roadmapPage) {
    roadmapPage.classList.add("no-header");
    document.querySelector(".releases-roadmap-nav").remove();
    document.querySelector("h1").remove();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  maybeHideNavigationHeader();
  maybeHideFooterLinks();
});
