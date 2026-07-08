/* -- Snowplow -- */
(function(p, l, o, w, i, n, g) {
  if (!p[i]) {
    p.GlobalSnowplowNamespace = p.GlobalSnowplowNamespace || [];
    p.GlobalSnowplowNamespace.push(i);
    p[i] = function() {
      (p[i].q = p[i].q || []).push(arguments);
    };
    p[i].q = p[i].q || [];
    n = l.createElement(o);
    g = l.getElementsByTagName(o)[0];
    n.async = 1;
    n.src = w;
    g.parentNode.insertBefore(n, g);
  }
})(
  window,
  document,
  "script",
  "//cdn.jsdelivr.net/gh/snowplow/sp-js-assets@2.18.0/sp.min.js",
  "snowplow",
);

window.snowplow("newTracker", "cf", "sp.metabase.com", {
  appId: "www",
  platform: "web",
  cookieDomain: ".metabase.com",
  post: true,
  contexts: {
    webPage: true,
    performanceTiming: true,
  },
});

window.snowplow("enableActivityTracking", 10, 10);
window.snowplow("enableLinkClickTracking");

// custom url
var formattedCustomUrl = window.redirectTo(window.location);
if (formattedCustomUrl) {
  window.snowplow("setCustomUrl", formattedCustomUrl);
}

// custom referrer (only for metabase.com)
if (
  document.referrer &&
  (document.referrer.indexOf("https://www.metabase.com") > -1 ||
    document.referrer.indexOf("https://metabase.com") > -1)
) {
  var formattedReferrerUrl = window.redirectTo(document.referrer);
  if (formattedReferrerUrl) {
    window.snowplow(
      "setReferrerUrl",
      `${window.location.origin}${formattedReferrerUrl}`,
    );
  }
}

window.snowplow("trackPageView");
