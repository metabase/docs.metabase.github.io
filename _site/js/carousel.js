const $sliders = document.querySelectorAll(".carousel");
const interval = 10800;
const animationTime = 1100;

// Detect Safari
const userAgentString = navigator.userAgent;
let safariAgent = userAgentString.indexOf("Safari") > -1;
const chromeAgent = userAgentString.indexOf("Chrome") > -1;
// Discard Safari since it also matches Chrome
if (chromeAgent && safariAgent) {
  safariAgent = false;
}

/**
 * Helper for animateSlider. Returns object containing current, prev, and next
 * image indexes.
 * @param {list} [$sliderImgs]
 */
function getCurrPrevImgs($sliderImgs) {
  const output = {
    prev: -1,
    current: -1,
    next: -1,
  };
  for (let i = 0; i < $sliderImgs.length; i++) {
    if ($sliderImgs[i].classList.contains("carousel__slide--current")) {
      output["current"] = i;
    } else if ($sliderImgs[i].classList.contains("carousel__slide--prev")) {
      output["prev"] = i;
    } else if ($sliderImgs[i].classList.contains("carousel__slide--next")) {
      output["next"] = i;
    }
  }
  return output;
}

/**
 * @param {int} [direction] right or left
 * @param {Element} [$slider] The slider element.
 */
function animateSlider(direction, $slider) {
  const $sliderImgs = $slider.querySelectorAll(".carousel__slide");
  for (let i = 0; i < $sliderImgs.length; i++) {
    $sliderImgs[i].classList.remove("carousel-preload");
    $sliderImgs[i].style.animation = "";
  }
  const imgIndex = getCurrPrevImgs($sliderImgs);
  const prevImg = imgIndex["prev"];
  const currImg = imgIndex["current"];
  const nextImg = imgIndex["next"];
  const safariBrowserAnimation = safariAgent ? " both" : "";
  console.log(safariBrowserAnimation);
  if (direction == "right") {
    // remove classes
    $sliderImgs[nextImg].classList.remove("carousel__slide--next");
    $sliderImgs[currImg].classList.remove("carousel__slide--current");
    $sliderImgs[prevImg].classList.remove("carousel__slide--prev");
    // add classes
    const indexToBeBroughtIn =
      nextImg + 1 > $sliderImgs.length - 1 ? 0 : nextImg + 1;
    $sliderImgs[indexToBeBroughtIn].style.animation =
      "right-in 1s" + safariBrowserAnimation;
    $sliderImgs[indexToBeBroughtIn].classList.add("carousel__slide--next");
    $sliderImgs[prevImg].style.animation =
      "left-out 1s" + safariBrowserAnimation;
    $sliderImgs[nextImg].classList.add("carousel__slide--current");
    $sliderImgs[currImg].classList.add("carousel__slide--prev");
  } else if (direction == "left") {
    // remove classes
    $sliderImgs[prevImg].classList.remove("carousel__slide--prev");
    $sliderImgs[currImg].classList.remove("carousel__slide--current");
    $sliderImgs[nextImg].classList.remove("carousel__slide--next");
    $sliderImgs[currImg].style.animation = "";
    // add classes
    const indexToBeBroughtIn =
      prevImg - 1 < 0 ? $sliderImgs.length - 1 : prevImg - 1;
    $sliderImgs[indexToBeBroughtIn].style.animation =
      "left-in 1s" + safariBrowserAnimation;
    $sliderImgs[indexToBeBroughtIn].classList.add("carousel__slide--prev");
    $sliderImgs[prevImg].classList.add("carousel__slide--current");
    $sliderImgs[currImg].classList.add("carousel__slide--next");
    $sliderImgs[nextImg].style.animation =
      "right-out 1s" + safariBrowserAnimation;
  }
}

for (let i = 0; i < $sliders.length; ++i) {
  const $slider = $sliders[i];
  const $sliderImgs = $slider.querySelectorAll(".carousel__slide");

  $sliderImgs[0].classList.add("carousel__slide--prev");
  $sliderImgs[1].classList.add("carousel__slide--current");
  $sliderImgs[2].classList.add("carousel__slide--next");

  let intrvl = setInterval(() => animateSlider("right", $slider), interval);
  let animationTimeout;
  let isAnimationAvailable = true;

  // Nav Button Listeners
  const $navButtons = $slider.querySelectorAll(".carousel__nav--button");
  for (let i = 0; i < $navButtons.length; ++i) {
    const $button = $navButtons[i];
    const direction = $button.classList.contains("carousel__nav--right")
      ? "right"
      : "left";
    $button.addEventListener("click", function() {
      if (isAnimationAvailable) {
        animateSlider(direction, $slider);
        isAnimationAvailable = false;
        clearTimeout(animationTimeout);
        setTimeout(() => {
          isAnimationAvailable = true;
        }, animationTime);
        clearInterval(intrvl);
        intrvl = setInterval(() => animateSlider("right", $slider), interval);
      }
    });
  }

  // Touch Move Listeners
  let touchstartX = 0;
  let touchendX = 0;
  let eventThrottle;
  ["touchstart", "mousedown"].forEach((eventName) => {
    $slider.addEventListener(eventName, (e) => {
      clearTimeout(eventThrottle);
      eventThrottle = setTimeout(function() {
        touchstartX =
          e.type === "touchstart" ? e.changedTouches[0].screenX : e.screenX;
      }, 50);
    });
  });

  ["touchend", "mouseup"].forEach((eventName) => {
    $slider.addEventListener(eventName, (e) => {
      clearTimeout(eventThrottle);
      eventThrottle = setTimeout(function() {
        touchendX =
          e.type === "touchend" ? e.changedTouches[0].screenX : e.screenX;
        const direction = touchendX < touchstartX ? "right" : "left";
        const swipeLargeEnough =
          Math.abs(touchendX - touchstartX) > 50 ? true : false;
        if (isAnimationAvailable && swipeLargeEnough) {
          animateSlider(direction, $slider);
          isAnimationAvailable = false;
          clearTimeout(animationTimeout);
          animationTimeout = setTimeout(function() {
            isAnimationAvailable = true;
          }, animationTime);
          clearInterval(intrvl);
          intrvl = setInterval(() => animateSlider("right", $slider), interval);
        }
      }, 50);
    });
  });

  //Card Click Listeners
  $slider.addEventListener("click", function(e) {
    const target = e.target.closest(".carousel__slide");
    let direction = null;
    if (target) {
      if (target.classList.contains("carousel__slide--prev")) {
        direction = "left";
      } else if (target.classList.contains("carousel__slide--next")) {
        direction = "right";
      }
    }
    if (isAnimationAvailable && direction) {
      animateSlider(direction, $slider);
      isAnimationAvailable = false;
      clearTimeout(animationTimeout);
      animationTimeout = setTimeout(function() {
        isAnimationAvailable = true;
      }, animationTime);
      clearInterval(intrvl);
      intrvl = setInterval(() => animateSlider("right", $slider), interval);
    }
  });
}
