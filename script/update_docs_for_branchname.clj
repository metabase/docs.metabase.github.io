(ns update-docs-for-branchname
  (:require
   [babashka.process :as p]
   [bling.core :as b]
   [util :as u]))

;; TODO: add test that docs_version is always parsable


(defn usage []
  (println "Usage: script/update_docs_for_branchname.clj branchname")
  (System/exit 1))

(defn -main [& args]
  (let [branchname    (first args)
        dry-run?      (contains? (set args) "--dry-run")
        _             (when (nil? branchname)
                        (b/callout {:type :error} (b/bling [:red "No branchname provided."]))
                        (usage))
        [category
         release-num] (u/categorize-branchname branchname)
        command       (cond
                        (= category :master)
                        "./script/docs master --set-version master"

                        ;; for "current version", just use docs-update
                        (= (u/config-docs-version) release-num)
                        "./script/docs-update"

                        (= category :release)
                        (format "./script/docs release-x.%s.x --set-version v0.%s" release-num release-num)

                        (= category :test)
                        (format "./script/docs %s --set-version %s" branchname branchname)

                        :else (do (println "Unpublishable branchname: " branchname)
                                  (System/exit 1)))]
    (b/callout {:type :info :label (str "Command for " branchname)} command)
    (when-not dry-run?
      (p/shell command))
    (prn {:branchname branchname
          :category category
          :release-num release-num
          :dry-run? dry-run?
          :command command})))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
