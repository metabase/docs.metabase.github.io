const imageZoomWrapper = document.createElement("div");
const imageZoomInnerWrapper = document.createElement("div");
const closeImageButton = document.createElement("img");

imageZoomWrapper.classList.add("image-zoom-wrapper", "bootstrap");
imageZoomInnerWrapper.classList.add("container");

imageZoomWrapper.style.transition = "opacity 0.2s";
imageZoomWrapper.style.position = "fixed";
imageZoomWrapper.style.top = "0";
imageZoomWrapper.style.left = "0";
imageZoomWrapper.style.height = "100vh";
imageZoomWrapper.style.width = "100vw";
imageZoomWrapper.style.zIndex = "2000";
imageZoomWrapper.style.visibility = "hidden";

imageZoomInnerWrapper.style.transition = "transform 0.2s";
imageZoomInnerWrapper.style.transform = "scale(0.95)";
imageZoomInnerWrapper.style.height = "100vh";
imageZoomInnerWrapper.style.display = "flex";
imageZoomInnerWrapper.style.alignItems = "center";
imageZoomInnerWrapper.style.justifyContent = "center";

closeImageButton.src = "/images/close-grey.svg";
closeImageButton.alt = "Close Image Button";
closeImageButton.width = 16;
closeImageButton.height = 16;
closeImageButton.style.position = "absolute";
closeImageButton.style.top = "16px";
closeImageButton.style.right = "32px";
closeImageButton.style.cursor = "pointer";

imageZoomWrapper.appendChild(imageZoomInnerWrapper);
imageZoomWrapper.appendChild(closeImageButton);

// The overlay follows the docs theme (docs-tokens.css); resolved when the
// overlay opens so a theme change while the page is open is picked up.
function applyOverlayTheme() {
  const root = document.documentElement;
  const isDark = root.getAttribute("data-theme") === "dark";
  const background = getComputedStyle(root).getPropertyValue("--mb-bg").trim();
  imageZoomWrapper.style.backgroundColor = background || "#FAFBFE";
  closeImageButton.style.filter = isDark ? "invert(0.8)" : "";
}
document.body.appendChild(imageZoomWrapper);

imageZoomWrapper.addEventListener("click", function() {
  imageZoomWrapper.style.opacity = "0";
  imageZoomInnerWrapper.style.transform = "scale(0.95)";
  setTimeout(function() {
    imageZoomWrapper.style.visibility = "hidden";
  }, 200);
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
    applyOverlayTheme();
    imageZoomWrapper.style.visibility = "visible";
    imageZoomWrapper.style.opacity = "1";

    if (imageZoomInnerWrapper.firstChild) {
      imageZoomInnerWrapper.firstChild.replaceWith(cloneImage);
    } else {
      imageZoomInnerWrapper.appendChild(cloneImage);
    }

    imageZoomInnerWrapper.style.transform = "scale(1)";
  });
});
