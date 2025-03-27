function learnRightSidebarPositionVertically() {
  const padding = 20;
  const $link = document.querySelector(".learn__category__link");
  const $header = document.querySelector("header");

  const $rightSidebar = document.querySelector(
    ".learn__right-sidebar.extra-margin-top",
  );

  if ($rightSidebar) {
    $rightSidebar.style.marginTop =
      $link.offsetTop - $header.offsetHeight - padding + "px";
  }
}

function rightSidebarGetHeaders() {
  return Array.from(document.querySelectorAll(".learn__post__content h2"));
}

function learnRightSidebarDisplay() {
  const headers = rightSidebarGetHeaders();

  const $rightSidebar = document.querySelector("#sub-navigation-content");

  headers.forEach(function(header) {
    const $link = document.createElement("a");
    $link.href = `#${header.id}`;
    $link.textContent = header.textContent;
    $link.classList.add(header.id);

    $rightSidebar.appendChild($link);
  });
}

function initLearnRightSidebarNavigation() {
  const headers = rightSidebarGetHeaders();

  const headerVisibility = {};

  const updateSidebar = function(id, isVisible) {
    headerVisibility[id] = isVisible;

    let foundSelected = false;
    for (const header in headerVisibility) {
      const headerSelector = `.${header}`;

      if (headerVisibility[header] && !foundSelected) {
        document.querySelector(headerSelector).classList.add("selected");
        foundSelected = true;
      } else {
        document.querySelector(headerSelector).classList.remove("selected");
      }
    }
  };

  document.addEventListener("scroll", function() {
    headers.forEach(function(header) {
      const { top } = header.getBoundingClientRect();

      if (top > 0) {
        updateSidebar(header.id, true);
      } else {
        updateSidebar(header.id, false);
      }
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  learnRightSidebarPositionVertically();
  learnRightSidebarDisplay();
  initLearnRightSidebarNavigation();
});
