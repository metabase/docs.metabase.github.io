(ns tasks.util
  (:require [clj-yaml.core :as yaml]))

(defn log [level message] (println (str level " " message)))

(defn update-frontmatter!
  "Reads a file, updates its YAML frontmatter by applying f to the value of the
  YAML frontmatter, as a clojure map and writes the updated content back.

   Example usage:
   (update-frontmatter \"index.md\" )"
  [file f & args]
  (let [content (slurp file)
        ;; The regex looks for a YAML frontmatter block delimited by lines with '---'
        ;; (?s) makes . match newline characters.
        [_ front rest] (re-matches #"(?s)^---\s*\n(.*?)\n---\s*\n(.*)" content)
        [front rest] (if front
                       [front rest]
                       ;; if there's no frontmatter, consider it empty:
                       ["" content])
        data (try (yaml/parse-string front)
                  (catch Exception e
                    (println (str "Error parsing frontmatter in " file ": " (.getMessage e)) {})))
        updated (apply f data args)]
    (when (not= data updated)
      (println "Writing changes to frontmatter in: " file)
      (let [new-front (yaml/generate-string updated :dumper-options {:flow-style :block})
            new-content (str "---\n" new-front "---\n" rest)]
        (spit file new-content)))))
