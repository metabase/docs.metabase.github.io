const fs = require("fs");
const path = require("path");
const glob = require("glob");
const yaml = require("js-yaml");

const REGEX_FRONT_MATTER = /---([\S\s]*?)---/m;
const REGEX_CODE_TAGS = /<code[\s\S]*?>[\s\S]*?<\/code>/gim;
const REGEX_SCRIPT_TAGS = /<script[\s\S]*?>[\s\S]*?<\/script>/gim;
const REGEX_IMAGES = /(\.(svg|jpe?g|png|gif))/gim;
const REGEX_SPLIT_LINK = /\[([^[]+)\]\((.*)\)/;

const FRONT_MATTER_PROPERTIES = ["permalink", "redirect_to", "redirect_from"];

function isValidUrl(url) {
  // <url>.html
  if (url.indexOf(".html") > -1) {
    return { valid: false, message: "Remove html extension" };
  }
  return { valid: true };
}

function isRelativeUrl(url) {
  return url.indexOf("http://") === -1 && url.indexOf("https://") === -1;
}

function isMetabaseUrl(url) {
  // - metabase.com/<path>
  // - <protocol>://www.metabase.com/<path>
  // - <protocol>://metabase.com/<path>
  return !!(
    url.indexOf("metabase.com") === 0 ||
    url.indexOf("://www.metabase.com") === 4 ||
    url.indexOf("://www.metabase.com") === 5 ||
    url.indexOf("://metabase.com") === 4 ||
    url.indexOf("://metabase.com") === 5
  );
}

function invalidateUrl(url, type = "") {
  // is it an image?
  const isImage = !!url.match(REGEX_IMAGES);
  if (!isImage) {
    type = type.length > 0 ? ` (${type})` : "";

    // relative
    if (isRelativeUrl(url)) {
      const { valid, message } = isValidUrl(url);
      if (!valid) {
        return {
          message: `${message}${type}`,
          url,
        };
      }
    }
    // absolute
    else if (isMetabaseUrl(url)) {
      const { valid, message } = isValidUrl(url);
      if (valid) {
        return {
          message: `Change absolute to relative url${type}`,
          url,
        };
      } else {
        return {
          message: `${message}${type}`,
          url,
        };
      }
    }
    // // ???
    // else {
    //   // console.log("\t--->", url);
    //   if (url.indexOf("metabase") > -1) {
    //     return {
    //       message: `???${type}`,
    //       url,
    //     };
    //   }
    // }
  }

  return null;
}

const folderPath = path.resolve("./");

console.log("Checking folderPath: ", folderPath)

const allFiles = glob
  .sync(`${folderPath}/**/*.{html,htm,md,markdown}`, {
    ignore: [
      // `${folderPath}/_docs/master/**/*`,
      `${folderPath}/_docs/v*.*/**/*`,
      `${folderPath}/_docs/**/embedding/sdk/api/**`,
      `${folderPath}/_site/**/*`,
      `${folderPath}/images/**/*`,
      `${folderPath}/node_modules/**/*`,
      `${folderPath}/nginx/**/*`,
      `${folderPath}/script/**/*`,
      `${folderPath}/spec/**/*`,
      `${folderPath}/tmp/**/*`,
      `${folderPath}/vendor/**/*`,

      // TODO: Shared chrome removal generated a lot of ignorable errors.
      // We plan on redoing the docs header/footer, re-enable when that's done.
      `${folderPath}/src/components/chrome/fragments/footer.html`,
      `${folderPath}/src/components/chrome/fragments/header.html`,
    ],
  });

console.log("Checking ", allFiles.length, "files...")

const results = {
  processed: 0,
  successful: 0,
  withErrors: 0,
  parseErrors: 0,
  skipped: 0,
  allErrors: [],
  parseErrorDetails: []
};

const allErrors = allFiles
  .map((filePathFull) => {
    const filePath = filePathFull.replace(folderPath, "");
    let fileContent = fs.readFileSync(filePathFull, "utf8");

    // remove code tags
    const codeTags = fileContent.match(REGEX_CODE_TAGS);
    if (codeTags) {
      codeTags.forEach((codeTag) => {
        fileContent = fileContent.replace(codeTag, "");
      });
    }

    // remove script tags
    const scriptTags = fileContent.match(REGEX_SCRIPT_TAGS);
    if (scriptTags) {
      scriptTags.forEach((scriptTag) => {
        fileContent = fileContent.replace(scriptTag, "");
      });
    }

    // has content
    if (fileContent && fileContent.length > 3 && filePath != "/README.md") {
      results.processed++;
      try {
        // front matter
        const frontMatterPermalinkErrors = [];
        let frontMatterErrors = [];
        const [frontMatterResultStr] =
          fileContent.match(REGEX_FRONT_MATTER) || [];
        if (frontMatterResultStr) {
          const frontMatterStr = frontMatterResultStr.split("---").join("");

          const frontMatterObj = yaml.load(frontMatterStr, "utf8");
          if (frontMatterObj && Object.keys(frontMatterObj).length > 0) {
            // check redundant permalink
            if (frontMatterObj.permalink && frontMatterObj.permalink !== "/") {
              const frontMatterPermalink =
                frontMatterObj.permalink[
                  frontMatterObj.permalink.length - 1
                ] === "/"
                  ? frontMatterObj.permalink.slice(0, -1)
                  : frontMatterObj.permalink;
              if (
                filePath.indexOf(frontMatterPermalink) === 0 &&
                (filePath === `${frontMatterPermalink}.html` ||
                  filePath === `${frontMatterPermalink}/index.html`)
              ) {
                frontMatterPermalinkErrors.push({
                  message: "Redundant `permalink` property (front matter)",
                  url: filePath,
                });
              }
            }
            FRONT_MATTER_PROPERTIES.forEach((frontMatterPropertyName) => {
              if (frontMatterObj[frontMatterPropertyName]) {
                const frontMatterPropValue =
                  frontMatterObj[frontMatterPropertyName];
                const urls = Array.isArray(frontMatterPropValue)
                  ? frontMatterPropValue
                  : [frontMatterPropValue];
                frontMatterErrors = urls
                  // remove url checks when
                  // - redirect_from
                  // - contains "blog/"
                  // - finishes with a trailing slash
                  .filter(
                    (url) =>
                      !(
                        frontMatterPropertyName === "redirect_from" &&
                        url.indexOf("blog/") > -1 &&
                        url[url.length - 1] === "/"
                      ),
                  )
                  .map((url) => invalidateUrl(url, "front matter"))
                  .filter((error) => !!error);
              }
            });
          }

          // remove front matter
          fileContent = fileContent.replace(frontMatterResultStr, "");
        }

        // links href
        const hrefs = (fileContent.match(/href="(.*?)"/gim) || []).map((href) =>
          href.replace("href=", "").slice(1, -1),
        );
        // markdown links
        const mdLinks = fileContent.match(/(\[(.*?)\]\()(.+?)(\))/gm) || [];
        const mdHrefs = mdLinks
          .filter((mdLink) => mdLink.indexOf("[](") === -1) // BUG: [](https://cdn-images-1.medium.com/max/800/1*xfavpsRMhnfgQbQ-7SkESg.png)
          .map((mdLink) => REGEX_SPLIT_LINK.exec(mdLink))
          .map((text) => text[2]);
        // markdown links list
        const mdLinksList = (fileContent.match(/(\[(.*?)\]:)(.*)$/gm) || [])
          .map((line) => line.split(":"))
          .map((lineSplit) => {
            lineSplit.shift();
            return lineSplit.join(":").trim();
          });

        // checks urls/paths
        let codeErrors = [];
        const urls = []
          .concat(hrefs)
          .concat(mdHrefs)
          .concat(mdLinksList);
        if (urls) {
          codeErrors = urls
            .map((url) => invalidateUrl(url))
            .filter((error) => !!error);
        }

        // errors
        const errors = []
          .concat(frontMatterPermalinkErrors)
          .concat(frontMatterErrors)
          .concat(codeErrors);
        if (errors && errors.length > 0) {
          results.withErrors++;
          results.allErrors.push({
            file: filePath,
            errors: errors
          });
          return errors;
        }

        results.successful++;
        return null;
      } catch (err) {
        results.parseErrors++;
        results.parseErrorDetails.push({file: filePath, error: err.message});
      }
    } else {
      results.skipped++;
    }
  })
  .filter((errors) => !!errors);

// Print summary report
console.log("\n=== LINK CHECKER REPORT ===");
console.log(`Total files found: ${allFiles.length}`);
console.log(`Files processed: ${results.processed}`);
console.log(`Files skipped: ${results.skipped}`);
console.log(`Files successful: ${results.successful}`);
console.log(`Files with link errors: ${results.withErrors}`);
console.log(`Files with parse errors: ${results.parseErrors}`);

// Show parse errors if any
if (results.parseErrors > 0) {
  console.log("\n=== PARSE ERRORS ===");
  results.parseErrorDetails.forEach(({file, error}) => {
    console.log(`${file}: ${error}`);
  });
}

// Show link errors if any
if (results.withErrors > 0) {
  console.log("\n=== LINK ERRORS ===");
  results.allErrors.forEach(({file, errors}) => {
    console.log(`\n${file} - ${errors.length} error${errors.length > 1 ? "s" : ""}:`);
    errors.forEach(({message, url}) => {
      console.log(`  - ${message}: ${url}`);
    });
  });
}

// Exit with appropriate code
if (allErrors && allErrors.length > 0) {
  console.log("\n❌ Link validation failed");
  throw new Error("Invalid urls");
}

if (results.parseErrors > 0) {
  console.log("\n❌ Parse errors found");
  throw new Error("Parse errors found");
}

console.log("\n✅ All checks passed!");
