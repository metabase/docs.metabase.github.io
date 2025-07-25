function initHelpPremiumTooltip() {
  var applyTT = document.querySelectorAll(".apply-tooltip");

  window.tippy(applyTT, {
    animation: "fade",
    duration: [300, 300],
    hideOnClick: false,
    placement: "auto",
    touch: false,
    trigger: "mouseenter",
    popperOptions: {
      strategy: "fixed",
      modifiers: [
        {
          name: "flip",
          options: {
            fallbackPlacements: ["top", "right"],
          },
        },
        {
          name: "preventOverflow",
          options: {
            altAxis: true,
            tether: false,
          },
        },
      ],
    },
  });
}

function initHelpPremiumCopyToClipboard() {
  const button = document.querySelector(".copy-email-to-clipboard");
  const initialTooltipContent = button.getAttribute("data-tippy-content");

  button.addEventListener("click", function(e) {
    e.preventDefault();
    const tippyInstance = e.currentTarget._tippy;

    navigator.clipboard.writeText(button.textContent.trim()).then(function() {
      tippyInstance.setContent("Copied to clipboard");

      setTimeout(() => {
        tippyInstance.setContent(initialTooltipContent);
      }, 3000);
    });
  });
}

function initHelpPremiumLinkToDocsVersion() {
  const rawVersion = window.getQueryParameter("instance_version");
  const passedVersion = window.isValidVersionTag(rawVersion)
    ? rawVersion
    : null;

  if (passedVersion) {
    const minor = passedVersion.split(".")[1];
    const version = `v0.${minor}`;

    const linkToDocs = document.getElementById("link-to-docs");
    if (linkToDocs) {
      linkToDocs.href = `/docs/${version}`;
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  initHelpPremiumTooltip();
  initHelpPremiumCopyToClipboard();
  initHelpPremiumLinkToDocsVersion();
});
