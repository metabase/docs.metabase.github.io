(ns merge
  (:require
   [babashka.cli :as cli]
   [babashka.process :as p]
   [cheshire.core :as json]
   [clojure.pprint :as pp]
   [clojure.string :as str]
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
                    :alias :r}
    :dry-run {:desc "If set, will not execute the command, just print it out."
              :coerce :boolean
              :default false}}
   :error-fn u/cli-error-fn})

(defn source+target-branch->pr-number [source-branch target-branch]
  (let [head-ref-name (str source-branch "->" target-branch)
        _ (prn {:source-branch source-branch
                :target-branch target-branch
                :head-ref-name head-ref-name})
        prs (-> (p/shell {:out :string}
                         "gh" "pr" "list"
                         "--limit" "1000"
                         "--repo" "metabase/docs.metabase.github.io"
                         "--json" "number,headRefName")
                :out
                (json/parse-string true)
                (into []))
        _ (println "→ Open PR count: " (count prs))
        _ (println "→ Open PRs: \n"
                   (str/join "\n"
                             (map #(str "  " %)
                                  (str/split-lines (with-out-str (pp/pprint prs))))))
        _ (ice/p "See: " [:bold "https://github.com/metabase/docs.metabase.github.io/pulls"] " for more details")
        _ (println "→ Looking for PR with headRefName:" head-ref-name)
        pr-to-merge (first (filter #(= (:headRefName %) head-ref-name) prs))]
    (println "Found PR: " (pr-str pr-to-merge))
    (:number pr-to-merge)))

(defn -main [& args]
  (let [{:keys [source-branch target-branch]
         dry-run? :dry-run
         :as   opts}     (cli/parse-opts args cli-spec)
        pr-number (source+target-branch->pr-number source-branch target-branch)]
    (if-not pr-number
      (throw (ex-info (ice/p-str [:red "No PR found for source branch "] [:bold source-branch] " and target branch " [:bold target-branch] ".")
                      {:babashka/exit 1 :opts opts}))
      (do
        (ice/p [:green "Merging PR for branch "] [:bold source-branch] " into " [:bold target-branch] " with PR number " [:bold (pr-str pr-number)])
        (if-not dry-run?
          (p/sh "gh" "pr" "merge" pr-number "--squash" "--delete-branch")
          (do
            (println "Dry run mode: not actually merging PR")
            (println "Would run: gh pr merge" pr-number "--squash --delete-branch")))))))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
