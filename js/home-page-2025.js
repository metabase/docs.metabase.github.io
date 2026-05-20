import { inView } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";

function homePageIsMobile() {
  return window.matchMedia("(max-width: 768px)").matches;
}

function homePageAnimateHero() {
  const pixelsToScroll = 3215;

  const headline = document.querySelector("h1");
  const cta = document.querySelector(".customer-list .buttons");
  const sellingPoints = document.querySelector(
    ".customer-list .selling-points",
  );
  const [msg1, msg2, msg3, msg4, msg5, msg6] = document.querySelectorAll(
    ".slack-message",
  );

  const customerListImage = document.querySelector(".customer-list div.padded");

  const msgs = [msg1, msg2, msg3, msg4, msg5, msg6];

  headline.initialMarginTop =
    parseFloat(getComputedStyle(headline).marginTop) || 0;
  headline.initialOpacity =
    parseFloat(getComputedStyle(headline).initialOpacity) || 1;
  cta.initialOpacity = parseFloat(getComputedStyle(cta).initialOpacity) || 1;
  sellingPoints.initialOpacity =
    parseFloat(getComputedStyle(sellingPoints).initialOpacity) || 1;

  msgs.forEach((msg) => {
    msg.initialTop = parseFloat(getComputedStyle(msg).top) || 0;
    msg.initialLeft = parseFloat(getComputedStyle(msg).left) || 0;
    msg.initialRotation = parseFloat(getComputedStyle(msg).rotate) || 0;
    msg.initialOpacity = 1;
  });

  customerListImage.initialMarginTop =
    parseFloat(getComputedStyle(customerListImage).marginTop) || 1;
  customerListImage.initialScale =
    parseFloat(getComputedStyle(customerListImage).scale) || 1;

  const callbacks = {
    onUpdate: (self) => {
      const progress = self.progress;

      updateMarginTop(headline, progress, -322, 0, 0.5);
      updateOpacity(headline, progress, 0.3, 0.4, 0);
      updateOpacity(sellingPoints, progress, 0.3, 0.4, 0);
      updateOpacity(cta, progress, 0.3, 0.4, 0);

      // if all params stay the same except element, i.e. arg0
      // we can loop the function calls
      updateSlackMessageBoxTop(msg1, progress, 1, msg1.initialTop + 300);
      updateSlackMessageBoxTop(msg2, progress, 1, msg2.initialTop + 300);
      updateSlackMessageBoxTop(msg3, progress, 1, msg3.initialTop + 300);
      updateSlackMessageBoxTop(msg4, progress, 1, msg4.initialTop + 300);
      updateSlackMessageBoxTop(msg5, progress, 1, msg5.initialTop + 300);
      updateSlackMessageBoxTop(msg6, progress, 1, msg6.initialTop + 300);

      if (!window.matchMedia("(max-width: 1200px)").matches) {
        updateSlackMessageBoxLeft(msg1, progress, 0.6, 400);
        updateSlackMessageBoxLeft(msg2, progress, 0.6, 400);
        updateSlackMessageBoxLeft(msg3, progress, 0.6, 400);
        updateSlackMessageBoxLeft(msg4, progress, 0.6, 400);
        updateSlackMessageBoxLeft(msg5, progress, 0.6, 400);
        updateSlackMessageBoxLeft(msg6, progress, 0.6, 400);
      }

      updateSlackMessageBoxRotation(msg1, progress, 1, 10);
      updateSlackMessageBoxRotation(msg2, progress, 1, -10);
      updateSlackMessageBoxRotation(msg3, progress, 1, -10);
      updateSlackMessageBoxRotation(msg4, progress, 1, 10);
      updateSlackMessageBoxRotation(msg5, progress, 1, -6);
      updateSlackMessageBoxRotation(msg6, progress, 1, 6);

      const [
        slackMessageProgressStart,
        slackMessageProgressEnd,
      ] = homePageIsMobile() ? [0.2, 0.25] : [0.67, 0.7];

      msgs.forEach((msg) => {
        updateOpacity(
          msg,
          progress,
          slackMessageProgressStart,
          slackMessageProgressEnd,
          0,
        );
      });

      const customerListImageFinalMarginTop = homePageIsMobile() ? -298 : -360;
      updateMarginTop(
        customerListImage,
        progress,
        customerListImageFinalMarginTop,
        0,
        0.5,
      );
      updateScale(customerListImage, progress, 0, 0.7, 1);
    },
  };

  window.ScrollTrigger.create({
    trigger: ".hero-wrap",
    pin: ".hero",
    start: "top-=80 top",
    // += value below should be identical or very close
    // to value of .scroll-lockable top * -1
    end: "+=" + pixelsToScroll,
    scrub: true,
    pinSpacing: true,
    ...callbacks,
  });
}

function homePageIntroduceCustomerList() {
  const customerList = document.querySelector(".customer-list");

  setTimeout(() => {
    customerList.classList.add("show");
  }, 2000);
}

function updateSlackMessageBoxTop(box, progress, progressEnd, finalTop) {
  const progressStart = 0;
  const initialTop = box.initialTop;

  if (progress < progressStart) {
    box.style.top = `${initialTop}px`;
  } else if (progress > progressEnd) {
    box.style.top = `${finalTop}px`;
  } else {
    let t = (progress - progressStart) / (progressEnd - progressStart);
    t = 1 - Math.pow(1 - t, 3);
    const top = initialTop + (finalTop - initialTop) * t;
    box.style.top = `${top}px`;
  }
}

function updateSlackMessageBoxLeft(box, progress, progressEnd, finalLeft) {
  const progressStart = 0;
  const initialLeft = box.initialLeft;

  // Keep it at 50% if narrow window
  if (window.matchMedia("(max-width: 1200px)").matches) {
    finalLeft = 50;
  }

  const unit = window.matchMedia("(max-width: 1200px)").matches ? "%" : "px";

  if (progress < progressStart) {
    box.style.left = initialLeft + unit;
  } else if (progress > progressEnd) {
    box.style.left = finalLeft + unit;
  } else {
    let t = (progress - progressStart) / (progressEnd - progressStart);
    t = t * t * (3 - 2 * t);
    const left = initialLeft + (finalLeft - initialLeft) * t;
    box.style.left = left + unit;
  }
}

function updateSlackMessageBoxRotation(
  box,
  progress,
  progressEnd,
  finalRotation,
) {
  const progressStart = 0;
  const initialRotation = box.initialRotation;

  if (progress < progressStart) {
    box.style.rotate = `${initialRotation}deg`;
  } else if (progress > progressEnd) {
    box.style.rotate = `${finalRotation}deg`;
  } else {
    let t = (progress - progressStart) / (progressEnd - progressStart);
    t = t * t * (3 - 2 * t);
    const rotation = initialRotation + (finalRotation - initialRotation) * t;
    box.style.rotate = `${rotation}deg`;
  }
}

function updateOpacity(
  element,
  progress,
  progressStart,
  progressEnd,
  finalOpacity,
) {
  const initialOpacity = element.initialOpacity;

  if (progress < progressStart) {
    element.style.opacity = initialOpacity;
  } else if (progress > progressEnd) {
    element.style.opacity = finalOpacity;
  } else {
    let t = (progress - progressStart) / (progressEnd - progressStart);
    t = t * t * (3 - 2 * t);
    const opacity = initialOpacity + (finalOpacity - initialOpacity) * t;
    element.style.opacity = opacity;
  }
}

function updateMarginTop(
  image,
  progress,
  finalMarginTop,
  progressStart,
  progressEnd,
) {
  const { initialMarginTop } = image;

  if (progress < progressStart) {
    image.style.marginTop = `${initialMarginTop}px`;
  } else if (progress > progressEnd) {
    image.style.marginTop = `${finalMarginTop}px`;
  } else {
    let t = (progress - progressStart) / (progressEnd - progressStart);
    t = t * t * (3 - 2 * t);
    const marginTop =
      initialMarginTop + (finalMarginTop - initialMarginTop) * t;
    image.style.marginTop = `${marginTop}px`;
  }
}

function homePageAnimateScrollBoundElements() {
  const lockableDivs = document.querySelectorAll(".scroll-lockable > div");
  const steps = [];

  lockableDivs.forEach((lockableDiv) => {
    const listItems = lockableDiv.querySelectorAll("li");

    if (listItems.length > 0) {
      steps.push(...listItems);
    } else {
      steps.push(lockableDiv);
    }
  });

  const callbacks = {
    onUpdate: (self) => {
      const stepWeights = [2, ...Array(steps.length - 1).fill(1)];
      const totalWeight = stepWeights.reduce((a, b) => a + b, 0);

      function getWeightedStep(progress) {
        const target = progress * totalWeight;
        let sum = 0;

        for (let i = 0; i < stepWeights.length; i++) {
          sum += stepWeights[i];
          if (target <= sum) return i;
        }
        return stepWeights.length - 1;
      }

      const progress = self.progress;
      const activeIndex = getWeightedStep(progress);

      const step = steps[activeIndex];

      updateLockableStep(lockableDivs, step);
    },
  };

  window.ScrollTrigger.create({
    trigger: ".scroll-lockable",
    start: "top top",
    end: "+=5000",
    pin: true,
    scrub: true,
    ...callbacks,
  });
}

// Lottie animations sometimes don't start properly when they are initially hidden
function startLottieAnimations(container) {
  const millisecondsToStart = 100;
  const lottieAnimations = container.querySelectorAll(".lottie-animation");

  setTimeout(() => {
    lottieAnimations.forEach((lottie) => {
      lottie.play();
    });
  }, millisecondsToStart);
}

function homePageHideAndShowHeader() {
  const header = document.querySelector("header");
  const promoBanner = header.querySelector(".promo-banner");

  if (promoBanner) {
    promoBanner.remove();
  }

  header.style.top = "0px";

  let lastY = window.scrollY;
  let hidden = 0; // pixels currently hidden

  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

  const update = () => {
    const maxHide = header.offsetHeight;
    header.style.transform = `translateY(${-clamp(hidden, 0, maxHide)}px)`;
  };

  addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      const dy = y - lastY; // +dy when scrolling down, -dy up
      lastY = y;

      hidden = clamp(hidden + dy, 0, header.offsetHeight);
      if (y <= 0) hidden = 0; // fully show at top
      update();
    },
    { passive: true },
  );

  addEventListener("resize", update);
}

function homePageAnimateCustomerList() {
  const marquee = document.querySelector(".customer-logos-container");
  const [t1, t2] = marquee.querySelectorAll(".track");
  t2.innerHTML = t1.innerHTML;
}

function homePageAnimateUnlockDataHeadline() {
  const h2 = document.querySelector(".unlock-data h2");
  const spans = [...h2.querySelectorAll("span")];

  const initialOpacity = 0.2;
  const initialScale = 0.95;
  const headlineStart = 0;
  const headlineDuration = 0.2;

  const clearShade = (element) => element.classList.remove("to-blue");

  const applyByProgress = (progress) => {
    const count = Math.ceil(progress * spans.length);
    spans.forEach((span, i) => {
      clearShade(span);
      if (i < count) span.classList.add("to-blue");
    });
  };

  const clampHeadline = (x) => Math.max(0, Math.min(1, x));
  const ease = (t) => t * t * (3 - 2 * t);
  const applyHeadlineProgress = (p) => {
    const t = ease(clampHeadline((p - headlineStart) / headlineDuration));
    const opacity = initialOpacity + (1 - initialOpacity) * t;
    const scale = initialScale + (1 - initialScale) * t;
    h2.style.opacity = opacity.toFixed(3);
    h2.style.transform = `scale(${scale.toFixed(3)})`;
  };

  const computeProgress = () => {
    const { top, height } = h2.getBoundingClientRect();
    const vh = window.innerHeight;

    const padFrac = 0.25;
    const padPx = vh * padFrac;

    const baseStart = vh;
    const baseEnd = vh / 2.2 - height / 2;
    const start = baseStart - padPx;
    const end = baseEnd - padPx;

    const denom = Math.max(1, start - end);
    if (top >= start) return 0;
    if (top <= end) return 1;
    return (start - top) / denom;
  };

  inView(
    h2,
    () => {
      h2.style.transformOrigin = "center";
      h2.style.willChange = "transform, opacity";
      h2.style.opacity = initialOpacity;
      h2.style.transform = `scale(${initialScale})`;

      let ticking = false;
      const onTick = () => {
        ticking = false;
        const progress = computeProgress();
        applyByProgress(progress);
        applyHeadlineProgress(progress);
      };

      const onScroll = () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(onTick);
        }
      };
      const onResize = onScroll;

      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
      };
    },
    { margin: "0px 0px -15% 0px" },
  );
}

function homePageAnimateReadyAtAllStages() {
  if (homePageIsMobile()) {
    return;
  }

  const lockableDivs = document.querySelector(
    ".ready-at-all-stages-scroll-lockable",
  );

  const [card1, card2, card3] = lockableDivs.querySelectorAll(".card");

  const footer = document.querySelector(".home-page-2025 .footer");

  const measure = () => {
    card1.initialMarginTop = parseFloat(getComputedStyle(card1).marginTop) || 0;
    card1.initialRotation = parseFloat(getComputedStyle(card1).rotate) || 0;
    card1.initialScale = parseFloat(getComputedStyle(card1).scale) || 0;
    card2.initialMarginTop = parseFloat(getComputedStyle(card2).marginTop) || 0;
    card2.initialRotation = parseFloat(getComputedStyle(card2).rotate) || 0;
    card2.initialScale = parseFloat(getComputedStyle(card2).scale) || 0;
    card3.initialMarginTop = parseFloat(getComputedStyle(card3).marginTop) || 0;
    card3.initialRotation = parseFloat(getComputedStyle(card3).rotate) || 0;
    card3.initialScale = parseFloat(getComputedStyle(card3).scale) || 0;
    footer.initialMarginTop =
      parseFloat(getComputedStyle(footer).marginTop) || 0;
  };

  measure();

  const callbacks = {
    onUpdate: (self) => {
      const progress = self.progress;

      updateReadyAtAllStagesCardMarginTop(card1, progress, 0, 0.8, 54);
      updateReadyAtAllStagesCardRotation(card1, progress, 0, 0.8, 5);
      updateScale(card1, progress, 0, 0.9, 1);
      updateReadyAtAllStagesCardMarginTop(card2, progress, 0.25, 0.8, -290);
      updateReadyAtAllStagesCardRotation(card2, progress, 0.25, 0.8, -4);
      updateScale(card2, progress, 0, 0.9, 1);
      updateReadyAtAllStagesCardMarginTop(card3, progress, 0.35, 1, -290, true);
      updateScale(card3, progress, 0, 0.9, 1);
      updateReadyAtAllStagesHeadlineContainerOpacity(progress);
      updateReadyAtAllStagesCardMarginTop(footer, progress, 0.7, 1, -500);
    },
  };

  setTimeout(() => {
    window.ScrollTrigger.create({
      trigger: ".ready-at-all-stages-scroll-lockable",
      start: "top+=100 top",
      end: "+=1200",
      pin: true,
      scrub: true,
      ...callbacks,
    });
  }, 4600);
}

function updateReadyAtAllStagesCardMarginTop(
  card,
  progress,
  progressStart,
  progressEnd,
  finalMarginTop,
  addMarginBottom,
) {
  const initialMarginTop = card.initialMarginTop;

  if (progress < progressStart) {
    card.style.marginTop = `${initialMarginTop}px`;
  } else if (progress > progressEnd) {
    card.style.marginTop = `${finalMarginTop}px`;
  } else {
    let t = (progress - progressStart) / (progressEnd - progressStart);
    t = t * t * (3 - 2 * t);
    const marginTop =
      initialMarginTop + (finalMarginTop - initialMarginTop) * t;
    card.style.marginTop = `${marginTop}px`;
    if (addMarginBottom) {
      card.style.marginBottom = `${-marginTop}px`;
    }
  }
}

function updateReadyAtAllStagesCardRotation(
  card,
  progress,
  progressStart,
  progressEnd,
) {
  const initialRotation = card.initialRotation;
  const finalRotation = 5;

  if (progress < progressStart) {
    card.style.rotate = `${initialRotation}deg`;
  } else if (progress > progressEnd) {
    card.style.rotate = `${finalRotation}deg`;
  } else {
    let t = (progress - progressStart) / (progressEnd - progressStart);
    t = t * t * (3 - 2 * t);
    const rotation = initialRotation + (finalRotation - initialRotation) * t;
    card.style.rotate = `${rotation}deg`;
  }
}

function updateScale(card, progress, progressStart, progressEnd, finalScale) {
  const initialScale = card.initialScale;

  if (progress < progressStart) {
    card.style.scale = initialScale;
  } else if (progress > progressEnd) {
    card.style.scale = finalScale;
  } else {
    let t = (progress - progressStart) / (progressEnd - progressStart);
    t = t * t * (3 - 2 * t);
    const scale = initialScale + (finalScale - initialScale) * t;
    card.style.scale = scale;
  }
}

function updateReadyAtAllStagesHeadlineContainerOpacity(progress) {
  const progressStart = 0.8;
  const progressEnd = 1.0;
  const initialOpacity = 1;
  const finalOpacity = 0;

  const headlineContainer = document.querySelector(
    ".ready-at-all-stages .headline-container",
  );

  if (progress < progressStart) {
    headlineContainer.style.opacity = initialOpacity;
  } else if (progress > progressEnd) {
    headlineContainer.style.opacity = finalOpacity;
  } else {
    let t = (progress - progressStart) / (progressEnd - progressStart);
    t = t * t * (3 - 2 * t);
    const opacity = initialOpacity + (finalOpacity - initialOpacity) * t;
    headlineContainer.style.opacity = opacity;
  }
}

function loadLottieAnimations() {
  window.lottie.loadAnimation({
    container: document.querySelector(".connect-to-your-data .left"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "/images/animations/home-page-2025/datasources-left.json",
  });

  window.lottie.loadAnimation({
    container: document.querySelector(".connect-to-your-data .right"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "/images/animations/home-page-2025/datasources-right.json",
  });
}

function updateLockableStep(lockableDivs, step) {
  if (step.tagName === "DIV") {
    lockableDivs.forEach((div) => {
      div.classList.remove("active");
    });
    startLottieAnimations(step);
  } else {
    const closestLockableDiv =
      step.parentElement.parentElement.parentElement.parentElement;
    const togglableList = step.closest("ul");
    const togglableListItems = togglableList.querySelectorAll("li");
    const centerItems = closestLockableDiv.querySelectorAll(".center > *");

    const stepIndex = Array.from(togglableListItems).indexOf(step);

    togglableList.className = "li-active-" + stepIndex;

    lockableDivs.forEach((div) => {
      div.classList.remove("active");
    });
    closestLockableDiv.classList.add("active");

    centerItems.forEach((item) => {
      item.style.display = "none";
    });
    centerItems[stepIndex].style.display = "block";

    togglableListItems.forEach((li) => {
      li.classList.remove("active");
    });
  }

  step.classList.add("active");
}

function homePageShowUnlockDataSection() {
  const section = document.querySelector(".unlock-data");
  section.classList.add("show");
}

function homePageInitTooltips() {
  const applyTT = document.querySelectorAll(".apply-tooltip");

  window.tippy(applyTT, {
    animation: "fade",
    duration: [300, 300],
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

function homePageInitCopyCommandToClipboard() {
  const button = document.querySelector(".card-1 > span");
  const initialTooltipContent = button.getAttribute("data-tippy-content");

  button.addEventListener("click", function(e) {
    e.preventDefault();
    const tippyInstance = e.currentTarget._tippy;

    navigator.clipboard
      .writeText(button.querySelector("pre span").textContent.trim())
      .then(function() {
        tippyInstance.setContent("Copied to clipboard");

        setTimeout(() => {
          tippyInstance.setContent(initialTooltipContent);
        }, 3000);
      });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  homePageAnimateHero();
  homePageIntroduceCustomerList();
  loadLottieAnimations();
  homePageAnimateScrollBoundElements();
  homePageHideAndShowHeader();
  homePageAnimateCustomerList();
  homePageShowUnlockDataSection();
  homePageAnimateUnlockDataHeadline();
  homePageAnimateReadyAtAllStages();
  homePageInitTooltips();
  homePageInitCopyCommandToClipboard();
});
