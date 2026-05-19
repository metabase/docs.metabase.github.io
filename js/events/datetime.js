function formatDatetimes() {
  const dateContainers = document.querySelectorAll("[data-date]");

  dateContainers.forEach(function(dateContainer) {
    if (dateContainer.classList.contains("recurrence")) {
      return;
    }

    if (dateContainer.classList.contains("promo-banner")) {
      return;
    }

    formatDatetime(dateContainer);
  });
}

function formatDatetime(dateContainer) {
  const [year, month, day, hour, minute] = parseDateTime(dateContainer);

  const event = new Date(Date.UTC(year, month - 1, day, hour, minute));

  const formattedDate = formatDate(event);

  dateContainer.innerHTML = formattedDate;

  maybeShowDateAndLengthContainer(dateContainer);
}

function maybeShowDateAndLengthContainer(dateContainer) {
  const dateAndLengthContainer = dateContainer.closest(".date-and-length");

  if (dateAndLengthContainer) {
    dateAndLengthContainer.classList.add("visible");
  }
}

function getTimezone(event) {
  const isInTheFuture = checkIfIsInTheFuture(event);

  if (isInTheFuture) {
    const timezone = new Date()
      .toLocaleTimeString(undefined, { timeZoneName: "short" })
      .split(" ")
      .slice(-1);

    return " (" + timezone + ")";
  }

  return "";
}

function formatDate(event) {
  const isInTheFuture = checkIfIsInTheFuture(event);

  const options = isInTheFuture
    ? { dateStyle: "full", timeStyle: "short" }
    : { dateStyle: "medium" };

  const timezone = getTimezone(event);

  return new Intl.DateTimeFormat(undefined, options).format(event) + timezone;
}

function checkIfIsInTheFuture(event) {
  const now = new Date();
  return event > now;
}

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

function hideRegistrationButtonFromPastEvents() {
  const $dateContainer = document.querySelector(".hero [data-date]");

  if ($dateContainer) {
    const [year, month, day, hour, minute] = parseDateTime($dateContainer);
    const date = new Date(Date.UTC(year, month - 1, day, hour, minute));

    const isInTheFuture = checkIfIsInTheFuture(date);
    if (!isInTheFuture) {
      const $registrationButton = document.querySelector(".hero .registration");
      if ($registrationButton) {
        $registrationButton.remove();
      }
    }
  }
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

window.addEventListener("DOMContentLoaded", () => {
  formatDatetimes();
  hideRegistrationButtonFromPastEvents();
});
