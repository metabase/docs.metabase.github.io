const fs = require("fs");
const path = require("path");
const program = require("commander");
const glob = require("glob");
const yaml = require("js-yaml");

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function prettyStr(str) {
  return str
    .split("-")
    .join(" ")
    .split("_")
    .join(" ");
}

function formatPropertyValue(value) {
  return value.indexOf(",") > -1 ? `"${value}"` : value;
}

program
  .description("Generate a CSV file used by Figma with Google Sheet Plugin")
  .version("0.1")
  .option("--f, --folder <path>", "folder containing all files to generate CSV from")
  .option("--p, --properties <path>", "all properties to get from the files")
  .action((command) => {
    const { folder, properties } = command;

    const folderPath = path.resolve(folder);
    const propertiesList = properties.split(",").map(property => property.trim());

    const CSVStr = propertiesList.join(",") + "\n" + glob
      .sync(`${folderPath}/**/*.{html,htm,md,markdown}`)
      .map((filePath) => {
        const fileContent = fs.readFileSync(filePath, "utf8");
        const [frontMatterResultStr] = fileContent.match(/---([\S\s]*?)---/m);
        const frontMatterStr = frontMatterResultStr.split("---").join("");
        const frontMatterObj = yaml.load(frontMatterStr, "utf8");
        return propertiesList
          .map(property => {
            const propertyValue = frontMatterObj[property];

            const basename = path.basename(filePath);
            const filename = path.basename(filePath, path.extname(filePath));
            
            // title fallback
            if (property === "title" && !propertyValue) {
              return capitalizeFirstLetter(prettyStr(filename));
            }

            // category fallback
            if ((property === "category" || property === "categories") && !propertyValue) {
              const fullFilePathSplit = filePath.split(folderPath);
              const fullFilePath = fullFilePathSplit[fullFilePathSplit.length - 1];
              const foldersPath = fullFilePath.replace(basename, "");
              const foldersPathSplit = foldersPath.split("/").filter(str => str.length > 0);
              const categories = foldersPathSplit.map(prettyStr).map(capitalizeFirstLetter).join(",");
              return formatPropertyValue(categories);
            }

            // image fallback
            if (property === "image" && !propertyValue) {
              // image tag OR liquid image templating
              const imagesSources = fileContent.match(/src\s*=\s*("|')(.+?)("|')/g) || fileContent.match(/url\s*=\s*("|')(.+?)("|')/g);
              if (imagesSources && imagesSources.length > 0) {
                const imageSource = imagesSources[0];
                const imageSourceSplit = imageSource
                  .split(/("|')/g)
                  .filter(imageUrl => imageUrl.length > 3)
                  .filter(imageUrl => imageUrl.indexOf("=") === -1);
                const [imagePath] = imageSourceSplit;
                return new URL(imagePath, "https://www.metabase.com/").href;
              }
            }

            // undefined
            if (propertyValue === undefined) {
              console.error(`Missing property "${property}" in ${filePath}`);
              return "";
            }
            
            // image
            if (property.indexOf("_img") > -1 || property.indexOf("_image") > -1 || property === "image") {
              return new URL(propertyValue, "https://www.metabase.com/").href;
            }

            return formatPropertyValue(propertyValue);
          })
          .join(",");
      })
      .join("\n");
    
    try {
      fs.writeFileSync(path.resolve(`_data/opengraph/${path.basename(folderPath)}.csv`), CSVStr);
    }
    catch (err) {
      console.error(err);
    }
  })
  .parse(process.argv);
