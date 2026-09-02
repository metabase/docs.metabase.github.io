# Metabase docs site

An Astro site that renders the Metabase docs.

## Quick start

```sh
bun i
bun dev
```

The dev server runs at http://localhost:4321/docs/latest/.

## Serving docs from a local Metabase repo

```
cp .env-dist .env
```

Point `METABASE_REPO_PATH` at your local Metabase repo (defaults to `../metabase`, i.e. it assumes the repo is a sibling of this one).

With `METABASE_REPO_PATH` set, `/docs/latest` serves your current branch (NOT the latest branch), and hot-reloads files from your local Metabase repo. Only `/latest` routes are available, which again, are the docs from whatever branch your Metabase repo is on.

If you change the `.env` file, restart the server.

To serve all versions from `./_docs`, comment out `METABASE_REPO_PATH` in your `.env`.
