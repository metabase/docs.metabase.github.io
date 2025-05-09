#!/usr/bin/env bb
(ns update-or-create-pr
  (:require
   [clojure.string :as str]
   [cheshire.core :as json]
   [babashka.process :as p]
   [util :as u]))

(defn usage []
  (println "Usage: script/update_or_create_pr.clj branchname [--dry-run]")
  (System/exit 1))

(defn existing-pr?
  "Checks if a PR already exists for the given target branch name."
  [target-branch]
  (let [curl-data (p/shell {:out :string :continue true}
                           "gh" "pr" "list" "--repo" "metabase/docs.metabase.github.io" "--json" "title,number,state")
        _ (println "→ Curl data: " (pr-str curl-data))
        pr-data (-> curl-data :out (json/parse-string true))
        _ (println "→ PR data: " (pr-str pr-data))
        pr-info (some #(when (= target-branch (get % :title)) %) pr-data)]
    (println "→ PR info:" pr-info)
    pr-info))

(defn artifact-dirs [category release-num]
  (cond
    (= category :master) ["_docs" "_site/docs"]

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
  (let [source-branch (or (first args) (usage))
        [category release-num] (u/categorize-branchname source-branch)
        _ (println "→ Branch info: " [category release-num])
        dry-run? (contains? (set args) "--dry-run")
        target-branch (str "update-" source-branch)
        _ (println "Switching to target branch: " target-branch)
        _ (p/shell "git" "checkout" "-B" target-branch)
        _ (doseq [ad (artifact-dirs category release-num)]
            (println "Adding" ad "...")
            (p/shell "git" "add" ad))
        {:keys [exit]} (p/shell {:continue true} "git" "diff" "--cached" "--quiet")]

    (if (zero? exit)
      (println "→ No changes to commit.")
      (do
        (println "→ Changes detected, committing...")
        (p/shell "git" "commit" "-m" (str "[auto] adding content to " target-branch))
        (if dry-run?
          (do (println "Would run: " "git" "push" "--force" "origin" target-branch))
          (do (p/shell "git" "push" "--force" "origin" target-branch)
              (println "→ Branch updated successfully.")))))

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
          (if dry-run?
            (println "Would run: " (str/join " " args))
            (apply p/shell args)))))))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))

(defmacro the-env []
  (into {} (for [k (keys &env)]
             [(name k) k])))

(defmacro nocommit-repl []
  `(clojure.main/repl
     :init   (fn []
               (remove-ns '~'temp)
               (create-ns '~'temp)
               (doseq [[binding# value#] (the-env)]
                 (intern '~'temp (symbol binding#) value#)))
     :prompt (fn [] (printf "paused.%s=> " (peek (clojure.string/split (str *ns*) #"\."))))
     :eval (fn [f#] (binding [clojure.test/*test-out* *out*] (eval f#)))
     :read clojure.core.server/repl-read
     :print clojure.pprint/pprint))
