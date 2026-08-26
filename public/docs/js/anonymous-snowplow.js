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
  "snowplowanon",
);

window.snowplowanon("newTracker", "anon", "sp.metabase.com", {
  appId: "anon-www",
  platform: "web",
  anonymousTracking: { withServerAnonymisation: true },
  stateStorageStrategy: "none",
  eventMethod: "post",
  contexts: {
    webPage: true,
    performanceTiming: false,
  },
});

// custom url
var formattedCustomUrlAnon = window.redirectTo(window.location);
if (formattedCustomUrlAnon) {
  window.snowplowanon("setCustomUrl", formattedCustomUrlAnon);
}

// custom referrer (only for metabase.com)
if (
  document.referrer &&
  (document.referrer.indexOf("https://www.metabase.com") > -1 ||
    document.referrer.indexOf("https://metabase.com") > -1)
) {
  var formattedReferrerUrlAnon = window.redirectTo(document.referrer);
  if (formattedReferrerUrlAnon) {
    window.snowplowanon(
      "setReferrerUrl",
      `${window.location.origin}${formattedReferrerUrlAnon}`,
    );
  }
}

window.snowplowanon("trackPageView");
