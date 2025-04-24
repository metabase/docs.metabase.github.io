(ns util
  (:require [clojure.string :as str]))

(def release-regex #"release-x\.(\d+)\.x")

(defn- extract-release-num [release-branchname]
  (let [[_ num] (re-matches release-regex release-branchname)]
    (Integer/parseInt num)))

(defn categorize-branchname [branchname]
  (cond
    (= branchname "master") [:master]
    (re-matches release-regex branchname) [:release (extract-release-num branchname)]
    (or
      (= branchname "doc-update-detection")
      (str/starts-with? branchname "docs-workflow-test-")) [:test branchname]))
