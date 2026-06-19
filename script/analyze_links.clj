(ns analyze-links
  (:require
   [babashka.cli :as cli]
   [babashka.curl :as curl]
   [babashka.fs :as fs]
   [clj-yaml.core :as yaml]
   [clojure.java.io :as io]
   [clojure.string :as str]
   [clojure.walk :as walk]
   [ice.core :as ice]
   [util :as u]))

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

(comment
  (u/pp (curl/get
          "https://087b8225.docs-metabase-github-io.pages.dev/docs/master/installation-and-operation/installing-metabase-DO-NOT-MERGE"
          {:throw false}))
  )

(defn- check-broken-links
  "High-level wrapper around `broken-links*` that retries the check up to `retries`
  times (default 2). On each retry, it only rechecks the broken paths from the
  previous attempt. Stops early if no broken links remain. Returns the result
  map from the final attempt."
  ([missing-paths limit] (check-broken-links missing-paths limit {:retries 4}))
  ([missing-paths limit {:keys [retries]}]
   (ice/p "  > check-broken-links:"
          [:magenta " Trial: 0"] " | "
          [:cyan "Missing Path Count: " (count missing-paths)])
   (loop [trial 1
          mp (broken-links* missing-paths)]
     (println "------------------------------")
     (ice/p "  > check-broken-links:"
            [:magenta " Trial: " trial] " | "
            [:cyan "Missing Path Count: " (:broken-count mp)])
     (doseq [broken (:broken mp)]
       (println "  >  Broken link:" broken))
     (cond
       (> trial retries) mp
       (>= limit (:broken-count mp)) mp
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

(defn- docs-link? [link]
  (str/starts-with? link "/docs"))

(def cli-spec
  {:spec
   {:htmlproofer-output {:desc "The file that htmlproofer was piped into."
                         :require true
                         :validate fs/regular-file?}
    :limit {:desc "The maximum number of broken links to allow. Default: 1"
            :default 1
            :parse-fn #(Integer/parseInt %)}
    :check-all-fallback-links {:desc "Fallback-check non-/docs paths on metabase.com too. Default: false"
                               :default false
                               :coerce :boolean}}})

(defn- usage
  []
  (cli/format-opts (merge cli-spec {:order (vec (sort (keys (:spec cli-spec))))})))

(def excluded-links
  #{"/events/metabase-setup-workshop" "/learn/building-analytics/dashboards/cross-filtering"})

(defn -main [& args]
  (let [{:keys [check-all-fallback-links limit] :as opts}
        (try (cli/parse-opts args cli-spec)
             (catch Exception _
               (println "Usage: script/analyze_links.clj --htmlproofer-output <file>")
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
        _                         (prn opts)
        htmlproofer-links         (gather-htmlproofer-links (:htmlproofer-output opts))
        redirects                 (gather-redirects "_docs")
        external-or-missing-links (->> htmlproofer-links
                                       (remove redirects)
                                       (remove (into #{} (map #(str % ".html") redirects))))
        ;; GRO-569: docs CI should not live-probe marketing-site paths. The main
        ;; website CI already owns broader link checking, and these fallback
        ;; probes can be blocked by Amplify/firewall behavior.
        ;; https://linear.app/metabase/issue/GRO-569/update-link-check-job-to-use-a-local-website-build
        fallback-links            (cond->> external-or-missing-links
                                    (not check-all-fallback-links) (filter docs-link?)
                                    true (remove excluded-links))
        skipped-fallback-links    (when-not check-all-fallback-links
                                    (remove docs-link? external-or-missing-links))
        _                         (doseq [hl (sort htmlproofer-links)] (println "htmlproofer reported: " hl))
        _                         (println (count htmlproofer-links) "missing links reported by htmlproofer.")
        _                         (println (count redirects) "unique redirect links gathered from in _docs.")
        _                         (println (count external-or-missing-links) "reported links without redirects.")
        _                         (when skipped-fallback-links
                                    (println (count skipped-fallback-links) "non-/docs links skipped from metabase.com fallback checks."))
        _                         (println "Checking if the missing links are live on https://metabase.com ...")
        report                    (check-broken-links fallback-links limit)]
    (if (>= limit (:broken-count report))
      (do
        (ice/p [:green "Done! OK."])
        (prn {:htmlproofer-link-count         (count htmlproofer-links)
              :redirect-count                 (count redirects)
              :external-or-missing-link-count (count external-or-missing-links)
              :report                         report}))
      (do
        (u/pp report)
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
