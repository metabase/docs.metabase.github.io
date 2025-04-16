(ns analyze-links
  (:require
   [babashka.cli :as cli]
   [babashka.curl :as curl]
   [babashka.fs :as fs]
   [clj-yaml.core :as yaml]
   [clojure.java.io :as io]
   [clojure.walk :as walk]))

(def cli-spec
  {:spec
   {:htmlproofer-output {:desc "The file that htmlproofer was piped into."
                         :require true
                         :validate fs/regular-file?}}})

(defn usage
  []
  (cli/format-opts (merge cli-spec {:order (vec (keys (:spec cli-spec)))})))


(defn- url-ok? [url]
  "Returns true if the given URL responds with a 2xx HTTP status.
  Uses `babashka.curl` with `:throw false` to avoid exceptions on failure.
  Returns false on error or non-2xx status."
  (try
    (let [{:keys [status]} (curl/get url {:throw false})]
      (<= 200 status 299))
    (catch Exception _ false)))

(defn- broken-links* [missing-paths]
  "Takes a collection of relative paths and checks their availability
  by making HTTP GET requests to https://metabase.com/<path>. Uses a fixed-size
  thread pool to parallelize the checks. Returns a map with:
    - :broken-count — the number of unreachable URLs
    - :broken       — a vector of paths that failed the check"
  (let [pool (java.util.concurrent.Executors/newFixedThreadPool 100)
        tasks (map (fn [p]
                     (fn [] (if (url-ok? (str "https://metabase.com/" p)) nil p)))
                   missing-paths)
        futures (mapv #(.submit pool ^Callable %) tasks)
        broken (vec (keep #(.get %) futures))]
    (.shutdown pool)
    {:broken-count (count broken)
     :broken broken}))

(defn check-broken-links
  "High-level wrapper around `broken-links*` that retries the check up to `retries`
  times (default 2). On each retry, it only rechecks the broken paths from the
  previous attempt. Stops early if no broken links remain. Returns the result
  map from the final attempt."
  ([missing-paths] (check-broken-links missing-paths {:retries 2}))
  ([missing-paths {:keys [retries]}]
   (loop [trial 1
          mp (broken-links* missing-paths)]
     (println "  > check-broken-links Trial" trial)
     (cond
       (> trial retries) mp
       (zero? (:broken-count mp)) mp
       :else (recur
               (inc trial)
               (broken-links* (:broken mp)))))))

(defn extract-path [line]
  (when-let [[_ link] (re-find #"internally linking to (/[^\s,]+)" line)]
    link))

(defn gather-htmlproofer-links [file]
  (let [possibly-broken-links (transient #{})]
    (with-open [rdr (io/reader file)]
      (doseq [line (line-seq rdr)]
        (when-let [link (extract-path line)]
          (conj! possibly-broken-links link))))
    (persistent! possibly-broken-links)))

(defn parse-frontmatter [file]
  (with-open [r (io/reader file)]
    (let [lines (line-seq r)]
      (when (= "---" (first lines))
        (let [[_ & rest] lines
              [frontmatter _] (split-with #(not= "---" %) rest)]
          (yaml/parse-string (str (clojure.string/join "\n" frontmatter))))))))

(defn gather-redirects [site-dir]
  (let [redirect-froms (transient #{})]
    (doseq [file (fs/glob site-dir "**.md")
            :let [frontmatter (parse-frontmatter (str file))] :when frontmatter
            :let [redirects (:redirect_from frontmatter)] :when redirects
            redirect redirects]
      (conj! redirect-froms redirect))
    (persistent! redirect-froms)))

(defn -main [& args]
  (let [opts              (try (cli/parse-opts args cli-spec)
                               (catch Exception _
                                 (println "Usage: script/analyze_links.clj")
                                 (println)
                                 (println (usage))
                                 (System/exit 1)))
        _                 (when (or (:help opts) (:h opts))
                            (println (usage))
                            (System/exit 1))
        ;; htmlproofer only knows about docs.metabase.github.io, so it will report 'missing links'
        ;; but in reality, those links might exist e.g. on metabase.com.
        ;;
        ;; UNKNOWN: We might need to check one of the metabase.github.io
        ;;          cloudflare branch deployments for links too.
        htmlproofer-links (gather-htmlproofer-links (:htmlproofer-output opts))
        _                 (println (str "htmlproofer reported " (count htmlproofer-links)) "missing links.")
        redirects         (gather-redirects "_docs")
        _                 (println (str "Found " (count redirects) " unique redirect links in _docs"))
        missing-links     (remove redirects htmlproofer-links)
        _                 (println (str "reported links without redirects: " (count missing-links)))
        _                 (println "Checking if the missing-links are live on https://metabase.com ...")
        o                 (check-broken-links missing-links)]
    (prn o)
    (System/exit 1)))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))

(comment

  ;; TODO: do we need to check links on data urls too?
  ;; data-urls:
  (let [urls (transient #{})]
    (doseq [file (sort (map str
                            (concat (fs/glob "_data" "**.yml")
                                    (fs/glob "_data" "**.yaml"))))]
      (println "Processing:" file)
      (walk/postwalk
        (fn [x]
          (when (and (instance? clojure.lang.MapEntry x)
                     (= (first x) :url))
            (conj! urls (second x)))
          x)
        (yaml/parse-string (slurp file))))
    (sort (persistent! urls))))
