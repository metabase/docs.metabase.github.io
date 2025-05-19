(ns util
  (:require [clojure.string :as str]
            [clj-yaml.core :as yaml]
            [puget.printer :as puget]))

(def release-regex #"release-x\.(\d+)\.x")

(defn- extract-release-num [release-branchname]
  (let [[_ num] (re-matches release-regex release-branchname)]
    (Integer/parseInt num)))

(defn config-docs-version
  "Get the latest docs version number from the _config.yml file."
  []
  (let [[_ version-num] (re-matches #"v0.(\d+)" (:docs_version (yaml/parse-string (slurp "_config.yml"))))]
    (Integer/parseInt version-num)))

(defn categorize-branchname [branchname]
  (cond
    (= branchname "master") [:master]
    (re-matches release-regex branchname) [:release (extract-release-num branchname)]
    (str/starts-with? branchname "docs-workflow-test-") [:test branchname]))

(comment
  (categorize-branchname "release-x.49.x")
  ;; => [:release 49]

  (categorize-branchname "master")
  ;; => [:master]

  (categorize-branchname "docs-workflow-test-123")
  ;; => [:test "docs-workflow-test-123"]

  (categorize-branchname "any-other-branch")
  ;; => nil

  )

(defmacro with-saved-branchname
  "Simple macro that saves current git branch, executes body,
   then restores the original branch and stashed changes."
  [& body]
  `(let [branch-name# (clojure.string/trim (:out (p/sh "git" "rev-parse" "--abbrev-ref" "HEAD")))]
     ;; Stash any changes
     (p/sh "git" "stash" "save" "Auto-stash from with-saved-branchname")

     (try
       ;; Execute body
       ~@body

       (finally
         ;; Switch back to original branch
         (p/sh "git" "checkout" branch-name#)

         ;; Pop any stashed changes
         (p/sh "git" "stash" "pop")))))

(defn pp [& xs]
  (doseq [x xs] (puget/cprint x)))

(defn pp-line [& xs]
  (doseq [x xs] (puget/cprint x {:width 10e20})))
