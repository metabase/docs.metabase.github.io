function initDataStackReport2023NavigateToReport() {
  const button = document.querySelector("#navigate-to-report");

  button.addEventListener("click", function(e) {
    e.preventDefault();
    window.scrollTo({
      top: document.querySelector("#report").offsetTop - 80,
      left: 0,
      behavior: "smooth",
    });
  });
}

function initDataStackReportCopyMainPageToClipboard() {
  const button = document.querySelector(".copy-url-to-clipboard");
  const span = button.querySelector("span");

  button.addEventListener("click", function(e) {
    e.preventDefault();

    navigator.clipboard.writeText(window.location.href).then(function() {
      span.innerHTML = "Copied to clipboard";

      setTimeout(() => {
        span.innerHTML = "Copy to clipboard";
      }, 3000);
    });
  });
}

function initDataStackReportShareToLinkedIn() {
  const takeaways = document.querySelectorAll(".takeaway");
  [...takeaways].forEach((takeaway) => {
    takeaway.addEventListener("click", function(e) {
      e.preventDefault();
      const href = this.getAttribute("href");
      window.open(href, "_blank");
    });
  });
}

function initDataStackReportCopyAnchorToClipboard() {
  const anchors = document.querySelectorAll("h3");

  [...anchors].forEach((anchor) => {
    anchor.addEventListener("click", function() {
      if (window.innerWidth < 768) {
        return;
      }

      const span = anchor.querySelector("span");

      const id = this.getAttribute("id");

      const url = new URL(window.location.href);

      const trimmedPathname = url.pathname.replace(/\/+$/, "");

      navigator.clipboard
        .writeText(url.origin + trimmedPathname + "#" + id)
        .then(function() {
          span.innerHTML = "Copied to clipboard";

          setTimeout(() => {
            span.innerHTML = "Copy to clipboard";
          }, 3000);
        });
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  initDataStackReport2023NavigateToReport();
  initDataStackReportCopyMainPageToClipboard();
  initDataStackReportShareToLinkedIn();
  initDataStackReportShareToLinkedIn();
  initDataStackReportCopyAnchorToClipboard();
});
