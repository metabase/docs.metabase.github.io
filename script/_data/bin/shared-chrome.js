const fs = require("fs");
const https = require("https");
const path = require("path");

const CHROME_URL =
  process.env.SHARED_CHROME_URL || "https://www.metabase.com/shared/chrome.json";
const OUTPUT_PATH = path.resolve(__dirname, "../../../_data/shared_chrome.json");

async function fetchSharedChrome() {
  return new Promise((resolve, reject) => {
    https
      .get(CHROME_URL, (response) => {
        let body = "";

        response.on("data", (chunk) => {
          body += chunk;
        });

        response.on("end", () => {
          if (response.statusCode < 200 || response.statusCode >= 300) {
            reject(
              new Error(
                `Failed to fetch shared chrome from ${CHROME_URL}: ${response.statusCode}`,
              ),
            );
            return;
          }

          try {
            resolve(JSON.parse(body));
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", reject);
  });
}

function validateSharedChrome(chrome) {
  const requiredKeys = ["stylesheets", "scripts", "header_html", "footer_html"];
  const missingKeys = requiredKeys.filter((key) => !chrome[key]);

  if (missingKeys.length > 0) {
    throw new Error(
      `Shared chrome payload is missing required keys: ${missingKeys.join(", ")}`,
    );
  }
}

async function main() {
  const chrome = await fetchSharedChrome();
  validateSharedChrome(chrome);

  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(chrome, null, 2)}\n`);
  console.log(`Wrote ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
