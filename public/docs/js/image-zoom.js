// Click (or Enter/Space on) an article image to see it full screen; click
// anywhere, the close button or Escape to go back. The overlay is a modal
// dialog whose only control is the close button, so focus stays there and
// returns to the image afterwards. src/styles/docs.css styles the focus
// states and the zoomed copy (outside .docs-prose, so it needs its own
// dark-theme filter).
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

const imageZoomWrapper = document.createElement("div");
const imageZoomInnerWrapper = document.createElement("div");
const closeImageButton = document.createElement("button");
const closeImageIcon = document.createElement("img");

imageZoomWrapper.classList.add("image-zoom-wrapper", "bootstrap");
imageZoomWrapper.setAttribute("role", "dialog");
imageZoomWrapper.setAttribute("aria-modal", "true");
imageZoomWrapper.setAttribute("aria-label", "Enlarged image");
imageZoomInnerWrapper.classList.add("container");

imageZoomWrapper.style.position = "fixed";
imageZoomWrapper.style.top = "0";
imageZoomWrapper.style.left = "0";
imageZoomWrapper.style.height = "100vh";
imageZoomWrapper.style.width = "100vw";
imageZoomWrapper.style.zIndex = "2000";
imageZoomWrapper.style.backgroundColor = "var(--tw-color-page, #FAFBFE)";
imageZoomWrapper.style.visibility = "hidden";

imageZoomInnerWrapper.style.transform = "scale(0.95)";
imageZoomInnerWrapper.style.height = "100vh";
imageZoomInnerWrapper.style.display = "flex";
imageZoomInnerWrapper.style.alignItems = "center";
imageZoomInnerWrapper.style.justifyContent = "center";

// The 8px padding keeps the icon where it was (16px from the top, 32px from
// the right) while giving the button a bigger target.
closeImageButton.type = "button";
closeImageButton.classList.add("image-zoom-close-button");
closeImageButton.setAttribute("aria-label", "Close");
closeImageButton.style.position = "absolute";
closeImageButton.style.top = "8px";
closeImageButton.style.right = "24px";
closeImageButton.style.padding = "8px";
closeImageButton.style.border = "0";
closeImageButton.style.background = "transparent";
closeImageButton.style.lineHeight = "0";
closeImageButton.style.cursor = "pointer";

closeImageIcon.classList.add("image-zoom-close");
closeImageIcon.src = "/images/close-grey.svg";
closeImageIcon.alt = "";
closeImageIcon.width = 16;
closeImageIcon.height = 16;

closeImageButton.appendChild(closeImageIcon);
imageZoomWrapper.appendChild(imageZoomInnerWrapper);
imageZoomWrapper.appendChild(closeImageButton);
document.body.appendChild(imageZoomWrapper);

let zoomTrigger = null;
let hideTimeout = null;

// Fade and scale, unless the reader asked for less motion. Returns how long
// the transition takes.
function setMotion() {
  const duration = reducedMotion.matches ? 0 : 200;
  imageZoomWrapper.style.transition = duration ? "opacity 0.2s" : "none";
  imageZoomInnerWrapper.style.transition = duration ? "transform 0.2s" : "none";
  return duration;
}

function openZoom(trigger, cloneImage) {
  clearTimeout(hideTimeout);
  setMotion();
  zoomTrigger = trigger;

  imageZoomWrapper.style.visibility = "visible";
  imageZoomWrapper.style.opacity = "1";

  if (imageZoomInnerWrapper.firstChild) {
    imageZoomInnerWrapper.firstChild.replaceWith(cloneImage);
  } else {
    imageZoomInnerWrapper.appendChild(cloneImage);
  }

  imageZoomInnerWrapper.style.transform = "scale(1)";
  closeImageButton.focus();
}

function closeZoom() {
  if (!zoomTrigger) {
    return;
  }

  const duration = setMotion();
  imageZoomWrapper.style.opacity = "0";
  imageZoomInnerWrapper.style.transform = "scale(0.95)";
  hideTimeout = setTimeout(function() {
    imageZoomWrapper.style.visibility = "hidden";
  }, duration);

  // A click on a detached wrapper (see below) has nothing to return to.
  if (zoomTrigger.isConnected) {
    zoomTrigger.focus({ preventScroll: true });
  }
  zoomTrigger = null;
}

// The close button's click bubbles here too.
imageZoomWrapper.addEventListener("click", closeZoom);

imageZoomWrapper.addEventListener("keydown", function(event) {
  if (event.key === "Tab") {
    event.preventDefault();
    closeImageButton.focus();
  }
});

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeZoom();
  }
});

// Avoid wrapping certain images, like the chevrons used in Learn breadcrumbst
const imagesToSkip = new Set(["chevron_blue.svg"]);
const contentImages = document.querySelectorAll(
  ".learn article img:not(.no-zoom)",
);
contentImages.forEach(function(image) {
  const parent = image.parentNode;
  const wrapper = document.createElement("div");
  if (!imagesToSkip.has(image.src.split("/").pop())) {
    wrapper.classList.add("image-wrapper");
    parent.replaceChild(wrapper, image);
    wrapper.appendChild(image);
  }
  const cloneImage = image.cloneNode();
  cloneImage.style.maxHeight = "90%";
  cloneImage.style.width = "auto";
  cloneImage.classList.add("shadow");

  cloneImage.addEventListener("click", function(e) {
    e.stopPropagation();
  });

  wrapper.addEventListener("click", function() {
    openZoom(wrapper, cloneImage);
  });

  // Keyboard access, except for images inside a link: the link is the
  // control there.
  if (wrapper.isConnected && !image.closest("a")) {
    wrapper.tabIndex = 0;
    wrapper.setAttribute("role", "button");
    wrapper.setAttribute(
      "aria-label",
      image.alt ? `Enlarge image: ${image.alt}` : "Enlarge image",
    );
    wrapper.addEventListener("keydown", function(event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openZoom(wrapper, cloneImage);
      }
    });
  }
});
