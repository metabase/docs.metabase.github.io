(ns manage-cloud-docs
  (:require [babashka.fs :as fs]
            [ice.core :as ice]))

(defn delete-if-exists!
  "Returns true if the path existed and was deleted, false otherwise."
  [path]
  (if (fs/exists? path)
    (do (fs/delete-tree path) true)
    false))

(defn -main []
  (let [cloud-dirs-to-remove (->> (fs/list-dir "_docs")
                                  (filter fs/directory?)
                                  (map #(str % "/cloud"))
                                  ;; skip latest:
                                  (remove #{"_docs/latest/cloud"})
                                  sort)]
    (doseq [cloud-dir cloud-dirs-to-remove
            :let [deleted? (delete-if-exists! cloud-dir)]]
      (ice/p
        "Checking: for cloud docs at " cloud-dir " : "
        (if deleted? [:green "deleted."] [:red "not deleted."])))))

(when (= *file* (System/getProperty "babashka.file"))
  (-main))
