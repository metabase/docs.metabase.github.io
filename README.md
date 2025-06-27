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

[Process Docs Changes](.github/workflows/process_docs_changes.yml) is triggered
by the
[docs_bump_detected.yml](https://github.com/metabase/metabase/blob/master/.github/workflows/docs_bump_detected.yml)
and
[docs_merge_detected.yml](https://github.com/metabase/metabase/blob/master/.github/workflows/docs_merge_detected.yml)
workflows in the main metabase repo. They trigger for PRs when a PR with docs
changes gets opened/edited or merged respectively. This happens only for PRs
targeting `master` or a release branche (`release-x.N.x`).

They both open a PR in this repo reflecting the changes from the source branch
of the PR which triggered the `Process Docs Changes` workflow.

- [docs_bump_detected.yml](https://github.com/metabase/metabase/blob/master/.github/workflows/docs_bump_detected.yml)

Triggered whenever a PR is opened or updated (but not merged).

- [docs_merge_detected.yml](https://github.com/metabase/metabase/blob/master/.github/workflows/docs_merge_detected.yml)

Triggered when the PR is merged.

When this happens, we merge the `{target-branch}->{source-branch}` PR into
`master` in this repo.

---

# Process Docs Changes Workflow

This workflow handles all documentation updates triggered by changes in the main `metabase/metabase` repository. It creates/updates documentation PRs when a PR touching `/docs` is opened in metabase/metabase. It merges those PRs when a PR touching `/docs` is merged in metabase/metabase.

## Running Manually

It can be nice to run these by-hand, this is how you'd go about it. All these examples assume your current working directory is the root of this repo.

### Update Documentation
```bash
# Assuming docs-update-naming-55 is a branch that exists in the main repo:
gh workflow run "Process Docs Changes" \
  --field source_branch="docs-update-naming-55" \
  --field target_branch="master"
```

### Merge Documentation PR
```bash
gh workflow run "Process Docs Changes" \
  --field source_branch="docs-update-naming-55" \
  --field target_branch="master" \
  --field dispatch_type="docs_merge"
```

## Parameters

| Parameter | Required | Type | Default | Description |
|-----------|----------|------|---------|-------------|
| `source_branch` | ✅ | string | - | The feature/source branch from metabase/metabase that triggered this workflow |
| `target_branch` | ✅ | string | - | The target branch in metabase/metabase (usually `master` or `release-x.MM.x` for backports) |
| `annotation` | ❌ | string | `"auto-build"` | Optional note displayed in the build queue and PR title for data lineage |
| `dispatch_type` | ❌ | choice | `"docs_update"` | Action type: `docs_update` (create/update PR) or `docs_merge` (merge PR) |

## How It Works

### Branch Mapping
The workflow maps branches from the main repository to documentation changes:
- **Source → Target**: `docs-update-naming-55` → `master` creates a PR with branch `docs-update-naming-55->master` targeting `master` in this repo.
- **Backports**: `docs-hotfix-security` → `release-0.50.x` creates a PR with branch `docs-hotfix-security->release-0.50.x` targeting `master` in this repo.

### Dispatch Types

#### `docs_update` (Default)
Creates or updates a documentation PR with the naming pattern `[annotation] {source-branch}->{target-branch}`. The branchname for the PR will always be `{source-branch}->{target-branch}`.

**Example**: Source `docs-new-way-to-query` targeting `master` creates/updates PR named `[auto-build]docs-new-way-to-query->master`. This PR, in this repo, will have branchname `docs-new-way-to-query->master` and target `master` in this repo.

#### `docs_merge`
Merges the existing documentation PR that matches the `{source-branch}->{target-branch}` branchname pattern. Also runs linters as part of the merge process for safety.

## Manual Use Cases

These happen automatically for PRs in metabase/metabase, but it can still be handy to kick them off manually.

### 1. Manually Update New Feature Documentation
When adding documentation for a new feature:

```bash
gh workflow run "Process Docs Changes" \
  --field source_branch="docs-query-builder-v2" \
  --field target_branch="master" \
  --field annotation="manual update"
```

### 2. Manually Update Backport Documentation
For release backports:

```bash
gh workflow run "Process Docs Changes" \
  --field source_branch="docs-security-patch" \
  --field target_branch="release-0.50.x" \
  --field annotation="manual backport update"
```

### 3. Manually Merge Completed Documentation

```bash
gh workflow run "Process Docs Changes" \
  --field source_branch="docs-query-builder-v2" \
  --field target_branch="master" \
  --field dispatch_type="docs_merge"
```

## Workflow Examples

### Tracking Multiple Workflows
Use descriptive annotations to track related workflows:

```bash
# Sprint 42 features
gh workflow run "Process Docs Changes" \
  --field source_branch="docs-dashboards-v3" \
  --field target_branch="master" \
  --field annotation="Sprint 42: Dashboard v3"

gh workflow run "Process Docs Changes" \
  --field source_branch="docs-alerts-redesign" \
  --field target_branch="master" \
  --field annotation="Sprint 42: Alerts redesign"
```

## Tips and Best Practices

### Annotations
- Use descriptive annotations to identify workflows in the build queue and PR titles
- Keep them concise since they appear in PR titles

### Branch Naming
- Source branch must match exactly what's in metabase/metabase
- Target branch is typically `master`
- Use `release-x.MM.x` format for backports (e.g., `release-0.50.x`)

## Important Pitfalls

### Deleted Source Branches
**Critical**: The source branch must exist in metabase/metabase when running this workflow. If the source branch has been deleted (e.g., after merging the original PR), the workflow will fail.

**Solution:**:
1. **Restore the branch** in metabase/metabase before running the workflow

**Example scenario**:
```bash
# ❌ This will fail if docs-update-naming-55 was deleted
gh workflow run "Process Docs Changes" \
  --field source_branch="docs-update-naming-55" \
  --field target_branch="master"

# ✅ First restore the branch in metabase/metabase, then run workflow
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Branch not found" error | **Most common**: Source branch was deleted from metabase/metabase. Restore it first. |
| Workflow doesn't create PR | Check if PR with same name already exists |
| Merge fails | Ensure the docs PR exists and is ready to merge |
| Build queue confusion | Use descriptive `annotation` values |
| Workflow fails immediately | Verify both source and target branches exist in metabase/metabase |

## Repository Dispatch

This workflow also responds to repository dispatch events with types `docs_update` and `docs_merge`, allowing it to be triggered programmatically from the metabase/metabase repo.

---

## Workflow Scripts Overview

### [Process Docs Changes](.github/workflows/process_docs_changes.yml)

Notable steps:

- `Update docs for branchname`:
  - Downloads docs from metabase/metabase, adds frontmatter, and builds SDK docs
    using cljs compiler.

- Builds Jekyll site

- Lints markdown, styles, scripts, and links.

- Opens PR with changes to `master` for the `_site` (html/js/css), and `_docs`
  (markdown) directories.


#### Steps required for a faithful build

- Since we've split up the site into 2 jekyll instances, we cannot rely on
  htmlproofer to check links from the docs to the marketing site. So
  `analyze_links.clj` checks any missing links against `metabase.com`.
  
- Copies over control directories from marketing repo: `_data`, `_includes`,
  `_layouts`, `_plugins`, and `_sass`. These are needed so we get a faithful
  docs build.

#### Triggering

The [Process Docs Changes](.github/workflows/process_docs_changes.yml) workflow
is triggered from `metabase/metabase` (aka the main repo). The triggering
workflow includes the target and source branch name, e.g.: [`my-docs-hotfix` ->
`master`] or [`v49-new-feature-dox` -> `release-x.49.x`].

Building docs can be [run
manually](https://github.com/metabase/docs.metabase.github.io/actions/workflows/process_docs_changes.yml)
as well.

#### New Script Docs

Note, these scripts take an optional `--dry-run` flag that explains what they do
without actually doing the operation.

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

##### `update_docs_for_branchname.clj`

Garunteed to be ran on a valid branchname (due to `check_incoming_branchname`
above):

``` shell
$ bb script/update_docs_for_branchname.clj --dry-run --target-branch release-x.54.x --source-branch my-branch

┌ Command for release-x.54.x
│ ./script/docs release-x.54.x --set-version v0.54 --source-branch my-branch
└
```

When the release version number matches the latest docs_version number from the
_config.yml file, it sets latest as well:

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
with the branch.

- `bb script/update_or_create_pr.clj master`

## Tests

Given the non-trivial scripts run during a build, there are tests for these
scripts to ensure they work.

See: [script/_test/all.clj](script/_test/all.clj).

They are run in the `Process Docs Workflow`, and can be run manually via:

``` shell
bb script/_test/all.clj
```
