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
    :dry-run {:desc "If set, will not execute the command, just print it out."
              :coerce :boolean}}
   :error-fn                           ; a function to handle errors
   (fn [{:keys [_spec type cause _msg option] :as data}]
     (when (= :org.babashka/cli type)
       (let [msg (case cause
                   :require
                   (format "Missing required argument: %s\n" option))]
         (u/pp data)
         (throw (ex-info msg {:babashka/exit 1})))))})

(defn- show-usage-and-exit []
  (-> cli-spec
      (merge {:order (vec (keys (:spec cli-spec)))})
      cli/format-opts
      println)
  (throw (ex-info "Usage information printed." {:babashka/exit 1})))

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


(defn- report-pr-body [source-branch target-branch artifact-dirs]
  (str/join "\n"
            [(str "# `" source-branch "` -> `" target-branch "`")
             ""
             "## Updated Directories:"
             (str/join "\n" (map #(str "- `" % "`") artifact-dirs))
             ""
             "> This PR will be merged when the PR that triggered this build is merged."
             ""
             "---"]))

(defn -main
  "Main function to update or create a PR.

  Usage: script/update_or_create_pr.clj branchname [--dry-run]"
  [& args]
  (let [{:keys    [source-branch target-branch]
         dry-run? :dry-run
         :as      opts}     (cli/parse-opts args cli-spec)
        _                   (when (or (:help opts) (:h opts)) (show-usage-and-exit))
        [category
         release-num]       (u/categorize-branchname target-branch)
        _                   (do (println "→ Target Branch info: "
                                         (case category
                                           :master  "master"
                                           :release (str "Release version:" release-num)
                                           (throw (ex-info (str "Unpublishable branchname: " target-branch)
                                                           {:babashka/exit 1}))))
                                (println "→ Source Branch info: " source-branch))
        println-dr          (fn [& args] (println (if dry-run? (ice/p-str [:yellow "dry-run: "]) "")
                                                  (str/join " " args)))
        target-branch (str source-branch "->" target-branch)
        _                   (p/shell "git" "checkout" "-B" target-branch)
        artifact-dirs       (->artifact-dirs category release-num)
        _                   (doseq [ad artifact-dirs]
                              (println-dr "Adding" ad "...")
                              (p/shell "git" "add" ad))
        {:keys [exit]}      (p/shell {:continue true} "git" "diff" "--cached" "--quiet")
        target-branch-title (str "[auto-build] " source-branch " -> " target-branch)]

    (if (zero? exit)
      (println "→ No changes to commit.")
      (do
        (println "→ Changes detected, committing...")
        (p/shell "git" "commit" "-m" (str "[auto] adding content to " target-branch))
        (println-dr "git" "push" "--force" "origin" target-branch)
        (when-not dry-run?
          (p/shell "git" "push" "--force" "origin" target-branch))
        (println-dr "→ Target Branch updated successfully.")
        (println "→ Checking for existing PR...")

        (if-let [pr-info (existing-pr? target-branch)]
          (println "✓ PR already exists: #" pr-info)
          (do
            (println "→ Creating new PR...")
            (let [args (remove nil?
                               ["gh" "pr" "create" (when dry-run? "--dry-run")
                                "--repo" "metabase/docs.metabase.github.io"
                                "--title" target-branch-title
                                "--body" (report-pr-body source-branch target-branch-title artifact-dirs)
                                "--head" target-branch])]
              (println-dr "running: " (str/join " " args))
              (apply p/shell args))))))
    (prn {:category      category
          :release       release-num
          :source-branch source-branch
          :target-branch target-branch
          :target-branch-title target-branch-title
          :artifact-dirs artifact-dirs})))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
