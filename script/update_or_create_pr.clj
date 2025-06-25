#!/usr/bin/env bb
(ns update-or-create-pr
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
                    :alias :r}
    :annotation {:ref "<annotation>"
                 :desc "The annotation to add to the PR."
                 :default "auto-build"}}
   :error-fn u/cli-error-fn})

(defn existing-pr-by-source+target?
  "Checks if a PR already exists for the given target branch name."
  [source target]
  (let [raw-data (p/sh {:out :string
                        :continue true
                        :extra-env {"GH_TOKEN" "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"}}
                       "gh" "pr" "list" "--repo" "metabase/docs.metabase.github.io" "--json" "title,number,state,baseRefName,headRefName")
        ;; _ (println "→ Curl data: " (pr-str curl-data))
        pr-data (-> raw-data :out (json/parse-string true))
        _ (println "→ PR data: " (pr-str pr-data))
        pr-info (first (filter #(= (:headRefName %) (str source "->" target))
                               pr-data))]
    (println "→ PR info:" pr-info)
    (:number pr-info)))

(defn- report-pr-body [source-branch target-branch artifact-dirs]
  (str/join "\n"
            [(str "`" source-branch "` -> `" target-branch "`")
             ""
             "## Updated Directories:"
             (str/join "\n" (map #(str "- `" % "`") artifact-dirs))
             ""
             (str "Find the [Triggering PR](https://github.com/metabase/metabase/pulls?q=sort%3Aupdated-desc+is%3Apr+is%3Aopen+" source-branch ").")
             ""
             "> This PR will be merged when the PR that triggered this build is merged."]))

(def artifact-dirs
  ["_docs" "_site"])

(defn -main
  "Main function to update or create a PR. "
  [& args]
  (let [{:keys [source-branch target-branch annotation]
         :as   opts}     (cli/parse-opts args cli-spec)
        _                   (when (or (:help opts) (:h opts))
                              (u/show-usage-and-exit cli-spec))
        [category
         release-num]       (u/categorize-branchname target-branch)
        _                   (do (println "→ Target Branch info: "
                                         (case category
                                           :master  "master"
                                           :release (str "Release version:" release-num)
                                           (throw (ex-info (str "Unpublishable branchname: " target-branch)
                                                           {:babashka/exit 1}))))
                                (println "→ Source Branch info: " source-branch))
        target-branch-name  (str source-branch "->" target-branch)
        _                   (p/shell "git" "checkout" "-B" target-branch-name)
        _                   (doseq [ad artifact-dirs]
                              (println "Adding" ad "...")
                              (p/shell "git" "add" ad))
        {diff-exit :exit}   (p/shell {:continue true} "git" "diff" "--cached" "--quiet")
        target-branch-title (str "[" annotation "] " source-branch " -> " target-branch)]
    (if (zero? diff-exit)
      (println "→ No changes to commit.")
      (do
        (println "→ Changes detected, committing...")
        (p/shell "git" "commit" "-m" (str "[auto] adding content to " target-branch-name))
        (p/shell "git" "push" "--force" "origin" target-branch-name)
        (println (str "→ Target Branch '" target-branch-name "' updated successfully."))
        (println "→ Checking for existing PR...")

        (if-let [pr-info (existing-pr-by-source+target? source-branch target-branch)]
          (println "✓ PR already exists: #" pr-info)
          (do
            (println "→ Creating new PR...")
            (let [args ["gh" "pr" "create"
                        "--repo" "metabase/docs.metabase.github.io"
                        "--title" target-branch-title
                        "--body" (report-pr-body source-branch target-branch artifact-dirs)
                        "--head" target-branch-name]]
              (println "running: " (str/join " " args))
              (apply p/shell {:continue true} args))))))
    (prn {:category            category
          :release             release-num
          :source-branch       source-branch
          :target-branch       target-branch
          :target-branch-title target-branch-title
          :artifact-dirs       artifact-dirs})))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
