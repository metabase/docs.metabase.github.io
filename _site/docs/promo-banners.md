# In-Page Promo Banners

In-page promo banners are used to promote a specific product or service on a page.

## Creating a New Banner

Duplicate `_includes/shared/in-page-promo.html` and update the content as needed.

For now, the image must be square — typically an event category thumbnail.

## Placing your New Banner

To place your new banner on a page, add the following code to the page's markdown file:

```liquid
{% include shared/your-in-page-promo-name.html %}
```

Be sure to replace `your-in-page-promo-name` with the name of your new banner file.
