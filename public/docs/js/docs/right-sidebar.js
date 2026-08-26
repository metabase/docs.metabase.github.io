function renderRightSidebar() {
  const headers = Array.from(document.querySelectorAll("h2"));
  const inThisRelease = document.getElementById("sub-navigation-content");
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

  headers.forEach(function(header) {
    const inThisReleaseLink = document.createElement("A");
    inThisReleaseLink.classList.add(
      "paragraph-6",
      "mb-4",
      "text-decoration-none",
      header.id,
    );
    inThisReleaseLink.style.fontSize = "14px";
    inThisReleaseLink.setAttribute("href", "#" + header.id);
    inThisReleaseLink.innerText = header.innerText;
    inThisRelease.appendChild(inThisReleaseLink);

    headerVisibility[header.id] = false;
  });

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

function appendCTA() {
  const $sidebarContent = document.getElementById("sub-navigation-content");
  const $cta = document.querySelector(".want-a-head-start");
  if ($cta) {
    $sidebarContent.appendChild($cta);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  renderRightSidebar();
  appendCTA();
});
