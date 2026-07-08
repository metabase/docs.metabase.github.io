---
version: v0.63
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: false
category: 'Troubleshooting Guide'
title: 'Troubleshooting guides'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/troubleshooting-guide/index.md'
layout: new-docs
---

# Troubleshooting guides

Problems, their causes, how to detect them, and how to fix them.

## Getting diagnostic info

- [Download diagnostic info](./diagnostic-info)
- [Create a HAR file](./create-har-file)

## Installation

- [Running the Metabase JAR][running].
- [Running Metabase on Docker][docker].
- [Using or migrating from an H2 application database][appdb].

## Authentication

- [People can't log in to Metabase][login].
- [LDAP][ldap].
- [SAML][saml].

## Permissions

- [My permissions aren't working][permissions].
- [Row and column security isn't working][row-and-column].

## Databases

- [I can't connect to a database][db-connection].
- [I can't see my tables][cant-see-tables].
- [The data in Metabase doesn't match my database][sync-fingerprint-scan].
- [My database is slow][db-performance].
- [My connection or query is timing out][timeout].

## Questions and dashboards

- [I can't save my question or dashboard][proxies].
- [I can't view or edit my question or dashboard][view-edit].
- [My visualizations are wrong][visualization].
- [My dashboard is slow or failing to load][slow-dashboard].
- [My SQL question doesn't work][sql].
- [The dates and times in my questions and charts are wrong][incorrect-times].
- [My filters don't work][filters].
- [My linked filters don't work][linked-filters].

## Models

- [My model doesn't work][models].

## Email and alerts

- [Metabase isn't sending email][not-sending-email].
- [Troubleshooting notifications](./notifications).

## Error messages

- [I'm getting an error message][error-message].

## Think you found a bug?

- [How to find known bugs or limitations][known-issues].
- [Filing a bug report][bugs].

## Feature requests

See [Requesting new features][feature-request].

## Metabase tutorials

For tutorials that walk you through how to use Metabase features, check out [Learn Metabase][learn].

## Metabase forum

To see if someone else has run into a similar issue, check out [our forum on Discourse][forum].

## Upgrading Metabase

Metabase adds new features and squashes bugs with each release. [Upgrading to the latest and greatest][upgrade] may resolve your issue. If you're using [Metabase Cloud][cloud], we'll handle the upgrades for you. To see what's new, check out the [release notes][releases].

[appdb]: ./loading-from-h2
[bugs]: ./bugs
[cant-see-tables]: ./cant-see-tables
[cloud]: /cloud/
[db-connection]: ./db-connection
[db-performance]: ./db-performance
[docker]: ./docker
[error-message]: error-message
[feature-request]: requesting-new-features
[filters]: ./filters
[forum]: https://discourse.metabase.com/
[incorrect-times]: ./timezones
[known-issues]: ./known-issues
[ldap]: ./ldap
[learn]: /learn
[linked-filters]: ./linked-filters
[login]: ./cant-log-in
[models]: ./models
[not-sending-email]: ./cant-send-email
[permissions]: ./permissions
[proxies]: ./proxies
[releases]: https://github.com/metabase/metabase/releases
[running]: ./running
[saml]: ./saml
[row-and-column]: ./row-and-column-security
[slow-dashboard]: ./my-dashboard-is-slow
[sql]: ./sql
[sync-fingerprint-scan]: ./sync-fingerprint-scan
[timeout]: ./timeout
[upgrade]: ../installation-and-operation/upgrading-metabase
[view-edit]: ./cant-view-or-edit
[visualization]: ./visualization
