(ns -test.find-broken-workflows
  (:require
   [babashka.process :as p]
   [babashka.fs :as fs]
   [cheshire.core :as json]
   [clojure.string :as str]
   [util :as u]))

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

(defn open-prs []
  (map :headRefName
       (json/parse-string
         (:out (sh-w-gh-token "gh" "pr" "list"
                              "--state" "open"
                              "--json" "headRefName"))
         true)))

(defn all-runs []
  (json/parse-string
    (:out (sh-w-gh-token "gh" "run" "list"
                         "--limit" "500"
                         "--workflow" "process_docs_changes.yml"
                         "--json" "conclusion,url,headBranch,headSha,name,workflowName,number,createdAt,displayTitle,status,displayTitle"))
    true))

(defn runs-for-head-ref-name [head-ref-name all-runs]
  (let [[from to](str/split head-ref-name #"->")]
    (into []
          (filter
            (fn [{:keys [name]}]
              (and (str/includes? name from)
                   (str/includes? name to))))
          all-runs)))

(defn ->epoch [time-str]
    (/ (.toEpochMilli (java.time.Instant/parse "2025-06-27T19:28:37Z")) 1000))

(defn -main []
  (let [_ (println "Finding open PRs with process_docs_changes.yml workflow ...")
        runs (all-runs)
        _ (println "Found" (count runs) "runs for process_docs_changes.yml workflow")
        _ (println "Finding open PRs with process_docs_changes.yml workflow ...")
        open-prs (set (open-prs))]
    (println "Found" (count open-prs) "open PRs with process_docs_changes.yml workflow")
    (doseq [opr open-prs
            :let [runz (runs-for-head-ref-name opr runs)]]
      (if (contains? (set (map :conclusion runz)) "failure")
        (do
          (dotimes [_ 3 ] (println))
          (println (str "====== runs for: " opr " ======"))
          (u/pp (sort-by (comp ->epoch :createdAt) runz)))
        (println "No failures for" opr)))))

(when (= *file* (System/getProperty "babashka.file"))
  (-main))
