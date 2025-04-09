# metabase.github.io

The [website](/) for [Metabase](https://github.com/metabase/metabase).

## Prerequisites

This repo includes some out-of-date dependencies, so specific node/ruby versions are necessary.

### Node

Minimum version of Node is `10.x`, specifically tested on `10.22.0`.

[nodenv](https://github.com/nodenv/nodenv) can be used to maintain different versions of Node.

### Ruby

The Ruby version should be `3.3.2` as it is the latest version (as of June 2024)

It is recommended to use an environment manager for Ruby such as [rbenv](https://github.com/rbenv/rbenv).

## Development

### Setup

This is a [Jekyll](http://jekyllrb.com) site hosted on [GitHub Pages](http://pages.github.com). To build a Jekyll site you'll need a few things on your system so double check the [Jekyll requirements](http://jekyllrb.com/docs/installation/#requirements).

Follow these steps to copy this repository to your computer and build the site:

1. [Set up SSH on your machine](https://docs.github.com/en/authentication/connecting-to-github-with-ssh). Once set up, you'll be able to clone the repository on your local machine.
2. Clone the repository.

   ```bash
   git clone git@github.com:metabase/metabase.github.io.git

   ```

3. Then build the website.

   ```bash
   cd metabase.github.io
   script/bootstrap
   script/server
   ```

Open your browser to http://localhost:4000.

On the first go around, this process will probably fail. If you're on Mac, and you run into issues with building native extensions like **ffi** and **nokogiri**, you may need to install Xcode, both the command-line tools via `xcode-select --install`, as well as the Xcode application from the app store.

If you make changes to js files, you must run `npm run build`. If you get the exception `primordials is not defined` you must use node version 11 or 10 instead of anything newer. ~~You may need to use [nvm](https://github.com/nvm-sh/nvm) to install and use it. It's a bit of a mess on macos.~~ `graceful-fs` has been added to the dependencies so `primordials` is found.

### Setup using Docker and VS Code

This allows working, editing, and viewing the website _without_ worrying about the right version of Ruby/gems and Node.js/npm dependencies. The only requirements: working Docker and VS Code.

1. Launch VS Code and install [Remote Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).
2. Check out this branch, open it with VS Code.
3. VS Code prompts you to “Reopen in container”. Accept that and wait for a while (Note: VS Code will create the container for the first time and it may take some time, however it is cached so any future loading should be much faster).
4. Open the terminal (Ctrl+J) as usual, and execute:

   ```bash
   bundle update --bundler
   script/bootstrap
   script/server
   ```

5. Open localhost:4000.

### Notes on installation

We are using a [custom GitHub Actions workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow) with `Jekyll 4.3.3` (latest as of June 2024) with `Ruby ~> 3.3.2`.

#### Troubleshooting

##### Ruby notes

###### Version

During `bundle`, if an error appears regarding Ruby version, you might need to install a different one:

1. Run the command: `rbenv install 3.3.2`
2. Run the command: `rbenv local 3.3.2` or `rbenv global 3.3.2`
3. Restart your terminal (or Docker)
4. Run the command `rbenv local` or `rbenv global` to check the Ruby version

###### Path

If you run scripts outside of the `Remote-Containers` plugin for VS Code and the local Ruby version used by your OS does not match the Ruby version specified in [.ruby-version](https://github.com/metabase/metabase.github.io/blob/master/.ruby-version), that error might appear:

```bash
Your Ruby version is X.X.X, but your Gemfile specified X.X.X
```

Steps to set the Ruby version:

1. Install the correct Ruby version by going through these [steps](https://github.com/metabase/metabase.github.io#ruby-1)
2. Check which Ruby is being used by your OS with command: `ruby -v`
3. If the Ruby version does not match the required one, make sure that `rbenv` is added to your paths with command:

   ```bash
   export PATH="$HOME/.rbenv/bin:$PATH"
   eval "$(rbenv init -)"
   ```

   If you are on mac os, add `eval "$(rbenv init - zsh)"` to your `.zshrc` file.

4. Then run the Ruby install again with commands:

   1. `rbenv install 3.3.2` (skip if already installed prompt appears)
   2. `rbenv global 3.3.2`
   3. `rbenv local 3.3.2`

##### Docker

We have experienced error while trying to update an already existing install with the latest Docker setup.

If such thing happens, it is recommended to reinstall fully the project by starting with the repository checkout step.

##### SASS

An error regarding `SASS` might appear:

```bash
Conversion error: Jekyll::Converters::Scss encountered an error while converting 'css/styles.scss': nil can't be coerced into Integer
```

It is related to the way SASS is parsing the entry file, solve by making sure you are using the relevant Ruby version.

### Building and serving the site locally

To build the site:

```bash
script/build
```

To serve the site:

```bash
script/server
```

This script builds the site incrementally, and defaults to localhost:4000.

### How to speed up development for metabase.github.io

To avoid building all of the education pages every time:

```bash
script/marketing-pages
```

To focus just on the education pages (learn and docs):

```bash
script/ed
```

Which uses the [_config.docs.yml](./_config.docs.yml) as the config.

### My changes aren't showing up

If you changed something, but it's not showing up on the site, run:

```bash
script/build && script/server
```

The normal script `script/server` uses an incremental build flag, so you'll need to run the full build command first in order for the build to pick up the changes.

### How to check for broken links on the website

If you're working on documentation, go to the section below.

```bash
script/build && script/links
```

To check a single file, (assuming you've already run `script/build`):

```bash
script/links _site/path/to/file
```

### How to check for broken links in documentation

Follow the steps under [Making changes to documentation](#making-changes-to-documentation), then run:

```bash
script/build && script/links
```

If you have broken links:

- Fix them in this repo and re-run the command above to test your changes.
- Add the fixes to your branch in the [Metabase repo](https://github.com/metabase/metabase)

If you're done checking links, delete the docs you just fetched:

```bash
git add --all
git reset HEAD --hard
```

Delete the branch:

```bash
git branch -d <website-branch-name>
```

### How to bundle javascript file under `/src`

1. Set up the dependency graph for the webpack so it knows which modules needs to generates the bundle.

   ```bash
   npx webpack
   ```

2. Run this command every time you make a change in a javascript file to generate the updated bundles.

   ```bash
   npm run build
   ```

## Docs on features of the website

[Promo banner](/docs/promo-banner.md)

[Events](/docs/managing-events.md)

## CI

CI is very much a work in progress at the moment.

### Legacy

We are using a **legacy** command to run some tests on the [\_learn pages](https://github.com/metabase/metabase.github.io/tree/master/_learn) using:

```bash
node script/_linter/bin/index.js --learn _data/learn.yml $* all _learn
```

### FrontMatter

Checks for frontMatter missing properties have been added using commands:

```bash
npm run frontMatter-learn
npm run frontMatter-blog
```

### Opengraph images

Designers use a Figma plugin called [Google Sheets Sync](https://www.figma.com/community/plugin/735770583268406934/Google-Sheets-Sync) to import any relevant data from posts/pages to generate opengraph images from those.

A script was created to generate CSV files from the posts/pages so data do not have to be copy/paste manually:

```bash
npm run all-opengraphs
```

When a PR is merged into the `master` branch, we use a Github Action to create a new branch and PR with the CSV files updates so the changes can be reviewed, approved and merged manually.

## Documentation

Documentation is added to the site directly from the `metabase/metabase` repository's `docs` directory. This is done with [Node.js](http://www.nodejs.org/download), so you'll need that on your system and to install the dependencies used here.

```bash
$ cd metabase.github.io
$ npm install
```

### Getting docs from `metabase/metabase`

The instructions below are for manually pulling changes from the [Metabase repo](https://github.com/metabase/metabase) into this repo.

To fetch documentation based on the latest release branch, check out a new branch and run:

```bash
script/docs-update
```

To fetch documentation from a specific branch and tag it with a version number:

```bash
script/docs <metabase-repo-branch> --set-version <version number>
```

### Making changes to documentation

If you want to update the docs, you must work in the [Metabase repo](https://github.com/metabase/metabase), otherwise your changes will be overwritten.

To see what your documentation changes in the Metabase repo will look like on the website:

- Check out a new branch in this repo.
- Fetch the branch with your changes from the [Metabase repo](https://github.com/metabase/metabase) (note that --set-version is required):

```bash
$ script/docs <metabase-repo-branch> --set-version <version number>
# Example:
$ script/docs docs-update-links --latest --set-version v0.41.2
```

From here, you can [test your links](#how-to-check-for-broken-links-in-documentation). Remember to make changes in the [Metabase repo](https://github.com/metabase/metabase), not this (the website) repo.

When you're done testing your changes, you can clean up all uncommitted files with:

```bash
git add .
git reset HEAD --hard
```

## Script/docs

The script downloads the docs from the latest `release_branch` (as specified in `_config.yml`), and writes the docs to the latest version and the `latest` directories in the `_docs` directory.

Other `script/docs` options include:

### `--latest`

Set this current release_branch as the latest docs version:

```bash
script/docs --latest
```

### `--set-version`

Specify how you want to tag the branch.

So, to set master as release `v0.41.2`:

```bash
script/docs master --latest --set-version v0.41.2
```

The above command would download the master tarball, extract the docs and put them into `_docs/v0.41` (or create the directory if this 41 marks a new major release), and set the `site.latest_version` to `v0.41.2`.

## Cloud docs

To update the docs in `_docs/latest/cloud`, edit them in `_cloud-docs` and then run:

```bash
npm run latest-docs
```

## Add frontmatter to latest docs

The latest docs are the only docs that we index for search engines. To add additional key-value pairs to the fronmatter for the latest docs, update the frontmatter JSON at `lib/latest-frontmatter.json`. Then run:

```sh
npm run latest-docs
```

## Linters

Your PRs must pass all of the linters before merging. You can run all of the linters locally by running.

```bash
script/lint
```

Linters include:

- **lint-learn**. Figures are numbered/formatted correctly and tables of contents are correct.
- **lint-learn-data**. Articles in the data file contain the correct keys, and image references point to files that actually exist.
- **frontMatter-blog**. Blog posts contain the required frontmatter keys.
- **frontMatter-glossary**. Glossary entries contain the required frontmatter keys.

See [package.json](package.json) for a list of scripts.

For more info on the code, see [the linter README](script/README.md).

## Deployment

This site is automatically deployed when the `master` branch is changed.
