// Date helpers for the nav-header promo banner, and nothing else.
//
// The events pages this used to drive are Astro's now; their date logic moved,
// DOM-free, to `apps/marketing-astro/src/lib/event-time.ts`.
//
// What kept the file alive is `js/promo-banner.js`, which reads the banner's own
// `data-date` / `data-time` to decide whether the event has passed. The two
// scripts share these three functions as globals rather than imports because
// `_includes/promo-banner.html` loads this one with a plain `<script src>`.
// Astro's native PromoBanner component has its own module and does not load this
// file; these helpers remain for Jekyll pages until those pages migrate.

/**
 * Returns `null` unless the element carries both attributes — `promo-banner.js`
 * relies on that to tell a banner with an end date from one without.
 */
/*eslint-disable-next-line no-unused-vars*/
function parseDateTime(dateContainer) {
  if (!dateContainer) {
    return null;
  }

  const dateDate = dateContainer.getAttribute("data-date");
  const dateTime = dateContainer.getAttribute("data-time");

  if (dateDate && dateTime) {
    const [year, month, day] = dateDate.split("-");
    const [hour, minute] = dateTime.split(":");

    return [year, month, day, hour, minute];
  }

  return null;
}

// This is used by the promo banner
/*eslint-disable-next-line no-unused-vars*/
function getHowManyHoursApart(event1, event2) {
  const difference = event1 - event2;

  return difference / 1000 / 60 / 60;
}

// This is used by the promo banner
/*eslint-disable-next-line no-unused-vars*/
function getHowManyMinutesApart(event1, event2) {
  const difference = event1 - event2;

  return difference / 1000 / 60;
}
