const animationDuration = 50000000;
const animationFinalLeft = -3000000;
const timeToRecycle = 2000;

function getImagesContainer() {
  return document.querySelector(".events-carousel .images-container");
}

function getAnimation() {
  const imagesContainer = getImagesContainer();
  const [animation] = imagesContainer.getAnimations();

  return animation;
}

function isCarouselStopped() {
  return getAnimation() === undefined;
}

function checkIfFilterIsOn() {
  const imagesContainer = getImagesContainer();
  return imagesContainer.getAttribute("data-is-filter-on") === "true";
}

function initCarousel() {
  const imagesContainer = getImagesContainer();
  const images = imagesContainer.querySelectorAll(".image-container");

  for (let i = 0; i < 5; i++) {
    addExtraImages(images);
  }

  prependSetOfImages();
}

function addExtraImages(images) {
  const imagesContainer = getImagesContainer();

  images.forEach((image) => {
    const clone = image.cloneNode(true);
    imagesContainer.appendChild(clone);
  });
}

function terminateAnimation() {
  const animation = getAnimation();

  if (animation) {
    animation.commitStyles();
    animation.cancel();
  }
}

function animateCarousel(slow = false) {
  const imagesContainer = getImagesContainer();
  const currentLeft = imagesContainer.style.left || 0;
  const finalLeft = parseInt(currentLeft) + animationFinalLeft;

  const movement = [{ left: currentLeft + "px" }, { left: finalLeft + "px" }];

  const duration = slow ? animationDuration * 2.5 : animationDuration;

  const timing = {
    duration,
    iterations: 1,
  };

  imagesContainer.animate(movement, timing);

  initPauseAndPlay();
}

function initPauseAndPlay() {
  const imagesContainer = getImagesContainer();

  imagesContainer.addEventListener("mouseenter", handleMouseEnter);
  imagesContainer.addEventListener("mouseleave", handleMouseLeave);
}

function handleMouseEnter() {
  const isFilterOn = checkIfFilterIsOn();

  terminateAnimation();

  if (!isFilterOn) {
    animateCarousel(true);
  }
}

function handleMouseLeave() {
  const isFilterOn = checkIfFilterIsOn();

  terminateAnimation();

  if (!isFilterOn) {
    animateCarousel();
  }
}

function recycleImages() {
  setInterval(() => {
    maybeRecycleImage();
  }, timeToRecycle);
}

function maybeRecycleImage() {
  if (isCarouselStopped()) {
    return;
  }

  const imagesContainer = getImagesContainer();
  const { gap, left, paddingLeft } = getImagesContainerInfo();
  const firstImage = imagesContainer.querySelectorAll(".image-container")[0];
  const firstImageWidth = firstImage.offsetWidth;

  if (left - paddingLeft > firstImageWidth + gap) {
    const newPaddingLeft = paddingLeft + firstImageWidth + gap;

    doRecycleImage(imagesContainer, firstImage, newPaddingLeft);
  }
}

function doRecycleImage(imagesContainer, image, newPaddingLeft) {
  const clone = image.cloneNode(true);
  clone.addEventListener("click", handleImageClick);

  image.remove();
  imagesContainer.appendChild(clone);
  imagesContainer.style.paddingLeft = `${newPaddingLeft}px`;
}

function getImagesContainerInfo() {
  const imagesContainer = getImagesContainer();

  const styles = window.getComputedStyle(imagesContainer);
  const gap = styles.getPropertyValue("gap");
  const left = styles.getPropertyValue("left");
  const paddingLeft = styles.getPropertyValue("padding-left");

  return {
    gap: parseInt(gap),
    left: Math.abs(parseInt(left)),
    paddingLeft: parseInt(paddingLeft),
  };
}

function initFilterByCategory() {
  const imagesContainer = getImagesContainer();

  imagesContainer.querySelectorAll(".image-container").forEach((image) => {
    image.addEventListener("click", handleImageClick);
  });
}

function handleImageClick(event) {
  const image = event.target;
  const isSelected = image
    .closest(".image-container")
    .getAttribute("data-is-selected");

  if (isSelected === "true") {
    handleUnselectCategory(image);
  } else {
    handleSelectCategory(image);
  }
}

function handleUnselectCategory(image) {
  const imagesContainer = getImagesContainer();

  resetFiltersByCategory();

  imagesContainer.setAttribute("data-is-filter-on", "false");

  image.closest(".image-container").setAttribute("data-is-selected", "false");
}

function handleSelectCategory(image) {
  const imagesContainer = getImagesContainer();
  const category = image.getAttribute("data-category");

  imagesContainer.setAttribute("data-is-filter-on", "true");

  imagesContainer.querySelectorAll(".image-container").forEach((image) => {
    image.setAttribute("data-is-selected", "false");
  });

  image.closest(".image-container").setAttribute("data-is-selected", "true");

  doFilterByCategory(category);

  terminateAnimation();

  centerOnSelectedImage(image);
}

function centerOnSelectedImage(image) {
  const imageLeft = image.getBoundingClientRect().left;
  const imageWidth = image.offsetWidth;

  const imagesContainer = getImagesContainer();
  const imagesContainerLeft = parseInt(imagesContainer.style.left);

  const carousel = document.querySelector(".events-carousel");
  const carouselWidth = carousel.offsetWidth;

  const newLeft =
    imagesContainerLeft + (carouselWidth - imageWidth) / 2 - imageLeft;

  const movement = [
    { left: imagesContainerLeft + "px" },
    { left: newLeft + "px" },
  ];

  const options = {
    duration: 500,
    easing: "ease-in-out",
  };

  const animation = imagesContainer.animate(movement, options);
  imagesContainer.setAttribute("data-is-centering", "true");

  animation.finished.then(() => {
    imagesContainer.style.left = `${newLeft}px`;
    imagesContainer.setAttribute("data-is-centering", "false");
  });
}

function prependSetOfImages() {
  const imagesContainer = getImagesContainer();
  const images = imagesContainer.querySelectorAll(".image-container");

  const imagesContainerInitialLeft = parseInt(imagesContainer.style.left) || 0;
  const imagesContainerInitialWidth = imagesContainer.offsetWidth;

  images.forEach((image) => {
    const clone = image.cloneNode(true);
    imagesContainer.appendChild(clone);
  });

  const imagesContainerFinalWidth = imagesContainer.offsetWidth;

  const imagesContainerNewLeft =
    imagesContainerInitialLeft -
    (imagesContainerFinalWidth - imagesContainerInitialWidth);

  imagesContainer.style.left = `${imagesContainerNewLeft}px`;
}

function resetFiltersByCategory() {
  const pastEvents = document.querySelectorAll(".past-events .events-entry");

  pastEvents.forEach((eventEntry) => {
    eventEntry.classList.remove("hidden");
  });
}

function doFilterByCategory(category) {
  const pastEvents = document.querySelectorAll(".past-events .events-entry");

  pastEvents.forEach((eventEntry) => {
    eventEntry.classList.remove("hidden");

    if (eventEntry.getAttribute("data-category") !== category) {
      eventEntry.classList.add("hidden");
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  initCarousel();
  animateCarousel();
  recycleImages();

  initFilterByCategory();
});
