const path = require("path");
const util = require("util");

// async functions
const fs = require("fs");
const mkdirp = util.promisify(require("mkdirp"));
const nugget = util.promisify(require("nugget"));
const cpr = util.promisify(require("cpr"));
const rimraf = util.promisify(require("rimraf"));
const yaml = require("yamljs");

// streams
const tar = require("tar-fs");
const gunzip = require("gunzip-maybe");

// String functions
const toTitleCase = require("titlecase");
const matter = require("gray-matter");

const { canBeProcessedByFrontmatter, squashVersion } = require("./utils.js");
const glob = require("glob");

/**
 * For the settings object, see script/docs.
 **/

module.exports = async function fetchDocs(settings) {
  // If we're just updating the docs, grab the existing docs_version
  // from the _config.yml
  if (settings.update) {
    const config = yaml.load(settings.config);
    settings.majorVersion = config.docs_version;
    // Otherwise we want to squash the point release to the relevant major version
    // e.g., v0.41.1 to v0.41
  } else {
    settings.majorVersion = squashVersion(
      settings.setVersion ? settings.setVersion : settings.version,
    );
  }
  await updateVersions(settings);

  if (settings.repoDir) {
    await copyLocalMetabaseDocs(settings);
  } else {
    await downloadAndExtractMetabaseTarball(settings);

    console.log("New docs directory: ", settings.newDir);
  }

  const docFilePaths = glob.sync(`${settings.newDir}/docs/**/*.{md,markdown,html}`, {
    ignore: [`${settings.newDir}/docs/util/**`]
  });

  console.log("Found", docFilePaths.length, "doc files to process.");

  docFilePaths.forEach((filePath) => {
    let fileContent = fs.readFileSync(filePath, "utf8");
    const docPath = filePath.split(path.sep).slice(2).join(path.sep);

    fileContent = buildDocsMetadata(docPath, fileContent, settings)

    fs.writeFileSync(filePath, fileContent);
  });

  await moveDirectories(settings);
};

async function downloadAndExtractMetabaseTarball(settings) {
  const tarVersion = settings.sourceBranch ? settings.sourceBranch : settings.version;
  const url = "https://api.github.com/repos/metabase/metabase/tarball/" + tarVersion;

  console.log("Downloading Metabase tarball for: ", tarVersion);

  settings.tmpDir = path.join(/*os.tmpdir()*/ "tmp", "metabase-tmp-download");

  const token = process.env.METABASE_ACCESS_TOKEN;
  const filename = "metabase.tar.gz";
  const opts = {
    headers: {
      "user-agent": "Metabase",
      Authorization: token && `token ${token}`,
    },
    target: filename,
    dir: settings.tmpDir,
    resume: true,
    verbose: true,
  };

  console.log("fetchDocs opts: ", JSON.stringify(opts, null, 2));

  console.log("Creating temp directory to fetch tarball into");
  await mkdirp(settings.tmpDir);
  try {
    await fs.promises.unlink(`${settings.tmpDir}/metabase.tar.gz`);
  } catch (err) {
    console.error(err);
  }

  console.log("Download the tarball from: ", url);
  await nugget(url, opts);

  console.log("Extracting the tarball to: ", settings.tmpDir);
  await extractMetabaseRepoTarball(filename, settings);
  console.log("Extracted docs to: ", settings.newDir);
}

// Copy docs/ out of a local metabase checkout into a scratch dir, mirroring
// what downloadAndExtractMetabaseTarball sets up (settings.tmpDir/newDir), so
// the rest of the pipeline (frontmatter rewriting, moveDirectories) doesn't
// need to know whether the source was a tarball or a local repo.
async function copyLocalMetabaseDocs(settings) {
  const localDocsSource = path.join(settings.repoDir, "docs");
  if (!fs.existsSync(localDocsSource)) {
    throw new Error(
      `No docs directory found at ${localDocsSource}. Did you pass the right --repo-dir?`,
    );
  }

  settings.tmpDir = path.join("tmp", "metabase-tmp-download");
  settings.newDir = path.join(settings.tmpDir, "metabase-local");
  await rimraf(settings.newDir);
  await mkdirp(settings.newDir);

  console.log("Copying docs from local repo:", localDocsSource, "->", path.join(settings.newDir, "docs"));
  await cpr(localDocsSource, path.join(settings.newDir, "docs"), { overwrite: true });
}

/**
 * Sets a new release branch. The release branch useful for updating the website
 * when new docs are merged into the current release branch: `script/docs --latest --update`;
 * @param {Object} settings - see script/docs
 * @param {String} existing - the current release_branch
 */
function updateReleaseBranch(settings, existing) {
  if (
    settings.version.match(/\d+/g) == null &&
    settings.setVersion.match(/\d+/g) == null
  ) {
    console.log(
      `WARNING: Can't set release_branch for version: ${settings.verison}: version should be formatted like vX.XX.X`,
    );
    console.log(
      "Keeping existing release branch for now, but if it needs to update, you should update release_branch manually in the _config.yml.",
    );
    return existing;
  }
  const versionNumber = settings.setVersion
    ? settings.setVersion.match(/\d+/g)[1]
    : settings.version.match(/\d+/g)[1];
  return `release-x.${versionNumber}.x`;
}

async function updateVersions(settings) {
  const config = yaml.load(settings.config);
  // If we're not just updating the docs, we're doing a new release.
  if (settings.latest && !settings.update) {
    config.latest_version = settings.setVersion
      ? settings.setVersion
      : settings.version;
    console.log("Set latest version to", config.latest_version);
    config.latest_enterprise = config.latest_version.replace(/^v0\./, "v1.");
    console.log("Set latest enterprise to", config.latest_enterprise);
    config.docs_version = settings.majorVersion;
    console.log("Set docs_version to", config.docs_version);
  }
  // If it's a major new release, add a new entry to the list of docs
  // And update the current release_branch in the config
  if (config.available_versions.indexOf(config.docs_version) === -1) {
    config.available_versions.push(config.docs_version);
    config.release_branch = updateReleaseBranch(
      settings,
      config.release_branch,
    );
    console.log("Set release_branch to", config.release_branch);
  }
  await fs.promises.writeFile(settings.config, yaml.stringify(config));
}

function extractMetabaseRepoTarball(filename, settings) {
  return new Promise((resolve) => {
    const tarball = path.join(settings.tmpDir, filename);

    const extract = tar.extract(settings.tmpDir);

    extract.on("entry", function extracting(header) {
      const extractedElectronDir = header.name.split("/")[0];
      settings.newDir = path.join(settings.tmpDir, extractedElectronDir);
    });

    extract.on("finish", function () {
      resolve();
    });

    fs.createReadStream(tarball)
      .pipe(gunzip())
      .pipe(extract);
  });
}

function buildDocsMetadata(docPath, fileContent, settings) {
  const isDocFile = docPath.indexOf(path.sep + "docs" + path.sep) !== -1;

  if (!isDocFile || !canBeProcessedByFrontmatter(docPath)) {
    return fileContent;
  }

  const metadata = constructDocMetadata(
    docPath,
    settings.majorVersion,
  );
  metadata.source_url = constructSourceUrl(docPath);

  if (
    parseInt(settings.majorVersion.split(".").pop()) > 43 ||
    settings.version === "master"
  ) {
    metadata.layout = "new-docs";
  }

  if (path.basename(docPath, ".md") === "README") {
    metadata.permalink =
      "/" +
      path
        .join("docs", settings.majorVersion, "index.html")
        .split(path.sep)
        .join("/");
  }

  return frontMatterify(fileContent, metadata);
}

function frontMatterify(fileContent, metadata) {
  const { content, data } = matter(fileContent);

  // Merge existing frontmatter data into provided metadata
  const mergedMetadata = { ...metadata, ...data };

  const frontmatterBlock = `---\n${yaml.stringify(mergedMetadata)}---\n\n`;

  return frontmatterBlock + content;
}

function constructSourceUrl(path) {
  const baseUrl = "https://github.com/metabase/metabase/blob/master/";
  const source = path.split("/");
  source.splice(0, 1);
  return baseUrl + source.join("/");
}

function constructDocMetadata(path, version) {
  const metadata = {};
  metadata.version = version;
  metadata.has_magic_breadcrumbs = true;
  // We default to showing both category and title breadcrumbs, then toggle either a category and/or title breadcrumb in certain scenarios
  // For documentation TOC pages, we _only_ use the title in the breadcrumb
  // For _category_ TOC pages (one level below the root), we only use the category in the breadbrumb
  metadata.show_category_breadcrumb = true;
  metadata.show_title_breadcrumb = true;

  // Remove prefixes to docs directory, making all paths below relative
  const pathArray = path.split("/");
  pathArray.splice(0, 2);

  // #breadcrumb and title/category logic
  if (pathArray.length === 1) {
    metadata.show_category_breadcrumb = false;
    metadata.category = "Table of Contents";
    metadata.title = formatDocTitle(pathArray[0]);
  } else {
    if (pathArray[0] === "faq") metadata.category = "FAQ";
    else metadata.category = toTitleCase(pathArray[0]).replace(/-/g, " ");
    metadata.title = formatDocTitle(pathArray[pathArray.length - 1]);
  }

  // MOST categories use start.md, except for the troubleshooting guide :)
  if (pathArray.length > 1 && pathArray[1].match(/^(index|start)\.md$/))
    metadata.show_title_breadcrumb = false;

  return metadata;
}

const ACRONYMS = [
  "API",
  "AWS",
  "DB",
  "GTAP",
  "JMX",
  "JWT",
  "LDAP",
  "RDS",
  "SAML",
  "SQL",
  "SSL",
  "SSO",
];

function formatDocTitle(filename) {
  filename = filename.replace(".md", "");
  filename = filename.replace(/-/g, " ");
  filename = toTitleCase(filename);
  return filename
    .split(" ")
    .map((word) => {
      const wordIndex = ACRONYMS.findIndex(
        (acronym) => acronym.toUpperCase() === word.toUpperCase(),
      );
      if (wordIndex > -1) {
        return ACRONYMS[wordIndex];
      }

      return word;
    })
    .join(" ");
}

// Take newly extracted 'docs' directory, name it according
// to appropriate Electron version, copy it to electron.atom.io
// '_docs' directory and delete temp directory


async function moveDirectories(settings) {
  const versionDir = path.join(settings.newDir, settings.majorVersion);
  const extractedDocsDir = path.join(settings.newDir, "docs");
  const finalDir = path.join(
    process.cwd(),
    settings.finalDir,
    settings.majorVersion,
  );

  console.log("Renaming ", extractedDocsDir, "to:", versionDir)
  await fs.promises.rename(extractedDocsDir, versionDir);

  console.log("cpr-ing", versionDir, "to:", finalDir);
  await cpr(versionDir, finalDir, {
    deleteFirst: true,
    overwrite: true,
  });

  await rimraf(settings.tmpDir);

  if (settings.latest) {
    console.log("Creating latest docs directory");
    await createLatestDir(finalDir, settings.majorVersion);
  }

  // mutate settings:
  settings.versionDir = versionDir;
  settings.extractedDocsDir = extractedDocsDir;
  settings.finalDir = finalDir;

  // internal functions:
  async function createLatestDir(finalDir, majorVersion) {
    const latestDir = finalDir.replace(
      majorVersion,
      "latest",
    );
    await rimraf(latestDir);
    await cpr(finalDir, latestDir, { overwrite: true });
    await updateLatestPermalinkInReadme(latestDir);
  }

  async function updateLatestPermalinkInReadme(latestDir) {
    const README_PERMALINK_REGEX = /permalink: \/docs\/[^/]+\/index.html/g;
    const readmePath = path.join(latestDir, "README.md");
    const readme = await fs.promises.readFile(readmePath, "utf-8");
    if (!README_PERMALINK_REGEX.test(readme)) {
      throw new Error("README.md permalink not found!");
    }
    const readmePatched = readme.replace(
      README_PERMALINK_REGEX,
      "permalink: /docs/latest/index.html",
    );
    await fs.promises.writeFile(readmePath, readmePatched);
  }
}
