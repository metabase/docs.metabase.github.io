# Managing Events

## Adding an Event

### Basic checklist

1. Add an entry to `_data/events.yml`.
2. Add a file to `_events`, whose name is the `slug` you added in the entry above, followed by `.html`. For example, `learning-actions.html`.

### Adding an entry to `_data/events.yml`

While you can duplicate and edit an existing event entry from the yml file and figure the rest out by yourself, below are some comments on the keys and values.

- `- name` (required): the name of your event, meant for the readers of the website. Can be written like the title of a book, or a movie etc.

- `slug` (required): ideally a short version of the name of your event, `always-snake-cased`.

- `category` (required): should be the slug of one of the categories in `_data/event-categories.yml`. For example, `fireside-chats`, `whats-new` and so on.

- `date_utc` (required): always format it `YYYY-MM-DD`

- `time_utc` (required): always format it `hh:mm`, 24-hour. No AM or PM here. Please use UTC-0 times, the users’ browsers will display the times in their timezones.

- `length` (optional): any string. You can write `20 minutes`, `2 hours`. What you write will be displayed.

- `registration_snippet` (required for upcoming events): a Contrast registration snippet. Should look like `<div id="__contrast_registration_2fabcc1a-a63a-4db9-b267-7b12206666d4" style="width: 100%; height: 100%;"></div> <script type="text/javascript"> (() => { const frameContainer = document.getElementById( '__contrast_registration_2fabcc1a-a63a-4db9-b267-7b12206666d4' ); const iframeUrl = new URL( 'https://app.getcontrast.io/widgets/register/metabase-metabase-50-better-caching-permissions-visualizations-more?primaryColor=%23509ee3&locale=en' ); const iframe = document.createElement('iframe'); iframe.src = iframeUrl.href; iframe.setAttribute('style', 'width: 100%; height: 100%; border: 0;'); iframe.setAttribute('title', 'Contrast registration form'); if (window.location.search) { const urlParams = new URLSearchParams(window.location.search); const utms = { utm_medium: urlParams.get('utm_medium'), utm_source: urlParams.get('utm_source'), utm_campaign: urlParams.get('utm_campaign'), utm_content: urlParams.get('utm_content'), utm_term: urlParams.get('utm_term'), }; Object.keys(utms).forEach((key) => { if (utms[key]) { iframeUrl.searchParams.set(key, utms[key]); } }); iframe.src = iframeUrl.href; } frameContainer.appendChild(iframe); })(); </script>`.

- `intro` (required): arbitrary html. By default, if only text, please wrap each paragraph in `<p>` tags.

- `about` (optional): typically one or two paragraphs, each written with a `-` before each one. Will be shown at the top of the main body of the event page, below the hero.

- `recording_id` (optional): the id of your YouTube video.

- `guests` (optional)

  - `name` (required)
  - `image` (required): save the image in `images/events/guests`, and add the filename here, for example `firstname-lastname.png`
  - `title` (required): actually, title and company. So `CEO, Google`.
  - `bio` (required): one paragraph of text.

- `summary_filename` (optional): if you want to add extra content about the event, save an html file in `_includes/pages/event/summary` and add its filename here. Please use the full filename, for example `learning-actions.html`. Better if the same name as the slug.
