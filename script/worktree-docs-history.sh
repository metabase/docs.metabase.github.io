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

# Resolve every ref up front from two bulk ls-remote calls instead of one
# per version, then fetch them all in a single batched `git fetch`. This
# turns ~100 sequential network round trips into 3.
echo "Listing remote refs"
all_tags="$(git ls-remote --tags "$METABASE_REPO_URL")"
all_heads="$(git ls-remote --heads "$METABASE_REPO_URL")"

declare -a resolved_ref
declare -a is_detached
refspecs=()

# Only iterate over currently-supported major versions (eol in the future),
# per _data/major_version_support.json.
today="$(date -u +%Y-%m-%d)"
supported_majors=()
while IFS= read -r nn; do
  supported_majors+=("$nn")
done < <(jq -r --arg today "$today" \
  '[.[] | select(.eol > $today) | .major] | sort | .[]' \
  "$REPO_ROOT/_data/major_version_support.json")

for nn in "${supported_majors[@]}"; do
  if (( nn <= 43 )); then
    ref=$(grep -oE "refs/tags/v0\.${nn}\.[0-9]+(\.[0-9]+)?\$" <<< "$all_tags" \
      | sed 's#refs/tags/##' | sort -V | tail -1)
    if [[ -z "$ref" ]]; then
      echo "Skipping v0.${nn}: no matching tag found"
      continue
    fi
    resolved_ref[nn]="$ref"
    is_detached[nn]=1
    refspecs+=("refs/tags/${ref}:refs/tags/${ref}")
  else
    ref="release-x.${nn}.x"
    if ! grep -q "refs/heads/${ref}\$" <<< "$all_heads"; then
      echo "Skipping v0.${nn}: no such remote branch (release-x.${nn}.x)"
      continue
    fi
    resolved_ref[nn]="$ref"
    is_detached[nn]=0
    refspecs+=("refs/heads/${ref}:refs/remotes/origin/${ref}")
  fi
done

echo "Fetching ${#refspecs[@]} refs"
git -C "$CLONE_DIR" fetch -q --depth=1 --filter=tree:0 origin "${refspecs[@]}"

for nn in "${!resolved_ref[@]}"; do
  ref="${resolved_ref[nn]}"
  worktree_dir="$TMP_ROOT/wt_metabase_${nn}"
  dest_dir="$REPO_ROOT/_docs/v0.${nn}"

  echo "Adding worktree for ${ref} at ${worktree_dir}"
  if [[ "${is_detached[nn]}" == 1 ]]; then
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
  if [[ "${is_detached[nn]}" == 0 ]]; then
    git -C "$CLONE_DIR" branch -D "${ref}"
  fi
done

# Copy _docs/<docs_version> to _docs/latest
# TODO: Would it make sense to use major_version_support.json here too?
latest_nn="$(grep -E '^docs_version:' "$REPO_ROOT/_config.yml" | sed -E 's/^docs_version:[[:space:]]*v0\.([0-9]+).*/\1/')"
if [[ -z "$latest_nn" ]]; then
  echo "Could not determine docs_version from ${REPO_ROOT}/_config.yml" >&2
  exit 1
fi

latest_src="$REPO_ROOT/_docs/v0.${latest_nn}"
latest_dest="$REPO_ROOT/_docs/latest"
if [[ ! -d "$latest_src" ]]; then
  echo "Cannot copy latest: ${latest_src} not found" >&2
  exit 1
fi

echo "Copying ${latest_src} to ${latest_dest}"
rm -rf "$latest_dest"
mkdir -p "$latest_dest"
cp -R "$latest_src/." "$latest_dest/"

echo "Done."
