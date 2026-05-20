function isValidVersionTag(versionTagStr) {
  return /^v\d+(\.\d+){2,}(-[a-zA-Z\d-]+)?$/.test(versionTagStr);
}

function getQueryParameter(param) {
  const params = new URLSearchParams(document.location.search);
  return params.get(param);
}

document.addEventListener("DOMContentLoaded", function() {
  // Compares semantic version numbers
  // Returns the difference between a and b (eg a negative number if a is smaller than b)
  const REGEX_STRIP_VERSION = /(\.0+)+$/;
  function compareVersions(versionA, versionB) {
    if (!versionA || !versionB) {
      return null;
    }

    const segmentsA = versionA.replace(REGEX_STRIP_VERSION, "").split(".");
    const segmentsB = versionB.replace(REGEX_STRIP_VERSION, "").split(".");
    const l = Math.min(segmentsA.length, segmentsB.length);

    for (let i = 0; i < l; i++) {
      const diff = parseInt(segmentsA[i], 10) - parseInt(segmentsB[i], 10);
      if (diff) {
        return diff;
      }
    }

    return segmentsA.length - segmentsB.length;
  }

  // latest versions
  const latestVersion = document.getElementById("latest-version").value;
  const latestEnterprise = document.getElementById("latest-enterprise").value;

  // content
  const $versionWarning = document.getElementById("version-warning");
  const $version = document.getElementById("version");

  // version
  const rawVersion = getQueryParameter("instance_version");
  const passedVersion = isValidVersionTag(rawVersion) ? rawVersion : null;
  const isEnterpriseVersion =
    passedVersion &&
    (passedVersion.indexOf("1.") === 0 || passedVersion.indexOf("v1.") === 0);

  const version = isEnterpriseVersion ? latestEnterprise : latestVersion;
  $version.innerHTML = version;

  // messaging
  const versionDiff = compareVersions(passedVersion, version);
  if (versionDiff < 0) {
    // Show a message saying the version is behind
    document.getElementById("current-version").innerHTML = passedVersion;
    $versionWarning.style.display = "block";
  } else if (versionDiff === 0) {
    // Show a message saying the version is current
    $versionWarning.innerHTML = `You're running Metabase <a href="/docs/latest/">${version}</a>, which is the latest.`;
    $versionWarning.style.display = "block";
  } else {
    // Show a message just informing of the latest version
    $versionWarning.innerHTML = `The latest version of Metabase is <a href="/docs/latest/">${version}</a>. Please make sure you're running it, as it may solve your issues.`;
    $versionWarning.style.display = "block";
  }

  // Takes the JSON blob passed in diag and adds it to the contact support email template
  const passedDiag = getQueryParameter("diag");
  if (passedDiag !== null) {
    const $button = document.getElementById("contact-support");
    if ($button) {
      const url = `${$button.getAttribute(
        "href",
      )}?body=%0D%0A%0D%0A%0D%0A------------------%0D%0A%0D%0ADiagnostics info:%0D%0A%0D%0A${passedDiag}`;
      $button.setAttribute("href", url);
    }
  }
});
