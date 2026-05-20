function initHoverableTogglers() {
  const togglers = document.querySelectorAll(".hoverable-toggler");

  togglers.forEach(initHoverableToggler);
}

function initHoverableToggler(toggler) {
  // This is to prevent flashing the highlight on page load
  if (toggler.classList.contains("hoverable")) {
    return;
  }

  const highlight = toggler.querySelector(".hover-highlight");
  const links = toggler.querySelectorAll("a");

  toggler.classList.add(`has-${links.length}-links`);

  let activeIndex = Array.from(links).findIndex((link) =>
    link.classList.contains("active"),
  );

  highlight.classList.add("link-" + activeIndex);

  links.forEach((link, index) => {
    link.addEventListener("mouseenter", () => {
      removeClassesContainingSubstring(highlight, "link-");
      highlight.classList.add("link-" + index);
    });

    link.addEventListener("mouseleave", () => {
      removeClassesContainingSubstring(highlight, "link-");
      highlight.classList.add("link-" + activeIndex);
    });

    link.addEventListener("click", () => {
      removeClassesContainingSubstring(highlight, "link-");
      highlight.classList.add("link-" + index);
      activeIndex = index;
    });
  });

  // setTimeout to prevent background from moving on page load
  setTimeout(function() {
    toggler.classList.add("hoverable");
    docsLearnTogglerRemoveFixedBackgroundColor();
  }, 100);
}

// On page load we have CSS to add the light blue background
// below the active link.
// However, this initial one is not animated.
// Once we have the animated hover, we remove the fixed background.
function docsLearnTogglerRemoveFixedBackgroundColor() {
  const activeLink = document.querySelector(".hoverable-toggler a.active");
  activeLink.classList.add("transparent-background");
}

function removeClassesContainingSubstring(element, substring) {
  element.classList.forEach((className) => {
    if (className.includes(substring)) {
      element.classList.remove(className);
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  initHoverableTogglers();
});
