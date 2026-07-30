#!/usr/bin/env bb
(ns update-or-create-pr
  (:require
   [babashka.cli :as cli]
   [babashka.process :as p]
   [cheshire.core :as json]
   [clojure.string :as str]
   [util :as u]))

(def cli-spec
  {:spec
   {:versions {:ref "<versions>"
               :desc "Comma separated major versions included in this build, eg. \"63,62\"."
               :alias :v
               :require true}
    :annotation {:ref "<annotation>"
                 :desc "The annotation to add to the PR."
                 :default "auto-build"}
    :pr-number {:ref "<pr-number>"
                :desc "The PR number to update, if it exists."
                :default nil}
    :update-dirs {:ref "<update-dirs>"
                  :desc "The directories to update in the PR, smart defaults based on the versions."
                  :default ""}}
   :error-fn u/cli-error-fn})

(defn existing-pr-num-by-head
  "Checks if a PR already exists for the given head branch name."
  [head-ref]
  (let [raw-data (p/sh {:out :string
                        :continue true}
                       "gh" "pr" "list" "--repo" "metabase/docs.metabase.github.io" "--json" "title,number,state,baseRefName,headRefName")
        pr-data (-> raw-data :out (json/parse-string true))
        _ (println "→ PR data: " (pr-str pr-data))
        pr-info (first (filter #(= (:headRefName %) head-ref) pr-data))]
    (println "→ PR info:" pr-info)
    (:number pr-info)))

(defn- report-pr-body [versions artifact-dirs pr-number]
  (str/join "\n"
            [(str "Docs pulled from: "
                  (str/join ", " (map #(str "`release-x." % ".x`") versions)))
             ""
             "## Updated Directories:"
             (str/join "\n" (map #(str "- `" % "`") artifact-dirs))
             ""
             (when-not (str/blank? (str pr-number))
               (str "This PR was triggered by: [PR " pr-number "](https://github.com/metabase/metabase/pull/" pr-number ")."))
             ""
             "> This PR will be merged when the PR that triggered this build is merged."]))

(defn -main
  "Main function to update or create a PR. "
  [& args]
  (let [{:keys [versions annotation pr-number update-dirs]
         :as   opts}       (cli/parse-opts args cli-spec)
        _                  (when (or (:help opts) (:h opts))
                             (u/pp ["recieved options:" opts])
                             (u/show-usage-and-exit cli-spec))

        versions           (u/parse-versions versions)
        _                  (println "→ Versions in this build: " (str/join ", " versions))

        head-ref           (u/versions->head-ref-name versions)
        _                  (p/shell "git" "checkout" "-B" head-ref)

        update-dirs        (remove str/blank? (str/split update-dirs #","))
        _                  (u/pp ["update-dirs" update-dirs])

        artifact-dirs      (concat
                             update-dirs
                             (u/versions->artifacts versions))
        _                  (doseq [ad artifact-dirs]
                             (println "Adding" ad "...")
                             (p/sh {:continue true} "git" "add" ad))
        {diff-exit :exit}  (p/shell {:continue true} "git" "diff" "--cached" "--quiet")
        pr-title           (str "[" annotation "] docs update: "
                                (str/join ", " (map #(str "v0." %) versions)))]
    (if (zero? diff-exit)
      (println "→ No changes to commit.")
      (do
        (println "→ Changes detected, committing...")
        (p/shell "git" "commit" "-m" (str "[auto] adding content to " head-ref))
        (p/shell "git" "push" "--force" "origin" head-ref)
        (println (str "→ Branch '" head-ref "' updated successfully."))
        (println "→ Checking for existing PR...")

        (if-let [pr-info (existing-pr-num-by-head head-ref)]
          (println "✓ PR already exists: #" pr-info)
          (do
            (println "→ Creating new PR...")
            (let [args ["gh" "pr" "create"
                        "--repo" "metabase/docs.metabase.github.io"
                        "--title" pr-title
                        "--body" (report-pr-body versions artifact-dirs pr-number)
                        "--head" head-ref]]
              (println "running: " (str/join " " args))
              (apply p/shell {:continue true} args))))))
    (prn {:versions      versions
          :head-ref      head-ref
          :pr-title      pr-title
          :artifact-dirs artifact-dirs})))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
