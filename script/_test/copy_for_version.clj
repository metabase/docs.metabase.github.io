(ns -test.scratch
  (:require
   [babashka.fs :as fs]
   [babashka.process :as p]
   [clojure.string :as str]
   [ice.core :as ice]))

(defn sh [& cmd]
  (let [cmd (str/join cmd)]
    (ice/p [:cyan "Running command: " [:underline (str/join cmd)]])
    (str/trim (:out (p/shell {:out :string} cmd)))))

(defn copy-docs-and-push [version]
  [(sh "git checkout master")
   (sh "git reset origin/master --hard")
   (fs/copy-tree (str "../metabase.github.io/_site/docs/" version) (str "_site/docs/" version) {:replace-existing true})
   (fs/copy-tree (str "../metabase.github.io/_docs/" version) (str "_docs/" version) {:replace-existing true})
   (try (sh "git branch -D move-docs-for-version-" version)
        (catch Exception e "Branch already deleted, continuing..."))
   (sh "git checkout -b move-docs-for-version-" version)
   (sh "git add _site/docs/" version)
   (sh "git add _docs/" version)
   (sh "git commit -m \"Copy docs for version " version "\"")
   (sh "git push origin move-docs-for-version-" version " --force")
   (try (sh "gh pr create --title move-docs-for-version-" version " --body ''" )
        (catch Exception e "PR already created, continuing...")) ])

(def versions (conj
                (map #(str "v0." %) (range 12 39))
                "latest"
                #_"master"))

(defn -main [& args]
  (doseq [version args]
   (ice/p [:magenta "\n\n\nCopying docs for version: " [:underline version] " ..."])
    (doseq [o (copy-docs-and-push version)]
      (ice/p [:green o]))))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
