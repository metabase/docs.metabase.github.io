const fs = require("fs");
const ld = require("../lib/learn-data.js");
const dir = "script/_linter/tests/sample-dir";
const datapath = `${dir}/learn-data.json`;
const configfile = `${dir}/learn-config.json`;

const options = {
  config: JSON.parse(fs.readFileSync(configfile, "utf-8")),
  file: datapath,
  directory: dir,
  data: JSON.parse(fs.readFileSync(datapath, "utf-8")),
};

const articleErrors = ld.checkKeys(options);
const trackErrors = ld.checkKeysTracks(options);

test("Linter finds three article errors.", () => {
  if (articleErrors.length != 3) {
    console.log(articleErrors);
  }
  expect(articleErrors.length).toBe(3);
});

test("Linter finds two track errors.", () => {
  if (trackErrors.length != 2) {
    console.log(trackErrors);
  }
  expect(trackErrors.length).toBe(2);
});
