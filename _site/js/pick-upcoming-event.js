/* global checkIfIsInTheFuture*/

function showUpcomingEvent() {
  const events = document.querySelectorAll(".upcoming-events .events-entry");

  if (events.length === 0) {
    return;
  }

  const otherEventsInTheFuture = getOtherEventsInTheFuture(events);

  if (otherEventsInTheFuture.length > 0) {
    displayEvent(otherEventsInTheFuture);
  }
}

function displayEvent(events) {
  const eventToShow = events[Math.floor(Math.random() * events.length)];
  eventToShow.classList.add("show");

  const container = document.querySelector(".upcoming-events");
  container.classList.add("show");
}

function getOtherEventsInTheFuture(events) {
  return Array.from(events).filter(function(event) {
    const dateContainer = event.querySelector("[data-date]");

    const [year, month, day] = dateContainer
      .getAttribute("data-date")
      .split("-");
    const [hour, minute] = dateContainer.getAttribute("data-time").split(":");

    const date = new Date(Date.UTC(year, month - 1, day, hour, minute));

    return checkIfIsInTheFuture(date);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  showUpcomingEvent();
});
