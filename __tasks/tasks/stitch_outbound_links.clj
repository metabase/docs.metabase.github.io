(ns tasks.stitch-outbound-links
  (:require [babashka.fs :as fs]
            [clojure.string :as str]))

(def outbound-link-roots
  #{"blog-authors" "case-studies" "cloud" "community-posts" "dashboards" "data"
    "data-sources" "data-stack-report-2023" "drafts" "enterprise" "events"
    "examples" "features" "gallery" "get-demo" "glossary" "help" "learn" "legal"
    "license" "lp" "partners" "plugins" "posts" "pricing" "product" "releases"
    "sales" "sass" "site" "start" "startup-guide" "talk-to-a-person"
    "troubleshooting" "upgrade"})

(defn- log [level message] (println (str level " " message)))

(defn- update-links
  "Replaces occurrences of links starting with '/learn' with 'https://metabase.com/learn'.
  It handles both inline links (e.g., [c](/learn/y)) and reference-style links (e.g., [b]: /learn/x)."
  [content]
  (-> content
      (str/replace #"(\(\s*)/learn" "$1https://metabase.com/learn")
      (str/replace #"(\]\:\s*)/learn" "$1https://metabase.com/learn")))

(defn- process-file
  "Reads a markdown file, updates its content if necessary, and writes the updated content back.
  When dry-run is enabled, logs the intended action instead of modifying the file."
  [file dry-run?]
  (log "🔍" (str "Processing file: " file))
  (let [content (slurp file)
        new-content (update-links content)]
    (if (= content new-content)
      (log "ℹ️" (str "No changes for file: " file))
      (do (if dry-run?
            (log "📝" (str "Dry run: Would update file: " file))
            (do
              (spit file new-content)
              (log "✅" (str "Updated file: " file))))))))

(defn- crawl-directory
  "Recursively finds all Markdown files in the given directory and processes each one."
  [dir dry-run?]
  (doseq [file (fs/glob dir "**/*.md")]
    (prn (str file))
    (process-file (str file) dry-run?)))

(defn -main
  "Entry point. Args are validated in bb.edn"
  [{:keys [dry-run? dir]}]
  (log "🚀" (str "Crawling directory: " dir (if dry-run? " (dry run mode)" "")))
  (crawl-directory dir dry-run?))
