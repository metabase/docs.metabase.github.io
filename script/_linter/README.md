# Linter

A set of commands for linting the website.

## Usage

You can run `script/lint`, which will run all linters.

To run a specific command, run `npm run <command>`

To see a list of commands, run `npm run`.

```
  frontMatter-blog
    node script/_linter/bin/front-matter.js --folder _posts --config script/_linter/config/blog.json
  frontMatter-glossary
    node script/_linter/bin/front-matter.js --config script/_linter/config/glossary.json --folder _glossary
```

Add new commands in package.json.

## Install

From the metabase.github.io directory, run:

```
npm install
```

This command downloads the node_modules.
