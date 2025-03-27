const testCases = [
  [
    "http://localhost:4321/docs/latest/index.html?query1=value1&query2=value2#hash1=value1&hash2=value2",
    "/docs/latest?query1=value1&query2=value2#hash1=value1&hash2=value2",
  ],
  [
    new URL(
      "http://localhost:4321/docs/latest/index.html?query1=value1&query2=value2#hash1=value1&hash2=value2",
    ),
    "/docs/latest?query1=value1&query2=value2#hash1=value1&hash2=value2",
  ],
  [
    "http://localhost:4321/docs/latest.html?query1=value1&query2=value2#hash1=value1&hash2=value2",
    "/docs/latest?query1=value1&query2=value2#hash1=value1&hash2=value2",
  ],
  [
    "http://localhost:4321/docs/latest/index?query1=value1&query2=value2#hash1=value1&hash2=value2",
    "/docs/latest?query1=value1&query2=value2#hash1=value1&hash2=value2",
  ],
  [
    "http://localhost:4321/docs/latest?query1=value1&query2=value2#hash1=value1&hash2=value2",
    null,
  ],
  [
    "http://localhost:4321/docs/latest/?query1=value1&query2=value2#hash1=value1&hash2=value2",
    null,
  ],
  // search
  [
    "https://www.metabase.com/search/index.html?query=embedding",
    "/search?query=embedding",
  ],
  [
    "https://www.metabase.com/search.html?query=embedding",
    "/search?query=embedding",
  ],
  [
    new URL("https://www.metabase.com/search.html?query=embedding"),
    "/search?query=embedding",
  ],
  [
    "https://www.metabase.com/search/index?query=embedding",
    "/search?query=embedding",
  ],
  ["https://www.metabase.com/search?query=embedding", null],
  ["https://www.metabase.com/search/?query=embedding", null],
  // no query and hash
  ["http://localhost:4321/docs/latest/index.html", "/docs/latest"],
  ["http://localhost:4321/docs/latest.html", "/docs/latest"],
  ["http://localhost:4321/docs/latest/index", "/docs/latest"],
  ["http://localhost:4321/docs/latest", null],
  ["http://localhost:4321/docs/latest/", null],
  [new URL("http://localhost:4321/docs/latest/"), null],
];

// COPY in head.html
function redirectTo(theLocation) {
  if (typeof theLocation === "string") {
    theLocation = new URL(theLocation);
  }

  // <page url>/index.html
  // <page url>.html
  // <page url>/index
  var redirectionSuffixes = ["/index.html", ".html", "/index"];
  for (var i = 0; i < redirectionSuffixes.length; i++) {
    var redirectionSuffix = redirectionSuffixes[i];
    if (
      theLocation.pathname.length > redirectionSuffix.length &&
      theLocation.pathname.indexOf(redirectionSuffix) ===
        theLocation.pathname.length - redirectionSuffix.length
    ) {
      var pathname = theLocation.pathname.replace(redirectionSuffix, "");

      // remove trailing slash
      if (pathname[pathname.length - 1] === "/") {
        pathname = pathname.slice(0, -1);
      }

      // redirect to
      return `${pathname}${theLocation.search}${theLocation.hash}`;
    }
  }

  return null;
}

describe("redirectTo (hack due to lack of .htaccess file)", () => {
  test.each(testCases)(`%p should redirect to %p`, (location, result) => {
    const url = redirectTo(location);
    expect(url).toBe(result);
  });
});
