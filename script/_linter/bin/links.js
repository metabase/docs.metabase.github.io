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
    url.indexOf("metabase.") === 0 ||
    url.indexOf("://www.metabase.") === 4 ||
    url.indexOf("://www.metabase.") === 5 ||
    url.indexOf("://metabase.") === 4 ||
    url.indexOf("://metabase.") === 5
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
const allErrors = glob
  .sync(`${folderPath}/**/*.{html,htm,md,markdown}`, {
    ignore: [
      // `${folderPath}/_docs/master/**/*`,
      `${folderPath}/_docs/v*.*/**/*`,
      `${folderPath}/_site/**/*`,
      `${folderPath}/images/**/*`,
      `${folderPath}/node_modules/**/*`,
      `${folderPath}/nginx/**/*`,
      `${folderPath}/script/**/*`,
      `${folderPath}/spec/**/*`,
      `${folderPath}/tmp/**/*`,
      `${folderPath}/vendor/**/*`,
    ],
  })
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
    if (fileContent && fileContent.length > 3) {
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
                console.log(filePath, frontMatterPermalink);
                frontMatterPermalinkErrors.push({
                  message: "Redundant `permalink` property (front matter)",
                  url: filePath,
                });
              }
            }

            // check properties
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
          console.log(
            `${filePath} - ${errors.length} error${
              errors.length > 1 ? "s" : ""
            }`,
          );
          console.log(
            errors.map(({ message, url }) => `- ${message}: ${url}\n`).join(""),
          );

          return errors;
        }

        return null;
      } catch (err) {
        console.error(`Error in ${filePath}\n${err}\n`);
      }
    } else {
      console.warn(`${filePath} content cannot be parsed\n`);
    }
  })
  .filter((errors) => !!errors);

// breaks on errors
if (allErrors && allErrors.length > 0) {
  throw new Error("Invalid urls");
}
