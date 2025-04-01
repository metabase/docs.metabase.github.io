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

;; YAML processing for _data dir (which stores nav info):

(defn- add-metabase-prefix? [node]
  (and (map? node)
       (contains? node :url)
       (not (str/starts-with? (:url node) "/docs/"))
       (not (str/starts-with? (:url node) "https://metabase.com"))
       (not (str/starts-with? (:url node) "https://www.metabase.com"))
       (not (str/starts-with? (:url node) "http://metabase.com"))
       (not (str/starts-with? (:url node) "http://www.metabase.com"))))

(defn- remove-metabase-prefix? [node]
  (and (map? node)
       (contains? node :url)
       (or (str/starts-with? (:url node) "https://metabase.com/docs")
           (str/starts-with? (:url node) "https://www.metabase.com/docs")
           (str/starts-with? (:url node) "http://metabase.com/docs")
           (str/starts-with? (:url node) "http://www.metabase.com/docs"))))

(defn- update-node [node]
  (let [add? (add-metabase-prefix? node)
        remove? (remove-metabase-prefix? node)]
    (when add? (u/log "  📝" (str "Adding prefix to: " (:url node))))
    (when remove? (u/log "  📝" (str "Removing prefix from: " (:url node))))
    (cond-> node
      add? (update-in [:url] #(str "https://metabase.com" %))
      remove? (update-in [:url]
                         (comp
                           #(str/replace % #"^http://www.metabase.com" "")
                           #(str/replace % #"^http://metabase.com" "")
                           #(str/replace % #"^https://www.metabase.com" "")
                           #(str/replace % #"^https://metabase.com" ""))))))

(comment
  (mapv (comp :url update-node)
        [{:url "/learn/latest/cloud/start"}
         {:url "http://www.metabase.com/docs/latest/cloud/start"}])
;; => ["https://metabase.com/learn/latest/cloud/start"
;;     "/docs/latest/cloud/start"]
  )

(defn- fix-yaml-links [path dry-run?]
  (let [parsed (yaml/parse-string (slurp path))
        updated (walk/postwalk
                  update-node
                  parsed)]
    (cond
      (and (= parsed updated) dry-run?)
      (u/log "  ℹ️" (str "Dry run: No update to: " path))

      dry-run?
      (u/log "  📝" (str "Dry run: Would update file: " path))

      (= parsed updated)
      (u/log "  ℹ️" (str "No changes for file: " path))

      :else
      (do (spit path (u/generate-yaml updated))
          (u/log "  ✅" (str "Updated file: " path))))))

(defn- fix-yaml-indent [path & _]
  (try
    (->> path slurp yaml/parse-string u/generate-yaml (spit path))
    (catch Exception e
      (u/log "  ❌" (str "Error processing file: " path ": " (.getMessage e))))))

(defn- crawl-data-directory
  [f dry-run?]
  (doseq [file (concat (fs/glob "_data" "**/*.yaml")
                       (fs/glob "_data" "**/*.yml"))]
    (f (str file) dry-run?)))

(defn -main
  "Entry point. Args are validated in bb.edn"
  [{:keys [dry-run?]}]
  (u/log "🚀" (str "Crawling _docs directory: updating markdown links" (when dry-run? " (dry run mode)")))
  (crawl-md-directory "_docs" dry-run?)
  (u/log "🚀" (str "Crawling _data directory: updating yaml links" (when dry-run? " (dry run mode)")))
  (crawl-data-directory fix-yaml-links dry-run?))

(defn indent-yaml! []
  (crawl-data-directory fix-yaml-indent false))
