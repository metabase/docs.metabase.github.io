(ns -test.remove-identical-files
  (:require
   [babashka.fs :as fs]
   [clojure.string :as str]
   [ice.core :as ice]
   [util :as u]))

(defn file-eq? [f1 f2]
  (= (slurp f1) (slurp f2)))

(def ignores
  ["_docs"
   "_site"
   "node_modules"
   "script"])

(defn ignored [f]
  (let [str-f (str f)]
    (or
      (fs/directory? f)
      (loop [ignore ignores]
        (if (empty? ignore)
          false
          (if (or (str/starts-with? str-f (first ignore))
                  (str/starts-with? str-f (str "../metabase.github.io/" (first ignore))))
            true
            (recur (rest ignore))))))))

(defn files-at-path [path]
  (map str (remove ignored (fs/glob path "**"))))

(defn -main [& args]
  (let [my-files (sort (files-at-path "."))
        their-file-set (set (map
                              #(str/replace % #"../metabase.github.io/" "")
                              (files-at-path "../metabase.github.io/")))
        dupes (filter
                (fn [mf] (and (contains? their-file-set mf)
                              (file-eq? mf (str "../metabase.github.io/" mf))
                              (do (println "dupe:" mf) true)))
                my-files)]
    (u/pp (sort dupes))
    (u/pp-line {:docs-file-count (count my-files)
                :marketing-file-count (count their-file-set)
                :dupe-count (count dupes)})))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
