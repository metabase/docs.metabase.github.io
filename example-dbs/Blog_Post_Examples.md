---
sitemap: "false"
---

# Blog Post Examples

One of the most powerful things you can do when sharing howto posts is giving the reader an environment they can follow along in.

This document proposes a way that this could be done for our dear blog readers with a combination of pre-populated H2 databases and Docker.

## Proposal

We should be able to make it as simple as spinning up a Docker container for the reader to login to.

```shell
docker run metabase/blog:cross-filtering
```

## Prerequisites

- Docker

## Getting Started

First, fire up a shiny new Metabase.

```shell
# Create a directory for our example databases if it doesn't exist already
mkdir example_dbs

# Change into this directory - we want to run docker build from here, otherwise we send the entire blog directory to Docker
cd example_dbs

# Spin up Metabase with the desired version!
docker run -p 3000:3000 --network metabae --name metabase metabase/metabase:v0.37.0.2
```

Then create some dashboards and whatnot. We'll also configure our Metabase instance using the Metabase Configurator from `success-engineering`

```shell
docker run --rm --name configurator --network metabae \
  -e MB_HOSTNAME=metabase \
  -e MB_ADMIN_EMAIL=admin@metabase.blog \
  metabase_config_environment
```

When you're done, shut down your Docker image.

## Preparing your demo container

- Copy your Metabase db to your local filesystem

```shell
docker cp metabase:/metabase.db/metabase.db.mv.db ./
```

- Build a Docker image with that database pre-existing!

_Note the `VARIANT` variable that specifies the version so this example will always be in sync with the blog post`

```shell
docker build -t mb_blog_crossfilter . --build-arg VARIANT=v0.37.0.2
```

## Let's see if it worked!

```shell
docker run --rm -p 3535:3000 --name mb_blog_whatwhat mb_blog_crossfilter
```

That's it! It worked! 🎃

## Remove your blog container if you're all done

```shell
docker rm metabase
```

## Push to production

In theory, we can push this to an official dockerhub repo like so:

```shell
docker tag mb_blog_crossfilter metabase/blog:cross-filtering
docker push metabase/blog:cross-filtering
```

One open question:

- Do we want to maintain the `.db`. files in this repo?
