#!/usr/bin/env bb
(ns fix-liquid-templates
  (:require
   [babashka.fs :as fs]
   [clojure.string :as str]
   [clojure.java.io :as io]
   [ice.core :as ice]))

(def open-and-assign-regex
  #"(?s)\{\%\s*assign\s+([^=]+?)\s*=\s*(site\.[^\s|]+)\s*\|")

(defn transform-liquid-assigns [content]
  "Transform Jekyll liquid assign statements to include 'default: empty'"
  ;; Handle multiline liquid blocks with assign statements
  (str/replace content open-and-assign-regex "{% assign $1 = $2 default: empty |"))

(defn process-file [dry-run? file-path]
  "Process a single file and apply the transformation"
  (try
    (let [original-content (slurp file-path)
          transformed-content (transform-liquid-assigns original-content)]
      (if (not= original-content transformed-content)
        (do
          (when-not dry-run?
            (spit file-path transformed-content))
          (ice/p [:green "✓ Transformed:" [:underline file-path]]))
        (println "- No changes needed:" file-path)))
    (catch Exception e
      (ice/p [:red "skipping"] file-path))))

(defn find-files-with-liquid-assigns [directory]
  "Find all files that contain liquid assign statements"
  (into []
        (comp (filter fs/regular-file?)
              (map str)
              (filter #(try
                         (re-find open-and-assign-regex (slurp %))
                         (catch Exception _ false))))
        (fs/glob directory "**/*.{html,xml,md}")))

(defn -main [& args]
  "Main function to process files and apply liquid assign transformations."
  (let [dry-run? (contains? (set args) "--dry-run")
        _ (when dry-run?
            (ice/p [:yellow "Running in dry-run mode. No files will be modified."]))
        _ (ice/p "Looking for liquid assign statements in files...")
        target-files (find-files-with-liquid-assigns ".")]
    (ice/p [:magenta "Found " [:cyan (count target-files)] " files with liquid assign statements. Processing..."])
    (doseq [file-path target-files]
      (ice/p [:green "Processing file: " [:underline file-path]])
      (process-file dry-run? file-path))))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))

(comment

  ;; Test the transformation with your examples
  (def test-cases
    ["{% assign sorted = site.community-posts | sort: 'date' | reverse %}"
     "{% assign sorted_posts = site.community-posts | sort: 'date' | reverse %}"
     "{% assign sorted_terms = site.glossary | sort: 'title' %}"
     "{% assign
     multiline_var = site.some-collection |
     sort: 'date' | reverse %}"])

  (println "Testing transformations:")
  (doseq [test-case test-cases]
    (println "\nOriginal:")
    (println test-case)
    (println "Transformed:")
    (println (transform-liquid-assigns test-case)))


  (println "\n" (str/join (repeat 50 "=")) "\n")

  ;; Check if files exist and process them
  (doseq [file-path target-files]
    (if (.exists (io/file file-path))
      (process-file file-path)
      (println "✗ File not found:" file-path)))

  ;; Alternative: Process all files in current directory
  (comment
    (println "\nProcessing all files with liquid assigns:")
    (doseq [file-path (find-files-with-liquid-assigns ".")]
      (process-file file-path)))
  )
