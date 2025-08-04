(ns merge
  (:require
   [babashka.cli :as cli]
   [babashka.process :as p]
   [cheshire.core :as json]
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
                    :require true}}
   :error-fn u/cli-error-fn})

(defn- find-pr-list [source-branch target-branch]
  (let [pr (-> (p/sh "gh" "pr" "list"
                     "--head" (u/head-ref-name source-branch target-branch)
                     "--json" "number,headRefName")
               :out
               (json/parse-string true)
               first)]
    (if pr
      (do (ice/p [:green "Found PR #" (:number pr)])
          (:number pr))
      (throw (ex-info
               (str "No PR found for " (u/head-ref-name source-branch target-branch))
               {:source-branch source-branch
                :target-branch target-branch
                :babashka/exit 1})))))

(defn- find-pr-view [source-branch target-branch]
  (let [pr-num (-> (p/sh "gh" "pr" "view" (u/head-ref-name source-branch target-branch)
                         "--json" "number"
                         "--jq" ".number")
                   :out
                   str/trim)]
    (when pr-num (parse-long pr-num))))

(defn- resolve-conflicts
  "Resolve conflicts by auto-merging changes in artifact directories based on merge-strategy.
   If merge-strategy is :ours, prefer changes from the PR branch.
   If merge-strategy is :theirs, prefer changes from the target branch."
  [artifact-dirs merge-strategy]
  (let [conflicted-files (->> (p/shell {:out :string :continue true}
                                       "git" "diff" "--name-only" "--diff-filter=U")
                              :out
                              str/trim
                              str/split-lines
                              (remove str/blank?))
        strat (case merge-strategy
                :ours "--ours"
                :theirs "--theirs")]
    (if (empty? conflicted-files)
      (ice/p [:green "No conflicts to resolve"])
      (do
        (ice/p [:blue "Conflicted files: " (str/join ", " conflicted-files)])
        (ice/p [:blue "Artifact directories: " (str/join ", " artifact-dirs)])
        (doseq [dir artifact-dirs]
          (let [files-in-dir (filter #(str/starts-with? % dir) conflicted-files)]
            (when (seq files-in-dir)
              (ice/p [:yellow "Resolving conflicts in directory: " dir])
              (doseq [file files-in-dir]
                (ice/p [:yellow "Resolving file: " file])
                (:out (p/sh "git" "checkout" strat file))
                (ice/p [:yellow "  - git checkout " strat " " file])
                (:out (p/sh "git" "add" file))
                (ice/p [:yellow "  - git add " file])))))))))

(defn- update-and-merge-pr [source-branch target-branch pr-number merge-strategy]
  (let [head-ref-name (u/head-ref-name source-branch target-branch)]


    (ice/p [:blue "Updating PR branch..."])
    (ice/p [:blue "Attempting merge with origin/master..."])
    (let [merge-result (p/sh {:continue true} "git" "merge" "origin/master")]
      (when-not (zero? (:exit merge-result))
        (ice/p [:red "✗ Merge failed: " (:err merge-result)])
        (let [winner (if (= merge-strategy :ours) "PR" "master")]
          (ice/p [:yellow "Attempting to resolve conflicts with git, preferring changes from " winner "..."])
          (resolve-conflicts (u/->artifact-dirs target-branch) merge-strategy)
          ;; Do the commit, now that we've resolved conflicts
          (pr-str (p/sh "git" "commit" "--no-edit" "-m"
                        (str "Merge " target-branch " for PR #(" pr-number ")"
                             ", preferring changes from " winner)))))

      (ice/p [:blue "Pushing changes to PR branch..."])
      (ice/p "Result: " (pr-str (p/sh "git" "push" "origin" head-ref-name))))

    ;; Wait a bit for GitHub to process to avoid a race condition
    (Thread/sleep 5000)

    ;; Merge the PR
    (ice/p [:blue "Merging PR #" pr-number "..."])
    (let [merge-result (p/sh {:continue true}
                             "gh" "pr" "merge" (str pr-number)
                             "--squash" "--delete-branch"
                             "--repo" "metabase/docs.metabase.github.io")]
      (if (zero? (:exit merge-result))
        (ice/p [:green "✓ PR merged successfully!"])
        (ice/p [:red "✗ Merge failed: " [:bold (:err merge-result)]])))))

(defn- should-pr-win?
  "Determine if the current PR should win conflicts based on PR number comparison"
  [current-pr-number target-branch]
  (let [_ (p/sh "git" "fetch" "origin")
        latest-master-commit (-> (p/sh "git" "log" "--oneline" "-1" (str "origin/" target-branch))
                                 :out
                                 str/trim)
        ;; Extract PR number from commit message like "[auto] adding content to docs-rc-notes->master (#380)"
        master-pr-match (re-find #"#(\d+)" latest-master-commit)
        master-pr-number (when master-pr-match (parse-long (second master-pr-match)))]
    (ice/p latest-master-commit)
    (ice/p [:blue "Current PR: #" current-pr-number])
    (ice/p [:blue "Latest master commit: " latest-master-commit])
    (when master-pr-number
      (ice/p [:blue "Latest master PR: #" master-pr-number]))

    (cond
      (nil? master-pr-number)
      (do (ice/p [:yellow "No PR number found in master, defaulting to PR wins"])
          true)

      (>= current-pr-number master-pr-number)
      (do (ice/p [:green "Current PR #" current-pr-number " is newer than master PR #" master-pr-number " - PR wins"])
          true)

      :else
      (do (ice/p [:yellow "Current PR #" current-pr-number " is older than master PR #" master-pr-number " - master wins"])
          false))))

(defn- checkout-branch! [head-ref-name]
  ;; First, discard any local changes that would prevent checkout
  (ice/p [:yellow "Discarding local changes..."])
  (p/sh "git" "reset" "--hard" "HEAD")
  (p/sh "git" "clean" "-fd")

  ;; Try to checkout the branch
  (let [checkout-result (p/shell {:continue true} "git" "checkout" head-ref-name)]
    (when-not (zero? (:exit checkout-result))
      ;; Branch doesn't exist locally, create it from origin and force reset
      (ice/p [:yellow "Branch doesn't exist locally, creating from origin..."])
      (let [create-result (p/sh {:continue true} "git" "checkout" "-B" head-ref-name (str "origin/" head-ref-name))]
        (when-not (zero? (:exit create-result))
          (throw (ex-info (str "Failed to checkout or create branch " head-ref-name)
                          {:branch head-ref-name
                           :error (:err create-result)
                           :babashka/exit 1})))))

    ;; Force reset to match the remote branch exactly
    (ice/p [:yellow "Force resetting to match remote branch..."])
    (p/sh "git" "reset" "--hard" (str "origin/" head-ref-name))))

(defn -main [& args]
  (println "Merge opertaion running at: " (str (java.time.Instant/now)))
  (let [{:keys [source-branch target-branch]} (cli/parse-opts args cli-spec)
        [source-branch target-branch] (mapv str/trim [source-branch target-branch])
        head-ref-name (u/head-ref-name source-branch target-branch)]

    ;; Ensure we're working with the latest remote state
    (ice/p [:blue "Fetching latest from origin..."]) (p/sh "git" "fetch" "origin")
    (ice/p [:blue "Checking out branch: " head-ref-name]) (checkout-branch! head-ref-name)

    (let [current-branch (:out (p/sh "git" "branch" "--show-current"))
          _ (ice/p [:green "Currently on branch: " (str/trim current-branch)])
          pr-number-view (try (find-pr-view source-branch target-branch)
                              (catch Exception e
                                (ice/p [:red "Error finding pr-number via view: " (ex-message e)])))
          pr-number-list (try (find-pr-list source-branch target-branch)
                              (catch Exception e
                                (ice/p [:red "Error finding pr-number via list: " (ex-message e)])))
          pr-number (or pr-number-view pr-number-list)
          merge-strategy (if (should-pr-win? pr-number target-branch) :ours :theirs)]
      (ice/p [:green "Merging PR #" pr-number ": " (u/head-ref-name source-branch target-branch) " | with strategy: " [:blue merge-strategy]])
      (update-and-merge-pr source-branch target-branch pr-number merge-strategy))))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
