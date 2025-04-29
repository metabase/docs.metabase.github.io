function initPassReferralParamsToForms() {
  const forms = document.querySelectorAll("[data-fillout-id]");

  forms.forEach((form) => {
    const prevPageTitle = new URLSearchParams(window.location.search).get(
      "prev_page_title",
    );

    if (prevPageTitle) {
      form.setAttribute("prev_page_title", prevPageTitle);
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  initPassReferralParamsToForms();
});
