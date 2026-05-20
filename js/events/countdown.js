/* global checkIfIsInTheFuture parseDateTime*/

const secondsInOneDay = 60 * 60 * 24;
const secondsInOneHour = 60 * 60;

function countdown() {
  const dateContainer = getDateContainer();
  const [year, month, day, hour, minute] = parseDateTime(dateContainer);

  const event = new Date(Date.UTC(year, month - 1, day, hour, minute));
  const eventTimestamp = parseInt(Date.parse(event) / 1000);

  const now = parseInt(Date.parse(new Date())) / 1000;

  const daysDiff = parseInt((eventTimestamp - now) / secondsInOneDay);
  const daysRemainder = (eventTimestamp - now) % secondsInOneDay;

  const hoursDiff = parseInt(daysRemainder / secondsInOneHour);
  const hoursRemainder = daysRemainder % secondsInOneHour;

  const minutesDiff = parseInt(hoursRemainder / 60);
  const minutesRemainder = hoursRemainder % 60;

  updateCounter(daysDiff, hoursDiff, minutesDiff, minutesRemainder);
}

function getCountdownContainer() {
  return document.querySelector(".countdown");
}

function getDateContainer() {
  return document.querySelector(".hero [data-date]");
}

function updateCounter(days, hours, minutes, seconds) {
  const countdown = document.querySelector(".countdown");

  countdown.querySelector(".countdown-days").textContent = days;
  countdown.querySelector(".countdown-hours").textContent = String(
    hours,
  ).padStart(2, "0");
  countdown.querySelector(".countdown-minutes").textContent = String(
    minutes,
  ).padStart(2, "0");
  countdown.querySelector(".countdown-seconds").textContent = String(
    seconds,
  ).padStart(2, "0");
}

window.addEventListener("DOMContentLoaded", () => {
  const dateContainer = getDateContainer();
  const [year, month, day, hour, minute] = parseDateTime(dateContainer);

  const event = new Date(Date.UTC(year, month - 1, day, hour, minute));

  if (checkIfIsInTheFuture(event)) {
    getCountdownContainer().classList.add("show");

    countdown();

    setInterval(countdown, 1000);
  }
});
