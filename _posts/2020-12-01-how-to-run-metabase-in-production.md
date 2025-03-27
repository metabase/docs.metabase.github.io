---
title: "How to run Metabase in production"
summary: "We'll walk through the different ways you can run Metabase in production, and give some guidance on what to do next after you're up and running."
date: 2020-12-01 00:14:05
last_updated_at: 2020-12-01 00:14:05
categories: "Using Metabase"
author: The Metabase Team
image: /images/posts/how-to-run-metabase-in-production.jpg
layout: post
---

> We have a [new and improved version of this article](/learn/administration/metabase-in-production).

There are two editions of Metabase: Open Source and Enterprise. And there are two basic ways to run them in production:

1. **Metabase Cloud**, which is the simplest route.
2. **Self-hosting**, either on-prem or using a third-party cloud provider.

We'll walk through the advantages and tradeoffs of each, so you can make the right call for your organization. And since there's more than one way to self-host Metabase, we'll give some guidance to help you choose the setup that makes the most sense for you. Lastly, we'll review some best practices for setting up Metabase, regardless of which path you take.

And don't stress - you can always migrate to a different Metabase setup.

## Metabase Cloud

We'll start with the easiest option: [Metabase Cloud](/cloud/). We host Metabase for you so that you can focus on using it, rather than running it. Each tier we offer is easy to migrate to and from, and comes without headaches: we handle setup, backups, and upgrades, so you just have a hassle-free Metabase experience that benefits from new features as they're released.

**Advantages of Metabase Cloud**

- It just works.
- Potentially more affordable than dealing with - and paying for - a self-hosted solution

**Tradeoffs of Metabase Cloud**

- Less control than setting up your own infrastructure.
- Not the right choice if your organization has data compliance requirements like HIPAA.

## Self-hosting Metabase

We try to make it as easy as possible to self-host Metabase, especially because we know that organizations with regulatory and compliance requirements do (and should) self-host.

To self-host, you'll need:

- A server(s) to run the Metabase [Docker image or JAR](/start/oss/).
- An application database to store questions, dashboards, and users.

**Advantages of self-hosting**

- More control over your infrastructure.
- Potentially cheaper, depending on the experience and resources of your team.

**Tradeoffs of self-hosting**

- You take on overhead: you'll be responsible for migrating to a production application database, then setting up, maintaining, backing up, and upgrading Metabase on your own.

## How to self-host Metabase

If you're committed to self-hosting Metabase, you'll need to make some decisions on how you want to run Metabase in production.

- Metabase Docker image or JAR?
- Which database to use for production application database?
- How to back up your application data?
- On-prem or in the cloud?

### Docker image or JAR?

Metabase comes in two packages: a [Docker image](/docs/latest/installation-and-operation/running-metabase-on-docker) and a [JAR](/docs/latest/installation-and-operation/running-the-metabase-jar-file). Both provide the same experience: your users won't know the difference.

You can't make a bad call here: both options will keep your Metabase running smoothly, and both are [easy to scale](/learn/metabase-basics/administration/administration-and-operation/metabase-at-scale). And under the hood, they both run the Metabase JAR. The reason we provide both options is to give people flexibility when running Metabase in production.

Between running Metabase in a Docker container or as a JAR, our advice is this: if your team is familiar with containers, and understands servers and networking, you may prefer running Docker. Otherwise, run the JAR. If you're new to both Docker and Java, we recommend running the JAR, as there's a lot less to learn.

There are some advantages with running Docker containers, as the containers package only what you need to run Metabase. This app isolation can make it easier to manage and orchestrate your app. And because Docker packages up everything Metabase needs, you don't even need to know how to install Java and run the JAR. The Docker image packages up the JVM required to run the JAR, and runs the JAR for you.

The advantage of running a JAR is that you only need to install Java and run the JAR to get Metabase up and running. You don't need to understand how Docker containers work.

### Migrate the application database to a production database

You'll need to [migrate the application database](/docs/latest/operations-guide/migrating-from-h2) that ships with Metabase (an H2 database) to a production SQL database. The application database stores all of your users, questions, dashboards, and other Metabase application data.

The reason Metabase ships with the H2 database out of the box is to make it easy to get Metabase up and running on your machine. But the H2 database is not suitable for running Metabase in production.

We recommend you migrate to PostgreSQL, MySQL, or MariaDB.

### Back up your application database

You'll also be responsible for [backing up your application database](/docs/latest/operations-guide/backing-up-metabase-application-data) so you don't lose your questions, dashboards, and other reporting data. Some cloud providers offer SQL databases as a service that can handle backups for you.

### Third-party cloud providers

You can use cloud services from providers like Amazon Web Services, Google Cloud Platform, Microsoft Azure and others to run Metabase and your application database.

## After you've installed Metabase

Regardless of which option you pick - Metabase Cloud or self-hosted, Docker or JAR - you'll still need to set up your Metabase:

- Go through the [set up pages](/docs/latest/setting-up-metabase).
- [Configure your settings](/docs/latest/configuring-metabase/start).
- [Connect to your database(s)](/docs/latest/databases/connecting).
- Confirm your [data model settings](/docs/latest/data-modeling/metadata-editing).

Your Metabase will do its best to guess your database's keys and data types so you don't have to fill everything out, but you should still confirm that Metabase guessed correctly. Depending on how your database formats its data, Metabase may, for example, categorize a date field as a text field. Having correct metadata is essential to ensure your visualizations work as expected.

Once you've configured your Metabase, it's time to kick the tires:

- [Ask some questions](/docs/latest/questions/introduction) to check that you've set up your data model correctly.
- Create groups and [add some test users](/docs/latest/people-and-groups/managing).
- Experiment with [data permissions](/learn/metabase-basics/administration/permissions/data-permissions) and [collection permissions](/learn/metabase-basics/administration/permissions/collection-permissions) using the test users.
- When you're happy with you're permissions, add real users and you're off to the races.

## Further reading

- [Scaling Metabase](/learn/metabase-basics/administration/administration-and-operation/metabase-at-scale)
- [More about Metabase Cloud](/blog/Announcing-Metabase-Cloud)
