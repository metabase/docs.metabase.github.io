function initAddReferralParamsToAnchors() {
  const targetPagesToAddReferralTo = ["/sales", "/talk-to-a-person"];
  const anchors = document.querySelectorAll("a");

  anchors.forEach((anchor) => {
    if (!anchor.href) {
      return;
    }

    const spCookie = getCookie("sp");

    const url = new URL(anchor.href);

    if (!isHttpUrl(url)) {
      return;
    }

    const matches = targetPagesToAddReferralTo.some((targetPage) =>
      anchor.href.includes(targetPage),
    );

    if (matches) {
      // Add parameters normally
      url.searchParams.set("prev_page_title", document.title);
      if (spCookie) {
        url.searchParams.set("id", spCookie);
      }

      // Now generate the final href string manually, replacing + with %20
      const rawSearch = url.searchParams.toString().replace(/\+/g, "%20");

      anchor.href = `${url.origin}${url.pathname}?${rawSearch}`;
    }
  });
}

// Rebuilding an href from a non-http(s) URL is unsafe: `url.origin` is the
// literal string "null" for unknown schemes (e.g. a typo like "htttps://"),
// which turns the link into a relative "null/..." path on the current page.
function isHttpUrl(url) {
  return url.protocol === "https:" || url.protocol === "http:";
}

function getCookie(name) {
  const cookieArr = document.cookie.split("; ");

  for (const cookie of cookieArr) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }

  return null;
}

function initHandleUseCaseParams() {
  if (window.newUseCaseName) {
    // Update current URL in browser location bar
    const url = new URL(window.location);
    url.searchParams.set("use_case", window.newUseCaseName);
    window.history.replaceState({}, "", url);

    addUseCaseParamsToAnchors(window.newUseCaseName);
  } else {
    const params = new URLSearchParams(document.location.search);
    const useCase = params.get("use_case");

    if (useCase) {
      addUseCaseParamsToAnchors(useCase);
    }
  }
}

window.initHandleUseCaseParams = initHandleUseCaseParams;

function initReuseUTMParamsInAnchors() {
  const anchors = document.querySelectorAll("a");
  anchors.forEach(reuseUTMParamsInAnchor);
}

function reuseUTMParamsInAnchor(anchor) {
  if (!anchor.href) {
    return;
  }

  const url = new URL(window.location);
  const newHref = new URL(anchor.href);
  const utmAttributesToPassAlong = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
  ];

  utmAttributesToPassAlong.forEach(function(utmAttribute) {
    const utmParam = url.searchParams.get(utmAttribute);

    if (utmParam) {
      newHref.searchParams.set(utmAttribute, utmParam);
    }
  });

  anchor.href = newHref;
}

function addUseCaseParamsToAnchors(useCase) {
  const anchors = document.querySelectorAll("a");

  anchors.forEach((anchor) => {
    if (!anchor.href || anchor.hasAttribute("data-use-case-switcher")) {
      return;
    }

    const url = new URL(anchor.href);

    if (!isHttpUrl(url)) {
      return;
    }

    url.searchParams.set("use_case", useCase);

    const rawSearch = url.searchParams.toString().replace(/\+/g, "%20");

    anchor.href = `${url.origin}${url.pathname}?${rawSearch}`;
  });
}

window.addEventListener("DOMContentLoaded", () => {
  initAddReferralParamsToAnchors();
  initHandleUseCaseParams();
  initReuseUTMParamsInAnchors();
});
