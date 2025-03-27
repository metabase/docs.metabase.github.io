## Managing the Promo Banner

### Displaying/not displaying a banner

Uncomment/comment line 3 of `_includes/header.html`.

Update $promo-banner-height in `_sass/variables/dimensions.scss`, see inlined comment in file.

In `css/main.css`, inside selector `body header.bootstrap`, update `top`. See inlined comment in file.

### Banners promoting an event

Make sure that the `div` with class `promo-banner` in `_includes-promo-banner.html` has attributes `data-date` and `data-time`, and that these are set in UTC+0.

There are countdowns in the banner that use the date and time above.
