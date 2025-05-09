#!/usr/bin/env bb
(ns update-or-create-pr
  (:require [babashka.process :as p]
            [cheshire.core :as json]))

(defn usage []
  (println "Usage: script/update_or_create_pr.clj branchname")
  (System/exit 1))

(def artifact-dirs ["_docs" "_site/docs"]) ;; Directories to copy



(defn existing-pr? [target-branch]
  (let [curl-data (p/shell {:out :string :continue true}
                           "curl"
                           (str "https://api.github.com/repos/metabase/docs.metabase.github.io/pulls?head=metabase:"
                                "update-" target-branch))
        _ (println "→ Curl data: " (pr-str curl-data))
        pr-data (-> curl-data :out json/parse-string)
        _ (println "→ PR data: " (pr-str pr-data))
        pr-num (some #(when (= target-branch (get % "title"))
                        (get % "number"))
                     pr-data)]
    (println "→ PR number:" pr-num)
    (boolean pr-num)))

(defn -main [& args]
  (let [source-branch (or (first args) (usage))
        target-branch (str "update-" source-branch)
        _ (println "Swithcing to target branch.")
        _ (p/shell "git" "checkout" "-B" target-branch)
        _ (doseq [ad artifact-dirs]
            (println "Adding" ad "...")
            (p/shell "git" "add" ad))
        {:keys [exit]} (p/shell {:continue true} "git" "diff" "--cached" "--quiet")]

    (if (zero? exit)
      (println "→ No changes to commit.")
      (do
        (println "→ Changes detected, committing...")
        (p/shell "git" "commit" "-m" (str "[auto] adding content to " target-branch))
        (p/shell "git" "push" "--force" "origin" target-branch)
        (println "→ Branch updated successfully.")))

    (println "→ Checking for existing PR...")

    (if (existing-pr? target-branch)
      (println "✓ PR already exists: #" existing-pr?)
      (do
        (println "→ Creating new PR...")
        (p/shell "gh" "pr" "create"
                 "--repo" "metabase/docs.metabase.github.io"
                 "--title" target-branch
                 "--body" (str "updated: " (pr-str artifact-dirs))
                 "--head" target-branch)))))

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
