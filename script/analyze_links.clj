(ns analyze-links
  (:require
   [babashka.cli :as cli]
   [babashka.curl :as curl]
   [babashka.fs :as fs]
   [clj-yaml.core :as yaml]
   [clojure.java.io :as io]
   [clojure.string :as str]
   [clojure.walk :as walk]))

(defn- url-ok?
  "Returns true if the given URL responds with a 2xx HTTP status.
  Uses `babashka.curl` with `:throw false` to avoid exceptions on failure.
  Returns false on error or non-2xx status."
  [url]
  (try
    (let [{:keys [status]} (curl/get url {:throw false})]
      (<= 200 status 299))
    (catch Exception _ false)))

(defn- broken-links*
  "Takes a collection of relative paths and checks their availability
  by making HTTP GET requests to https://metabase.com/<path>. Uses a fixed-size
  thread pool to parallelize the checks. Returns a map with:
    - :broken-count — the number of unreachable URLs
    - :broken       — a vector of paths that failed the check"
  [missing-paths]
  (let [pool (java.util.concurrent.Executors/newFixedThreadPool 100)
        tasks (map (fn [p]
                     (fn [] (if (url-ok? (str "https://metabase.com/" p)) nil p)))
                   missing-paths)
        futures (mapv #(.submit pool ^Callable %) tasks)
        broken (vec (keep #(.get %) futures))]
    (.shutdown pool)
    {:broken-count (count broken)
     :broken broken}))

(defn- check-broken-links
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

(defn- extract-path [line]
  (when-let [[_ link] (re-find #"internally linking to (/[^\s,]+)" line)]
    link))

(defn- no-trailing-slash [s]
  (cond-> s
    (and (string? s) (str/ends-with? s "/"))
    (subs 0 (dec (count s)))))

(defn- gather-htmlproofer-links [file]
  (let [possibly-broken-links (transient #{})]
    (with-open [rdr (io/reader file)]
      (doseq [line (line-seq rdr)]
        (when-let [link (extract-path line)]
          (conj! possibly-broken-links (no-trailing-slash link)))))
    (persistent! possibly-broken-links)))

(defn- parse-frontmatter [file]
  (with-open [r (io/reader file)]
    (let [lines (line-seq r)]
      (when (= "---" (first lines))
        (let [[_ & rest] lines
              [frontmatter _] (split-with #(not= "---" %) rest)]
          (yaml/parse-string (str/join "\n" frontmatter)))))))

(defn- normalize-redirect [link]
  (str/replace link #"\.[^.]+$" ""))

(defn- gather-redirects [site-dir]
  (let [redirect-froms (transient #{})]
    (doseq [file (fs/glob site-dir "**.md")
            :let [frontmatter (parse-frontmatter (str file))]
            :when (and frontmatter (map? frontmatter))
            :let [redirects (:redirect_from frontmatter)] :when redirects
            redirect redirects]
      #_:clj-kondo/ignore
      (conj! redirect-froms (normalize-redirect redirect)))
    (persistent! redirect-froms)))

(def cli-spec
  {:spec
   {:htmlproofer-output {:desc "The file that htmlproofer was piped into."
                         :require true
                         :validate fs/regular-file?}}})

(defn- usage
  []
  (cli/format-opts (merge cli-spec {:order (vec (sort (keys (:spec cli-spec))))})))

(def excluded-links
  #{"/events/metabase-setup-workshop" "/learn/building-analytics/dashboards/cross-filtering"})

(defn -main [& args]
  (let [opts                      (try (cli/parse-opts args cli-spec)
                                       (catch Exception _
                                         (println "Usage: script/analyze_links.clj")
                                         (println)
                                         (println (usage))
                                         (System/exit 1)))
        _                         (when (or (:help opts) (:h opts))
                                    (println (usage))
                                    (System/exit 1))
        ;; htmlproofer only knows about docs.metabase.github.io, so it will report 'missing links'
        ;; but in reality, those links might exist e.g. on metabase.com.
        ;;
        ;; UNKNOWN: We might need to check one of the metabase.github.io
        ;;          cloudflare branch deployments for links too.
        htmlproofer-links         (gather-htmlproofer-links (:htmlproofer-output opts))
        redirects                 (gather-redirects "_docs")
        external-or-missing-links (->> htmlproofer-links
                                       (remove redirects)
                                       (remove (into #{} (map #(str % ".html") redirects))))
        _                         (println (count htmlproofer-links) "missing links reported by htmlproofer.")
        _                         (println (count redirects) "unique redirect links gathered from in _docs.")
        _                         (println (count external-or-missing-links) "reported links without redirects.")
        _                         (println "Checking if the missing links are live on https://metabase.com ...")
        out                       (check-broken-links (remove excluded-links external-or-missing-links))]
    (println ">>>>>>>>>> htmlproofer links <<<<<<<<<")
    (doseq [l (sort (set htmlproofer-links))]
      (println " " l))
    (println "\n\n\n")
    (println ">>>>>>>>>> redirects <<<<<<<<<")
    (doseq [l (sort (set redirects))]
      (println " " l))
    (println "\n\n\n")
    (println ">>>>>>>>>> external-or-missing-links <<<<<<<<<")
    (doseq [l (sort (set external-or-missing-links))]
      (println " " l))

    (println "\n\n\n")
    (if (zero? (:broken-count out))
      (do
        (println "Done. OK.")
        (System/exit 0))
      (do
        (prn out)
        (System/exit 1)))))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))

(comment

  (def opts {:htmlproofer-output "htmlproofer.out"})

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
