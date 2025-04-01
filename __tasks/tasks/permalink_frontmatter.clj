(ns tasks.permalink-frontmatter
  (:require [babashka.fs :as fs]
            [clojure.string :as str]
            [tasks.util :as u]))

;; Example usage:
(comment

  (mapv #(add-permalink-filename! (str %) :dry-run? true) (fs/glob "_docs" "**/*.md"))

  (add-permalink-filename! "__tasks/src/permalink_frontmatter.clj" :dry-run? true)

  )

(defn trim-doc [file-path]
  (str/replace file-path #"^_docs/" ""))

(defn- add-permalink-filename! [file-path & {:keys [dry-run?]}]
  (u/update-frontmatter!
    file-path
    (fn [data]
      (cond
        (:permalink data)
        (do (println (str "Already has permalink '" (:permalink data) "' in: " file-path)) data)

        dry-run?
        (do (println (str "dry_run | Adding permalink '" (trim-doc file-path) "' to: " file-path))
            data)

        :else
        (do (println (str "Adding permalink '" (trim-doc file-path) "' to: " file-path))
            (assoc data :permalink (trim-doc file-path)))))))

(defn add-docs-permalinks! [& {:keys [dry-run?]}]
  (let [files (fs/glob "_docs" "**/*.md")
        path-strs (mapv str files)]
    (doseq [file-path path-strs]
      (add-permalink-filename! file-path :dry-run? dry-run?))))
