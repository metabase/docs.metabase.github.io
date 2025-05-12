# docs.metabase.github.io

The docs portion of the [website](/) for
[Metabase](https://github.com/metabase/metabase).

## Requesting updates

This is a repo generated from the
[Metabase](https://github.com/metabase/metabase) repo. If you have suggestions,
please open a PR against the markdown files in
[Metabase](https://github.com/metabase/metabase/docs).

## Workflow Scripts Overview

### [Process Docs Changes](.github/workflows/process_docs_changes.yml)

Lints links, markdown, etc. and builds the `_site` and `_docs` using the cljs
compiler, `script/docs` and jekyll, then opens a PR to this repo's master branch
with the updated changes for a given branchname.

*At anytime, the master branch of this repo should be publishable.*

#### Triggering

This workflow is triggered from `metabase/metabase` (aka the main repo),
whenever there is an update to `/docs`. The triggering workflow includes the
branch name, e.g.: `master` or `release-x.49.x`.

Building docs can be [run on a branch manually
from](https://github.com/metabase/docs.metabase.github.io/actions/workflows/process_docs_changes.yml)
too.

Since we've split up the site into 2 jekyll instances, certain linters got some
extra care, like `analyze_links.clj` below.

Note, all of these scripts take an optional `--dry-run` flag that explains what
they do without actually doing the operation.

#### New Script Docs

##### `check_incoming_branchname.clj`

If the branchname doesn't match master, a release branch, or a workflow-testing
branch, using
[util/categorize-branchname](https://github.com/metabase/docs.metabase.github.io/blob/branch-updates-file-adding/script/util.clj#L17-L21).
This step Exits 1, stopping the build.

e.g. `bb script/check_incoming_branchname.clj master` exits 0.

| branch | exit-code |
|:---------------------|:----------|
| master | 0 |
| release-x.49.x | 0 |
| docs-workflow-test-1 | 0 |
| anything-else | 1 |

##### `update_docs_for_branchname.clj`

Garunteed to be ran on a valid branchname (due to `check_incoming_branchname`
above):

- `bb script/update_docs_for_branchname.clj release-x.50.x`
  - runs: `./script/docs release-x.50.x --set-version v0.50`
- `bb script/update_docs_for_branchname.clj master`
  - runs: `./script/docs master --set-version master`
  
When the release version number matches the latest docs_version number from the
_config.yml file, it sets latest as well:

- `bb script/update_docs_for_branchname.clj release-x.54.x`
  - runs: `./script/docs-update`

##### `analyze_links.clj`

Builds ontop of our existing link checking. Since the site has been split into
2, `htmlproofer` cannot see the marketing links. So this step runs
`htmlproofer`, gathers the results, and for links that are "not found" (because
they are no longer in this jekyll installation), checks for the links at
metabase.com

Exits 1, stopping the build whenever htmlproofer reports missing links that are
not avaliable at `metabase.com`.

##### `update_or_create_pr.clj`

Git adds, commits, and creates a PR to master with files associated with the
branch.

- `bb script/update_or_create_pr.clj master`

``` shell
→ Branch info:  master
Switched to and reset branch 'update-master'
dry-run:  Adding _docs/master ...
dry-run:  Adding _site/docs/master ...
→ No changes to commit.
```

#### Tests

Given the non-trivial scripts run during a build, there are tests for these
scripts to ensure they work.

See: [script/_test/all.clj](script/_test/all.clj).

They are run in the `Process Docs Workflow`, and can be run manually via:

``` shell
bb script/_test/all.clj
```
