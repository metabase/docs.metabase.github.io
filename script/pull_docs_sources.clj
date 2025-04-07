(ns script.pull-docs-sources
  (:require [babashka.process :as p]
            [babashka.fs :as fs]))

(defn clean! [dir]
  (fs/delete-tree dir)
  (fs/create-dirs dir))

(defn transfer-docs-for-branch [branch destination]
  (let [dir (str "_docs/" destination)]
    (clean! dir)
    (println "Processing branch:" branch)

    (println "  shallow cloning...")
    (p/sh (str "git clone --depth 1 --branch " branch " --filter=blob:none --no-checkout https://github.com/metabase/metabase.git " dir))

    (println "  sparse checkout...")
    (p/sh (str "git sparse-checkout init --cone") {:dir dir})

    (println "  setting sparse checkout to docs...")
    (p/sh (str "git sparse-checkout set docs") {:dir dir})

    (println "  checking out branch...")
    (p/sh (str "git checkout " branch) {:dir dir})))


(defn -main [& args]
  (when-not (= 2 (count args))
    (println "Usage: bb -m script.pull-docs-sources <branch> <destination>")
    (System/exit 1))
  (let [[branch destination] args]
    (println "Branch:" branch)
    (clean! "_docs")
    (transfer-docs-for-branch branch destination)
    (println (:out (p/sh (str "pwd") {:dir "_docs"})))
    (println "done.")))

(when (= *file* (System/getProperty "babashka.file"))
  (prn *command-line-args*)
  (apply -main *command-line-args*))


(comment

  (transfer-docs-for-branch (first branches))

  )
