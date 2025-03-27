---
title: "Metabase 0.13"
subtitle: Pulses
date: 2015-12-03 16:10:58
categories: jekyll update
image: /images/releases/metabase-0.13.jpg
author: Sameer Al-Sakran
redirect_from: /blog/a-new-version-is-out/
---

Hot off the presses, and just in time for the holidays, version 0.13 of Metabase is ready!

The reaction to our initial release surprised and delighted us and we want to let you know we’ve been listening to your feedback and requests. The elves have been hard at work, and we’re excited to show you what we have for you.

For more details read on!

## Pulses

One of the foundations of a good analytics setup is a nightly email that gets everyone in your company on the same page regarding important metrics. With our new Pulses feature, you can send a set of core metrics to everyone in your company through email or our new Slack integration.

## Database Improvements

Right after launch there was an outpouring of requests for additional drivers. Included in v0.13 is support for three new databases: _SQL Server_, _SQLite_ and _Amazon Redshift_! With Redshift and SQL Server we move into the land of large scale data warehouses, and in our testing with early users, we’ve been able to see Metabase used to analyze databases with billions of rows with ease!

We’ve also improved our old standby’s with the addition of SSL support for MongoDB connections and support for Schemas in PostgreSQL.

## SSL termination at the Metabase Jetty instance through environment variables

For administrators who want to run Metabase on HTTPS (which we strongly recommend) but didn’t want to deal with termination on nginx or elastic load balancers (on AWS), you can now terminate the SSL connection directly on the Metabase server. This makes it easier to secure your organization’s data.

## MySQL as the application database

You can now run Metabase and have it store it’s application data in a MySQL database in addition to H2 or PostgreSQL as before. Organizations running MySQL can now avoid introducing another database into their infrastructure.

## Heroku will automatically use SMTP add-ons

If you are trying out Metabase on Heroku, we will now automatically detect SMTP add-ons. This means more of Metabase functionality is available without any effort on your part!

We hope you’ll upgrade to v0.13 for these new features as well as > 100 other improvements and bug fixes. The [release notes](https://github.com/metabase/metabase/releases/tag/v0.13.0) at github have a list of major improvements and a full list of all the changes can be found [here](https://github.com/metabase/metabase/issues?q=milestone%3A0.13.0+is%3Aclosed).

Head over to [metabase.com/start](/start/) and give the new version a whirl!
