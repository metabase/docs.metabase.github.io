!(function() {
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
})();
