(ns check-incoming-branchname
  (:require
   [babashka.cli :as cli]
   [ice.core :as ice]
   [util :as u]))

(def cli-spec
  {:spec
   {:target-branch {:ref "<target-branch>"
                    :desc "The target branch of the triggering PR."
                    :alias :t
                    :require true}}
   :error-fn u/cli-error-fn})

(defn -main
  "This is called from the `process_docs_changes.yml` workflow. It checks that
   the branchname is either `master` or a release branch. If not, it exits with
   an error code, stopping the workflow before it goes ahead and opens a PR with
   the docs changes."
  [& args]
  (let [{:keys [target-branch]} (cli/parse-opts args cli-spec)
        _ (println "Checking branchname:" target-branch)
        [category release-num] (u/categorize-branchname target-branch)
        result (case category
                 :master "Master branch detected."
                 :release (str "Release branch detected. Release number: " release-num)
                 ::fail)]
    (u/pp {:target-branch target-branch :category category :release-num release-num :result result})
    (when (= result ::fail)
      (ice/p [:red "Unpublishable branchname: "] target-branch)
      (System/exit 1))))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
