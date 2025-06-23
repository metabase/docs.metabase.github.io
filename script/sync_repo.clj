(ns sync-repo
  (:require
   [babashka.cli :as cli]
   [babashka.fs :as fs]
   [util :as u]))

(def ^:private cli-spec
  {:spec {:from-repo {:ref "<target-branch>"
                      :desc "The target branch of the triggering PR."
                      :require true}}
   :error-fn u/cli-error-fn})

(def ^:private control-dirs
  ["_data"
   "_includes"
   "_layouts"
   "_plugins"
   "_sass"
   "js"
   "learn"
   "redirects"])

(defn- -main [& args]
  (let [{:keys [from-repo] :as x} (cli/parse-opts args cli-spec)]
    (doseq [dir control-dirs]
      (let [source-dir (fs/file from-repo dir)
            target-dir dir]
        (when (fs/exists? source-dir)
          (println "Syncing" (str source-dir) "to" (str target-dir))
          (fs/copy source-dir target-dir {:replace-existing true}))))))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
