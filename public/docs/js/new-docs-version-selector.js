function initDocsVersionSelector() {
  const versionSelectors = document.querySelectorAll(".version__selector");

  // Mirror the .open class on the trigger button for assistive tech.
  const setOpen = (versionSelector, open) => {
    versionSelector.classList.toggle("open", open);
    const trigger = versionSelector.querySelector(".version__current");
    if (trigger) {
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
    }
  };

  versionSelectors.forEach(function(versionSelector) {
    setOpen(versionSelector, false);
    versionSelector.addEventListener("click", function(event) {
      event.stopPropagation(); // Prevent this click from triggering the outside click event
      setOpen(versionSelector, !versionSelector.classList.contains("open"));
    });

    // Close when keyboard focus moves out of the selector (past "See more").
    // A null relatedTarget means focus went to the body (Safari does not
    // focus links on click); the outside-click handler covers that case.
    versionSelector.addEventListener("focusout", function(event) {
      const next = event.relatedTarget;
      if (next && !versionSelector.contains(next)) {
        setOpen(versionSelector, false);
      }
    });
  });

  // Close selector on click outside with a slight delay
  document.addEventListener("click", function(event) {
    setTimeout(() => {
      versionSelectors.forEach(function(versionSelector) {
        if (!versionSelector.contains(event.target)) {
          setOpen(versionSelector, false);
        }
      });
    }, 10); // Small delay to ensure clicks inside elements get registered first
  });

  // Close on Escape and hand focus back to the trigger.
  document.addEventListener("keydown", function(event) {
    if (event.key !== "Escape") return;
    versionSelectors.forEach(function(versionSelector) {
      if (!versionSelector.classList.contains("open")) return;
      setOpen(versionSelector, false);
      const trigger = versionSelector.querySelector(".version__current");
      if (trigger && versionSelector.contains(document.activeElement)) {
        trigger.focus();
      }
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  initDocsVersionSelector();
});
