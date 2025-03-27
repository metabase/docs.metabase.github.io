---
title: "Metabase 53"
subtitle: Save questions to dashboards, dynamic iframe cards, preemptive caching, and more
summary: "Dashboards, caching, models, and queries made more intuitive, contextual, and performant"
date: 2025-02-12 00:12:18
categories: News
image: /images/posts/metabase-53/53-cover.png
author: The Metabase Team
highlights:
  - title: Save questions to dashboards
    description: Cut down on collection clutter
    image: /images/releases/highlights/save-to-dashboard.jpg
    url_fragment: save-questions-straight-to-dashboards
  - title: Dynamic iframe and link cards
    description: Set variables on iframe and link cards to filter external content
    image: /images/releases/highlights/parameters-in-iframes.jpg
    url_fragment: iframe-and-link-card-parameters-let-you-show-content-dynamically
  - title: Preemptive caching
    description: Faster queries with anticipated common query patterns
    image: /images/releases/highlights/preemptive-caching.jpg
    url_fragment: preemptive-caching-for-faster-queries
  - title: Model details in the sidebar
    description: Easier to find contextual metadata
    image: /images/releases/highlights/model-sidebar.jpg
    url_fragment: model-details-now-in-an-expandable-sidebar
  - title: Embedded analytics SDK for React (Beta)
    description: The React toolkit for fully integrated, customized in-app reporting
    image: /images/releases/highlights/embedding-sdk.jpg
    url_fragment: try-the-new-embedded-analytics-sdk-for-react-beta
---

We're at it again with Metabase 53, making your dashboards, queries, and—hopefully—your life more intuitive, contextual, and performant. Let's get into it.

- **If you’re hosted on [Metabase Cloud](/cloud/)**, we’ll be rolling out these new features automatically in the next few weeks. If you'd like to get it sooner, just let us know. Email help@metabase.com and we'll upgrade you.
- **If you’re self-hosting Metabase**, you (or your admin) can follow the docs on [how to upgrade](/docs/latest/operations-guide/upgrading-metabase).

Feel like you _just_ finished an upgrade? [Try Metabase Cloud for free](/upgrade/) to get automatic upgrades and excellent technical support.

## Save questions straight to dashboards

![save-to-dash](/images/posts/metabase-53/save-to-dash.jpg)

We 💙 collections for keeping your Metabase organized. But we also know most questions are only ever used in a single dashboard. So to keep your Metabase tidier, questions are now saved into dashboards by default. This also makes building a dashboard easier, as you don’t have to go via collections.

Plus, we’ve added tidying tools for admins, so if you have a bunch of questions used only in one dashboard, you can [move the questions into the dashboards](/docs/v0.53/exploration-and-organization/collections#moving-questions-into-dashboards) so they don't clutter up the collection. And for [questions that haven’t even been looked at in a while, you can delete them](/docs/v0.53/exploration-and-organization/collections#cleaning-up-collections) (on Pro and Enterprise only). If you're an admin, look for a little badge at the top-right to start moving questions now.

<div class="blog-callout p2 mb4 bordered rounded">
  <a href="https://www.youtube.com/watch?v=oti_zGZILIA" class="callout-link">▶️ Watch Alex showcasing how questions are now saved in dashboards.</a>
</div>

## Iframe and link card parameters let you show content dynamically

{% include youtube.html id="SMKsq6M__YM" %}

Building on the much loved addition of [iframe cards for dashboards from v51](/releases/metabase-51#add-external-content-to-dashboards-with-iframe-cards), you can now set variables on [iframe and link cards](/docs/latest/dashboards/introduction#iframe-cards) to update the content dynamically. This lets you use dashboard filters and custom click behavior to update the content displayed on the cards.

A cool example we came across when testing this feature internally was in a dashboard for tracking page views in our docs. We didn't want to have to flip between windows or tabs to see the docs page and its data, so we set up the dashboard so we could filter on specific articles and include an iframe card of the article itself.

## Preemptive caching for faster queries

![preemptive-caching](/images/posts/metabase-53/preemptive-caching.jpg)

[Automatically refresh the cache](/docs/v0.53/configuring-metabase/caching#refresh-cache-automatically) when the cache is invalidated. Metabase now anticipates common query patterns and preemptively caches results—no more waiting for someone to trigger a query or view the result.

For dashboards with parameters, Metabase will always refresh the default results, as well as the results for the ten most frequently applied parameter combinations. This means you get a better balance between query freshness and cost.

[Available on Pro and Enterprise plans.](/pricing/)

<div class="blog-callout p2 mb4 bordered rounded">
  <a href="https://youtu.be/PMhXW4ZO0to" class="callout-link">▶️ See how to set up preemptive caching</a>
</div>

## Model details now in an expandable sidebar

![model-sidebar](/images/posts/metabase-53/model-sidebar.jpg)

All of the metadata previously found in the [model](/docs/latest/data-modeling/models) detail page can now be found tucked in the sidebar, so it’s easier to find and closer to other relevant metadata. The model sidebar includes info like:

- Description of the model, and a list of fields
- Who created it and who was the last to edit it
- Relationships, like which questions use it, what tables are linked to it
- History of edits and if and when it’s been [moderated and verified](/docs/latest/exploration-and-organization/content-verification) (on Pro and Enterprise)
- Insights (Pro and Enterprise only) [showing who’s using it, when, and how](/features/usage-analytics)

## Query builder improvements

![multiselect-in-Contains](/images/posts/metabase-53/multiselect-in-Contains.jpg)

- We've improved filtering in the query builder by allowing multiple selections in the filter widget when using `contains()`, `doesNotContain()`, `startsWith()`, and `endsWith()`, making it easier to refine your queries without switching to SQL. Additionally, [custom expressions](/docs/v0.53/questions/query-builder/expressions) now support a more concise way to write multi-select "Is" filters using `in()` and `notIn()`, so you no longer need to chain multiple `OR` conditions manually.
- But wait, there’s more custom expression goodness! We’ve made custom expressions more intuitive by adding an `if()` function as an alias for `case()`, so Excel-fans can jump right in without needing to check the docs.
- We’ve also improved the query builder UI to make controls more predictable and easier to navigate. Updates include clearer button labels, better navigation between the notebook editor, results, and visualization settings, and UI tweaks to make actions like adding custom columns or viewing SQL more intuitive.

<div class="blog-callout p2 mb4 bordered rounded">
  ▶️ See how <a href="https://youtu.be/ZNnU8A_RuVk" class="callout-link">In() and notIn() custom expressions</a> and <a href="https://youtu.be/ZNnU8A_RuVk" class="callout-link">Conditional expressions with IF work.</a>
</div>

## More granularity to latitude and longitude binning on maps

![latlong-binning](/images/posts/metabase-53/latlong-binning.jpg)

Now you can really dial in to group geographical data with greater precision, making it easier to analyze patterns in location-based data. Instead of relying on larger bins or broad geographical regions, you can now zoom in on more specific latitudes and longitudes.

<div class="blog-callout p2 mb4 bordered rounded">
 <a href="https://www.youtube.com/watch?v=kSo1IAiALz8" class="callout-link"> ▶️ Watch Alex showcase the new feature.</a>
</div>

## Faster Snowflake sync

Snowflake syncs are now on average about 6x faster! That’s money back in your pocket, time back in your…pocket (on your watch?). You get the gist.

## Paginated PDF exports

If you’ve ever tried printing off a big dashboard as a PDF, you may be entitled to compensation. Compensation in the form of a great new solution: we’ve added page breaks to PDFs! Metabase will find logical places to add page breaks so there’s no weird cut offs mid-chart. Just neater exports that print more legibly, and are generally less stressful.

<div class="blog-callout p2 mb4 bordered rounded">
  <a href="https://www.youtube.com/watch?v=xDLb82VdjwE" class="callout-link">▶️ See how the new paginated PDFs look.</a>
</div>

## New and improved API docs

We [replaced our API docs with Scalar OpenAPI docs](/docs/latest/api). In particular, this means we no longer have docs pages with URLs like /api/card . If you want to link to a specific endpoint, search for it in Scalar docs, and click on #  next to the header to copy the URL.

---

## Try the new Embedded Analytics SDK for React (Beta)

![embedding-sdk](/images/posts/metabase-53/embedding-sdk.jpg)

The [Embedded Analytics SDK for React](/product/embedded-analytics-sdk) gives you more flexibility, customization, and control over how Metabase integrates into your app.

We’re putting a few finishing touches on it and it’s soooo close to coming out of beta.

But you don’t have to wait til then, run this command to try out the SDK: `npx @metabase/embedding-sdk-react@latest start`.

Cool stuff you can do with the SDK:

- Embed _exactly_ what you want and place wherever you want.
- Dynamic theming with maximum customization via CSS variables.
- Manage interactivity per component and per user.
- Own the UX with options to override Metabase menus, add your own actions, and more.

If you’re already embedding Metabase, the SDK will let you take your in-app reporting to the next level. You can try the SDK now without interfering with your current setup. And for the embedding-curious who are looking to get some reporting into your product, you can [check out how our different embedding types compare](/embedding-demo), and [take the SDK for a spin for free](/docs/latest/embedding/sdk/quickstart).

## Support for serialization workflows in interactive embedding

We introduced Stable entity IDs for serialization workflows for static and SDK embedding in v51. Now we’ve added them for interactive as well so they work for all types of embedding. That means smoother transfer of content between instances with IDs stay the same regardless of which environment or instance you’re in.

## Breaking changes

**Java 21+ required:** Metabase 53 drops support for Java versions below 21.

## Join the webinar for a walkthrough of these new features with the product team

[Save your spot for the live event on February 25](/events/metabase-53-release-webinar).

### Big thanks to everyone who contributed!

Thanks to all those who submitted bug reports, feature suggestions, translations, and pull requests. Metabase gets better and better thanks to your efforts.

Hope you enjoy the release. If you want to get into the nitty-gritty, check out our [release notes in GitHub](https://github.com/metabase/metabase/releases/). To see what other features we have in the works, see our [product roadmap](/roadmap).

Cheers,
The Metabase team
