(ns sync-repo
  (:require
   [babashka.cli :as cli]
   [babashka.fs :as fs]
   [babashka.process :as p]
   [util :as u]))

(def ^:private cli-spec
  {:spec {:from-repo {:ref "<target-branch>"
                      :desc "The target branch of the triggering PR."}
          :delete {:ref "<boolean>"
                   :desc "Delete the control directories if they exist."
                   :default false}}
   :error-fn u/cli-error-fn})

(def ^:private control-dirs
  ["_data"
   "_examples"
   "_glossary"
   "_headers"
   "_help"
   "_includes"
   "_layouts"
   "_plugins"
   "_posts"
   "_sass"
   "css"
   "files"
   "images"
   "js"
   "learn"
   "redirects"])

;; Directories that should be merged (copy on top) instead of replaced.
;; This allows the docs repo to have additional files that marketing repo doesn't have.
(def ^:private merge-dirs
  #{"_plugins"})

(defn- sync-dirs [source-dir target-dir]
  (when (fs/exists? source-dir)
    (println "Syncing" (str source-dir) "to" (str target-dir))
    ;; Delete the target directory if it exists, so we get only the files from the source directory
    ;; This needed because we need to RESET the control directories, not merge them.
    ;;
    ;; Observed: a file in the target directory that is not in the source directory
    ;; which is not deleted was causing link conflicts.
    (fs/delete-tree target-dir)
    (fs/create-dirs target-dir)
    (fs/copy-tree (str source-dir "/.") target-dir {:replace-existing true})))

(defn- merge-sync-dirs
  "Sync directories by copying from source to target without deleting first.
   Then restore any docs-repo-specific files from git HEAD."
  [source-dir target-dir]
  (when (fs/exists? source-dir)
    (println "Merge-syncing" (str source-dir) "to" (str target-dir))
    ;; Copy from marketing repo (creates dir if needed, overwrites existing)
    (fs/create-dirs target-dir)
    (fs/copy-tree (str source-dir "/.") target-dir {:replace-existing true})
    ;; Restore docs repo files on top (preserves docs-repo-specific files)
    (p/shell {:continue true} "git" "checkout" "HEAD" "--" (str target-dir))))

(defn- -main [& args]
  (let [{:keys [from-repo delete]} (cli/parse-opts args cli-spec)]
    (when (and (not (true? delete))
               (not from-repo))
      (throw (ex-info "You must pass either --delete or --from-repo <repo>" {:babashka/exit 1})))
    (doseq [control-dir control-dirs]
      (if delete
        (do
          (println "Restoring and cleaning" (str control-dir))
          (p/shell {:continue true} "git" "restore" (str control-dir "/"))
          (p/shell {:continue true} "git" "clean" "-fd" (str control-dir "/")))
        (if (merge-dirs control-dir)
          (merge-sync-dirs (fs/file from-repo control-dir) control-dir)
          (sync-dirs (fs/file from-repo control-dir) control-dir))))))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
