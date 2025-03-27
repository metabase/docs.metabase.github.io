---
title: "Maps data visualizations: best practices"
summary: "Learn how to create impactful map data visualizations with tips on using pin maps, grid maps, and region maps to highlight patterns and make data-driven decisions."
date: 2024-12-19 00:05:05
last_updated_at: 2024-12-19 00:05:05
categories: "Analytics and BI"
author: Alex Yarosh
featured_image: /images/posts/maps-data-visualization.jpg
image: /images/posts/maps-data-visualization.jpg
layout: post
---

Maps are a powerful way to visualize data, but they work best when used thoughtfully. In this article, we share the basic philosophy behind putting your geospatial data on the grid, like summarizing information to reflect how people naturally think about geography—neighborhoods, states, or countries—rather than scattering individual data points across a pin map. We’ll explore why region maps often tell a clearer, more actionable story and how considering the shape of your data can help you choose the right visualization to highlight patterns and drive better decisions.

We also covered this in a dedicated webinar, check out the recording [here](/events/maps-in-metabase-tips-and-tricks).

To help you get started, here’s a quick [cheat sheet](https://metaba.se/maps-webinar) with everything we’ve discussed about visualizing maps in Metabase, including a philosophy behind picking which map to use. Bookmark it and use it as a reference for your next maps visualization.

If you’re interested in maps, check out [this guide](/learn/metabase-basics/querying-and-dashboards/visualization/maps) — it covers everything you need to know about map visualization in Metabase.

## What are map data visualizations?

Map data visualizations display data linked to specific geographic locations. Rather than showing individual data points, they group data by regions—such as countries, states, or neighborhoods—to reveal patterns and trends. This approach makes it easier to analyze how data varies across different areas. Common use cases include visualizing sales by region or population density by city. Map visualizations help transform complex data into clear, actionable insights by providing a geographic context.

## Common types of maps data visualizations

### [Pin map](/glossary/pin_map)

A pin map displays a single discrete marker for each point of interest. Great for pinpointing exact locations using latitude and longitude. While they look nice, keep in mind that too many points can clutter the map and make trends hard to spot.

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/76ff7cfd-f69d-4649-b65c-4925505b8c19"
    frameborder="0"
    width="300"
    height="400"
    allowtransparency
></iframe>

### [Grid map](/glossary/grid_map)

A grid map is a map with values overlaid graphically in a regular grid, e.g., as squared 10km by 10km colored to show values. These break down data into a grid, similar to a 2D histogram, and work well when you don’t have specific categories. They’re especially useful for data on natural events, like wildfire locations.

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/9c094728-b28f-442a-9822-45d36c57ad5c"
    frameborder="0"
    width="300"
    height="400"
    allowtransparency
></iframe>

### [Region map](/glossary/region_map)

A region map is a map that shows information for geographic regions (such as countries or states), e.g., by coloring each region to show a value. If you want to show data by country, state, or neighborhood, region maps give a clear snapshot of distribution by area. They’re a great choice for highlighting patterns or differences across regions.

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/da9b5845-df75-4f00-97d4-1b1b784da0b3"
    frameborder="0"
    width="300"
    height="400"
    allowtransparency
></iframe>

## Using custom maps in Metabase

Metabase supports custom maps, allowing you to upload a JSON file to create region-based visualizations.

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/a9e688ce-db10-4293-895b-7e791024cd69"
    frameborder="0"
    width="300"
    height="400"
    allowtransparency
></iframe>

While this offers flexibility, there are a few best practices and limitations to consider:

- **Avoid adding too much detail.** Do you need the exact location of every rack, or would an aggregated view—such as grouping data by administrative regions—be more useful? Summarized data often provides clearer insights.
- **Focus on actionable insights.** Visualizing areas with poor coverage is helpful, but think about the next step. Who needs this information, and what actions should they take?

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/51230aef-de46-417c-9b02-36dc3ce5c4c9"
    frameborder="0"
    width="300"
    height="400"
    allowtransparency
></iframe>

**Technical limitations to keep in mind:**

- Your dataset must include a region column. Metabase can’t infer regions from latitude and longitude for region maps.
- Metabase doesn’t link custom maps to your data automatically or allow drill-through functionality for regions.
- When setting up filters, use "Category" instead of "Location" for region-based filtering.

## Which map data visualization type to choose?

The choice of map will depend on what you're trying to communicate. Metabase has 3 different map types for 3 different types of data:

| Data type              | Map visualization type |
| ---------------------- | ---------------------- |
| Individual data points | Pin map                |
| Summary by coordinates | Grid map               |
| Summary by regions     | Region map             |

### Do you really need a pin map?

Before you drop data points onto a pin map, ask yourself: is it necessary? Just like we don’t create bar charts with raw data, the goal of visualizations is to summarize information and highlight the bigger picture—not overwhelm with every individual detail.
Pin maps work well when exact locations matter, like tracking deliveries or identifying store locations. But in most cases, summary maps are more effective.

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/516cf49b-12d5-4519-9665-c63cb84e9864"
    frameborder="0"
    width="300"
    height="400"
    allowtransparency
></iframe>

## Smarter map visualizations

<ol>
  <li>
    Use GIS maps for unfiltered data. If you’re plotting all data points without filtering, embed a GIS map instead. With Metabase v51, you can use <a href="/docs/latest/dashboards/introduction#iframe-cards">iframe cards</a> to embed GIS maps, improving performance and clarity. Metabase dashboard cards are best when connected to filters; if filtering isn’t part of your setup, a GIS map might be the better option.
  </li>

  <li>
    Choose region maps when possible.
    <ul>
      <li>
        Grid maps work with any geo data but can feel too generic to provide clear insights.
      </li>
      <li>
        Region maps require upfront work, like adding region data to your dataset (e.g., states, districts, neighborhoods). However, they align better with how your organization views geographic data, making it easier to identify patterns and take action.
      </li>

      <p>Tip: For nested regions like City > Borough > Neighborhood, use a map for the smallest region (e.g., neighborhood) with dashboard filters for parent regions. This reduces clutter and makes data exploration easier.</p>

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/300715c4-11ac-4411-bc8c-3bdc8569b52f"
    frameborder="0"
    width="300"
    height="400"
    allowtransparency
></iframe>

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/51230aef-de46-417c-9b02-36dc3ce5c4c9"
    frameborder="0"
    width="300"
    height="400"
    allowtransparency
></iframe>
</ul>
</li>

<li>
  <p>Do you even need a map?</p>
  <p>Not all data benefits from a geographical representation. Ask yourself: does the geographic relationship between areas matter? For instance, do you care that Texas is next to New Mexico, or are you only focused on the metrics? If geography isn’t relevant, a bar chart might convey your data more effectively and reduce cognitive load for viewers.</p>

  <iframe
    src="https://metabase-public.metabaseapp.com/public/question/01de3f34-f42b-489d-86ac-4010cdf1f80f"
    frameborder="0"
    width="300"
    height="400"
    allowtransparency
  >
  </iframe>

  <iframe
    src="https://metabase-public.metabaseapp.com/public/question/d5c341a3-8000-47f9-91dc-7b933a4f7f9b"
    frameborder="0"
    width="300"
    height="400"
    allowtransparency
  >
  </iframe>

  <p>Maps are just one way to tell a story with your data. Choosing the right map (or deciding if you need a map at all) helps to make your visuals clear, actionable, and aligned with your goals. By focusing on how people naturally interpret geographic data, you can help drive better decisions.</p>

  <p>Start simple, experiment, and remember: the best visualizations make it easier for your audience to see the bigger picture.</p>
  </li>
</ol>

## More data visualization resources

- [Maps data visualization cheat sheet](https://metaba.se/maps-webinar)
- [Guide to maps](/learn/metabase-basics/querying-and-dashboards/visualization/maps)
- [Visualizing maps in Metabase \| Webinar recording](/events/maps-in-metabase-tips-and-tricks)
- [How to visualize time-series data: best practices](/blog/how-to-visualize-time-series-data)
- [How to build better line and bar charts](/blog/how-to-build-better-line-and-bar-charts)
