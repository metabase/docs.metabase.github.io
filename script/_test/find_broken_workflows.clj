(ns -test.find-broken-workflows
  (:require
   [cheshire.core :as json]
   [clojure.string :as str]
   [clojure.pprint :as pp]
   [ice.core :as ice]
   [util :as u]))

(defn open-prs []
  (json/parse-string
    (:out (u/sh-w-gh-token "gh" "pr" "list"
                           "--state" "open"
                           "--json" "headRefName,url"))
    true))

(defn all-runs []
  (json/parse-string
    (:out (u/sh-w-gh-token "gh" "run" "list"
                           "--limit" "500"
                           "--workflow" "process_docs_changes.yml"
                           "--json" "conclusion,url,headBranch,headSha,name,workflowName,number,createdAt,displayTitle,status,displayTitle"))
    true))

(defn runs-for-head-ref-name [head-ref-name all-runs]
  (let [[from to] (str/split head-ref-name #"->")]
    (into []
          (filter
            (fn [{:keys [name]}]
              (and (str/includes? name from)
                   (str/includes? name to))))
          all-runs)))

(defn- ->epoch [time-str]
  (/ (.toEpochMilli (java.time.Instant/parse time-str)) 1000))

(defn -main []
  (let [_        (println "Finding open PRs with process_docs_changes.yml workflow ...")
        runs     (all-runs)
        _        (println "Found" (count runs) "runs for process_docs_changes.yml workflow")
        _        (println "Finding open PRs with process_docs_changes.yml workflow ...")
        open-prs (set (open-prs))]
    (println "Found" (count open-prs) "open PRs with process_docs_changes.yml workflow")
    (doseq [{head-ref-name :headRefName
             url           :url} open-prs
            :let                 [runz (runs-for-head-ref-name head-ref-name runs)]]
      (if (some (comp #{"failure"} :conclusion) runz)
        (do (println) (println) (println)
            (ice/p [:red "====== runs for: " head-ref-name " ======"])
            (pp/print-table
              (->>
                runz
                (map #(dissoc % :workflowName :displayTitle :number :status))
                (sort-by (comp ->epoch :createdAt)))))
        (ice/p [:green [:bold "OK "] url " | " head-ref-name])))))

(when (= *file* (System/getProperty "babashka.file"))
  (-main))
