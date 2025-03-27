---
title: Importing metrics to a spreadsheet
description: "Importing metrics to a spreadsheet with a Metabase public link keeps your data current, and requires less manual labor than downloading data and manually uploading it to a spreadsheet."
image-hero: /startup-guide/images/spreadsheet-hero.png
image-og: /startup-guide/images/spreadsheet-og.png
---

With imported metrics, you'll be able to see data update without the worry of data changing in Metabase.

To get started, you'll need to enable model and global caching, and public sharing in Metabase.

## Enable model persistence and global caching in Metabase

Model and global caching help prevent import timeouts.

To enable, navigate to **Admin settings > Peformance > Model persistence** and [enable model persistence](/docs/latest/data-modeling/model-persistence).

Enable [global caching](/docs/latest/configuring-metabase/caching) by navigating to **Admin settings > Performance > Database caching settings** and make sure your database has a caching policy set up.

## Enable public sharing in Metabase

Importing metrics to a spreadsheet requires an exposed public URL. To create this URL, you'll first need to enable public sharing. This requires admin privileges.

Public sharing is enabled by default, but if you've disable it you can navigate to **Settings gear icon** > **Admin settings** > **Public sharing**.

There are a few caveats to public sharing that you should keep in mind when enabling public sharing:

1. **Security**: A public link URL contains an obfuscated UUID, and accessing the URL only displays the static (view-only) results of your question. Those with a link will not be able to drill down into, or manipulate, the underlying data, or access any area of your Metabase instance. However, this link will be publicly available, meaning someone who isn’t a part of your organization or company will be able to view it if they know the URL.
2. **Impact on entire instance**: Once enabled, public sharing is available for the entire Metabase instance. After enabled, you can deactivate public sharing for specific questions, dashboards, and actions by accessing the public sharing options under admin settings. To deactivate sharing for specific options, navigate to the **Settings gear icon > Admin settings > Public sharing** and click the **X** in the **Revoke link column**.

## Create a public link for the Metabase question you want to export

Creating a public link for questions that contain your metrics allows you to import those metrics into a spreadsheet.

To create a public link:

1. Navigate to your question in Metabase, and click on the **Sharing** icon in the bottom right.
2. Click **Public link**.
3. Click on the CSV file format (below the **Public link** URL).
4. Open the public link in a new tab to test the download.
5. Copy the link.

## Create a spreadsheet and import your metrics

To import your metrics, you'll first need to create a new spreadsheet in Excel or [Google Sheets](https://docs.google.com/spreadsheets/).

In any cell, use the [IMPORTDATA](https://support.google.com/docs/answer/3093335?hl=en) function and paste the public link. For example, **`=IMPORTDATA(“https://your-instance.metabase.com/public/question/c5a375a1-4e16-905a.csv“)`**. This will import the data into the spreadsheet so you can create tabs for actuals and projections without impacting the questions you actively use to track trends and irregularities in Metabase.
