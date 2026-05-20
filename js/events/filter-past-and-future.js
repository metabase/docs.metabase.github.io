/* global parseDateTime checkIfIsInTheFuture*/

function getUpcomingEvents() {
  return document.querySelectorAll(".upcoming-events .events-entry");
}

function filterUpcomingEvents() {
  const upcomingEvents = getUpcomingEvents();

  upcomingEvents.forEach(function(upcomingEvent) {
    const dateContainer = upcomingEvent.querySelector("[data-date]");

    const [year, month, day, hour, minute] = parseDateTime(dateContainer);
    const date = new Date(Date.UTC(year, month - 1, day, hour, minute));

    if (!checkIfIsInTheFuture(date)) {
      upcomingEvent.remove();
    }
  });
}

// If there are no upcoming events,
// don't show the upcoming events container
function maybeShowUpcomingEventContainer() {
  const upcomingEvents = getUpcomingEvents();

  if (upcomingEvents.length > 0) {
    const upcomingEventsContainer = document.querySelector(".upcoming-events");
    upcomingEventsContainer.classList.add("show");
  } else {
    showNoUpcomingEventsForm();
  }
}

function showNoUpcomingEventsForm() {
  const noUpcomingEventsForm = document.querySelector(".no-upcoming-events");
  noUpcomingEventsForm.classList.add("show");
}

function filterPastEvents() {
  const pastEvents = document.querySelectorAll(".past-events .events-entry");

  pastEvents.forEach(function(pastEvent) {
    const dateContainer = pastEvent.querySelector("[data-date]");

    const [year, month, day, hour, minute] = parseDateTime(dateContainer);
    const date = new Date(Date.UTC(year, month - 1, day, hour, minute));

    if (checkIfIsInTheFuture(date)) {
      pastEvent.remove();
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  filterUpcomingEvents();
  maybeShowUpcomingEventContainer();
  filterPastEvents();
});
