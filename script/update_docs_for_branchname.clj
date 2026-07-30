(ns update-docs-for-branchname
  (:require
   [babashka.cli :as cli]
   [babashka.process :as p]
   [bling.core :as b]
   [clojure.set :as set]
   [util :as u]))

(def cli-spec
  {:spec
   ;; note: target branch is a misnomer, the purpose of this param is to specify the target
   ;; folder, whether it should be a numbered version or master. This should probably always
   ;; be derived from the source branch alone
   {:target-branch {:ref "<target-branch>"
                    :desc "The target branch to update docs for."
                    :alias :t
                    :require true}
    :source-branch {:ref "<source-branch>"
                    :desc "The file path to the metabase repository where the docs are located."
                    :alias :r
                    :require true}
    :dry-run {:desc "If set, will not execute the command, just print it out."
              :coerce :boolean}}
   :error-fn u/cli-error-fn})

(defn- add-source-branch [cmd source-branch]
  (if source-branch
    (str cmd " --source-branch " source-branch) cmd))

(defn -main [& args]
  (let [_ (when (seq (set/intersection #{"-h" "--help"} (set args)))
            (u/show-usage-and-exit cli-spec))
        {:keys [source-branch target-branch]
         dry-run? :dry-run
         :as   opts}  (cli/parse-opts args cli-spec)

        [category
         release-num] (u/categorize-branchname target-branch)
        command       (-> (cond
                            (= category :master)
                            "./script/docs master --set-version master"

                            ;; for "current version", just use docs-update
                            (= (u/config-docs-version) release-num)
                            "./script/docs --update --latest"

                            (= category :release)
                            (format "./script/docs release-x.%s.x --set-version v0.%s" release-num release-num)

                            :else (do (println "Unpublishable branchname: " target-branch)
                                      (throw (ex-info "Unpublishable branchname!"
                                                      {:babashka/exit 1 :opts opts}))))
                          (add-source-branch source-branch))]
    (b/callout {:type :info :label (str "Command for " target-branch)} command)
    (when-not dry-run?
      (p/shell command))
    (prn {:target-branch target-branch
          :source-branch source-branch
          :category    category
          :release-num release-num
          :dry-run?    dry-run?
          :command     command})))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
