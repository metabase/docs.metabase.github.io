# metabase doc building repo

This repo is the home of the docs piece of the [Metabase
website](https://metabase.com) for
[Metabase](https://github.com/metabase/metabase). Docs are built in a workflow
in this repo.

## ⚠️ Proposing Documentation Updates ⚠️

This repo is generated from the [Metabase](https://github.com/metabase/metabase)
repo. If you have suggestions, please open [an issue
there](https://github.com/metabase/metabase/issues/new/choose), or a PR against
the markdown files in [Metabase](https://github.com/metabase/metabase/docs).

## Repo Description

This repo contains the docs + docs building mechanisms for Metabase. Docs data
gets pulled from the [main metabase repo](https://github.com/metabase/metabase)
and built here automatically when a PR against a publishable branch is updated
or merged. This ends up on `metabase.com` because we merge the static assets
(html/css/js) which live here into the [marketing
repo](https://github.com/metabase/metabase.github.io) during a marketing build.

With these steps in place, at anytime, the master branch of this repo should be
publishable alongside the [marketing
repo](https://github.com/metabase/metabase.github.io) site.

## Branch-based previews on Cloudflare Pages

Every branch that gets built is also uploaded to cloudflare pages. A link to the
live preview will be added to each PR.

## Docs Workflow Overview

### [Happy Path](https://excalidraw.com/#json=FrrNqv5QUrjYIh5EyhzGJ,jLIOJkFupN0gPuHRMHdbOw)
![Docs Pipeline Happy Path](readme_assets/docs_pipeline_happy.excalidraw.png)

### How it works

We will examine the steps required to generate docs in the
[docs.metabase.github.io](https://github.com/metabase/docs.metabase.github.io)
repo.

[Process Docs Changes](.github/workflows/process_docs_changes.yml) is triggered
by the
[docs_bump_detected.yml](https://github.com/metabase/metabase/blob/master/.github/workflows/docs_bump_detected.yml),
[docs_merge_detected.yml](https://github.com/metabase/metabase/blob/master/.github/workflows/docs_merge_detected.yml),
and
[docs_close_detected.yml](https://github.com/metabase/metabase/blob/master/.github/workflows/docs_close_detected.yml)
workflows in the main metabase repo. They trigger on PRs targeting `master` or a
release branch (`release-x.N.x`) with docs changes.

- [docs_bump_detected.yml](https://github.com/metabase/metabase/blob/master/.github/workflows/docs_bump_detected.yml)

Triggered when the metabase/metabase docs PR is opened or updated. Triggers
`process_docs_changes.yml` in the `docs.metabase.github.io` repo with the
`docs_update` dispatch type. Which will rebuild the docs, and update or open a
PR in the docs repo with the corresponding changes.

- [docs_merge_detected.yml](https://github.com/metabase/metabase/blob/master/.github/workflows/docs_merge_detected.yml)

Triggered when the metabase/metabase docs PR is merged. Triggers
`process_docs_changes.yml` in the `docs.metabase.github.io` repo with the
`docs_merge` dispatch type. Which merges the `{target-branch}->{source-branch}`
docs PR.

- [docs_close_detected.yml](https://github.com/metabase/metabase/blob/master/.github/workflows/docs_close_detected.yml)

Triggered when the metabase/metabase docs PR is closed. Triggers
`process_docs_changes.yml` in the `docs.metabase.github.io` repo with the
`docs_merge` dispatch type. Which merges the `{target-branch}->{source-branch}`
docs PR.

#### Steps required for a faithful build

- Since we've split up the site into 2 jekyll instances, we cannot rely on
  htmlproofer to check links from the docs to the marketing site. So
  `script/analyze_links.clj` checks any missing links against `metabase.com`.
  
- Copies over control directories from marketing repo.
  See:[script/sync_repo.clj](https://github.com/metabase/docs.metabase.github.io/blob/documenting-manual-workflow-runs/script/sync_repo.clj#L16-L31).
  These are needed to avoid conflicts with the marketing site.

# Process Docs Changes Workflow

This workflow handles all documentation updates triggered by changes in the main
`metabase/metabase` repository, including SDK Docs generation.

## Running Manually

It can be nice to run these by-hand, here's where you can trigger it manually:
[Process Docs
Changes](https://github.com/metabase/docs.metabase.github.io/actions/workflows/process_docs_changes.yml).


### Process Docs Changes Parameters

| Parameter | Required | Type | Default | Description |
|-----------------|----------|--------|-----------------|-------------------------------------------------------------------------------------|
| `source_branch` | ✅ | string | - | The feature/source branch from metabase/metabase that triggered this workflow |
| `target_branch` | ✅ | string | - | The target branch in metabase/metabase (`master` or `release-x.MM.x` for backports) |
| `annotation` | ❌ | string | `"auto-build"` | comment displayed in the build queue and PR title for data lineage |
| `dispatch_type` | ❌ | choice | `"docs_update"` | Action type: `docs_update`, `docs_merge`, or `docs_close` |
| `pr_number` | ❌ | string | `-` | adds a link to the docs PR to the original PR in metabase/metabase |
| `update_dirs` | ❌ | string | `""` | comma delimited string of extra dirs to git add during `docs_update` |

#### Tips and Best Practices

##### Annotations
- Use descriptive annotations to identify workflows in the build queue and PR
  titles
- Keep them concise since they appear in PR titles

##### Branch Naming
- Source branch must match exactly what's in metabase/metabase
- Target branch is typically `master`
- Use `release-x.MM.x` format for backports (e.g., `release-0.50.x`)
- The source branch must exist in metabase/metabase when running this workflow.
  If the source branch has been deleted (e.g., after merging the original PR),
  the workflow will fail.

**Solution:**:
1. **Restore the branch** in metabase/metabase before running the workflow


### Branch Mapping
The workflow maps branches from the main repository to documentation changes:
- **Source → Target**: `docs-update-naming-55` → `master` creates a PR with
  branch `docs-update-naming-55->master` targeting `master` in this repo.
- **Backports**: `docs-hotfix-security` → `release-0.50.x` creates a PR with
  branch `docs-hotfix-security->release-0.50.x` targeting `master` in this repo.

### Dispatch Types

#### `docs_update` (Default)
Creates or updates a documentation PR with the naming pattern `[annotation]
{source-branch}->{target-branch}`. The branchname for the PR will always be
`{source-branch}->{target-branch}`.

**Example**: Source `docs-new-way-to-query` targeting `master` creates/updates
PR named `[auto-build]docs-new-way-to-query->master`. This PR, in this repo,
will have branchname `docs-new-way-to-query->master` and target `master` in this
repo.

#### `docs_merge`
Merges the existing documentation PR that matches the
`{source-branch}->{target-branch}` branchname pattern. Also runs linters as part
of the merge process for safety.

## [Original docs PR is Closed](https://excalidraw.com/#json=oC4lNO4WA2-asQf1tIHCd,QHHgk3KWf6bicqXQMKTUHA)

When the metabase/metabase PR is closed, we close the PR in this repo.

![Docs Pipeline Closed](readme_assets/docs_pipeline_closed.excalidraw.png)

## Workflow Scripts Overview

These are some nitty gritty details about exactly what happens inside the docs
pipeline.

##### `check_incoming_branchname.clj`

If the target doesn't match master or a release branch, This step stops the
build. See
[util/categorize-branchname](https://github.com/metabase/docs.metabase.github.io/blob/master/script/util.clj#L18-L22)
for details.
  
e.g. `bb script/check_incoming_branchname.clj --target-branch master` exits 0.

| branch | exit-code |
|:---------------------|:----------|
| master | 0 |
| release-x.49.x | 0 |
| docs-workflow-test-1 | 0 |
| anything-else | 1 |

##### `cleanup_cloud_docs.clj`

Cloud docs have been moved into the main repo! This script makes sure they only
land in latest. Why? Because cloud always runs the latest version of Metabase.

##### `sync_repo.clj`

- `bb script/sync_repo.clj --from-repo .marketing_repo`
    - Copies control directories from the marketing repo
    
- `bb script/sync_repo.clj --delete`
    - Resets this repo's control directories

##### `update_docs_for_branchname.clj`

``` shell
$ bb script/update_docs_for_branchname.clj --dry-run --target-branch release-x.54.x --source-branch my-branch

┌ Command for release-x.54.x
│ ./script/docs release-x.54.x --set-version v0.54 --source-branch my-branch
└
```

When the release version number matches the latest docs_version number from the
_config.yml file, automatically sets `--latest` as well:

``` shell
bb script/update_docs_for_branchname.clj --dry-run --source-branch cool-55-docs --target-branch release-x.55.x

┌ Command for release-x.55.x
│ ./script/docs --update --latest --source-branch cool-55-docs
└
```

##### `analyze_links.clj`

Builds ontop of our existing link checking. Since the original jekyll site has
been split into 2, [htmlproofer](https://github.com/gjtorikian/html-proofer)
cannot see links to the marketing site. So this step runs `htmlproofer`, and
checks `metabase.com` for all "missing links" reported.

This will stop the build when there are htmlproofer-reported links that are not
live on `metabase.com`.

##### `update_or_create_pr.clj`

Git adds, commits, and creates or updates a PR to master with files associated
with the branch. Includes a detailed description in the body of where the PR came from.

``` shell
bb script/update_or_create_pr.clj \
   --source-branch "$MAIN_REPO_SOURCE_BRANCH" \
   --target-branch "$MAIN_REPO_TARGET_BRANCH" \
   --annotation "$ANNOTATION" \
   --pr-number "$PR_NUMBER" \
   --update-dirs "$UPDATE_DIRS"
```

## Tests

Given the non-trivial scripts run during a build, there are tests for these
scripts to ensure they work.

See: [script/_test/all.clj](script/_test/all.clj).

They are run in the `Process Docs Workflow`, and can be run manually via:

``` shell
bb script/_test/all.clj
```
