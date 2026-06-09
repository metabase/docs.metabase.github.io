(ns util
  (:require
   [babashka.cli :as cli]
   [babashka.fs :as fs]
   [babashka.process :as p]
   [clj-yaml.core :as yaml]
   [clojure.string :as str]
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

(defn show-usage-and-exit [cli-spec]
  (-> cli-spec
      (merge {:order (vec (keys (:spec cli-spec)))})
      cli/format-opts
      println)
  (throw (ex-info "" {:babashka/exit 1})))

(defn cli-error-fn [{:keys [spec type cause _msg option] :as data}]
  (when (= :org.babashka/cli type)
    (let [msg (case cause
                :require
                (format "Missing required argument: %s\n" option))]
      (pp data)
      (println msg)
      (show-usage-and-exit spec))))

(defn sh-w-gh-token [& cmd]
  (apply p/sh {:extra-env {"GH_TOKEN" ;; get gh token from ~/.zshrc
                           (or (System/getenv "GH_TOKEN")
                               (first (keep
                                        (fn [line]
                                          (when (str/starts-with? line "export GH_TOKEN=")
                                            (-> line
                                                (str/replace #"^export GH_TOKEN=" "")
                                                (str/replace #"'" ""))))
                                        (str/split-lines (slurp (str (fs/expand-home "~/.zshrc")))))))}}
         cmd))


(def artifacts-to-include ["_data/shared_chrome.json"
                           "_site/docs/all.html"
                           "_site/docs/sitemap.xml"
                           "_site/docs/llms.txt"
                           "_site/docs/llms-embedding-full.txt"
                           "_site/docs/llms-agent-api-full.txt"])

(defn ->artifacts
  "Returns a list of directories and files that are considered artifacts
   for the given category and release number."
  ([target-branch-name]
   (let [[category release-num] (categorize-branchname target-branch-name)]
     (->artifacts category release-num)))
  ([category release-num]
   (-> (cond
         (= category :master) ["_docs/master"
                               "_site/docs/master"]

         (= (config-docs-version) release-num)
         ["_docs/latest"
          "_site/docs/latest"
          (str "_docs/v0." release-num)
          (str "_site/docs/v0." release-num)]

         (= category :release) [(str "_docs/v0." release-num)
                                (str "_site/docs/v0." release-num)]
         :else [])
       (concat artifacts-to-include))))

(defn head-ref-name [source-branch target-branch]
  (str source-branch "->" target-branch))
