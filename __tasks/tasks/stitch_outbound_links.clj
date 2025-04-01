(ns tasks.stitch-outbound-links
  (:require [babashka.fs :as fs]
            [clj-yaml.core :as yaml]
            [clojure.string :as str]
            [clojure.walk :as walk]
            [tasks.util :as u]))

(def outbound-link-roots
  #{"blog-authors" "case-studies" "cloud" "community-posts" "dashboards" "data"
    "data-sources" "data-stack-report-2023" "drafts" "enterprise" "events"
    "examples" "features" "gallery" "get-demo" "glossary" "help" "learn" "legal"
    "license" "lp" "partners" "plugins" "posts" "pricing" "product" "releases"
    "sales" "sass" "site" "start" "startup-guide" "talk-to-a-person"
    "troubleshooting" "upgrade"})

(def outbound-link-roots-re
  (str "(" (str/join "|" outbound-link-roots) ")"))

(def inline-pattern (re-pattern (str "(\\(\\s*)/" outbound-link-roots-re)))
(def reference-pattern (re-pattern (str "(\\]\\:\\s*)/" outbound-link-roots-re)))

(comment
  ;; How It Works:
  (update-links "[a](/gallery/x)")
  ;; =>         "[a](https://metabase.com/gallery/x)"
  (update-links "[a]: /gallery/x")
  ;; =>         "[a]: https://metabase.com/gallery/x"
  (update-links "[a]:    /gallery/x")
  ;; =>         "[a]:    https://metabase.com/gallery/x"
  )

(defn- update-links
  "Replaces occurrences of links starting with '/learn' with 'https://metabase.com/learn'.
  It handles both inline links (e.g., [c](/learn/y)) and reference-style links (e.g., [b]: /learn/x)."
  [content]
  (-> content
      (str/replace inline-pattern "$1https://metabase.com/$2")
      (str/replace reference-pattern "$1https://metabase.com/$2")))

(defn- process-md
  "Reads a markdown file, updates its content if necessary, and writes the updated content back.
  When dry-run is enabled, logs the intended action instead of modifying the file."
  [path dry-run?]
  (u/log "🔍" (str "Processing file: " path))
  (let [content (slurp path)
        new-content (update-links content)]
    (if (= content new-content)
      (u/log "  ℹ️" (str "No changes for file: " path))
      (if dry-run?
        (u/log "  📝" (str "Dry run: Would update file: " path))
        (do
          (spit path new-content)
          (u/log "  ✅" (str "Updated file: " path)))))))

(defn- crawl-md-directory
  "Recursively finds all Markdown files in the given directory and processes each one."
  [dir dry-run?]
  (doseq [file (fs/glob dir "**/*.md")]
    (process-md (str file) dry-run?)))

(do
  (defn process-yaml [path dry-run?]
    (let [parsed (yaml/parse-string (slurp path))
          updated (walk/postwalk
                    (fn [node]
                      (if (and (map? node)
                               (contains? node :url)
                               (some #(str/starts-with? (:url node) %) (map #(str "/" % "/") outbound-link-roots)))
                        (update-in node [:url] #(str "https://metabase.com" %))
                        node))
                    parsed)]
      (if dry-run?
        (do (u/log "  📝" (str "Dry run: Would update file: " path))
            updated)
        (do
          (spit path (yaml/generate-string updated :dumper-options {:flow-style :block}))
          (u/log "  ✅" (str "Updated file: " path))))))
  (process-yaml "_data/docs/nav/latest.yml" true))


(defn- crawl-data-directory
  [dry-run?]
  (doseq [file (concat (fs/glob "_data" "**/*.yaml") (fs/glob "_data" "**/*.yml"))]
    (process-yaml (str file) dry-run?)))

(defn -main
  "Entry point. Args are validated in bb.edn"
  [{:keys [dry-run?]}]
  (u/log "🚀" (str "Crawling _docs directory: updating markdown links" (when dry-run? " (dry run mode)")))
  (crawl-md-directory "_docs" dry-run?)
  (u/log "🚀" (str "Crawling _data directory: updating yaml links" (when dry-run? " (dry run mode)")))
  (crawl-data-directory dry-run?))
