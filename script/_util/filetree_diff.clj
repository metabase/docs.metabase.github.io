(ns -util.filetree-diff
  (:require
   [babashka.fs :as fs]
   [clojure.data :refer [diff]]
   [clojure.java.io :as io]
   [clojure.string :as str]))

(defn file-info
  "Extract relevant file information for comparison"
  [file]
  {:name (str (fs/relativize "." file))
   :size (fs/size file)
   #_#_:last-modified (fs/last-modified-time file)
   :directory? (fs/directory? file)})

(defn build-filetree
  "Build a filetree map from a directory path using fs/glob"
  [root-path]
  (->> (fs/glob root-path "**")
       (map (fn [f]
              [(str f) (:size (file-info f))]))))

(defn normalize-filetree
  "Normalize filetree for comparison by creating a map keyed by relative paths"
  [filetree root-path]
  (let [root-file (io/file root-path)
        root-path-str (.getPath root-file)]
    (->> (concat (get filetree true [])   ; directories
                 (get filetree false [])) ; files
         (map (fn [file-info]
                (let [relative-path (-> (:path file-info)
                                      (.substring (inc (count root-path-str))))]
                  [relative-path (dissoc file-info :path)])))
         (into {}))))

(defn filetree-diff
  "Compare two directory trees and return the differences"
  [left-path right-path normalize-filename-fn]
  (let [left-tree (set (map  (fn [[nm sz]] [(normalize-filename-fn nm) sz]) (build-filetree left-path)))
        right-tree (set (map (fn [[nm sz]] [(normalize-filename-fn nm) sz]) (build-filetree right-path)))
        [only-in-left only-in-right common] (diff left-tree right-tree)]
    {:left [left-path left-tree]
     :right [right-path right-tree]
     :files-only-in-left (or only-in-left {})
     :files-only-in-right (or only-in-right {})
     :common common
     :summary {:files-only-in-left (count only-in-left)
               :files-only-in-right (count only-in-right)
               :common-files (count common)}}))

(defn categorize-changes
  "Categorize the diff results by file type and change type"
  [diff-result]
  (letfn [(categorize-by-type [file-map]
            (group-by #(if (:directory? (second %)) :directories :files)
                     file-map))]
    {:added (categorize-by-type (:only-in-second diff-result))
     :removed (categorize-by-type (:only-in-first diff-result))
     :common (categorize-by-type (:common diff-result))}))

(do (defn path->file-sizes
      "Takes result, returns a map of filename -> left-size right-size"
      [result]
      (let [all-files (distinct (concat (map first (:files-only-in-left result))
                                        (map first (:files-only-in-right result))))
            lh-files (set (map first (:files-only-in-left result)))
            rh-files (set (map first (:files-only-in-right result)))
            filled-files (reduce
                           (fn [acc file]
                             (let [left-file (when (contains? lh-files file)
                                               (first (filter #(= file (first %)) (:files-only-in-left result))))
                                   right-file (when (contains? rh-files file)
                                                (first (filter #(= file (first %)) (:files-only-in-right result))))]
                               (assoc acc file
                                      [(if left-file (second left-file) nil)
                                       (if right-file (second right-file) nil)
                                       (- (or (second left-file) 0) (or (second right-file) 0))])))
                           {}
                           all-files)]
        (->> filled-files
             (sort-by (fn [[k [_ _ size-diff]]] (- (Math/abs size-diff)))))))
    (path->file-sizes result))

;; Example usage
(comment

  ;; Compare two directory trees
  (def result (filetree-diff
                "../metabase.github.io/_layouts"
                "_layouts"
                #(str/replace % #"\.\./metabase.github.io/" "")))

  (u/pp
    (path->file-sizes result))

  result


  (:summary result)
;; => {:files-only-in-left 0, :files-only-in-right 1, :common-files 52}

  (u/pp
    (group-by first
              (concat (sort-by first (:files-only-in-left result))
                      (sort-by first (:files-only-in-right result)))))

  ;; Get categorized changes
  (categorize-changes result))
