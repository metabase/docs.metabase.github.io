const test = require("tape");
const fs = require("fs");
const os = require("os");
const path = require("path");
const {
  buildFunction,
  sourceToRegexLiteral,
  escapeForRegexLiteral,
  parseVersion,
  validateRule,
  parseArgs,
  main,
} = require("./build-docs-redirect-fn");

// Compile the emitted CloudFront Function source and return its `handler`.
function compile(rules) {
  const src = buildFunction(rules);
  // The generated source declares top-level functions but does not export; wrap it.
  return new Function(src + "\nreturn handler;")();
}

function result(handler, uri) {
  const r = handler({ request: { uri } });
  if (r && r.statusCode === 301) return { redirect: r.headers.location.value };
  return { keep: true, uri: r.request && r.request.uri };
}

// The real production rules — mirrors conditional-redirects.json.
const RULES = [
  {
    source: "/docs/<version>/contributing",
    minVersion: "0.44",
    maxVersion: "0.51",
    target: "/docs/<version>/developers-guide/contributing",
  },
  {
    source: "/docs/<version>/contributing",
    minVersion: "0.52",
    target: "/docs/<version>/CONTRIBUTING",
  },
  {
    source: "/docs/<version>/developers-guide/contributing",
    minVersion: "0.52",
    target: "/docs/<version>/CONTRIBUTING",
  },
];

test("lowercase contributing routes to the right target per version band", (t) => {
  const h = compile(RULES);
  // Below the floor: keep the original lowercase page.
  t.ok(result(h, "/docs/v0.30/contributing").keep, "v0.30 kept");
  t.ok(result(h, "/docs/v0.43/contributing").keep, "v0.43 kept (just below band)");
  // In the v0.44–v0.51 band: single hop to developers-guide.
  t.deepEqual(result(h, "/docs/v0.44/contributing"), {
    redirect: "/docs/v0.44/developers-guide/contributing",
  });
  t.deepEqual(result(h, "/docs/v0.51/contributing"), {
    redirect: "/docs/v0.51/developers-guide/contributing",
  });
  // v0.52+: single hop straight to CONTRIBUTING.
  t.deepEqual(result(h, "/docs/v0.52/contributing"), {
    redirect: "/docs/v0.52/CONTRIBUTING",
  });
  t.deepEqual(result(h, "/docs/v0.62/contributing"), {
    redirect: "/docs/v0.62/CONTRIBUTING",
  });
  t.end();
});

test("developers-guide contributing redirects only from v0.52", (t) => {
  const h = compile(RULES);
  t.ok(result(h, "/docs/v0.45/developers-guide/contributing").keep, "v0.45 kept");
  t.ok(result(h, "/docs/v0.51/developers-guide/contributing").keep, "v0.51 kept");
  t.deepEqual(result(h, "/docs/v0.52/developers-guide/contributing"), {
    redirect: "/docs/v0.52/CONTRIBUTING",
  });
  t.deepEqual(result(h, "/docs/v0.62/developers-guide/contributing"), {
    redirect: "/docs/v0.62/CONTRIBUTING",
  });
  t.end();
});

test("latest and master match open-ended rules but not bounded ones", (t) => {
  const h = compile(RULES);
  // Open-ended lowercase rule (>= v0.52) wins; the bounded v0.44–v0.51 rule is skipped.
  t.deepEqual(result(h, "/docs/latest/contributing"), {
    redirect: "/docs/latest/CONTRIBUTING",
  });
  t.deepEqual(result(h, "/docs/master/developers-guide/contributing"), {
    redirect: "/docs/master/CONTRIBUTING",
  });
  t.end();
});

test("latest/master do NOT match a rule that is only bounded", (t) => {
  // A config where the lowercase source has ONLY the bounded band — latest/master
  // must fall through (they are newer than the maxVersion).
  const h = compile([RULES[0]]);
  t.ok(result(h, "/docs/latest/contributing").keep, "latest kept");
  t.ok(result(h, "/docs/master/contributing").keep, "master kept");
  t.end();
});

test("every redirect resolves in a single hop (no chaining)", (t) => {
  const h = compile(RULES);
  const sources = [
    "/docs/v0.44/contributing",
    "/docs/v0.51/contributing",
    "/docs/v0.52/contributing",
    "/docs/v0.62/contributing",
    "/docs/latest/contributing",
    "/docs/v0.52/developers-guide/contributing",
    "/docs/master/developers-guide/contributing",
  ];
  for (const uri of sources) {
    const first = result(h, uri);
    t.ok(first.redirect, uri + " redirects");
    // Feed the target back through the handler: it must NOT redirect again.
    t.ok(result(h, first.redirect).keep, first.redirect + " is terminal (1 hop)");
  }
  t.end();
});

test("optional trailing slash is matched", (t) => {
  const h = compile(RULES);
  t.deepEqual(result(h, "/docs/v0.62/developers-guide/contributing/"), {
    redirect: "/docs/v0.62/CONTRIBUTING",
  });
  t.deepEqual(result(h, "/docs/v0.44/contributing/"), {
    redirect: "/docs/v0.44/developers-guide/contributing",
  });
  t.end();
});

test("unrelated and partial paths are kept", (t) => {
  const h = compile(RULES);
  t.ok(result(h, "/docs/v0.62/databases/connecting").keep);
  // trailing extra segment must NOT match (anchored with $)
  t.ok(result(h, "/docs/v0.62/developers-guide/contributing-guidelines").keep);
  // an unparseable version segment is left untouched
  t.ok(result(h, "/docs/nightly/contributing").keep);
  t.end();
});

test("parseVersion accepts real-world version strings", (t) => {
  t.deepEqual(parseVersion("0.52", 0, "minVersion"), { label: "v0.52", minor: 52 });
  t.deepEqual(parseVersion("v0.52", 0, "minVersion"), { label: "v0.52", minor: 52 });
  t.deepEqual(parseVersion("v0.52.1", 0, "minVersion"), { label: "v0.52", minor: 52 });
  t.deepEqual(parseVersion("1.62", 0, "minVersion"), { label: "v1.62", minor: 62 });
  t.end();
});

test("parseVersion throws on non-strings and malformed values", (t) => {
  t.throws(() => parseVersion(52, 0, "minVersion"), /must be a version string/);
  t.throws(() => parseVersion(null, 0, "minVersion"), /must be a version string/);
  t.throws(() => parseVersion("fifty-two", 0, "minVersion"), /invalid `minVersion`/);
  t.throws(() => parseVersion("2.0", 0, "minVersion"), /invalid `minVersion`/);
  t.end();
});

test("validateRule rejects malformed rules", (t) => {
  const ok = {
    source: "/docs/<version>/x",
    minVersion: "0.52",
    target: "/docs/<version>/y",
  };
  t.throws(() => validateRule(null, 0), /not an object/);
  t.throws(() => validateRule("nope", 0), /not an object/);
  t.throws(() => validateRule({ ...ok, source: 5 }, 0), /string `source`/);
  t.throws(() => validateRule({ ...ok, target: undefined }, 0), /string `target`/);
  t.throws(() => validateRule({ ...ok, minVersion: 52 }, 0), /minVersion/);
  t.throws(() => validateRule({ ...ok, maxVersion: "nope" }, 0), /maxVersion/);
  t.throws(
    () => validateRule({ ...ok, minVersion: "0.52", maxVersion: "0.44" }, 0),
    /below `minVersion`/,
  );
  // A valid rule with a well-formed band does not throw.
  t.doesNotThrow(() =>
    validateRule({ ...ok, minVersion: "0.44", maxVersion: "0.51" }, 0),
  );
  t.end();
});

test("buildFunction throws on a source without the <version> placeholder", (t) => {
  t.throws(() =>
    buildFunction([{ source: "/docs/x", minVersion: "0.52", target: "/y" }]),
  );
  t.end();
});

test("sourceToRegexLiteral and escapeForRegexLiteral", (t) => {
  t.equal(
    sourceToRegexLiteral("/docs/<version>/contributing"),
    "/^\\/docs\\/([^\\/]+)\\/contributing\\/?$/",
  );
  t.throws(() => sourceToRegexLiteral("/docs/no-placeholder"), /must contain/);
  // Regex metacharacters in a literal are escaped.
  t.equal(escapeForRegexLiteral("a.b+c"), "a\\.b\\+c");
  t.end();
});

test("parseArgs defaults, flags, and unknown-argument error", (t) => {
  t.deepEqual(parseArgs([]), {
    config: "conditional-redirects.json",
    out: null,
  });
  t.deepEqual(parseArgs(["--config", "x.json", "--out", "y.js"]), {
    config: "x.json",
    out: "y.js",
  });
  t.throws(() => parseArgs(["--bogus"]), /Unknown argument/);
  t.end();
});

test("main writes to --out and prints to stdout otherwise", (t) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "redirect-fn-"));
  const configPath = path.join(dir, "config.json");
  const outPath = path.join(dir, "nested", "fn.js");
  fs.writeFileSync(
    configPath,
    JSON.stringify([
      {
        source: "/docs/<version>/contributing",
        minVersion: "0.52",
        target: "/docs/<version>/CONTRIBUTING",
      },
    ]),
  );

  const realArgv = process.argv;
  const realWrite = process.stdout.write;

  // --out path: creates parent dirs and writes the function.
  process.argv = ["node", "script.js", "--config", configPath, "--out", outPath];
  main();
  const written = fs.readFileSync(outPath, "utf8");
  t.ok(written.includes("function handler(event)"), "wrote a handler");

  // stdout path: capture the printed output.
  let printed = "";
  process.stdout.write = (chunk) => {
    printed += chunk;
    return true;
  };
  process.argv = ["node", "script.js", "--config", configPath];
  try {
    main();
  } finally {
    process.stdout.write = realWrite;
    process.argv = realArgv;
  }
  t.ok(printed.includes("function handler(event)"), "printed a handler");

  // Rejects a config that is not a JSON array.
  const badPath = path.join(dir, "bad.json");
  fs.writeFileSync(badPath, JSON.stringify({ not: "an array" }));
  process.argv = ["node", "script.js", "--config", badPath];
  t.throws(() => main(), /must contain a JSON array/);
  process.argv = realArgv;

  fs.rmSync(dir, { recursive: true, force: true });
  t.end();
});
