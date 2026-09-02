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

With `METABASE_REPO_PATH` set, `/docs/latest` serves and hot-reloads files from your local Metabase repo, and only `/latest` routes are available — earlier versions 404. Comment it out to serve all versions from `./_docs` instead.

Restart the dev server after changing `.env`.
