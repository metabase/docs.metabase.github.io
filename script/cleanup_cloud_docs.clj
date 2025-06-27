(ns cleanup-cloud-docs
  (:require [babashka.fs :as fs]))

(defn find-cloud-dirs []
  "Find all cloud directories in _docs"
  (->> (fs/glob "_docs" "*/cloud")
       (map str)
       (filter #(fs/directory? %))))

(def cloud-docs-dir "_docs/latest/cloud")

(defn non-latest-cloud-dirs []
  "Find cloud directories that are not in latest"
  (->> (find-cloud-dirs)
       (remove #{cloud-docs-dir})))

(defn -main []
  (println "=== Cleaning up cloud docs ===")

  ;; Ensure _docs/latest/cloud exists
  (fs/create-dirs cloud-docs-dir)

  ;; If master/cloud exists, sync its contents to latest/cloud
  (when (fs/exists? "_docs/master/cloud")
    (println "Copying files from master/cloud to latest/cloud")
    (fs/copy-tree "_docs/master/cloud" cloud-docs-dir
                  {:replace-existing true}))

  ;; Remove cloud from all non-latest versions
  (doseq [dir (non-latest-cloud-dirs)]
    (println (str "Removing cloud docs from: " dir))
    (fs/delete-tree dir))

  ;; Remove master/cloud after syncing
  (when (fs/exists? "_docs/master/cloud")
    (println "Removing master/cloud (cloud should only be in latest because it is always on that version)")
    (fs/delete-tree "_docs/master/cloud"))

  (println "=== Cloud cleanup complete ===")
  (println "Cloud docs now only in:")
  (doseq [dir (find-cloud-dirs)]
    (println (str "  - " dir))))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
