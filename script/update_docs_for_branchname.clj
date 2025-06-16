(ns update-docs-for-branchname
  (:require
   [babashka.process :as p]
   [babashka.fs :as fs]
   [babashka.cli :as cli]
   [ice.core :as ice]
   [bling.core :as b]
   [util :as u]))

(def cli-spec
  {:spec
   {:target-branch {:desc "The target branch to update docs for."
                    :alias :t
                    :require true}
    ;; repo-dir is the name of the source branch.
    :repo-dir {:desc "The file path to the metabase repository where the docs are located."
               :alias :r
               :validate fs/directory?}
    :dry-run {:desc "If set, will not execute the command, just print it out."
              :coerce :boolean}}
   :error-fn                           ; a function to handle errors
   (fn [{:keys [spec type cause msg option] :as data}]
     (when (= :org.babashka/cli type)
       (let [msg (case cause
                   :require
                   (format "Missing required argument: %s\n" option)
                   :validate
                   (format "%s does not exist!\n" msg))]
         (u/pp data)
         (throw (ex-info msg {:babashka/exit 1})))))})

(defn- show-usage-and-exit []
  (-> cli-spec
      (merge {:order (vec (keys (:spec cli-spec)))})
      cli/format-opts
      println)
  (System/exit 1))

(defn- add-repo-dir [cmd repo-dir]
  (if repo-dir
    (str cmd " --repo-dir " repo-dir) cmd))

(defn -main [& args]
  (let [{:keys [repo-dir target-branch]
         :as   opts}  (cli/parse-opts args cli-spec)
        _             (prn ["opts" opts])
        _             (when (or (:help opts) (:h opts)) (show-usage-and-exit))
        dry-run?      (contains? (set args) "--dry-run")
        [category
         release-num] (u/categorize-branchname target-branch)
        command       (-> (cond
                            (= category :master)
                            "./script/docs master --set-version master"

                            ;; for "current version", just use docs-update
                            (= (u/config-docs-version) release-num)
                            "script/docs --update --latest"

                            (= category :release)
                            (format "./script/docs release-x.%s.x --set-version v0.%s" release-num release-num)

                            :else (do (println "Unpublishable branchname: " target-branch)
                                      (throw (ex-info "Unpublishable branchname!"
                                                      {:babashka/exit 1 :opts opts}))))
                          (add-repo-dir repo-dir))]
    (b/callout {:type :info :label (str "Command for " target-branch)} command)
    (when-not dry-run?
      (p/shell command))
    (u/pp {:branchname  target-branch
           :category    category
           :release-num release-num
           :dry-run?    dry-run?
           :command     command})))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
