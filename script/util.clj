(ns util
  (:require [clj-yaml.core :as yaml]
            [puget.printer :as puget]))

(def release-regex #"release-x\.(\d+)\.x")

(defn- extract-release-num [release-branchname]
  (let [[_ num] (re-matches release-regex release-branchname)]
    (parse-long num)))

(defn config-docs-version
  "Get the latest docs version number from the _config.yml file."
  []
  (let [[_ version-num] (re-matches #"v0.(\d+)" (:docs_version (yaml/parse-string (slurp "_config.yml"))))]
    (parse-long version-num)))

(defn categorize-branchname [branchname]
  (cond
    (= branchname "master") [:master]
    (re-matches release-regex branchname) [:release (extract-release-num branchname)]
    :else []))

(defn pp
  "Pretty print values."
  [& xs]
  (doseq [x xs] (puget/cprint x)))

(defn pp-line
  "Pretty print values on a single line."
  [& xs]
  (doseq [x xs] (puget/cprint x {:width 10e20})))
