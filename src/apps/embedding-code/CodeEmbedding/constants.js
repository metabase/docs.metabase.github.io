export const CODE_SNIPPETS = [
  {
    id: "node-js",
    language: "javascript",
    label: "Node.js",
    snippet: `// you will need to install via 'npm install jsonwebtoken' or in your package.json

var jwt = require("jsonwebtoken");
var METABASE_SITE_URL = "https://<dns-alias>.metabaseapp.com";
var METABASE_SECRET_KEY = "your secret key";
var payload = {
  resource: { dashboard: 3 },
  params: {},
  exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
};
var token = jwt.sign(payload, METABASE_SECRET_KEY);

var iframeUrl = METABASE_SITE_URL + "/embed/dashboard/" + token + "#bordered=true&titled=false";`,
  },
  {
    id: "ruby",
    language: "ruby",
    label: "Ruby",
    snippet: `# you will need to install 'jwt' gem first via 'gem install jwt' or in your project Gemfile

require 'jwt'

METABASE_SITE_URL = "https://<dns-alias>.metabaseapp.com"
METABASE_SECRET_KEY = "your secret key"

payload = {
  :resource => {:question => 17},
  :params => {

  },
  :exp => Time.now.to_i + (60 * 10) # 10 minute expiration
}
token = JWT.encode payload, METABASE_SECRET_KEY

iframe_url = METABASE_SITE_URL + "/embed/question/" + token + "#bordered=true&titled=true"`,
  },
  {
    id: "python",
    language: "python",
    label: "Python",
    snippet: `# You'll need to install PyJWT via pip 'pip install PyJWT' or your project packages file

import jwt
import time

METABASE_SITE_URL = "https://<dns-alias>.metabaseapp.com"
METABASE_SECRET_KEY = "your secret key"

payload = {
  "resource": {"question": 17},
  "params": {

  },
  "exp": round(time.time()) + (60 * 10) # 10 minute expiration
}
token = jwt.encode(payload, METABASE_SECRET_KEY, algorithm="HS256")

iframeUrl = METABASE_SITE_URL + "/embed/question/" + token + "#bordered=true&titled=true"`,
  },
  {
    id: "clojure",
    language: "clojure",
    label: "Clojure",
    snippet: `(require '[buddy.sign.jwt :as jwt])

(def metabase-site-url   "https://<dns-alias>.metabaseapp.com")
(def metabase-secret-key "your secret key")

(def payload
  {:resource {:question 17}
   :params   {}
   :exp      (+ (int (/ (System/currentTimeMillis) 1000)) (* 60 10))}) ; 10 minute expiration

(def token (jwt/sign payload metabase-secret-key))

(def iframe-url (str metabase-site-url "/embed/question/" token "#bordered=true&titled=true"))`,
  },
];
