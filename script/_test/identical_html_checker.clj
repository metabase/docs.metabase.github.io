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

(defn missing-file-report [subpath]
  (let [docs-pages (sort (map without-prefix
                              (html-files (str "_site/docs/" subpath))))
        og-pages (sort (into []
                             (map without-prefix)
                             (html-files (str "../metabase.github.io/_site/docs/" subpath))))
        diff (sort (remove (set docs-pages) og-pages))
        ok? (zero? (count diff))]

    {:ok? ok?
     :subpath subpath
     :docs-pages docs-pages
     :og-pages og-pages
     :diff diff}))

(defn -main [& args]
  (let [reports (for [subpath (conj (map #(str "v0." %) (range 12 (inc (u/config-docs-version))))
                                    "latest"
                                    "master")]
                  (missing-file-report subpath))]
    (when-let [errors (seq (remove :ok? reports))]
      (ice/p [:on-red "ERROR:"])
      (doseq [report errors]
        (let [{:keys [subpath docs-pages og-pages docs-pages diff]} report]
          (println "Missing Files Report for subpath:" subpath)
          (ice/p [:red "   >"] [:cyan "docs-pages:   "] (count docs-pages))
          (ice/p [:red "   >"] [:cyan "og-pages:     "] (count og-pages))
          (ice/p [:red "   >"] [:cyan "diff count:   "] (count diff))
          (ice/p [:red "Diffs:"])
          (doseq [d diff]
            (ice/p [:yellow "     - " d])))
        (println)))
    (ice/p [:on-green "OK:"])
    (u/pp-line (map :subpath (filter :ok? reports)))))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
