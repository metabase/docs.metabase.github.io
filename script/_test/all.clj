(ns -test.all
  (:require
   [babashka.process :as p]
   [clojure.edn :as edn]
   [clojure.string :as str]
   [clojure.test :as t :refer [deftest is]]
   [ice.core :as ice]
   [util :as u]))

(def ^:private branches ["master"
                         "release-x.49.x"
                         "release-x.50.x"
                         ;; Current release branch:
                         (str "release-x." (u/config-docs-version) ".x")
                         "any-other-branch"])

(def ^:private source-branch-name "my-new-docs-branch")

(def ^:private expected
  (assoc {"master"                 {:publish-branch-docs? true
                                    :update-docs-command (str "./script/docs master --set-version master --source-branch " source-branch-name)}
          "release-x.49.x"         {:publish-branch-docs? true
                                    :update-docs-command (str "./script/docs release-x.49.x --set-version v0.49 --source-branch " source-branch-name)}
          "release-x.50.x"         {:publish-branch-docs? true
                                    :update-docs-command (str "./script/docs release-x.50.x --set-version v0.50 --source-branch " source-branch-name)}
          "any-other-branch"       {:publish-branch-docs? false
                                    :update-docs-command "Unpublishable branchname"}}
         ;; Current release branch:
         (str "release-x." (u/config-docs-version) ".x")
         {:publish-branch-docs? true
          :update-docs-command (str "./script/docs --update --latest --source-branch " source-branch-name)}))

(deftest branchname-filter-exit-code-test
  (doseq [branchname branches
          :let [expectation (get expected branchname)]]
    (let [{:keys [exit] :as _result} (p/sh {:continue true}
                                           "bb" "script/check_incoming_branchname.clj" "--target-branch" branchname)]
      (ice/p [:green "Testing if we publish " [:white branchname] " via check_incoming_branchname"])
      (is (= (zero? exit) (:publish-branch-docs? expectation))
          ;; if the exit code is 1, it means the branchname is not publishable,
          ;; and that step in the workflow will stop the build.
          (str "Expected exit code for branchname " branchname ": " (:exit expectation) ", got: " exit))))
  (println))

(deftest update-docs-for-branchname-test
  (doseq [target-branch branches
          :let [expectation (get expected target-branch)]]
    (let [cmd (str "bb script/update_docs_for_branchname.clj"
                   " --dry-run"
                   " --source-branch " source-branch-name
                   " --target-branch "  target-branch)
          {:keys [out] :as _result} (p/sh {:continue true :out :string} cmd)]
      (ice/p [:green "Testing: update_docs_for_branchname for " [:white target-branch] " Returns correct branch name"])
      (if (= target-branch "any-other-branch")
        (is (str/includes? out "Unpublishable"))
        (let [data (edn/read-string (last (str/split-lines out)))]
          (is (= (:update-docs-command expectation)
                 (:command data)))))))
  (println))

(deftest config-version-is-parseable
  (let [docs-version (u/config-docs-version)]
    (is (integer? docs-version)
        (str "Expected config version to be an integer, got: " docs-version))))

(deftest categorize-branchname-test
  (doseq [branchname branches
          :let [[category release-num] (u/categorize-branchname branchname)]]
    (is (contains? #{:master :release nil} category))
    (when (= category :release)
      (is (integer? release-num)
          (str "Expected release number to be an integer for branchname " branchname ", got: " release-num)))))

(defn -main [& _args]
  (println "Expectations: ")
  (u/pp expected)
  (println "Running all tests...")
  (let [{:keys [fail error] :as _results} (t/run-tests *ns*)]
    (if (zero? (+ fail error))
      (ice/p [:green "All tests passed! OK"])
      (do (ice/p [:red fail " tests FAILED."])
          (ice/p [:red error " tests had ERRORS."])
          (System/exit 1)))))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
