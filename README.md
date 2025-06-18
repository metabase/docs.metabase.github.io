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

#### Steps required for a faithful build:

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
