const { promises: fs } = require("fs");
const https = require("https");
const path = require("path");

const chromeUrl =
  process.env.SHARED_CHROME_URL ||
  "https://www.metabase.com/shared/chrome.json";
const outputPath = path.resolve(__dirname, "../../../_data/shared_chrome.json");
const requiredKeys = ["stylesheets", "scripts", "header_html", "footer_html"];

function get(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        "User-Agent": "metabase-docs-build",
        Accept: "application/json",
      },
    };

    const request = https.get(url, options, (response) => {

      const chunks = [];

      response.on("data", (chunk) => chunks.push(chunk));
      response.on("error", reject);
      response.on("end", () => {
        const { statusCode, statusMessage } = response;
        const body = Buffer.concat(chunks).toString("utf8");

        if (statusCode < 200 || statusCode >= 300) {
          reject(
            new Error(
              `Failed to fetch shared chrome from ${url}: ${statusCode} ${statusMessage}`,
            ),
          );
          return;
        }

        resolve(body);
      });
    });

    request.on("error", reject);
  });
}

async function fetchJson(url) {
  const body = await get(url);
  return JSON.parse(body);
}

function requireSharedChromeKeys(chrome) {
  const missingKeys = requiredKeys.filter((key) => chrome[key] == null);

  if (missingKeys.length > 0) {
    throw new Error(
      `Shared chrome payload is missing required keys: ${missingKeys.join(
        ", ",
      )}`,
    );
  }
}

async function writeJson(filePath, data) {
  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

async function main() {
  const chrome = await fetchJson(chromeUrl);
  requireSharedChromeKeys(chrome);

  await writeJson(outputPath, chrome);
  console.log(`Wrote ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
