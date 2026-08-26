function initAINewsletterSubscribeFormFillUTMInputs() {
  const fields = {
    UTM_SOURCE: "utm_source",
    UTM_MEDIUM: "utm_medium",
    UTM_CAMPAI: "utm_campaign",
    UTM_TERM: "utm_term",
    UTM_CONTEN: "utm_content",
    UTM_ID: "utm_id",
  };

  for (const [key, value] of Object.entries(fields)) {
    const inputElements = document.querySelectorAll(`input[name="${key}"]`);

    if (inputElements) {
      inputElements.forEach((inputElement) => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const searchValue = urlSearchParams.get(value);

        if (searchValue) {
          inputElement.value = searchValue;
        }
      });
    }
  }
}

function initAINewsletterSubscribeFormFillSignupPathInput() {
  const inputElements = document.querySelectorAll(`input[name="SIGNUP_PAT"]`);

  if (inputElements) {
    inputElements.forEach((inputElement) => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const searchValue = urlSearchParams.get("signup_path");
      inputElement.value = searchValue || window.location.pathname;
    });
  }
}

document.addEventListener("DOMContentLoaded", function() {
  initAINewsletterSubscribeFormFillUTMInputs();
  initAINewsletterSubscribeFormFillSignupPathInput();
});
