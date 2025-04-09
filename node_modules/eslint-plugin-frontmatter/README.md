# eslint-plugin-frontmatter

[![Build Status](https://travis-ci.org/duhaime/eslint-plugin-frontmatter.svg?branch=master)](https://travis-ci.org/duhaime/eslint-plugin-frontmatter)


Remove [YAML frontmatter](https://jekyllrb.com/docs/frontmatter/) from `.js` files before calling ESLint. Given the following file:

```js
---
process: true
---

const cat = () => console.log('meow')
```

This plugin removes the frontmatter and sends the remaining content to ESLint:

```js
const cat = () => console.log('meow')
```

The use case for this plugin was JavaScript development for a site built with [Jekyll](https://jekyllrb.com/).

## Installation

You'll first need to install [ESLint](http://eslint.org):

```bash
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-frontmatter`:

```bash
$ npm install eslint-plugin-frontmatter --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-frontmatter` globally.

## Usage

Add `frontmatter` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": [
    "frontmatter"
  ]
}
```

After adding this plugin, frontmatter will be removed from your JavaScript files before they're linted.

## Tests

To start the tests, run:

```bash
npm run test
```