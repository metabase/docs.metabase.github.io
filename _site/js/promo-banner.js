/* global getHowManyHoursApart getHowManyMinutesApart parseDateTime */

const timeToHidePromoBanner = 1000 * 60 * 60 * 24 * 7; // 7 days

function getMainHeader() {
  return document.querySelector("header.bootstrap");
}

function checkIfPromoBannerIsHidden() {
  const hoursTillEvent = getHoursTillEvent();

  // eslint-disable-next-line
  if (hoursTillEvent < 0 || hoursTillEvent === -0) {
    const minutesTillEvent = getMinutesTillEvent();
    return minutesTillEvent <= 0;
  }

  const promoBannerVisibility = getLocalStorageWithExpiry(
    "promo-banner-visibility",
  );

  // Hide the promo banner on landing pages
  if (document.querySelector(".landing-page") !== null) {
    return true;
  }

  return promoBannerVisibility === "hidden";
}

function getPromoBanner() {
  return document.querySelector(".promo-banner");
}

function initHeader() {
  const isPromoBannerHidden = checkIfPromoBannerIsHidden();
  if (isPromoBannerHidden) {
    const promoBanner = getPromoBanner();
    promoBanner.remove();

    const mainHeader = getMainHeader();
    mainHeader.classList.add("promo-banner-hidden");
  } else {
    const promoBanner = getPromoBanner();
    promoBanner.classList.remove("hidden");
  }

  const navigationNeader = document.querySelector(".navigation-header");
  navigationNeader.classList.add("visible");

  repositionSubmenu();
}

function initPromoBanner() {
  const $button = document.querySelector(".promo-banner button");
  $button.addEventListener("click", () => {
    handleHidePromoBanner();
  });
}

function handleHidePromoBanner() {
  const promoBanner = getPromoBanner();
  promoBanner.classList.add("no-height");

  const mainHeader = getMainHeader();
  mainHeader.classList.add("promo-banner-hidden");

  setTimeout(() => {
    promoBanner.remove();
    repositionSubmenu();
  }, 2250);

  setLocalStorageWithExpiry(
    "promo-banner-visibility",
    "hidden",
    timeToHidePromoBanner,
  );
}

function initSubmenu() {
  repositionSubmenu();

  window.addEventListener("scroll", repositionSubmenu);
}

function initDocumentationNavigationContent() {
  const isPromoBannerHidden = checkIfPromoBannerIsHidden();
  if (isPromoBannerHidden) {
    const documentationNavigationContent = document.querySelector(
      "#documentation-navigation-content",
    );

    documentationNavigationContent.classList.add("promo-banner-hidden");
  }
}

function repositionSubmenu() {
  const $promoBanner = getPromoBanner();
  const $navigationContainer = document.querySelector(
    ".navigation-header .container",
  );
  const navigationContainerTop = $navigationContainer.getBoundingClientRect()
    .top;
  const offsetY =
    $promoBanner && !$promoBanner.classList.contains("hidden")
      ? `${navigationContainerTop}px`
      : 0;
  document.querySelector("#product-nav-menu-wrapper").style.marginTop = offsetY;
  document.querySelector(
    "#resources-nav-menu-wrapper",
  ).style.marginTop = offsetY;
  document.querySelector("#docs-nav-menu-wrapper").style.marginTop = offsetY;
  document.querySelector(
    "#features-nav-menu-wrapper",
  ).style.marginTop = offsetY;
}

function initPromoBannerCountdown() {
  const hoursTillEvent = getHoursTillEvent();

  if (hoursTillEvent >= 1 && hoursTillEvent < 24) {
    populatePromoBannerCountdownHours(hoursTillEvent);
  } else if (hoursTillEvent === 0) {
    const minutesTillEvent = getMinutesTillEvent();
    populatePromoBannerCountdownMinutes(minutesTillEvent);
  }
}

function populatePromoBannerCountdownHours(hoursTillEvent) {
  const pluralizedHour = hoursTillEvent > 1 ? "hours" : "hour";

  populatePromoBannerCountdown(hoursTillEvent, pluralizedHour);
}

function populatePromoBannerCountdownMinutes(minutesTillEvent) {
  const pluralizedMinute = minutesTillEvent > 1 ? "minutes" : "minute";

  populatePromoBannerCountdown(minutesTillEvent, pluralizedMinute);
}

function populatePromoBannerCountdown(howMany, unit) {
  const $container = document.querySelector(".promo-banner .button");
  $container.classList.add("countdown-active");

  const text = `In ${howMany} ${unit}`;

  $container.innerHTML = `<img src='/images/icons/bell.svg' />${text}`;
}

function setLocalStorageWithExpiry(key, value, ttl) {
  const now = new Date();

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

function getLocalStorageWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  // if the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}

function getHoursTillEvent() {
  const promoBanner = getPromoBanner();
  const time = parseDateTime(promoBanner);
  if (time) {
    const [year, month, day, hour, minute] = time;
    const event = new Date(Date.UTC(year, month - 1, day, hour, minute));
    const now = new Date();

    return parseInt(getHowManyHoursApart(event, now));
  }
}

function getMinutesTillEvent() {
  const promoBanner = getPromoBanner();
  const time = parseDateTime(promoBanner);
  if (time) {
    const [year, month, day, hour, minute] = time;
    const event = new Date(Date.UTC(year, month - 1, day, hour, minute));
    const now = new Date();

    return parseInt(getHowManyMinutesApart(event, now));
  }
}

window.addEventListener("DOMContentLoaded", () => {
  initHeader();

  const $promoBanner = getPromoBanner();
  if ($promoBanner) {
    initPromoBanner();
    initSubmenu();
    initDocumentationNavigationContent();
    initPromoBannerCountdown();
  }
});
