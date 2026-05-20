#!/usr/bin/env node

/**
 * Entry point for website error-checking program.
 */

// External libraries
const fs = require("fs");
const program = require("commander");
const YAML = require('yamljs');

// Package version
const pckg = require("../../../package.json");
program.version(pckg.version);

// Our own utilities
const linter = require("../lib/linter.js");
const report = require("../lib/report.js");
const text = require("../lib/text.js");

/**
 * Runs checks on file or directory
 * @param {Object} options - Data from command-line options.
 * @param {Object} checks - Array of checks to perform
 * @param {Object} paths - Array of filepaths to check
 */
function run(options, checks, paths) {
  options = expandOptions(options);
  paths = expandPaths(paths);
  const lineResults = linter.lintLines(options, paths);
  const reporter = report.create(lineResults);
  const status = reporter(options.verbose);
  process.exit(status);
}

/**
 * Expand any options that were given on the command line.
 * @param {Object} options - To be expanded (e.g., files loaded).
 */
function expandOptions(options) {
  if (options.learn) {
    options.learnData = YAML.parse(fs.readFileSync(options.learn, "utf-8"));
  }
  // attach config
  options.config = require(options.config);
  return options;
}

/**
 * Convert all the paths provided on the command line to absolute paths.
 */
function expandPaths(paths) {
  return paths
    .map((root) => text.listFiles(root))
    .flat()
    .filter((filename) => text.validFile(filename));
}

// Add optional flags.
const FLAGS = [
  ["--verbose", "Provide full information in output"], // control reporting format
  ["--config <path>", "Config"],
];

for (const [flag, doc] of FLAGS) {
  program.option(flag, doc);
}

// Check that the table of contents are in order
program
  .command("table-of-contents <paths...>")
  .alias("toc")
  .description("Check table of contents formatting.")
  .action((paths) => {
    run(program.opts(), ["toc"], paths);
  });

// Check that all learn files are referenced and used.
program
  .command("learn <paths...>")
  .description("Check consistency of /learn configuration.")
  .action((paths) => {
    run(program.opts(), ["learn"], paths);
  });

// Run all checks.
program
  .command("all-checks <paths...>")
  .alias("all")
  .description("Run all checks on path.")
  .action((paths) => {
    const config = require(program.opts().config);
    run(program.opts(), config.checks, paths);
  });

program.parse(process.argv);
