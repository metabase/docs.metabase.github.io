(ns merge
  (:require
   [babashka.cli :as cli]
   [babashka.process :as p]
   [cheshire.core :as json]
   [ice.core :as ice]
   [util :as u]))

(def cli-spec
  {:spec
   {:target-branch {:ref "<target-branch>"
                    :desc "The target branch of the triggering PR."
                    :alias :t
                    :require true}
    :source-branch {:ref "<source-branch>"
                    :desc "The source branch of the triggering PR."
                    :alias :r}}
   :error-fn u/cli-error-fn})

(defn source+target-branch->pr-number [source-branch target-branch]
  (let [head-ref-name (str source-branch "->" target-branch)
        prs (-> (p/shell {:out :string}
                         "gh" "pr" "list"
                         "--repo" "metabase/docs.metabase.github.io"
                         "--json" "number,headRefName")
                :out
                (json/parse-string true)
                (into []))]
    (->> prs
         (filter #(= (:headRefName %) head-ref-name))
         first
         :number)))

(defn -main [& args]
  (let [{:keys [source-branch target-branch]
         :as   opts}     (cli/parse-opts args cli-spec)
        pr-number (source+target-branch->pr-number source-branch target-branch)]
    (ice/p [:green "Merging PR for branch"] [:bold source-branch] "into" [:bold target-branch] "with PR number" [:bold pr-number])
    (p/shell "gh" "pr" "merge" pr-number "--squash" "--delete-branch")
    (ice/p [:green "PR merged successfully!"])))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
