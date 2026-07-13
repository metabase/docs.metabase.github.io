(ns local-dev
  (:require
   [-test.all :as -test]
   [babashka.cli :as cli]
   [babashka.fs :as fs]
   [babashka.process :as p]
   [check-incoming-branchname]
   [cleanup-cloud-docs]
   [clojure.string :as str]
   [ice.core :as ice]
   [sync-repo]
   [update-docs-for-branchname]
   [util :as u]))

(set! *warn-on-reflection* true)

(require '[babashka.pods :as pods])
(pods/load-pod 'org.babashka/fswatcher "0.0.5")

(require '[pod.babashka.fswatcher :as fw])

(def ^:private cli-spec
  {:spec {:marketing-repo {:ref "<dir>"
                           :desc "The directory"
                           :alias :d
                           :require true}
          :target-branch {:ref "<target-branch>"
                          :desc "The target branch of the triggering PR."
                          :alias :t
                          :default "master"
                          :require false}
          :source-branch {:ref "<source-branch>"
                          :desc "The source branch of the triggering PR."
                          :alias :r
                          :default "master"
                          :require false}
          :run-checks {:ref "<boolean>"
                       :desc "If set, will run the checks for the source branch."
                       :default false
                       :coerce :boolean}
          :build-only {:ref "<boolean>"
                       :desc "If set, will only build the site without running checks."
                       :default false
                       :coerce :boolean}}
   :error-fn u/cli-error-fn})

(defn report [& args]
  (let [line [:blue (apply str (-> args ice/p-str ice/strip-color
                                   str/join count (+ 13) (repeat "=")))]]
    (ice/p "\n\n" line)
    (apply ice/p [:blue "|"] [:magenta "BUILD REPORT: "] args)
    (ice/p line)))

(defn repo-copier-watch-fn [marketing-repo]
  (fn [{:keys [type path]}]
    (println "Repo copier fn called with type:" type "and path:" path)
    (sync-repo/sync! {:delete true})
    (sync-repo/sync! {:delete false :from-repo marketing-repo})))

(defn -main [& args]
  (let [{:keys [marketing-repo
                target-branch
                source-branch
                run-checks
                build-only] :as opts}
        (try
          (cli/parse-opts args cli-spec)
          (catch Exception e
            (println e)
            (println "Usage: script/local_dev.clj --marketing-repo <dir>")
            (System/exit 1)))]
    (prn ["OPTS" opts])
    (when (not (fs/exists? marketing-repo))
      (throw
        (ex-info "You must pass --marketing-repo and it must exist"
                 {:babashka/exit 1})))
    (println "Running local dev setup for" source-branch "on" target-branch)
    (println "Marketing repo located at: " marketing-repo)
    (prn (-test/-main))

    (report [:blue "Checking branchname: " [:green target-branch]])
    (check-incoming-branchname/check target-branch)

    (report [:blue "Updating docs for branch: " [:green target-branch]
            " from source branch: " [:green source-branch]])
    (update-docs-for-branchname/update! source-branch target-branch)

    (report [:blue "Cleaning up cloud docs..."])
    (cleanup-cloud-docs/-main)

    (let [_watcher (if build-only
                     (do
                       (report [:blue "Syncing control directories from marketing repo: " [:green marketing-repo]])
                       (sync-repo/sync! {:delete false :from-repo marketing-repo}))
                     (do (report [:blue "Starting repo sync watcher for dir:" [:green marketing-repo]])
                         (fw/watch marketing-repo
                                   (repo-copier-watch-fn marketing-repo)
                                   {:recursive true})))]

      (if run-checks
        (do
          (p/sh "bun lint-markdown")
          (p/sh "bun lint-styles")
          (p/sh "bun lint-scripts")
          (p/sh "bun lint-links"))
        (report [:blue "Skipping checks for source branch:" [:green source-branch]]))
      (fs/delete-tree "_site")

      (if build-only
        (do
          (report [:green "Building Jekyll site..."])
          (p/sh "bundle exec jekyll build")
          (report [:green "Done building Jekyll site."])
          (System/exit 0))
        (do
          (report [:green "Building and serving Jekyll site..."])
          (p/sh "bundle exec jekyll serve")
          (deref (promise)))))))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
