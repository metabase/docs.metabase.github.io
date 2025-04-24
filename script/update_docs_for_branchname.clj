(ns update-docs-for-branchname
  (:require
   [babashka.process :as p]
   [bling.core :refer [bling callout]]
   [clj-yaml.core :as yaml]
   [util :as u]))

;; TODO: add test that docs_version is always parsable

(defn config-docs-version
  "Get the latest docs version number from the _config.yml file."
  []
  (let [[_ version-num] (re-matches #"v0.(\d+)" (:docs_version (yaml/parse-string (slurp "_config.yml"))))]
    (Integer/parseInt version-num)))

(defn update? [config-docs-version release-num]
  (cond
    (> release-num config-docs-version)
    (do
      (callout {:type :warning
                :label "Newer version detected"}
               (format "Release number from branch (%s) is newer than docs_version from config.yml (%s).\nContinuing build."
                       release-num
                       config-docs-version))
      false)

    (= release-num config-docs-version)
    true

    :else false))

(defn usage []
  (println "Usage: script/update_docs_for_branchname.clj branchname")
  (System/exit 1))

(defn -main [& args]
  (let [branchname (first args)
        dry-run? (contains? (set args) "--dry-run")
        _ (when (nil? branchname)
            (println (callout {:type :error} (bling [:red "No branchname provided."])))
            (usage))
        [category release-num] (u/categorize-branchname branchname)
        command (case category
                  :master "./script/docs master --set-version master"
                  :release (format "./script/docs release-x.%s.x --set-version v0.%s %s"
                                   release-num
                                   release-num
                                   (if (update? (config-docs-version) release-num)
                                     "--update"
                                     ""))
                  :test (format "./script/docs %s --set-version %s" branchname branchname)
                  (do (println "Unpublishable branchname: " branchname)
                      (System/exit 1)))]
    (callout {:type :info :label "Command To Run"} (bling [:green command]))
    (when-not dry-run? (p/shell command))))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
