(ns -test.all
  (:require
   [ice.core :as ice]
   [clojure.test :as t :refer [deftest is]]
   [clojure.string :as str]
   [babashka.process :as p]
   [util :as u]))

(def branches ["master"
               "release-x.49.x"
               "release-x.50.x"
               ;; Current release branch:
               (str "release-x." (u/config-docs-version) ".x")
               "any-other-branch"])

(def expected
  (let [cdv (u/config-docs-version)]
    (assoc {"master"                 {:exit 0
                                      :update-docs-command "./script/docs master --set-version master"
                                      :update-or-create {:category :master
                                                         :release nil
                                                         :source-branch "master"
                                                         :target-branch "update-master"
                                                         :artifact-dirs ["_docs/master"
                                                                         "_site/docs/master"]}}
            "release-x.49.x"         {:exit 0
                                      :update-docs-command "./script/docs release-x.49.x --set-version v0.49"
                                      :update-or-create {:category :release
                                                         :release 49
                                                         :source-branch "release-x.49.x"
                                                         :target-branch "update-release-x.49.x"
                                                         :artifact-dirs ["_docs/v0.49" "_site/docs/v0.49"]}}
            "release-x.50.x"         {:exit 0
                                      :update-docs-command "./script/docs release-x.50.x --set-version v0.50"
                                      :update-or-create {:category :release
                                                         :release 50
                                                         :source-branch "release-x.50.x"
                                                         :target-branch "update-release-x.50.x"
                                                         :artifact-dirs ["_docs/v0.50" "_site/docs/v0.50"]}}
            "any-other-branch"       {:exit 1
                                      :update-docs-command "Unpublishable branchname"
                                      :update-or-create {:category nil
                                                         :release nil
                                                         :source-branch "any-other-branch"
                                                         :target-branch "update-any-other-branch"
                                                         :artifact-dirs []}}}
           ;; Current release branch:
           (str "release-x." cdv ".x")

           {:exit 0
            :update-docs-command "./script/docs-update"
            :update-or-create {:category :release
                               :release cdv
                               :source-branch (str "release-x." cdv ".x")
                               :target-branch (str "update-release-x." cdv ".x")
                               :artifact-dirs ["_docs/latest"
                                               "_site/docs/latest"
                                               (str "_docs/v0." cdv)
                                               (str "_site/docs/v0." cdv)]}})))

(deftest branchname-filter-exit-code-test
  (doseq [branchname branches
          :let [expectation (get expected branchname)]]
    (let [{:keys [exit] :as _result} (p/sh {:continue true}
                                          "bb" "script/check_incoming_branchname.clj" branchname)]
      (ice/p [:green "Testing: check_incoming_branchname for " [:white branchname] " has correct exit code"])
      (is (= exit (:exit expectation))
          (str "Expected exit code for branchname " branchname ": " (:exit expectation) ", got: " exit))))
  (println))

(deftest update-docs-for-branchname-test
  (doseq [branchname branches
          :let [expectation (get expected branchname)]]
    (let [{:keys [out] :as _result} (p/sh {:continue true :out :string}
                                         "bb" "script/update_docs_for_branchname.clj" branchname "--dry-run")]
      (ice/p [:green "Testing: update_docs_for_branchname for " [:white branchname] " Returns correct branch name"])
      (is (str/includes? out (:update-docs-command expectation)))))
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
