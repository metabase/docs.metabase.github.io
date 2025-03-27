---
title: "Some things to know before trying out version 0.30"
summary: Lots is changing in 0.30, so here's how to prepare.
date: 2018-07-12 00:10:58
last_updated_at: 2018-07-12 00:10:58
categories: "News"
author: Maz Ameli
image: /images/posts/some-things-to-know-before-trying-out-version-0.30.jpg
layout: post
---

For the past couple of months we've been working hard on changes to Metabase that will hopefully make your life much easier, but it also means lots about Metabase has changed. Here are some highlights of what's different, and some important things you should know before you [try out the pre-release](https://github.com/metabase/metabase/releases/tag/v0.30.0-rc).

### What's different

#### Dashboards and pulses are saved in collections now

We heard from many of you that as your team starts having lots of dashboards, questions, collections, and pulses, that organizing and finding things becomes rough. So now, dashboards and pulses can be saved and organized within your collections, just like saved questions. The old Dashboards and Pulses pages have gone away. To make a new dashboard or pulse, click the plus button in the top-right of Metabase.

#### Collections can have sub-collections

You can now create or move collections inside of other collections, allowing you to create a hierarchy of collections and unleash your inner organization nerd. Additionally, users who aren't administrators can now create new collections, as long as they have Curate permission for the current collection.

#### App-wide search

At the top of the screen in Metabase there's now a search bar where you can enter in the name of any dashboard, collection, question, or pulse to find it quickly.

#### The homepage

Right away you'll notice that the homepage is all different. If you want to see the list of activity that used to be here, just click the bell icon in the top-right of the screen.

The new homepage has three new main sections:

1. Start Here — this will show all the dashboards in your main collection ("Our analytics") that you've pinned. If you don't have any pinned dashboards, you'll see some x-ray suggestions here instead.
2. Our Analytics — an overview of your collections. Click on "Browse all items" to see all of your collections and saved items.
3. Our Data — these are the databases you've connected to Metabase. Click on one to see its contents and quickly view a table.

### Before you upgrade

Before you run off and upgrade in your excitement, here are some things you should know:

- When you upgrade, your **existing dashboards and pulses will be moved** inside of two new "Migrated dashboards" and "Migrated pulses" collections. Additionally, any saved questions you currently have that are not inside of a collection (i.e. in the "Everything Else" area of the current Questions page) will be moved into a "Migrated questions" collection.
- The rest of your collections and their contents and permission settings won't be changed at all.
- The new "Migrated" collections' permissions will be set to admin-only access to make sure no one will accidentally be able to see something that they shouldn't. **To quickly give your users access to any of these items again** you can either move them into new appropriate collections; or you can edit the permissions of the migrated collections by clicking the Edit (pencil) icon in the top right of the screen while viewing the collection, and clicking "Edit permissions."
- As always, you should **back up your Metabase application database before you upgrade**, just in case.

### Let us know what you think!

Once you've tried out the pre-release of Metabase 0.30, we'd love to get [your feedback](http://discourse.metabase.com/t/metabase-0-30-rc-feedback/4020/2) if you have a few minutes. Thanks in advance, and as always, thanks for using Metabase.
