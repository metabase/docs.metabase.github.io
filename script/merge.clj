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
                    :alias :r
                    :require true}
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

(defn update-pr-branch
  "Update the PR branch to include latest changes from base branch, resolving conflicts by taking incoming changes"
  [{:keys [dry-run? pr-number head-ref-name]}]
  (ice/p [:blue "Updating PR branch to latest master..."])
  (if-not dry-run?
    ;; First try the API approach (clean merge)
    (let [{:keys [exit]} (p/sh "gh" "api"
                               "--method" "PUT"
                               (str "/repos/metabase/docs.metabase.github.io/pulls/" pr-number "/update-branch"))]
      (if (zero? exit)
        (ice/p [:green "✓ PR branch updated successfully via API"])
        (do
          (ice/p [:yellow "API update failed, likely due to conflict, trying git-based resolution..."])
          ;; If API fails due to conflicts, resolve manually
          (try
            ;; Fetch latest and checkout the PR branch
            (p/sh "git" "fetch" "origin")
            (p/sh "git" "checkout" head-ref-name)
            (prn (p/sh "git" "status"))

            ;; Try to merge master - this will show conflicts
            (let [merge-result (p/shell {:continue true} "git" "merge" "origin/master")]
              (if (= 0 (:exit merge-result))
                (ice/p [:green "✓ Clean merge successful"])
                (do
                  ;; Resolve conflicts by taking all changes from The PR Branch
                  (ice/p [:blue "Resolving conflicts by preferring our changes..."])
                  (p/sh "git" "checkout" "--ours" ".")
                  (p/sh "git" "add" ".")
                  (p/sh "git" "commit" "--no-edit" "-m" (str "Merge master, preferring changes from PR #" pr-number))
                  (ice/p [:green "✓ Conflicts resolved, preferring PR branch's changes"]))))

            ;; Push the updated branch
            (p/sh "git" "push" "origin" head-ref-name)
            (ice/p [:green "✓ PR branch updated via git"])

            (catch Exception git-e
              (ice/p [:red "Git-based update also failed: " (.getMessage git-e)]))))))
    (println "Dry run mode: would update PR branch, resolving conflicts by preferring incoming changes")))

(defn- gh-pr-merge [dry-run? pr-number]
  (let [cmd ["gh" "pr" "merge" pr-number "--squash" "--delete-branch"]]
    (if dry-run?
      (ice/p [:yellow "Dry run mode: not actually merging PR:\n"
              [:white [:bold "Would run: "] [:underline (str/join " " cmd)]]])
      (apply p/sh cmd))))

(defn -main [& args]
  (let [{:keys [source-branch target-branch]
         dry-run? :dry-run
         :as   opts}     (cli/parse-opts args cli-spec)
        [source-branch target-branch] (mapv str/trim [source-branch target-branch])
        pr-number (source+target-branch->pr-number source-branch target-branch)]
    (when-not pr-number
      (throw (ex-info (ice/p-str [:red "No PR found for source branch "] [:bold source-branch] " and target branch " [:bold target-branch] ".")
                      {:babashka/exit 1 :opts opts})))
    (update-pr-branch {:dry-run? dry-run?
                       :pr-number pr-number
                       :head-ref-name (str source-branch "->" target-branch)})
    (ice/p [:green "Merging PR for branch "] [:bold source-branch] " into " [:bold target-branch] " with PR number " [:bold (pr-str pr-number)])
    (gh-pr-merge dry-run? pr-number)))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
