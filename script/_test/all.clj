(ns -test.all
  (:require [clojure.test :as t :refer [deftest is testing]]
            [clojure.string :as str]
            [clj-yaml.core :as yaml]
            [update-docs-for-branchname :as udb]
            [babashka.process :as p]))

(t/use-fixtures :once
  (fn [f]
    (let [original-branch-name (str/trim (:out (p/shell {:out :string} "git rev-parse --abbrev-ref HEAD")))]
      (try
        (f)
        (finally
          (p/shell "git checkout" original-branch-name))))))

(def branches
  ["master" "release-x.49.x" "release-x.50.x" "docs-workflow-test-123" "any-other-branch"])

(def expected
  {"master" {:exit 0
             :update-docs-command "./script/docs master --set-version master"}
   "release-x.49.x" {:exit 0
                     :update-docs-command "./script/docs release-x.49.x --set-version v0.49"}
   "release-x.50.x" {:exit 0
                     :update-docs-command "./script/docs release-x.50.x --set-version v0.50"}
   "docs-workflow-test-123" {:exit 0
                             :update-docs-command "./script/docs docs-workflow-test-123 --set-version docs-workflow-test-123"}
   "any-other-branch" {:exit 1
                       :update-docs-command "Unpublishable branchname"}})

;; Check incoming branchname

(deftest branchname-filter-exit-code-test
  (doseq [branchname branches
          :let [expectation (get expected branchname)]]
    (let [{:keys [exit] :as result} (p/sh {:continue true}
                                          "bb" "script/check_incoming_branchname.clj" branchname)]
      (testing " Correct exit code"
        (is (= exit (:exit expectation))
            (str "Expected exit code for branchname " branchname ": " (:exit expectation) ", got: " exit))))))

;; Update docs for branchname

(deftest update-docs-for-branchname-test
  (doseq [branchname branches
          :let [expectation (get expected branchname)]]
    (let [{:keys [out] :as result} (p/sh {:continue true}
                                          "bb" "script/update_docs_for_branchname.clj" branchname "--dry-run")]
      (testing " Correct branch name"
        (is (str/includes? out (:update-docs-command expectation)))))))


;; Update or create PR

#_(deftest command-test
    (doseq [branchname branches
            :let [expectation (get expected branchname)]]
      (let [_ (println "Testing branchname:" branchname)
            {:keys [exit] :as result} (p/sh {:continue true} "bb" "script/update_or_create_pr.clj" branchname "--dry-run")]
        (is false (prn result))
        (testing " Correct exit code"
          (is (= exit (:exit expectation))
              (str "Expected exit code for branchname " branchname ": " (:exit expectation) ", got: " exit))))))

(defn -main [& args]
  (println "Running all tests...")
  (t/run-tests *ns*)
  (println "All tests completed."))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
