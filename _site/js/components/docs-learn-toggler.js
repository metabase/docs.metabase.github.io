function initDocsLearnToggler() {
  const togglers = document.querySelectorAll(".docs-learn-toggler");

  togglers.forEach((toggler) => {
    // This is to prevent flashing the highlight on page load
    if (toggler.classList.contains("hoverable")) {
      return;
    }

    const highlight = toggler.querySelector(".hover-highlight");
    const links = toggler.querySelectorAll("a");
    const activeLink = links[0].classList.contains("active") ? 0 : 1;

    highlight.classList.add("link-" + activeLink);

    links.forEach((link, index) => {
      link.addEventListener("mouseenter", () => {
        highlight.classList.remove("link-" + activeLink);
        highlight.classList.add("link-" + index);
      });

      link.addEventListener("mouseleave", () => {
        highlight.classList.remove("link-" + index);
        highlight.classList.add("link-" + activeLink);
      });
    });

    // setTimeout to prevent background from moving on page load
    setTimeout(function() {
      toggler.classList.add("hoverable");
      docsLearnTogglerRemoveFixedBackgroundColor();
    }, 100);
  });
}

// On page load we have CSS to add the light blue background
// below the active link.
// However, this initial one is not animated.
// Once we have the animated hover, we remove the fixed background.
function docsLearnTogglerRemoveFixedBackgroundColor() {
  const activeLink = document.querySelector(".docs-learn-toggler a.active");
  activeLink.classList.add("transparent-background");
}

window.addEventListener("DOMContentLoaded", () => {
  initDocsLearnToggler();
});
