(async function() {
  const searchParams = new URLSearchParams(window.location.search);

  if (searchParams.get("no_gdpr") === "true") {
    return;
  }

  ////////////////////////////////////////
  // GEOLOCATION
  ////////////////////////////////////////

  const MAX_RETRY = 3;

  const COUNTRIES_WITH_COOKIE_POLICY_RESTRICTION = [
    { name: "Austria", country: "AT", country_3: "AUT" },
    { name: "Belgium", country: "BE", country_3: "BEL" },
    { name: "Bulgaria", country: "BG", country_3: "BGR" },
    { name: "Croatia", country: "HR", country_3: "HRV" },
    { name: "Cyprus", country: "CY", country_3: "CYP" },
    { name: "Czech Republic", country: "CZ", country_3: "CZE" },
    { name: "Denmark", country: "DK", country_3: "DNK" },
    { name: "Estonia", country: "EE", country_3: "EST" },
    { name: "Finland", country: "FN", country_3: "FIN" },
    { name: "France", country: "FR", country_3: "FRA" },
    { name: "Germany", country: "DE", country_3: "DEU" },
    { name: "Greece", country: "GR", country_3: "GRC" },
    { name: "Hungary", country: "HU", country_3: "HUN" },
    { name: "Ireland", country: "IE", country_3: "IRL" },
    { name: "Italy", country: "IT", country_3: "ITA" },
    { name: "Latvia", country: "LV", country_3: "LVA" },
    { name: "Lithuania", country: "LT", country_3: "LTU" },
    { name: "Luxembourg", country: "LU", country_3: "LUX" },
    { name: "Malta", country: "MT", country_3: "MLT" },
    { name: "The Netherlands", country: "NL", country_3: "NLD" },
    { name: "Poland", country: "PL", country_3: "POL" },
    { name: "Portugal", country: "PT", country_3: "PRT" },
    { name: "Romania", country: "RO", country_3: "ROU" },
    { name: "Slovakia", country: "SK", country_3: "SVK" },
    { name: "Slovenia", country: "SI", country_3: "SVN" },
    { name: "Spain", country: "ES", country_3: "ESP" },
    { name: "Sweden", country: "SE", country_3: "SWE" },
    { name: "United Kingdom", country: "GB", country_3: "GBR" },
    { name: "Switzerland", country: "CH", country_3: "CHE" },
    { name: "Brazil", country: "BR", country_3: "BRA" },
  ];

  const REPLAYS_DISABLED_COUNTRIES = ["RU", "CN"];

  function hasCookiePolicyRestriction(geolocation) {
    const countryObj = COUNTRIES_WITH_COOKIE_POLICY_RESTRICTION.find(
      (countryObj) =>
        countryObj.country === geolocation.country ||
        countryObj.country_3 === geolocation.country_3,
    );

    return !!countryObj;
  }

  async function loadGeolocation(retryCount) {
    try {
      const response = await fetch("https://get.geojs.io/v1/ip/country.json", {
        method: "GET",
      });
      const geolocation = await response.json();
      if (
        geolocation &&
        REPLAYS_DISABLED_COUNTRIES.includes(geolocation.country)
      ) {
        window.SENTRY_REPLAY_ENABLED = false;
      }
      geolocation.hasCookiePolicyRestriction = hasCookiePolicyRestriction(
        geolocation,
      );
      return geolocation;
    } catch (err) {
      // retry with Sentry message
      if (retryCount + 1 < MAX_RETRY) {
        return await loadGeolocation(retryCount + 1);
      }
      // error
      else {
        window.Sentry.captureException(
          new Error(
            `Fail to load geolocation: ${err.message ||
              err.status ||
              err.toString()}`,
          ),
        );
      }
    }

    return {};
  }

  const geolocation = await loadGeolocation(0);

  ////////////////////////////////////////
  // GDPR
  ////////////////////////////////////////

  // locales
  gdprCookieNoticeLocales = {
    en: {
      description:
        "Like so many others, we use cookies to improve your experience on this website. We assume you're OK with it, but you can opt out if you want.",
      settings: "Settings",
      accept: "Accept cookies",
      statement: "Our cookie statement",
      save: "Save settings",
      always_on: "Always on",
      cookie_essential_title: "Essential website cookies",
      cookie_essential_desc:
        "Necessary cookies help make a website usable by enabling basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.",
      cookie_performance_title: "Performance cookies",
      cookie_performance_desc:
        "These cookies are used to enhance the performance and functionality of our websites but are non-essential to their use. For example it stores your preferred language or the region that you are in.",
      cookie_analytics_title: "Analytics cookies",
      cookie_analytics_desc:
        "We use analytics cookies to help us measure how users interact with website content, which helps us customize our websites and application for you in order to enhance your experience.",
      cookie_marketing_title: "Marketing cookies",
      cookie_marketing_desc:
        "These cookies are used to make advertising messages more relevant to you and your interests. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third party advertisers.",
    },
  };

  // initialize plugin
  gdprCookieNotice({
    statement: "https://www.metabase.com/privacy",
    performance: ["JSESSIONID"],
    analytics: ["_gat", "ga"],
    domain: ".metabase.com",
    marketing: ["SSID"],
    timeout: 300,
  });

  // read cookie value
  const readCookieValue = document.cookie
    .split(";")
    .map((cookie) => cookie.split("="))
    .reduce(
      (accumulator, [key, value]) => ({
        ...accumulator,
        [key.trim()]: decodeURIComponent(value),
      }),
      {},
    );

  const gdprcookie = readCookieValue.gdprcookienotice
    ? JSON.parse(readCookieValue.gdprcookienotice)
    : {};

  function hideBar() {
    document
      .querySelectorAll(
        ".gdpr-cookie-notice, .gdpr-cookie-notice-modal-content, .gdpr-cookie-notice-modal",
      )
      .forEach(function(a) {
        a.remove();
      });
  }

  function loadGoogleTagManager() {
    if (!document.getElementById("gtmTagHead")) {
      const GTMID = "GTM-PVKWSPWD";
      const GTagHead = document.createElement("script");
      GTagHead.src = `https://www.googletagmanager.com/gtag/js?id=${GTMID}`;
      GTagHead.type = "text/javascript";
      GTagHead.async = true;
      GTagHead.id = "gtmTagHead";
      document.head.appendChild(GTagHead);

      const GTagConfig = document.createElement("noscript");
      const GTagConfigIframe = GTagConfig.appendChild(
        document.createElement("iframe"),
      );
      GTagConfigIframe.src = `https://www.googletagmanager.com/ns.html?id=${GTMID}`;
      GTagConfigIframe.height = "0";
      GTagConfigIframe.width = "0";
      GTagConfigIframe.style.display = "none";
      GTagConfigIframe.style.visibility = "hidden";
      document.body.appendChild(GTagConfig);

      const GTagScript = document.createElement("script");
      GTagScript.src = "/js/google-tag-manager.js";

      document.body.appendChild(GTagScript);
    }
  }

  // marketing

  let hasMarketingScripts = false;
  function loadMarketingScripts() {
    if (hasMarketingScripts) {
      return;
    }

    const hotjarScript = document.createElement("script");
    hotjarScript.src = "/js/marketing-hotjar.js";
    hotjarScript.type = "text/javascript";
    document.body.appendChild(hotjarScript);

    const snowplowScript = document.createElement("script");
    snowplowScript.src = "/js/marketing-snowplow.js";
    snowplowScript.type = "text/javascript";
    document.body.appendChild(snowplowScript);

    // Only load Google Tag Manager on Marketing consent
    loadGoogleTagManager();

    hasMarketingScripts = true;
  }

  let hasAnonymousMarketingScripts = false;
  function loadAnonymousMarketingScripts() {
    if (hasAnonymousMarketingScripts) {
      return;
    }

    const anonSnowplow = document.createElement("script");
    anonSnowplow.src = "/js/anonymous-snowplow.js";
    anonSnowplow.type = "text/javascript";
    document.body.appendChild(anonSnowplow);

    hasAnonymousMarketingScripts = true;
  }

  // analytics

  let hasAnalyticsScripts = false;
  function loadAnalyticsScripts(accepted) {
    window.metabaseProductAnalyticsBeforeSend = (type, payload) => {
      return Object.assign({ have_consent: accepted }, payload);
    };

    if (hasAnalyticsScripts) {
      return;
    }

    if (window.environment === "production") {
      const metabaseProductAnalyticsScript = document.createElement("script");
      metabaseProductAnalyticsScript.src =
        "https://static.metabase.com/analytics_tracker.js";
      metabaseProductAnalyticsScript.type = "text/javascript";
      metabaseProductAnalyticsScript.async = true;
      metabaseProductAnalyticsScript.setAttribute(
        "data-website-id",
        "23eefa30-4c4f-490e-aa4f-084cd23b1561",
      );
      metabaseProductAnalyticsScript.setAttribute(
        "data-host-url",
        "https://product-analytics-ingestion.staging.metabase.com/api",
      );
      metabaseProductAnalyticsScript.setAttribute("data-auto-track", "true");
      metabaseProductAnalyticsScript.setAttribute("data-tag", "www");
      metabaseProductAnalyticsScript.setAttribute(
        "data-before-send",
        "metabaseProductAnalyticsBeforeSend",
      );
      document.head.appendChild(metabaseProductAnalyticsScript);
    }

    hasAnalyticsScripts = true;
  }

  // checks

  function checkMarketingConsent() {
    if (
      gdprcookie.marketing ||
      (gdprcookie.marketing === undefined &&
        !geolocation.hasCookiePolicyRestriction)
    ) {
      loadMarketingScripts();
    }
  }

  function checkAnalyticsConsent() {
    const accepted =
      gdprcookie.analytics ||
      (gdprcookie.analytics === undefined &&
        !geolocation.hasCookiePolicyRestriction);
    loadAnalyticsScripts(accepted);
  }

  function checkBarDismissed() {
    if (gdprcookie.date) {
      hideBar();
    }
  }

  // on page load - have you accepted already?
  loadAnonymousMarketingScripts();
  checkMarketingConsent();
  checkAnalyticsConsent();
  checkBarDismissed();

  document.addEventListener("gdprCookiesEnabled", function(e) {
    if (e.detail.marketing) {
      loadMarketingScripts();
    }

    loadAnalyticsScripts(e.detail.analytics);

    document.body.classList.add("cookies-accepted");
    hideBar();
  });
})();

/* add container for styling */
document.addEventListener(
  "DOMContentLoaded",
  function() {
    var addedToDocument = false;
    var $wrapper = document.createElement("div");
    $wrapper.id = "gdpr-outer-container";
    var $nodesToWrap = document.getElementsByClassName("gdpr-cookie-notice");
    for (var index = 0; index < $nodesToWrap.length; index++) {
      var node = $nodesToWrap[index];
      if (!addedToDocument) {
        node.parentNode.insertBefore($wrapper, node);
        addedToDocument = true;
      }
      node.parentNode.removeChild(node);
      $wrapper.appendChild(node);
    }
  },
  false,
);
