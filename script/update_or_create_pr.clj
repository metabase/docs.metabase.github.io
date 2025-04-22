#!/usr/bin/env bb
(ns update-or-create-pr
  (:require [babashka.process :as p :refer [sh shell]]
            [babashka.fs :as fs]
            [cheshire.core :as json]))

(defn usage []
  (println "Usage: script/update_or_create_pr.clj branchname")
  (System/exit 1))

(def source-branch (first *command-line-args*))
(when-not source-branch (usage))

(def artifact-dirs ["_docs" "_site/docs"]) ;; Directories to copy

(doseq [ad artifact-dirs]
  (println "Adding" ad "...")
  (shell "git" "add" ad))

(let [{:keys [exit]} (shell
                       {:continue true}
                       "git" "diff" "--cached" "--quiet")]
  (if (zero? exit)
    (println "→ No changes to commit.")
    (do
      (println "→ Changes detected, committing...")
      (shell "git" "commit" "-m" target-branch)
      (shell "git" "push" "--force" "origin" target-branch)
      (println "→ Branch updated successfully."))))

(println "→ Checking for existing PR...")

(def pr-json
  (slurp
    (-> (str "https://api.github.com/repos/metabase/docs.metabase.github.io/pulls?head=metabase:" target-branch)
        (shell {:out :string :continue true}))))

(def existing-pr?
  (some #(when (= target-branch (% "title")) (% "number"))
        (json/parse-string pr-json)))

(if existing-pr?
  (println "✓ PR already exists: #" existing-pr)
  (do
    (println "→ Creating new PR...")
    (shell "gh" "pr" "create"
           "--repo" "metabase/docs.metabase.github.io"
           "--title" target-branch
           "--body" (str "updated: " (pr-str artifact-dirs))
           "--head" target-branch)))
