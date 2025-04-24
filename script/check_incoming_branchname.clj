(ns check-incoming-branchname
  (:require
   [util :as u]
   [clojure.string :as str]))

(defn usage []
  (println "Usage: script/check_incoming_branchname.clj branchname")
  (System/exit 1))

(defn -main
  "This is called from the `process_docs_changes.yml` workflow. It checks that
   the branchname is either `master` or a release branch. If not, it exits with
   an error code, stopping the workflow before it goes ahead and opens a PR with
   the docs changes."
  [& args]
  (let [branchname (or (first args) (usage))
        _ (println "Checking branchname:" branchname)
        [category release-num] (u/categorize-branchname branchname)]
    (case category
      :master (println "Master branch detected.")
      :release (println "Release branch detected. Release number: " release-num)
      :test (println "Test branch detected. Branchname: " branchname)
      (do (println "Unpublishable branchname: " branchname)
          (System/exit 1)))))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
