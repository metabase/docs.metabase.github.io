(ns -test.identical-html-checker
  (:require [babashka.fs :as fs]
            [babashka.process :as p]
            [clojure.string :as str]
            [clojure.data :as d]
            [ice.core :as ice]
            [util :as u]))

(:out (p/shell {:out :string} "pwd"))

(defn html-files [& paths]
  (into []
        (comp
          (mapcat #(fs/glob % "**/*.html"))
          (map str)
          (distinct))
        paths))

(defn without-prefix [s]
  (-> s
      (str/replace #"../metabase.github.io/" "")
      (str/replace #"_site/docs/" "")))

(defn missing-file-report [other-repo-path subpath]
  (let [docs-pages (sort (map without-prefix
                              (html-files (str "_site/docs/" subpath))))
        og-pages (sort (into []
                             (map without-prefix)
                             (html-files (str other-repo-path "/_site/docs/" subpath))))
        [docs-only' og-only'] (d/diff (set docs-pages) (set og-pages))
        docs-only (vec (sort docs-only'))
        og-only   (vec (sort og-only'))
        ok? (zero? (+ (count docs-only) (count og-only)))]

    {:ok? ok?

     :subpath subpath

     :docs-only docs-only
     :og-only   og-only

     :docs-pages docs-pages
     :og-pages og-pages}))

(defn -main [& args]
  (let [other-repo-path (first args)
        _ (when-not other-repo-path
            (throw (ex-info (ice/p-str [:red (str "Please provide the path to the original repo \n"
                                                  "Usage: identical_html_checker.clj ../metabase.github.io")])
                            {:babashka/exit 1})))
        _ (when-not (fs/exists? other-repo-path)
            (throw (ex-info (ice/p-str [:red (str "Invalid path \n"
                                                  "Usage: identical_html_checker.clj <path>")])
                            {:babashka/exit 1})))
        num-subpaths (map #(str "v0." %) (range 12 (inc (u/config-docs-version))))
        subpaths (into [] (conj num-subpaths "latest" "master"))
        _ (apply ice/p [:magenta "Checking Subpaths: "]
                 ((juxt first (constantly "-") last) num-subpaths) ", and latest and master")
        reports (for [subpath subpaths] (missing-file-report other-repo-path subpath))
        {ok true errors false} (group-by :ok? reports)]
    (doseq [error errors]
      (let [{:keys [subpath docs-only og-only og-pages docs-pages diff]} error]
        (println "Missing Files Report for subpath:" subpath)
        (ice/p [:red "   >"] [:cyan "docs-pages:   "] (count docs-pages))
        (ice/p [:red "   >"] [:cyan "og-pages:     "] (count og-pages))
        (ice/p [:red "   >"] [:cyan "diff count:   "] (count diff))
        (ice/p [:red "   >"] [:cyan "docs-only:    "] docs-only)
        (ice/p [:red "   >"] [:cyan "og-only:      "] og-only))
      (println))
    (ice/p [:on-red "ERROR:"])
    (ice/p [:red (mapv :subpath errors)] "\n")
    (ice/p [:on-green "OK:"])
    (ice/p [:green (mapv :subpath ok)])))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
