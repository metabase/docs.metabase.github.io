(ns tasks.stitch-outbound-links
  (:require [babashka.fs :as fs]
            [clj-yaml.core :as yaml]
            [clojure.string :as str]
            [clojure.walk :as walk]
            [hickory.core :as hickory]
            [hiccup2.core :as hiccup]
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


;; YAML values can be html, so we update their links too.

(defn ->hiccup
  "Wraps a html string with divs to capture any strings before or after the html."
  [html-str]
  (let [with-html-head-body (hickory/as-hiccup (hickory/parse (str "<div>" html-str "</div>")))]
    (-> with-html-head-body first (nth 3) (nth 2))))

(defn <-hiccup
  "Unwraps a hiccup structure from the divs added by ->hiccup."
  [hiccup]
  (-> hiccup hiccup/html (str/replace #"^\<div\>" "") (str/replace #"\<\/div\>$" "") str))

(defn update-html! [html-str walk-fn]
  (let [data (->hiccup html-str)]
    (<-hiccup (walk/postwalk walk-fn data))))

(def attrs-to-update #{:href})

(def yaml-keys-to-update #{:url :link :oss :enterprise :starter :pro})

(defn fix-link-string? [x]
  (and
    (instance? clojure.lang.MapEntry x)
    (contains? yaml-keys-to-update (first x))
    (string? (second x))
    x))

(defn fix-strategy [s]
  (cond
    (some #(str/starts-with? s %) (mapv #(str "/" % "/") outbound-link-roots))
    :add

    (or (str/starts-with? s "https://metabase.com/docs")
        (str/starts-with? s "https://www.metabase.com/docs")
        (str/starts-with? s "http://metabase.com/docs")
        (str/starts-with? s "http://www.metabase.com/docs"))
    :remove

    :else nil))

(comment
  (fix-strategy "/foob/latest/cloud/start")
  ;; => :add
  (fix-strategy "https://metabase.com/docs/latest/cloud/start")
  ;; => :remove
  (fix-strategy "/docs/x")
  ;; => nil
  )

(declare fix-html-links)

(defn fix-link-string
  ([s] (fix-link-string s true))
  ([s fix-html?]
   (let [strat (fix-strategy s)
         fixed (case strat
                 :add (str "https://metabase.com" (when-not (str/starts-with? s "/") "/") s)
                 :remove (let [replacement (if (str/starts-with? s "/") "" "/")]
                           (-> s
                               (str/replace #"^http://metabase.com" replacement)
                               (str/replace #"^http://www.metabase.com" replacement)
                               (str/replace #"^https://metabase.com" replacement)
                               (str/replace #"^https://www.metabase.com" replacement)))
                 nil s)]
     (if fix-html? (fix-html-links fixed) fixed))))

(defn fix-html-links [s]
  (update-html! s
                (fn [x]
                  (if (and (instance? clojure.lang.MapEntry x)
                           (contains? attrs-to-update (first x))
                           (string? (second x)))
                    [(first x) (fix-link-string (second x) false)]
                    x))))

(comment
  (fix-link-string "/foob/latest/cloud/start")
  ;; => "https://metabase.com/foob/latest/cloud/start"
  (fix-link-string "https://metabase.com/docs/latest/cloud/start")
  ;; => "/docs/latest/cloud/start"
  (fix-link-string "/docs/x")
  ;; => "/docs/x"
  )

(defn update-links [link-data]
  (walk/postwalk
    (fn [x]
      (if-let [[k v] (fix-link-string? x)]
        [k (fix-link-string v)]
        x))
    link-data))

(defn- fix-yaml-links [path dry-run?]
  (let [parsed (yaml/parse-string (slurp path))
        updated (update-links parsed)]
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
  (doseq [file (concat (fs/glob "." "_data/**.yaml")
                       (fs/glob "." "_data/**.yml"))]
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
