# Metabase docs site

An Astro site that renders the Metabase docs.

## Quick start

### 1. Install dependencies

```sh
bun i
```

### 2. Choose where the docs come from

#### Option 1: Serve docs from a local Metabase repo

ℹ️ *Use this to preview docs changes as you write them. Changes to files in your Metabase repo show up in the browser immediately.*

```sh
cp .env-dist .env
```

Point `METABASE_REPO_PATH` at your local Metabase repo (defaults to `../metabase`, i.e. it assumes the repo is a sibling of this one).

With `METABASE_REPO_PATH` set, `/docs/latest` serves your current branch (NOT the latest branch), and hot-reloads files from your local Metabase repo. Only `/latest` routes are available, which again, are the docs from whatever branch your Metabase repo is on.

If you change the `.env` file, restart the server.

To serve all versions from `./_docs`, comment out `METABASE_REPO_PATH` in your `.env`.

#### Option 2: Seed historical `./_docs` versions

ℹ️ *Use this to browse the docs for older Metabase versions (e.g. `/docs/v0.55/`), or to work on the site without a local Metabase repo.*

```sh
bun script/seed-docs-history.ts
```

This downloads the `docs/` folder from each Metabase release and saves it to `./_docs/<version>/` (e.g. `./_docs/v0.55/`). Also creates `./_docs/latest`, a copy of the latest version's files (including cloud docs).

- By default, only currently supported versions are seeded.
- To seed every version, run `bun script/seed-docs-history.ts all`.
- `./_docs` is generated and gitignored, so don't edit it by hand.

### 3. Run the dev server

```sh
bun dev
```

The dev server runs at http://localhost:4321/docs/latest/.

## Stylesheets

`public/docs/css` holds the stylesheets the docs chrome and content rely on. They
were copied from the marketing site when the remotely fetched shared chrome was
retired (GRO-828) and then pruned to what the rendered docs pages actually use
(GRO-905):

| File             | Role                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------- |
| `styles.css`     | Minified Bootstrap 5 subset (scoped under `.bootstrap`) plus the header, footer, `.learn` docs layout, breadcrumb, in-page promo and code-copy styles ported from the marketing bundle. |
| `main.css`       | Legacy global styles: typography, links, lists, tables, `.Button`, the old (pre-v0.44) docs layout, image zoom and the feedback widget. Linted by stylelint. |
| `docs.css`       | Docs-only overrides for the old docs layout (`.MB-Documentation`, `.container-docs`).       |
| `docs-local.css` | Styles that only ever lived in this repo (version selector tags, unsupported-version notice). Loaded last so it can override the files above. |
| `gdpr.css`       | Metabase theme for the vendored GDPR cookie notice (`public/docs/gdpr-cookie-notice`).      |
| `inkeep.css`     | Theme for the Inkeep search/chat widget.                                                    |

The pruning is done by `script/audit-css.ts`:

```sh
bun run build && bun script/audit-css.ts          # report only, output in tmp/css-audit/
bun run build && bun script/audit-css.ts --write  # rewrite public/docs/css in place
```

It keeps a selector when every class, id and tag it references appears in the
built site (`_site`, so every docs version counts), in a class/id context in
first-party JavaScript, in an Astro component or Liquid include, or belongs to a
runtime library that injects its own markup (Inkeep `ikp-*`, highlight.js
`hljs-*`, the GDPR notice, image zoom, anchor.js, checkpoints). Anything else was
only used by marketing pages or the retired shared chrome and was removed.
Pseudo-class, pseudo-element and media-query variants of a kept selector are
kept with it. Re-run it after adding markup that relies on a rule the audit
would otherwise drop, or pass `--safelist=class-a,class-b` for classes that are
composed at runtime.

Sections that remain large on purpose:

- The Bootstrap reboot, grid (`.row`, `.col-*` used by the header) and spacing,
  flex, display and typography utilities that the header, footer, breadcrumb,
  plans blockquote and feedback widget markup use.
- `.navigation-header` / `#nav-menu-mobile` (desktop mega menu and mobile
  drawer) and `.site-footer`.
- `.bootstrap .learn …` rules: the current docs layout, including the
  `.copy-code-button`, `.checkpoint__*`, `.table-overflow` and
  `.image-wrapper` styles that JavaScript adds after load.
- `.h1`–`.h6` alias selectors: `new-docs-anchor-links.js` adds the heading tag
  name as a class to the wrappers it creates.
