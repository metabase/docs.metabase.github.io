function updateMailToInHelpConnect() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const email = urlParams.get("email");
  const siteURL = urlParams.get("site_url");

  if (!email || !siteURL) {
    return;
  }

  const mailTo = `mailto:help@metabase.com?subject=Need help connecting my database, URL: ${siteURL}&cc=${email}`;

  const emailLink = document.querySelector(".help-connect-metabase");

  emailLink.setAttribute("href", mailTo);
}

window.addEventListener("DOMContentLoaded", () => {
  updateMailToInHelpConnect();
});
