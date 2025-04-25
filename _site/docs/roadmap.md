# Managing the Roadmap Page (/roadmap)

Data for the page lives in \_data/roadmap.yml.

Place a given entry under one of the time slots below:

* now
* soon
* later
* shipped

## An entry

A given entry will have the following structure:

* `- paid`: true or false. Default: false
* `title`: a short phrase, no period at the end
* `description`: a short paragraph
* `class`: one-by-one, one-by-two (if so, can also have right-side as a class, see below). Default: two-by-one.
* `image`, with entries
  * `src`: path and filename
  * `alt`: short piece of text

### On classes and tiling

We can tile the entries using a few variations.

The logic of the class names is: horizontal-by-vertical. Therefore one-by-two is one column and two rows.

If a one-by-two tile will live on the right column, you must  add `right-side` as a class, so it will look like `one-by-two right-side`.
