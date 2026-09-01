#!/usr/bin/env bash
# Companion to https://github.com/metabase/metabase/pull/81703
# 1. Run the #81703 script first to populate the metabase branches with nav.yml files from this repo.
# 2. Then merge all the PRs it generated.
# 3. Then run this script to populate this feature branch with the new structure/contents.
# 4. Then delete this file + delete _data/docs.
# 5. Merge this branch.
# 6. Job done. Nav data source of truth is in the metabase repo; nav.yml
#    files will get automatically copied via script/docs (and no additional
#    processing is needed since the /docs/<version>/ prefixes are added in
#    getNavForVersion).
#
# For each version v0.44 - v0.63 plus latest (master), sparse-checkout only
# docs/util/data/nav.yml from the metabase/metabase repo into a throwaway
# worktree, copy that file out to _docs/<version>/util/data/nav.yml, then
# remove the worktree.
#
# v0.44 - v0.63 use the release-x.NN.x branch; latest uses master.
set -euo pipefail

METABASE_REPO_URL="${METABASE_REPO_URL:-https://github.com/metabase/metabase.git}"

REPO_ROOT="$(git rev-parse --show-toplevel)"

TMP_ROOT="$REPO_ROOT/tmp"
mkdir -p "$TMP_ROOT"

# A full clone (even with --filter=blob:none) still walks the commit/tree
# history of every branch and tag in the repo, which is most of the cost for
# a repo this size. We only need ~20 specific refs, so instead: resolve each
# ref remotely with ls-remote (cheap, no clone) and shallow-fetch just that
# one commit (--depth=1 --filter=tree:0) into an initially-empty repo.
# sparse-checkout then lazily pulls only the docs/util/data blobs for that commit.
CLONE_DIR="$TMP_ROOT/metabase-metabase"
if [[ ! -d "$CLONE_DIR" ]]; then
  echo "Initializing ${CLONE_DIR}"
  git init -q --bare "$CLONE_DIR"
  git -C "$CLONE_DIR" remote add origin "$METABASE_REPO_URL"
fi

# Resolve every ref up front from one bulk ls-remote call instead of one per
# version, then fetch them all in a single batched `git fetch`. This turns
# ~20 sequential network round trips into 2.
echo "Listing remote refs"
all_heads="$(git ls-remote --heads "$METABASE_REPO_URL")"

labels=()
refs=()

for nn in $(seq 44 63); do
  ref="release-x.${nn}.x"
  if ! grep -q "refs/heads/${ref}\$" <<< "$all_heads"; then
    echo "Skipping v0.${nn}: no such remote branch (release-x.${nn}.x)"
    continue
  fi
  labels+=("v0.${nn}")
  refs+=("$ref")
done

if grep -q "refs/heads/master\$" <<< "$all_heads"; then
  labels+=("latest")
  refs+=("master")
else
  echo "Skipping latest: no such remote branch (master)"
fi

refspecs=()
for ref in "${refs[@]}"; do
  refspecs+=("refs/heads/${ref}:refs/remotes/origin/${ref}")
done

echo "Fetching ${#refspecs[@]} refs"
git -C "$CLONE_DIR" fetch -q --depth=1 --filter=tree:0 origin "${refspecs[@]}"

for i in "${!labels[@]}"; do
  label="${labels[i]}"
  ref="${refs[i]}"
  worktree_dir="$TMP_ROOT/wt_metabase_${label}"
  dest_dir="$REPO_ROOT/_docs/${label}"

  echo "Adding worktree for ${ref} at ${worktree_dir}"
  git -C "$CLONE_DIR" worktree add --no-checkout -B "${ref}" "$worktree_dir" "origin/${ref}"

  git -C "$worktree_dir" sparse-checkout init --cone
  git -C "$worktree_dir" sparse-checkout set docs/util/data
  git -C "$worktree_dir" checkout "${ref}"

  src_file="$worktree_dir/docs/util/data/nav.yml"
  if [[ ! -f "$src_file" ]]; then
    echo "Skipping ${label}: no docs/util/data/nav.yml at ${ref}"
  else
    mkdir -p "$dest_dir/util/data"
    cp "$src_file" "$dest_dir/util/data/nav.yml"
  fi

  git -C "$CLONE_DIR" worktree remove "$worktree_dir" --force
  git -C "$CLONE_DIR" branch -D "${ref}"
done

echo "Removing ${TMP_ROOT}"
rm -rf "$TMP_ROOT"

echo "Done."
