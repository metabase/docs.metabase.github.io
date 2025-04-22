#!/usr/bin/env bb
(ns update-or-create-branch
  (:require [babashka.process :as p :refer [sh shell]]
            [babashka.fs :as fs]
            [cheshire.core :as json]))

(defn usage []
  (println "Usage: script/update_or_create_branch.clj branchname [--skip-clone]")
  (System/exit 1))

(def source-branch (first *command-line-args*))
(when-not source-branch (usage))
(def artifact-dirs ["_docs" "_site/docs"]) ;; Directories to copy

(def temp-dir "temp_dir") ;; Temporary directory for cloning
(def repo-coords (str "https://github.com/metabase/docs.metabase.github.io.git"))

(when-not (contains? (set *command-line-args*) "--skip-clone")
  (println "→ Cloning" repo-coords "repo...")
  (fs/delete-tree temp-dir)
  (println "Cloning repo...")
  (shell "git" "clone"
         "--depth" "1"
         "--branch" "master"
         (str "https://github.com/metabase/docs.metabase.github.io.git")
         temp-dir))

(doseq [ad artifact-dirs]
  (println "Copying" ad  "->" (str (fs/path temp-dir ad)) "...")
  (fs/copy-tree ad (fs/path temp-dir ad) {:replace-existing true}))

(def target-branch (str "update-" source-branch))

(prn ["target-branch" target-branch])

(println "→ Committing changes...")
(shell {:dir temp-dir} "git" "checkout" "-B" target-branch)
(shell {:dir temp-dir} "git" "config" "user.name" "Metabase Docs bot")
(shell {:dir temp-dir} "git" "config" "user.email" "metabase-bot@metabase.com")

(doseq [ad artifact-dirs]
  (println "Adding" ad "...")
  (shell {:dir temp-dir} "git" "add" ad))

(let [{:keys [exit]} (shell {:dir temp-dir
                             :continue true}
                            "git" "diff" "--cached" "--quiet")]
  (if (zero? exit)
    (println "→ No changes to commit.")
    (do
      (println "→ Changes detected, committing...")
      (shell {:dir temp-dir} "git" "commit" "-m" target-branch)
      (shell {:dir temp-dir} "git" "push" "--force" "origin" target-branch)
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
