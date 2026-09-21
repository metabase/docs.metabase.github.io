# Metabase docs site

An Astro site that renders the Metabase docs.

## Quick start

### 1. Install dependencies

```sh
bun i
```

### 2. Choose where the docs come from

#### Option 1: Serve docs from a local Metabase repo

Use this to preview docs changes as you write them. Changes to files in your Metabase repo show up in the browser immediately.

```sh
cp .env-dist .env
```

Point `METABASE_REPO_PATH` at your local Metabase repo (defaults to `../metabase`, i.e. it assumes the repo is a sibling of this one).

With `METABASE_REPO_PATH` set, `/docs/latest` serves your current branch (NOT the latest branch), and hot-reloads files from your local Metabase repo. Only `/latest` routes are available, which again, are the docs from whatever branch your Metabase repo is on.

If you change the `.env` file, restart the server.

To serve all versions from `./_docs`, comment out `METABASE_REPO_PATH` in your `.env`.

#### Option 2: Seed historical `./_docs` versions

Use this to browse the docs for older Metabase versions (e.g. `/docs/v0.55/`), or to work on the site without a local Metabase repo.

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
