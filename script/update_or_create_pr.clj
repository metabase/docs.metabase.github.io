#!/usr/bin/env bb
(ns update-or-create-pr
  (:require
   [clojure.string :as str]
   [cheshire.core :as json]
   [babashka.process :as p]
   [bling.core :as b]
   [util :as u]))

(defn usage []
  (println "Usage: script/update_or_create_pr.clj branchname [--dry-run]")
  (System/exit 1))

(defn existing-pr?
  "Checks if a PR already exists for the given target branch name."
  [target-branch]
  (let [curl-data (p/shell {:out :string :continue true}
                           "gh" "pr" "list" "--repo" "metabase/docs.metabase.github.io" "--json" "title,number,state")
        ;; _ (println "→ Curl data: " (pr-str curl-data))
        pr-data (-> curl-data :out (json/parse-string true))
        _ (println "→ PR data: " (pr-str pr-data))
        pr-info (some #(when (= target-branch (get % :title)) %) pr-data)]
    (println "→ PR info:" pr-info)
    pr-info))

(defn ->artifact-dirs [category release-num]
  (cond
    (= category :master) ["_docs/master"
                          "_site/docs/master"]

    (= (u/config-docs-version) release-num)
    ["_docs/latest"
     "_site/docs/latest"
     (str "_docs/v0." release-num)
     (str "_site/docs/v0." release-num)]

    (= category :release) [(str "_docs/v0." release-num)
                           (str "_site/docs/v0." release-num)]
    :else []))

(defn -main
  "Main function to update or create a PR.

  Usage: script/update_or_create_pr.clj branchname [--dry-run]"
  [& args]
  (u/with-saved-branchname
    (let [source-branch (or (first args) (usage))
          [category release-num] (u/categorize-branchname source-branch)
          _ (println "→ Branch info: " (case category :master "master"
                                             :release (str "Release version:" release-num)
                                             "test branch"))
          dry-run? (contains? (set args) "--dry-run")
          dr-notify (if dry-run? (b/bling [:yellow "dry-run: "]) "")
          target-branch (str "update-" source-branch)
          _ (p/shell "git" "checkout" "-B" target-branch)
          artifact-dirs (->artifact-dirs category release-num)
          _ (doseq [ad artifact-dirs]
              (println dr-notify "Adding" ad "...")
              (p/shell "git" "add" ad))
          {:keys [exit]} (p/shell {:continue true} "git" "diff" "--cached" "--quiet")]

      (if (zero? exit)
        (println "→ No changes to commit.")
        (do
          (println "→ Changes detected, committing...")
          (p/shell "git" "commit" "-m" (str "[auto] adding content to " target-branch))
          (println dr-notify "git" "push" "--force" "origin" target-branch)
          (when-not dry-run? (p/shell "git" "push" "--force" "origin" target-branch))
          (println dr-notify "→ Branch updated successfully.")

          (println "→ Checking for existing PR...")

          (if-let [pr-info (existing-pr? target-branch)]
            (println "✓ PR already exists: #" pr-info)
            (do
              (println "→ Creating new PR...")
              (let [args ["gh" "pr" "create"
                          "--repo" "metabase/docs.metabase.github.io"
                          "--title" target-branch
                          "--body" (str "updated: " (pr-str artifact-dirs))
                          "--head" target-branch]]
                (println dr-notify "git" "push" "--force" "origin" target-branch)
                (when-not dry-run? (p/shell "git" "push" "--force" "origin" target-branch)
                          (println "→ Branch updated successfully."))

                (println "→ Checking for existing PR...")

                (if-let [pr-info (existing-pr? target-branch)]
                  (println "✓ PR already exists: #" pr-info)
                  (do
                    (println "→ Creating new PR...")
                    (let [args ["gh" "pr" "create"
                                "--repo" "metabase/docs.metabase.github.io"
                                "--title" target-branch
                                "--body" (str "updated: " (pr-str artifact-dirs))
                                "--head" target-branch]]
                      (println dr-notify "running: " (str/join " " args))
                      (when-not dry-run? (apply p/shell args))))))))))
      (when dry-run?
        (println
          (pr-str {:category category
                   :release release-num
                   :source-branch source-branch
                   :target-branch target-branch
                   :artifact-dirs artifact-dirs}))))))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
