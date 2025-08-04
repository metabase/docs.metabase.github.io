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
  (-> (p/sh "gh" "pr" "view" (u/head-ref-name source-branch target-branch)
            "--json" "number"
            "--jq" ".number")
      :out
      str/trim))

(defn- resolve-conflicts
  "Resolve conflicts by keeping PR changes in artifact directories"
  [target-branch]
  (let [conflicted-files (->> (p/shell {:out :string :continue true}
                                       "git" "diff" "--name-only" "--diff-filter=U")
                              :out
                              str/trim
                              str/split-lines
                              (remove str/blank?))]
    (if (empty? conflicted-files)
      (ice/p [:green "No conflicts to resolve"])
      (let [artifact-dirs (u/->artifact-dirs target-branch)]
        (ice/p [:blue "Conflicted files: " (str/join ", " conflicted-files)])
        (ice/p [:blue "Artifact directories: " (str/join ", " artifact-dirs)])
        (doseq [dir artifact-dirs]
          (let [files-in-dir (filter #(str/starts-with? % dir) conflicted-files)]
            (when (seq files-in-dir)
              (ice/p [:yellow "Resolving conflicts in directory: " dir])
              (doseq [file files-in-dir]
                (ice/p [:yellow "Resolving file: " file])
                (ice/p [:yellow "  - Checking out --ours: | " (:out (p/sh "git" "checkout" "--ours" file))])
                (ice/p [:yellow "  - Adding file:         | " (:out (p/sh "git" "add" file))])))))))))

(defn- update-and-merge-pr [source-branch target-branch pr-number]
  (let [head-ref-name (u/head-ref-name source-branch target-branch)]
    ;; Try API update first
    (ice/p [:blue "Updating PR branch..."])
    (let [update-result (p/shell {:continue true}
                                 "gh" "api" "--method" "PUT"
                                 (str "/repos/metabase/docs.metabase.github.io/pulls/" pr-number "/update-branch"))]
      (if (zero? (:exit update-result))
        (ice/p [:green "✓ API update successful"])
        (do
          ;; API failed, do git-based update
          (ice/p [:yellow "API update failed, using git..."])
          (p/sh "git" "fetch" "origin")
          (p/sh "git" "checkout" head-ref-name)

          (ice/p "Attempting merge with origin/master...")
          (let [merge-result (p/shell {:continue true} "git" "merge" "origin/master")]
            (when-not (zero? (:exit merge-result))
              (ice/p [:red "✗ Merge failed: " (:err merge-result)])
              (ice/p [:yellow "Attempting to resolve conflicts with git..."])
              (resolve-conflicts target-branch)
              (u/pp (p/sh "git" "commit" "--no-edit" "-m"
                          (str "Merge " target-branch " for PR #" pr-number))))

            (ice/p [:blue "Pushing changes to PR branch..."])
            (ice/p "Result: " (u/pp
                                (p/sh "git" "push" "origin" head-ref-name)))))))

    ;; Wait a bit for GitHub to process to avoid a race condition
    (Thread/sleep 5000)

    ;; Merge the PR
    (ice/p [:blue "Merging PR #" pr-number "..."])
    (let [merge-result (p/shell {:continue true}
                                "gh" "pr" "merge" (str pr-number)
                                "--squash" "--delete-branch"
                                "--repo" "metabase/docs.metabase.github.io")]
      (if (zero? (:exit merge-result))
        (ice/p [:green "✓ PR merged successfully!"])
        (ice/p [:red "✗ Merge failed: " [:bold (:err merge-result)]])))))

(defn -main [& args]
  (println "Merge opertaion running at: " (java.time.Instant/now))
  (let [{:keys [source-branch target-branch]} (cli/parse-opts args cli-spec)
        [source-branch target-branch] (mapv str/trim [source-branch target-branch])
        pr-number-view (try (find-pr-view source-branch target-branch)
                            (catch Exception e
                              (ice/p [:red "Error finding pr-number via view: " (ex-message e)])))
        pr-number-list (try (find-pr-list source-branch target-branch)
                            (catch Exception e
                              (ice/p [:red "Error finding pr-number via list: " (ex-message e)])))
        pr-number (or pr-number-view pr-number-list)]
    (ice/p [:green "Merging PR #" pr-number ": " (u/head-ref-name source-branch target-branch)])
    (update-and-merge-pr source-branch target-branch pr-number)))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
