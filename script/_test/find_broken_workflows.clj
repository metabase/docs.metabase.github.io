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
  ;; Head refs from before the multi-version build look like "<source>-><target>";
  ;; newer ones ("docs-update-v63-v62") have no arrow, so match on whichever parts we get.
  (let [parts (remove str/blank? (str/split head-ref-name #"->"))]
    (into []
          (filter
            (fn [{:keys [name]}]
              (every? #(str/includes? (str name) %) parts)))
          all-runs)))

(defn- ->epoch [time-str]
  (/ (.toEpochMilli (java.time.Instant/parse time-str)) 1000))

(defn- print-runs-report [head-ref-name runs-for-ref url]
  (if (some (comp #{"failure"} :conclusion) runs-for-ref)
    (do (println)
        (ice/p [:red "====== runs for: " head-ref-name " ======"])
        (pp/print-table
          (->>
            runs-for-ref
            (map #(dissoc % :workflowName :displayTitle :number :status))
            (sort-by (comp - ->epoch :createdAt)))))
    (ice/p [:green [:bold "OK "] url " | " head-ref-name])))

(defn- gather-runs-for-open-prs [open-prs runs]
  (for [{head-ref-name :headRefName
         url           :url} open-prs
        :let                 [local-runs (runs-for-head-ref-name head-ref-name runs)]]
    [head-ref-name local-runs]))

(defn -main []
  (let [_        (println "Finding open PRs with process_docs_changes.yml workflow ...")
        runs     (all-runs)
        _        (println "Found" (count runs) "runs for process_docs_changes.yml workflow")
        _        (println "Finding open PRs with process_docs_changes.yml workflow ...")
        open-prs (set (open-prs))
        _ (println "Found" (count open-prs) "open PRs with process_docs_changes.yml workflow")
        local-runs (gather-runs-for-open-prs open-prs runs)
        sorted-runs (sort-by
                      (fn [[_k vs]]
                        (count (filter #{"failure"} (map :conclusion vs))))
                      local-runs)]
    (doseq [[head-ref-name runs-for-ref] sorted-runs]
      (print-runs-report head-ref-name runs-for-ref (:url (first runs-for-ref))))))

(when (= *file* (System/getProperty "babashka.file"))
  (-main))

(comment

  (def runz (all-runs))

  (count runz)

  (def open-prz (open-prs))

  (update-vals (into {} (gather-runs-for-open-prs open-prz runz)) #(take 2 %))

  )
