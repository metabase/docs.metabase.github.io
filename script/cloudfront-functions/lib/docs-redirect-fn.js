/* eslint-disable */
// Deployed CloudFront Function source (cloudfront-js-2.0) for version-conditional /docs
// redirects. This is real, editable source — it is read as text and stamped with a versions
// snapshot by build-docs-redirect-fn.ts (`buildFunction`); the `VERSIONS`/`LATEST` lines below
// are placeholders replaced at deploy. Do NOT wire the rule table in here — that lives in the
// associated KeyValueStore (built by build-kvs.ts); this function only does the KVS lookup +
// version-band arithmetic. Must stay within CloudFront Functions limits (<10 KB,
// cloudfront-js-2.0, KVS reads only). The bare `cloudfront` import only resolves on the
// CloudFront host, so this file is never imported — hence the eslint-disable above.
import cf from "cloudfront";

// Snapshot of _config.yml `available_versions` (a version only redirects if it exists here) and
// the concrete version /docs/latest points at (`docs_version`). At deploy, buildFunction replaces
// each line whole, keyed off its trailing build marker; the placeholder values keep this file
// valid, lintable, and testable on its own.
var VERSIONS = {}; // @@BUILD:VERSIONS@@
var LATEST = ""; // @@BUILD:LATEST@@

var kvs = cf.kvs();

var ROOT_RE = /^\/docs\/(v\d+\.\d+|latest|master)$/;
var PAGE_RE = /^\/docs\/(v\d+\.\d+|latest|master)\/(.+?)\/?$/;
var VERSION_RE = /^v?(\d+)\.(\d+)/;

// Parse an existing version into { major, minor }, resolving the `latest` alias.
// Returns null for `master` (handled separately) and for versions that do not exist.
function parsed(version) {
  var v = version === "latest" ? LATEST : version;
  if (!VERSIONS[v]) return null;
  var m = VERSION_RE.exec(v);
  return m ? { major: Number(m[1]), minor: Number(m[2]) } : null;
}

// A band is { t: targetPath, mn: [major, minor], mx: [major, minor] | undefined }.
function qualifies(version, band) {
  // `master` is bleeding-edge — newer than any concrete maxVersion — so it matches only
  // open-ended bands.
  if (version === "master") return !band.mx;
  var p = parsed(version);
  if (!p) return false;
  if (p.major < band.mn[0] || (p.major === band.mn[0] && p.minor < band.mn[1])) return false;
  if (band.mx && (p.major > band.mx[0] || (p.major === band.mx[0] && p.minor > band.mx[1]))) return false;
  return true;
}

function redirect(location) {
  return {
    statusCode: 301,
    statusDescription: "Moved Permanently",
    headers: { location: { value: location } },
  };
}

async function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // Structural: canonicalize /docs/<version> -> /docs/<version>/ for real versions/aliases.
  var root = ROOT_RE.exec(uri);
  if (root) {
    var known = root[1] === "latest" || root[1] === "master" || !!VERSIONS[root[1]];
    return known ? redirect(uri + "/") : request;
  }

  // Version-conditional page redirects, keyed by the version-stripped path.
  var m = PAGE_RE.exec(uri);
  if (!m) return request;
  var version = m[1];
  var key = m[2];

  var value;
  try {
    value = await kvs.get(key);
  } catch (e) {
    return request; // no rule for this path
  }
  if (!value) return request;

  var bands = JSON.parse(value);
  for (var i = 0; i < bands.length; i++) {
    if (qualifies(version, bands[i])) {
      var location = "/docs/" + version + "/" + bands[i].t;
      // Skip a redirect-to-self (source regex allows an optional trailing slash).
      return location !== uri ? redirect(location) : request;
    }
  }
  return request;
}
