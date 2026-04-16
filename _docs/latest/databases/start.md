---
version: v0.60
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: false
category: Databases
title: Databases overview
source_url: 'https://github.com/metabase/metabase/blob/master/docs/databases/start.md'
layout: new-docs
redirect_from:
  - /docs/latest/databases
latest: true
---

# Databases overview

## [Adding and managing databases](./connecting)

Connect to and manage your databases.

## [Database users, roles, and privileges](./users-roles-privileges)

Bundling your privileges into roles based on use cases makes it easier to manage privileges in the future.

## [Syncing and scanning databases](./sync-scan)

Metabase runs different types of queries to stay up to date with your database.

## [Encrypting your database connection](./encrypting-details-at-rest)

Learn how to encrypt your database connection credentials at rest.

## [SSH tunneling](./ssh-tunnel)

Metabase can connect to some databases by first establishing a connection to a server in between Metabase and a data warehouse, then connecting to the data warehouse using that connection as a bridge.

## [SSL certificate](./ssl-certificates)

You can connect your Metabase Cloud or self-hosted instance to a database using Secure Socket Layer (SSL) encryption with a certificate.

## [Uploading data](./uploads)

You can set Metabase up so you can upload CSV files to a database.
