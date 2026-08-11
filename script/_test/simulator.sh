#!/usr/bin/env sh

# Similar to what happens in CI, but can be run locally (faster than running the full CI)
#
#  MAIN_REPO_BRANCH is the branch of the main Metabase repo that you want to use:
#
# Usage:
#  MAIN_REPO_BRANCH=master simulator.sh

set -euo pipefail

# default source branch to target branch

if [[ -z "${TARGET_BRANCH:-}" ]]; then
    echo "Please set TARGET_BRANCH environment variable to the branch you want to simulate."
    exit 1
fi
echo "Running simulator.sh with target branch: $TARGET_BRANCH"

if [[ -z "${SOURCE_BRANCH:-}" ]]; then
    SOURCE_BRANCH="$TARGET_BRANCH"
fi
echo "Running simulator.sh with source branch: $SOURCE_BRANCH"

if [[ -z "${MARKETING_REPO:-}" ]]; then
    echo "MARKETING_REPO is not set, point it to the local path of the marketing repo (metabase.github.io)."
    exit 1
fi


echo "Prerequisites"
echo ""
echo "Marketing Repo must exist locally. Set MARKETING_REPO: $MARKETING_REPO"
echo ""
echo "Installed:"
echo "  - Node.js (>= 12.0.0)"
echo "  - Bun (>= 1.3.14)"
echo "  - Babashka"
echo ""
echo "Directory Structure:"
echo "  - metabase.github.io (the marketing repo) should be at ../metabase.github.io relative to the root of this repo"
echo ""

# TODO:
# parameterize the from-repo (marketing repo location)
# default source branch to target branch


printf '\n\n\n================= bb script/_test/all.clj =================z\n'
bb script/_test/all.clj

printf "\n\n\n================= bb script/check_incoming_branchname.clj --target-branch %s =================z\n" "$TARGET_BRANCH"
bb script/check_incoming_branchname.clj --target-branch "$TARGET_BRANCH"

printf "\n\n\n================= bb script/update_docs_for_branchname.clj --source-branch %s --target-branch %s =================z\n" "$SOURCE_BRANCH" "$TARGET_BRANCH"
bb script/update_docs_for_branchname.clj --source-branch "$SOURCE_BRANCH" --target-branch "$TARGET_BRANCH"

printf "\n\n\n================= bb script/cleanup_cloud_docs.clj =================z\n"
bb script/cleanup_cloud_docs.clj

printf '\n\n\n================= copy marketing files =================z\n'
bb script/sync_repo.clj --from-repo "$MARKETING_REPO"

printf '\n\n\n================= bun lint-markdown =================z\n'
bun lint-markdown

printf '\n\n\n================= bun lint-styles =================z\n'
bun lint-styles

printf '\n\n\n================= bun lint-scripts =================z\n'
bun lint-scripts

printf '\n\n\n================= bun lint-links =================z\n'
bun lint-links

printf '\n\n\n================= Clear the existing site: =================z\n'
rm -rf _site
echo "done"

printf '\n\n\n================= Build the docs site: =================z\n'
bun run build
echo "built. docs site is now in _site"

printf '\n\n\n================= Run HTMLProofer on docs site: =================z\n'
script/links || tail < htmlproofer.out -n 1

printf '\n\n\n================= checking reported links... =================z\n'
bb script/analyze_links.clj --htmlproofer-output htmlproofer.out

printf '\n\nTo delete the marketing files, run:'
printf 'bb script/sync_repo.clj --delete'
