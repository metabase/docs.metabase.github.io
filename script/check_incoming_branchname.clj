(ns check-incoming-branchname)

(defn usage []
  (println "Usage: script/check_incoming_branchname.clj branchname")
  (System/exit 1))

(def release-regex #"release-x\.(\d+)\.x")

(defn extract-release-num [release-branchname]
  (let [[_ num] (re-matches release-regex release-branchname)]
    num))

(defn categorize-branchname [branchname]
  (cond
    (= branchname "master") [:master]
    (re-matches release-regex branchname) [:release (extract-release-num branchname)]))

(defn -main
  "This is called from the `process_docs_changes.yml` workflow. It checks that
   the branchname is either `master` or a release branch. If not, it exits with
   an error code, stopping the workflow before it goes ahead and opens a PR with
   the docs changes."
  [& args]
  (let [branchname (or (first args) (usage))
        _ (println "Checking branchname:" branchname)
        [category release-num] (categorize-branchname branchname)]
    (case category
      :master (println "Master branch detected.")
      :release (println "Release branch detected:" release-num)
      (do (println "Unpublishable branchname: " branchname)
          (System/exit 1)))))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
