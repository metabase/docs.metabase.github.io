/*
function initDocsVersionSelector() {
  const versionSelectors = document.querySelectorAll(".version__selector");

  versionSelectors.forEach(function(versionSelector) {
    versionSelector.addEventListener("click", function() {
      versionSelector.classList.toggle("open");
    });
  });

  // Close selector on click outside
  document.addEventListener("click", function(event) {
    versionSelectors.forEach(function(versionSelector) {
      if (!versionSelector.contains(event.target)) {
        versionSelector.classList.remove("open");
      }
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  initDocsVersionSelector();
});
*/

function initDocsVersionSelector() {
  const versionSelectors = document.querySelectorAll(".version__selector");

  versionSelectors.forEach(function(versionSelector) {
    versionSelector.addEventListener("click", function(event) {
      event.stopPropagation(); // Prevent this click from triggering the outside click event
      versionSelector.classList.toggle("open");
    });
  });

  // Close selector on click outside with a slight delay
  document.addEventListener("click", function(event) {
    setTimeout(() => {
      versionSelectors.forEach(function(versionSelector) {
        if (!versionSelector.contains(event.target)) {
          versionSelector.classList.remove("open");
        }
      });
    }, 10); // Small delay to ensure clicks inside elements get registered first
  });
}

window.addEventListener("DOMContentLoaded", () => {
  initDocsVersionSelector();
});
