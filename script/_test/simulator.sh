#!/usr/bin/env sh

# Similar to what happens in CI, but can be run locally (faster than running the full CI)
#
#  MAIN_REPO_BRANCH is the branch of the main Metabase repo that you want to use:
#
# Usage:
#  MAIN_REPO_BRANCH=master simulator.sh

set -euo pipefail

echo "Prerequisites"
echo ""
echo "Installed:"
echo "  - Ruby (>= 2.7.0)"
echo "  - Jekyll (>= 3.8.5)"
echo "  - Bundler (>= 2.0.1)"
echo "  - Node.js (>= 12.0.0)"
echo "  - Yarn (>= 1.22.0)"
echo "  - Babashka"
echo ""
echo "Directory Structure:"
echo "  - metabase.github.io (the marketing repo) should be at ../metabase.github.io relative to the root of this repo"
echo ""
echo "Running simulator.sh on branch: $TARGET_BRANCH"

printf '\n\n\n================= bb script/_test/all.clj =================z\n'
bb script/_test/all.clj

printf "\n\n\n================= bb script/check_incoming_branchname.clj --target-branch %s =================z\n" "$TARGET_BRANCH"
bb script/check_incoming_branchname.clj --target-branch "$TARGET_BRANCH"

printf "\n\n\n================= bb script/update_docs_for_branchname.clj --source-branch %s --target-branch %s =================z\n" "$SOURCE_BRANCH" "$TARGET_BRANCH"
bb script/update_docs_for_branchname.clj --source-branch "$SOURCE_BRANCH" --target-branch "$TARGET_BRANCH"

printf "\n\n\n================= bb script/cleanup_cloud_docs.clj =================z\n"
bb script/cleanup_cloud_docs.clj

printf '\n\n\n================= copy marketing files =================z\n'
bb script/sync_repo.clj --from-repo ../metabase.github.io

printf '\n\n\n================= yarn lint-markdown =================z\n'
yarn lint-markdown

printf '\n\n\n================= yarn lint-styles =================z\n'
yarn lint-styles

printf '\n\n\n================= yarn lint-scripts =================z\n'
yarn lint-scripts

printf '\n\n\n================= yarn lint-links =================z\n'
yarn lint-links

printf '\n\n\n================= Clear the existing site: =================z\n'
rm -rf _site
echo "done"

printf '\n\n\n================= Build the docs jekyll site: =================z\n'
bundle exec jekyll build
echo "built. docs site is now in _site"

printf '\n\n\n================= Run HTMLProofer on docs site: =================z\n'
script/links || tail < htmlproofer.out -n 1

printf '\n\n\n================= checking reported links... =================z\n'
bb script/analyze_links.clj --htmlproofer-output htmlproofer.out
