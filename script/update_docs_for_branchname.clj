(ns update-docs-for-branchname
  (:require
   [babashka.process :as p]
   [bling.core :refer [bling callout]]
   [clojure.string :as str]
   [clj-yaml.core :as yaml]
   [util :as u]))

;; TODO: add test that docs_version is always parsable

(defn config-docs-version
  "Get the latest docs version number from the _config.yml file."
  []
  (let [[_ version-num] (re-matches #"v0.(\d+)" (:docs_version (yaml/parse-string (slurp "_config.yml"))))]
    (Integer/parseInt version-num)))

(defn usage []
  (println "Usage: script/update_docs_for_branchname.clj branchname")
  (System/exit 1))

(defn -main [& args]
  (let [branchname    (first args)
        dry-run?      (contains? (set args) "--dry-run")
        _             (when (nil? branchname)
                        (println (callout {:type :error} (bling [:red "No branchname provided."])))
                        (usage))
        [category
         release-num] (u/categorize-branchname branchname)
        command       (cond
                        (= category :master)                  "./script/docs master --set-version master"
                        ;; for "current version", just use docs-update
                        (= (config-docs-version) release-num) "./script/docs-update"
                        (= category :release)                 (format "./script/docs release-x.%s.x --set-version v0.%s" release-num release-num)
                        (= category :test)                    (format "./script/docs %s --set-version %s" branchname branchname)
                        :else (do (println "Unpublishable branchname: " branchname)
                                  (System/exit 1)))]
    (callout {:type :info :label (str "Command for " branchname)} command)
    (when-not dry-run?
      (p/shell command))))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
