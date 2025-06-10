#!/usr/bin/env sh

# Similar to what happens in CI, but can be run locally (faster than running the full CI)
#
#  MAIN_REPO_BRANCH is the branch of the main Metabase repo that you want to use:
#
# Usage:
#  MAIN_REPO_BRANCH=master simulator.sh

set -euo pipefail

echo "Running simulator.sh on branch: $MAIN_REPO_BRANCH"

printf '\n\n\n============================== bb script/_test/all.clj ==============================z\n'
bb script/_test/all.clj

printf '\n\n\n============================== bb script/check_incoming_branchname.clj "$MAIN_REPO_BRANCH" ==============================z\n'
bb script/check_incoming_branchname.clj "$MAIN_REPO_BRANCH"

printf '\n\n\n============================== bb script/update_docs_for_branchname.clj "$MAIN_REPO_BRANCH" ==============================z\n'
bb script/update_docs_for_branchname.clj "$MAIN_REPO_BRANCH"

printf '\n\n\n============================== copy marketing files ==============================z\n'

cp -r ../metabase.github.io/_data .
cp -r ../metabase.github.io/_includes .
cp -r ../metabase.github.io/_community-posts .
cp -r ../metabase.github.io/_layouts .
cp -r ../metabase.github.io/_plugins .
cp -r ../metabase.github.io/_sass .

printf '\n\n\n============================== yarn lint-markdown ==============================z\n'
yarn lint-markdown

printf '\n\n\n============================== yarn lint-styles ==============================z\n'
yarn lint-styles

printf '\n\n\n============================== yarn lint-scripts ==============================z\n'
yarn lint-scripts

printf '\n\n\n============================== yarn lint-links ==============================z\n'
yarn lint-links


# Clear the existing site:
rm -rf _site
# Build the jekyll site:
bundle exec jekyll build

bb script/install_docs_redirect.clj

script/links || true

printf '\n checking reported links...'

echo ''
echo "htmlproofer spit out a report of length: $(wc -l < htmlproofer.out)"

bb script/analyze_links.clj --htmlproofer-output htmlproofer.out
