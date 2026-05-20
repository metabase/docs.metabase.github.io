window.environment = "{{ jekyll.environment }}";
window.HELP_IMPROVE_VIDEOJS = false;

window.redirectTo = function redirectTo(theLocation) {
  if (typeof theLocation === "string") {
    theLocation = new URL(theLocation);
  }

  var redirectionSuffixes = ["/index.html", ".html", "/index"];
  for (var i = 0; i < redirectionSuffixes.length; i = i + 1) {
    var redirectionSuffix = redirectionSuffixes[i];
    if (
      theLocation.pathname &&
      theLocation.pathname.length > redirectionSuffix.length &&
      theLocation.pathname.indexOf(redirectionSuffix) ===
        theLocation.pathname.length - redirectionSuffix.length
    ) {
      var pathname = theLocation.pathname.replace(redirectionSuffix, "");
      if (pathname[pathname.length - 1] === "/") {
        pathname = pathname.slice(0, -1);
      }

      return `${pathname}${theLocation.search}${theLocation.hash}`;
    }
  }

  return null;
};
