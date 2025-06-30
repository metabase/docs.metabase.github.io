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
                    :alias :r
                    :require true}
    :annotation {:ref "<annotation>"
                 :desc "The annotation to add to the PR."
                 :default "auto-build"}
    :pr-number {:ref "<pr-number>"
                :desc "The PR number to update, if it exists."
                :default nil}
    :update-dirs {:ref "<update-dirs>"
                  :desc "The directories to update in the PR, smart defaults based on the target branch."
                  :default []}}
   :error-fn u/cli-error-fn})

(defn existing-pr-by-source+target?
  "Checks if a PR already exists for the given target branch name."
  [source target]
  (let [raw-data (p/sh {:out :string
                        :continue true}
                       "gh" "pr" "list" "--repo" "metabase/docs.metabase.github.io" "--json" "title,number,state,baseRefName,headRefName")
        ;; _ (println "→ Curl data: " (pr-str curl-data))
        pr-data (-> raw-data :out (json/parse-string true))
        _ (println "→ PR data: " (pr-str pr-data))
        pr-info (first (filter #(= (:headRefName %) (str source "->" target))
                               pr-data))]
    (println "→ PR info:" pr-info)
    (:number pr-info)))

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

(defn- report-pr-body [source-branch target-branch artifact-dirs pr-number]
  (str/join "\n"
            [(str "`" source-branch "` -> `" target-branch "`")
             ""
             "## Updated Directories:"
             (str/join "\n" (map #(str "- `" % "`") artifact-dirs))
             ""
             (if pr-number
               (str "This PR was triggered by: [PR " pr-number "](https://github.com/metabase/metabase/pull/" pr-number ").")
               (str "Find the [Triggering PR](https://github.com/search?q=repo%3Ametabase%2Fmetabase%20" source-branch "&type=pullrequests)."))
             ""
             "> This PR will be merged when the PR that triggered this build is merged."]))

(defn -main
  "Main function to update or create a PR. "
  [& args]
  (let [{:keys [source-branch target-branch annotation pr-number update-dirs]
         :as   opts}       (cli/parse-opts args cli-spec)
        _                  (when (or (:help opts) (:h opts))
                             (u/pp ["recieved options:" opts])
                             (u/show-usage-and-exit cli-spec))

        [category
         release-num]      (u/categorize-branchname target-branch)
        _                  (do (println "→ Target Branch info: "
                                        (case category
                                          :master  "master"
                                          :release (str "Release version:" release-num)
                                          (throw (ex-info (str "Unpublishable branchname: " target-branch)
                                                          {:babashka/exit 1}))))
                               (println "→ Source Branch info: " source-branch))

        target-branch-name (str source-branch "->" target-branch)
        _                  (p/shell "git" "checkout" "-B" target-branch-name)

        update-dirs        (remove str/blank? (str/split update-dirs #","))
        _                  (u/pp ["update-dirs" update-dirs])

        artifact-dirs       (concat
                              update-dirs
                              (->artifact-dirs category release-num))
        _                   (doseq [ad artifact-dirs]
                              (println "Adding" ad "...")
                              (p/sh {:continue true} "git" "add" ad))
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
                        "--body" (report-pr-body source-branch target-branch artifact-dirs pr-number)
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
