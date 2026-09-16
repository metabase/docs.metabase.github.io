function renderRightSidebar() {
  const pageHeaders = Array.from(document.querySelectorAll("h2"));
  const sidebarContent = document.getElementById("sub-navigation-content");
  const sidebarLinks = new Map();
  let activeLink = null;

  pageHeaders.forEach(function(header) {
    const link = document.createElement("A");
    link.classList.add(
      "paragraph-6",
      "mb-4",
      "text-decoration-none",
    );
    link.style.fontSize = "14px";
    link.setAttribute("href", "#" + header.id);
    link.innerText = header.innerText;
    sidebarContent.appendChild(link);

    sidebarLinks.set(header, link);
  });

  function setSelectedLink() {
    const firstVisibleHeader = pageHeaders.find(header => header.getBoundingClientRect().top > 0);
    const link = sidebarLinks.get(firstVisibleHeader);

    if (!link || activeLink === link) {
      return;
    }

    activeLink?.classList.remove("selected");
    activeLink = link;
    activeLink.classList.add("selected");
  }

  document.addEventListener("scroll", setSelectedLink);
  setSelectedLink();
}

function appendCTA() {
  const sidebarContent = document.getElementById("sub-navigation-content");
  const cta = document.querySelector(".want-a-head-start");
  if (cta) {
    sidebarContent.appendChild(cta);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  renderRightSidebar();
  appendCTA();
});
