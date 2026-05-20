const fs = require("fs");
const path = require("path");
const program = require("commander");
const glob = require("glob");
const yaml = require("js-yaml");

program
  .description("All things frontMatter")
  .version("0.1")
  .option("--f, --folder <path>", "folder containing all files to check")
  .option("--c, --config <path>", "configuration file")
  .action((command) => {
    const configPath = path.resolve(command.config);
    const configObj = require(configPath);
    const mandatoryFrontMatterKeys = (
      configObj.frontMatter || configObj.lessonFrontMatter
    ).sort();

    let hasAtLeastOneError = false;
    const folderPath = path.resolve(command.folder);
    const allFilePaths = glob.sync(`${folderPath}/**/*.md`);
    allFilePaths.forEach((filePath) => {
      const fileContent = fs.readFileSync(filePath, "utf8");
      const [frontMatterResultStr] = fileContent.match(/---([\S\s]*?)---/m);
      const frontMatterStr = frontMatterResultStr.split("---").join("");
      const frontMatterObj = yaml.load(frontMatterStr, "utf8");
      if (!frontMatterObj.is_track_index) {
        const frontMatterKeys = Object.keys(frontMatterObj).sort();

        mandatoryFrontMatterKeys.forEach((item) => {
          if (frontMatterKeys.indexOf(item) === -1) {
            console.log(
              `"${path.basename(
                filePath
              )}" is missing the property "${item}" in frontMatter`
            );
            hasAtLeastOneError = true;
          }
        });
      }
    });

    if (hasAtLeastOneError) {
      throw new Error(
        `Linting error on folder "${command.folder}" with config "${command.config}"`
      );
    }
  })
  .parse(process.argv);
