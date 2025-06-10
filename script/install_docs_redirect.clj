(ns install-docs-redirect
  (:require
   [clojure.string :as str]))

(def the-redirect-html
  (->> ["<!DOCTYPE html>"
        "<html>"
        "<head>"
        "    <meta charset=\"utf-8\">"
        "    <title>Redirecting...</title>"
        "    <meta http-equiv=\"refresh\" content=\"0\"; url=/docs/latest/>"
        "    <link rel=\"canonical\" href=\"/docs/latest/\">"
        "</head>"
        "<body>"
        "    <p>If you are not redirected automatically, <a href=\"/docs/latest/\">click here</a>.</p>"
        "</body>"
        "</html>"]
       (str/join \newline)))

(defn -main [& _args]
  (let [redirect-file "_site/index.html"]
    (println "Overwriting redirect HTML to" redirect-file)
    (spit redirect-file the-redirect-html)
    (println "Done!")))

(when (= *file* (System/getProperty "babashka.file"))
  (-main))
