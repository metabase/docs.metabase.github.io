#!/usr/bin/env bash
# For each version v0.12 - v0.63, sparse-checkout only the docs/ directory of the
# metabase/metabase repo into a throwaway worktree, copy its contents out to
# _docs/v0.NN, then remove the worktree.
#
# v0.12 - v0.43 predate reliable release-x.NN.x branches, so the most recent
# non-prerelease git tag for that minor version is used instead (e.g. v0.12 -> v0.12.1).
# v0.44 - v0.63 use the release-x.NN.x branch.
set -euo pipefail

METABASE_REPO_URL="${METABASE_REPO_URL:-https://github.com/metabase/metabase.git}"

REPO_ROOT="$(git rev-parse --show-toplevel)"

TMP_ROOT="$REPO_ROOT/../tmp"
mkdir -p "$TMP_ROOT"

# A full clone (even with --filter=blob:none) still walks the commit/tree
# history of every branch and tag in the repo, which is most of the cost for
# a repo this size. We only need ~50 specific refs, so instead: resolve each
# ref remotely with ls-remote (cheap, no clone) and shallow-fetch just that
# one commit (--depth=1 --filter=tree:0) into an initially-empty repo.
# sparse-checkout then lazily pulls only the docs/ blobs for that commit.
CLONE_DIR="$TMP_ROOT/metabase-metabase"
if [[ ! -d "$CLONE_DIR" ]]; then
  echo "Initializing ${CLONE_DIR}"
  git init -q --bare "$CLONE_DIR"
  git -C "$CLONE_DIR" remote add origin "$METABASE_REPO_URL"
fi

for nn in $(seq 12 63); do
  worktree_dir="$TMP_ROOT/wt_metabase_${nn}"
  dest_dir="$REPO_ROOT/_docs/v0.${nn}"

  detached=false
  if (( nn <= 43 )); then
    ref=$(git ls-remote --tags "$METABASE_REPO_URL" "v0.${nn}.*" \
      | sed 's#.*refs/tags/##' \
      | grep -E "^v0\.${nn}\.[0-9]+(\.[0-9]+)?\$" \
      | sort -V | tail -1)
    if [[ -z "$ref" ]]; then
      echo "Skipping v0.${nn}: no matching tag found"
      continue
    fi
    detached=true
    fetch_refspec="refs/tags/${ref}:refs/tags/${ref}"
  else
    ref="release-x.${nn}.x"
    if ! git ls-remote --exit-code --heads "$METABASE_REPO_URL" "$ref" > /dev/null; then
      echo "Skipping v0.${nn}: no such remote branch (release-x.${nn}.x)"
      continue
    fi
    fetch_refspec="refs/heads/${ref}:refs/remotes/origin/${ref}"
  fi

  echo "Fetching ${ref}"
  git -C "$CLONE_DIR" fetch -q --depth=1 --filter=tree:0 origin "$fetch_refspec"

  echo "Adding worktree for ${ref} at ${worktree_dir}"
  if [[ "$detached" == true ]]; then
    git -C "$CLONE_DIR" worktree add --no-checkout --detach "$worktree_dir" "$ref"
  else
    git -C "$CLONE_DIR" worktree add --no-checkout -B "${ref}" "$worktree_dir" "origin/${ref}"
  fi

  git -C "$worktree_dir" sparse-checkout init --cone
  git -C "$worktree_dir" sparse-checkout set docs
  git -C "$worktree_dir" checkout "${ref}"

  mkdir -p "$dest_dir"
  cp -R "$worktree_dir/docs/." "$dest_dir/"

  git -C "$CLONE_DIR" worktree remove "$worktree_dir" --force
  if [[ "$detached" == false ]]; then
    git -C "$CLONE_DIR" branch -D "${ref}"
  fi
done

echo "Done."
