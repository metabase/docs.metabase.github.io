function getPage() {
  return document.querySelector(".releases") ? "releases" : "roadmap";
}

function getEntriesInReleasesPage() {
  const unfilteredEntries = Array.from(
    document.querySelectorAll(".roadmap__entry"),
  );

  const { entries: entriesUnreversed } = unfilteredEntries.reduce(
    (acc, currentYear) => {
      const year = currentYear.classList[1].split("-")[1];

      if (acc.currentYear !== year) {
        acc.entries.push(currentYear);
        acc.currentYear = year;
      }

      return acc;
    },
    { entries: [], currentYear: null },
  );

  return entriesUnreversed.reverse();
}

function getEntriesInRoadmapPage() {
  return Array.from(
    document.querySelectorAll(".roadmap__entries > .roadmap__entry"),
  ).reverse();
}

function initRoadmapNavigation() {
  if (window.innerWidth > 992) {
    roadmapNavigateInDesktop();
  } else {
    roadmapNavigateInMobile();
  }
}

function roadmapNavigateInDesktop() {
  const extraVerticalSpace = getPage() === "roadmap" ? -80 : -80;
  const $buttons = document.querySelectorAll(".roadmap__navigation button");
  const nowHeader = document.querySelector(".roadmap__entries");

  $buttons.forEach(($button) => {
    $button.addEventListener("mouseup", function() {
      const [cohort] = $button.className.split("__").slice(-1);

      const classToScrollTo =
        getPage() === "roadmap"
          ? ".roadmap__tiles__header__" + cohort
          : ".roadmap__entry.year-" + cohort;

      const distanceBetweenNowHeaderAndDocumentTop =
        window.pageYOffset + nowHeader.getBoundingClientRect().top;

      const topElement =
        getPage() === "roadmap"
          ? document.querySelector(classToScrollTo).parentElement
          : document.querySelectorAll(classToScrollTo)[0];

      const offsetToScrollTo =
        topElement.offsetTop +
        distanceBetweenNowHeaderAndDocumentTop +
        extraVerticalSpace;

      window.scrollTo({ top: offsetToScrollTo, behavior: "smooth" });
    });
  });
}

function roadmapNavigateInMobile() {
  const extraVerticalSpace = getPage() === "roadmap" ? 160 : 155;

  const $buttons = document.querySelectorAll(".roadmap__navigation button");

  $buttons.forEach(($button) => {
    $button.addEventListener("click", function() {
      const [cohort] = $button.className.split("__").slice(-1);

      const header = document.querySelector(".navigation-header");
      const headerBottom = header.getBoundingClientRect().bottom;

      const elementToScrollTo =
        getPage() === "roadmap"
          ? document.querySelector(".roadmap__tiles__header__" + cohort)
              .parentElement
          : document.querySelector(".roadmap__entry.year-" + cohort);

      const offsetToScrollTo =
        elementToScrollTo.offsetTop - headerBottom + extraVerticalSpace;

      window.scrollTo({ top: offsetToScrollTo, behavior: "smooth" });
    });
  });
}

function initRoadmapTagSectionAsActive() {
  tagSectionAsActive();

  document.addEventListener("scroll", function() {
    tagSectionAsActive();
  });
}

function tagSectionAsActive() {
  const tagSectionAsActiveInMobile =
    getPage() === "releases"
      ? tagSectionAsActiveInMobileReleasesPage
      : tagSectionAsActiveInMobileRoadmapPage;

  if (window.innerWidth > 992) {
    tagSectionAsActiveInDesktop();
  } else {
    tagSectionAsActiveInMobile();
  }
}

function tagSectionAsActiveInDesktop() {
  const extraVerticalSpace = 250;
  const entries =
    getPage() === "roadmap"
      ? getEntriesInRoadmapPage()
      : getEntriesInReleasesPage();

  const buttons = Array.from(
    document.querySelectorAll(".roadmap__navigation button"),
  ).reverse();

  for (let i = 0, len = buttons.length; i < len; i++) {
    const buttonTop = buttons[i].getBoundingClientRect().top;
    const entryTop = entries[i].getBoundingClientRect().top;

    if (buttonTop > entryTop + extraVerticalSpace) {
      buttons.forEach((button) => button.classList.remove("active"));
      buttons[i].classList.add("active");

      const buttonContainerClassToAppend = buttons[i].classList[0].split(
        "__",
      )[2];

      const newNavigationClass =
        getPage() === "roadmap"
          ? `roadmap__navigation ${buttonContainerClassToAppend}`
          : `roadmap__navigation year-${buttonContainerClassToAppend}`;

      document.querySelector(
        ".roadmap__navigation",
      ).className = newNavigationClass;

      break;
    }
  }
}

function tagSectionAsActiveInMobileReleasesPage() {
  const extraVerticalSpace = 50;

  const navigationContainerBottom = document
    .querySelector(".roadmap__navigation")
    .getBoundingClientRect().bottom;

  const entries =
    getPage() === "roadmap"
      ? getEntriesInRoadmapPage()
      : getEntriesInReleasesPage();

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const entryTop = entry.getBoundingClientRect().top;

    if (navigationContainerBottom > entryTop - extraVerticalSpace) {
      const year = entry.classList[1].split("-")[1];

      const buttons = document.querySelectorAll(".roadmap__navigation button");
      const buttonToActivate = document.querySelector(
        ".roadmap__navigation__" + year,
      );

      buttons.forEach((button) => button.classList.remove("active"));

      buttonToActivate.classList.add("active");

      const newNavigationClass = `roadmap__navigation year-${year}`;

      document.querySelector(
        ".roadmap__navigation",
      ).className = newNavigationClass;

      break;
    }
  }
}

function tagSectionAsActiveInMobileRoadmapPage() {
  const extraVerticalSpace = 22;
  const navigationContainer = document.querySelector(".roadmap__navigation");
  const soonHeader = document.querySelector(".roadmap__tiles__header__soon");
  const laterHeader = document.querySelector(".roadmap__tiles__header__later");

  const navigationContainerBottom = document
    .querySelector(".roadmap__navigation")
    .getBoundingClientRect().bottom;

  const nowButton = document.querySelector(".roadmap__navigation__now");
  const soonButton = document.querySelector(".roadmap__navigation__soon");
  const laterButton = document.querySelector(".roadmap__navigation__later");

  const laterHeaderTop = laterHeader.getBoundingClientRect().top;
  const soonHeaderTop = soonHeader.getBoundingClientRect().top;

  if (navigationContainerBottom > laterHeaderTop - extraVerticalSpace) {
    navigationContainer.className = "roadmap__navigation later";
    laterButton.classList.add("active");
    soonButton.classList.remove("active");
    nowButton.classList.remove("active");
  } else if (navigationContainerBottom > soonHeaderTop - extraVerticalSpace) {
    navigationContainer.className = "roadmap__navigation soon";
    soonButton.classList.add("active");
    laterButton.classList.remove("active");
    nowButton.classList.remove("active");
  } else {
    navigationContainer.className = "roadmap__navigation now";
    nowButton.classList.add("active");
    soonButton.classList.remove("active");
    laterButton.classList.remove("active");
  }
}

function initRoadmapNavigationFade() {
  const pageWeAreIn = getPage();
  document.addEventListener("scroll", function() {
    const roadmap = document.querySelector(".roadmap");
    const navigation = document.querySelector(".roadmap__navigation");

    const bottomSpace = pageWeAreIn === "roadmap" ? 500 : 800;
    const bottomSpaceDelta = bottomSpace - 100;

    const roadmapBottom = roadmap.getBoundingClientRect().bottom;

    if (roadmapBottom > bottomSpace) {
      navigation.style.opacity = 1;
    } else if (
      roadmapBottom < bottomSpace &&
      roadmapBottom > bottomSpaceDelta
    ) {
      const newOpacity = (roadmapBottom - bottomSpaceDelta) / 100;
      navigation.style.opacity = newOpacity;
    } else {
      navigation.style.opacity = 0;
    }
  });
}

function initRoadmapFormatEntries() {
  const moments = ["now", "soon", "later"];

  moments.forEach((moment) => {
    formatEntries(`.roadmap__tiles__${moment} .roadmap__entry`);
  });

  document
    .querySelectorAll(".roadmap__entry")
    .forEach((entry) => entry.classList.add("show"));
}

function formatEntries(className) {
  let row = 1;
  let column = 1;
  const entries = document.querySelectorAll(className);

  entries.forEach((entry, index) => {
    if (entry.classList.contains("two-by-one")) {
      entry.style.gridColumn = "1 / 3";
      entry.style.gridRow = row;

      column = 1;
      row++;
    } else if (entry.classList.contains("one-by-one")) {
      if (
        index < entries.length - 1 &&
        column == 1 &&
        entries[index + 2] &&
        entries[index + 2].classList.contains("one-by-two") &&
        entries[index + 2].classList.contains("right-side")
      ) {
        // Left column, above another one-to-one
        entry.style.gridRow = row;
        entry.style.gridColumn = column;
      } else if (
        index < entries.length - 1 &&
        column == 1 &&
        entries[index + 1].classList.contains("one-by-two") &&
        entries[index + 1].classList.contains("right-side")
      ) {
        // Left column, below another one-to-one
        entry.style.gridRow = row + 1;
        entry.style.gridColumn = column;

        column = 2;
      } else if (
        index > 0 &&
        column == 2 &&
        entries[index - 1].classList.contains("one-by-two")
      ) {
        // Right column, above another one-to-one
        entry.style.gridRow = row;
        entry.style.gridColumn = column;

        row++;
      } else if (
        index > 1 &&
        column == 2 &&
        entries[index - 2].classList.contains("one-by-two")
      ) {
        // Right column, below another one-to-one
        entry.style.gridRow = row;
        entry.style.gridColumn = column;

        row++;
        column = 1;
      } else {
        entry.style.gridRow = row;
        entry.style.gridColumn = column;

        if (column == 2) {
          row++;
        }
        column = column == 1 ? 2 : 1;
      }
    } else if (entry.classList.contains("one-by-two")) {
      entry.style.gridRow = row + " / " + (row + 2);
      entry.style.gridColumn = column;

      if (column == 2) {
        row = row + 2;
      }
      column = column == 1 ? 2 : 1;
    }
  });
}

function initRoadmapFixNavigationInMobile() {
  if (window.innerWidth > 992) {
    return;
  }

  const navigation = document.querySelector(".roadmap__navigation");
  const header = document.querySelector(".navigation-header");
  const headline = document.querySelector("h1");
  const entriesContainer = document.querySelector(".roadmap__entries");

  maybeFixNavigationContainerInMobile(
    navigation,
    header,
    headline,
    entriesContainer,
  );

  window.addEventListener("scroll", function() {
    maybeFixNavigationContainerInMobile(
      navigation,
      header,
      headline,
      entriesContainer,
    );
  });
}

function maybeFixNavigationContainerInMobile(
  navigation,
  header,
  headline,
  entriesContainer,
) {
  if (!headline) {
    return;
  }

  const headerBottom = header.getBoundingClientRect().bottom;
  const headlineBottom = headline.getBoundingClientRect().bottom;

  if (headerBottom > headlineBottom + 9) {
    navigation.classList.add("translate3d");
    navigation.classList.add("fixed");
    entriesContainer.classList.add("extra-margin-top");
  } else {
    navigation.classList.remove("fixed", "translate3D");
    entriesContainer.classList.remove("extra-margin-top");
  }
}

function initDragMobileReleasesNav() {
  const element = document.querySelector(".roadmap__navigation__slider");
  const elementInitialLeft = element.parentElement.offsetLeft;

  let pos1 = 0,
    pos3 = 0;

  element.onmousedown = (event) => dragMouseDown(event, elementInitialLeft);
  document.addEventListener("touchstart", (event) =>
    dragMouseDown(event, elementInitialLeft),
  );

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();

    const isTouch = e.type === "touchmove";
    const clientX = isTouch ? e.touches[0].clientX : e.clientX;

    // get the mouse cursor position at startup:
    pos3 = clientX;

    document.onmouseup = closeDragElement;
    element.addEventListener("touchend", closeDragElement);

    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
    element.addEventListener("touchmove", elementDrag);
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    const isTouch = e.type === "touchmove";
    const clientX = isTouch ? e.touches[0].clientX : e.clientX;

    // calculate the new cursor position:
    pos1 = pos3 - clientX;
    pos3 = clientX;

    const newLeft = element.offsetLeft - pos1;

    const maxLeft =
      element.scrollWidth - window.innerWidth + elementInitialLeft * 2;

    // Limit dragging so that nav does not go out of screen
    if (newLeft <= elementInitialLeft && newLeft >= -maxLeft) {
      element.style.left = newLeft + "px";
    }
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  initRoadmapNavigation();
  initRoadmapTagSectionAsActive();
  initRoadmapNavigationFade();
  initRoadmapFormatEntries();
  initRoadmapFixNavigationInMobile();
  initDragMobileReleasesNav();
});
