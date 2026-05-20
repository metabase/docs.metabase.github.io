function initUnify() {
  var e = [
    "identify",
    "page",
    "startAutoPage",
    "stopAutoPage",
    "startAutoIdentify",
    "stopAutoIdentify",
  ];
  function t(o) {
    return Object.assign(
      [],
      e.reduce(function(r, n) {
        return (
          (r[n] = function() {
            return o.push([n, [].slice.call(arguments)]), o;
          }),
          r
        );
      }, {}),
    );
  }
  window.unify || (window.unify = t(window.unify)),
    window.unifyBrowser || (window.unifyBrowser = t(window.unifyBrowser));
  var n = document.createElement("script");
  (n.async = !0),
    n.setAttribute(
      "src",
      "https://tag.unifyintent.com/v1/72L4GeJrvJmBWW2pNVPNCj/script.js",
    ),
    n.setAttribute(
      "data-api-key",
      "wk_5xzx5cKN_FhnTppTPcT68DAGdZututeX8FHXPY1ct",
    ),
    n.setAttribute("id", "unifytag"),
    (document.body || document.head).appendChild(n);
}

function unifyGetOrgSize(userCount) {
  if (userCount <= 50) {
    return "micro";
  } else if (userCount <= 200) {
    return "small";
  } else if (userCount <= 1000) {
    return "medium";
  } else if (userCount <= 10000) {
    return "enterprise";
  } else {
    return "mega-enterprise";
  }
}

function unifyRedirectUpgradeWithOrgSize() {
  if (window.location.pathname !== "/upgrade/") {
    return;
  }

  const params = new URLSearchParams(window.location.search);

  if (params.has("utm_term")) {
    return;
  }

  const utmUsers = params.get("utm_users");
  if (!utmUsers) {
    return;
  }

  const userCount = Number.parseInt(utmUsers, 10);
  if (Number.isNaN(userCount) || userCount < 1) {
    return;
  }

  const orgSize = unifyGetOrgSize(userCount);
  const utmTerm = `org-size-${orgSize}`;

  // Create new URL with /upgrade/ and add utm_term
  const newUrl = new URL(window.location.href);
  newUrl.pathname = "/upgrade/";
  newUrl.searchParams.set("utm_term", utmTerm);

  // Preserve all existing params (utm_users will be preserved automatically)
  window.location.replace(newUrl.toString());
}

window.addEventListener("DOMContentLoaded", () => {
  unifyRedirectUpgradeWithOrgSize();
  initUnify();
});
