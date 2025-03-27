---
layout: learn_article
date: 2022-10-05
categories: Querying
image: /learn/images/formatting/custom-column.png
author: The Metabase Team
redirect_from:
  - /learn/visualization/formatting
  - /learn/questions/formatting
---

Let's say that Metabase wants to host a dinner party for our lovely community. For the mains, we have the option of beef tibs or chickpea stew, and for the sides, we have injera or grilled vegetables. We've sent out a survey with the menu options so everyone can let us know what they'd like to eat.

Unfortunately, we forgot to set up data validation on our form, so the responses have come in looking like this:

```plaintext
| Response ID | Main                                | Side                    |
|-------------|-------------------------------------|-------------------------|
| 1           | beef tibs                           | injera                  |
| 2           | chickpea stew                       | grilled vegetables      |
| 3           | BEEF TIBS WITH CHICKPEA STEW PLEASE |                         |
| 4           |                                     | Grilled Vegetables      |
| 5           | Surprise me.                        |                         |
```

We want to:

1. Clean up and combine the main and side values so that we can count the most popular meals.
2. Deal with responses that are invalid in some way (such as multiple mains, or mains that don't exist on our menu).
3. Keep track of guests who submitted a response with missing information.

Overall, we're hoping to end up with a table that looks like this (scroll right to view the full table):

```plaintext
| Response ID | Main                                | Side                    | Order                                 | Follow up? |
|-------------|-------------------------------------|-------------------------|---------------------------------------|------------|
| 1           | beef tibs                           | injera                  | beef tibs with injera                 | no         |
| 2           | chickpea stew                       | grilled vegetables      | chickpea stew with grilled vegetables | no         |
| 3           | BEEF TIBS WITH CHICKPEA STEW PLEASE |                         | beef tibs only                        | yes        |
| 4           |                                     | Grilled Vegetables      | grilled vegetables only               | yes        |
| 5           | Surprise me.                        |                         |                                       | yes        |
```

## Searching and extracting text

Let's assume that the only valid main options are beef tibs and chickpea stew. We can use the [`regexextract` function](/docs/latest/questions/query-builder/expressions/regexextract) to check for valid menu options inside each response.

To search values in the **Main** column for "beef tibs", we'll create a [custom column](/learn/metabase-basics/querying-and-dashboards/questions/custom-expressions#custom-columns) with the regex pattern `(?i)(beef tibs)`. This regex pattern does a case-insensitive check to see if "beef tibs" appears anywhere in the response.

Create the **Beef** custom column using:

```mbql
regexextract([Main], "(?i)(beef tibs)")
```

You should get the output:

```plaintext
| Response ID | Main                                | Beef      |
|-------------|-------------------------------------|-----------|
| 1           | beef tibs                           | beef tibs |
| 2           | chickpea stew                       |           |
| 3           | BEEF TIBS WITH CHICKPEA STEW PLEASE | BEEF TIBS |
| 4           |                                     |           |
| 5           | Surprise me.                        |           |
```

Then, we want to search the **Main** column for the valid value "chickpea stew".

Create the **Chickpea** column:

```mbql
regexextract([Main], "(?i)(chickpea stew)")
```

with the output:

```plaintext
| Response ID | Main                                | Chickpea      |
|-------------|-------------------------------------|---------------|
| 1           | beef tibs                           |               |
| 2           | chickpea stew                       | chickpea stew |
| 3           | BEEF TIBS WITH CHICKPEA STEW PLEASE | CHICKPEA STEW |
| 4           |                                     |               |
| 5           | Surprise me.                        |               |
```

## Consolidating values from different columns

Next, we'll create a column called **Main (Clean)** that'll consolidate the valid mains for each guest's response. We want to set up some logic so that if **Main** contains:

- A single valid option (beef tibs or chickpea stew), then fill **Main (Clean)** with that option.
- Multiple valid options, then put the first (leftmost) valid option in **Main (Clean)**.
- No valid options, then fill **Main (Clean)** with a blank value (empty string).

To create **Main (Clean)**, we'll use the [`coalesce` function](/docs/latest/questions/query-builder/expressions/coalesce) to handle the three cases listed above, and wrap the whole thing in a [`lower` function](/docs/latest/questions/query-builder/expressions-list#lower) to standardize everything in lowercase.

```mbql
lower(coalesce([Beef],[Chickpea],""))
```

which should give us the output (scroll right to view the full table):

```plaintext
| Response ID | Main                                | Beef      | Chickpea      | Main (Clean)   |
|-------------|-------------------------------------|-----------|---------------|----------------|
| 1           | beef tibs                           | beef tibs |               | beef tibs      |
| 2           | chickpea stew                       |           | chickpea stew | chickpea stew  |
| 3           | BEEF TIBS WITH CHICKPEA STEW PLEASE | BEEF TIBS | CHICKPEA STEW | beef tibs      |
| 4           |                                     |           |               |                |
| 5           | Surprise me.                        |           |               |                |
```

## Extracting text and consolidating the results

We'll handle the **Side** column the same way as the **Main** column. First, use [`regexextract` function](/docs/latest/questions/query-builder/expressions/regexextract) to search and return valid values from the **Side** column.

Create the **Injera** custom column:

```mbql
regexextract([Side], "(?i)injera")
```

and the **Vegetables** custom column:

```mbql
regexextract([Side], "(?i)(grilled vegetables)")
```

to get the output:

```plaintext
| Response ID | Side               | Injera | Vegetables         |
|-------------|--------------------|--------|--------------------|
| 1           | injera             | injera |                    |
| 2           | grilled vegetables |        | grilled vegetables |
| 3           |                    |        |                    |
| 4           | Grilled Vegetables |        | Grilled Vegetables |
| 5           |                    |        |                    |
```

Then, use the [`coalesce` function](/docs/latest/questions/query-builder/expressions/coalesce) with the [`lower` function](/docs/latest/questions/query-builder/expressions-list#lower) to handle cases where people have put partial, multiple, or no valid side options, and convert all the values to lowercase:

Create the **Side (Clean)** custom column:

```mbql
lower(coalesce([Injera],[Vegetables], ""))
```

to get:

```plaintext
| Response ID | Side               | Injera | Vegetables         | Side (Clean)       |
|-------------|--------------------|--------|--------------------|--------------------|
| 1           | injera             | injera |                    | injera             |
| 2           | grilled vegetables |        | grilled vegetables | grilled vegetables |
| 3           |                    |        |                    |                    |
| 4           | Grilled Vegetables |        | Grilled Vegetables | grilled vegetables |
| 5           |                    |        |                    |                    |
```

## Combining values from different columns

Finally, we want to generate complete orders by checking each scenario:

- If **Main (Clean)** and **Side (Clean)** both contain a valid option, then return "main with side".
- If there's only one valid option, then return "main only" or "side only".
- If there's no valid options, leave the order blank (return an empty string).

To check whether a column is non-empty, we'll use the [`isempty` function](/docs/latest/questions/query-builder/expressions/isempty).

For example, to check if **Main (Clean)** is blank:

```mbql
isempty([Main (Clean)])
```

To check if **Main (Clean)** and **Side (Clean)** are _both_ blank, you can combine the expressions using `AND`:

```mbql
isempty([Main (Clean)]) AND isempty([Side (Clean)])
```

`isempty` currently [only works inside another function](/docs/latest/questions/query-builder/expressions/isempty#limitations), so we'll need to put each of our checks inside a [`case` function](/docs/latest/questions/query-builder/expressions/case). We'll put placeholder text as the output for now:

```mbql
case(
    (isempty([Main (Clean)]) AND isempty([Side (Clean)])), "",
    isempty([Side (Clean)]), "main only",
    isempty([Main (Clean)]), "side only",
    "main with side"
)
```

Note that the order of the cases matters, because:

- The `case` function evaluates each expression in order, and stops as soon as the _first_ valid case is found.
- If you swapped the first case with the second case, the expression would confirm that **Side (Clean)** is empty and return "main only" right away, without getting to check whether **Main (Clean)** is also empty.

Finally, to fill in the final order for each guest, we'll use the [`concat` function](/docs/latest/questions/query-builder/expressions/concat) to link the values from **Main (Clean)** and **Side (Clean)** with other words (including whitespaces).

Create the **Order** column using:

```mbql
case(
    (isempty([Main (Clean)]) AND isempty([Side (Clean)])), "",
    isempty([Side (Clean)]), concat([Main (Clean)], " only"),
    isempty([Main (Clean)]), concat([Side (Clean)], " only"),
    concat([Main (Clean)], " with ", [Side (Clean)])
)
```

Overall, this will give us a set of formatted columns like this (scroll right to view the full table):

```plaintext
| Response ID | Main                                | Side               | Main (Clean)    | Side (Clean)       | Order                                 |
|-------------|-------------------------------------|--------------------|-----------------|--------------------|---------------------------------------|
| 1           | beef tibs                           | injera             | beef tibs       | injera             | beef tibs with injera                 |
| 2           | chickpea stew                       | grilled vegetables | chickpea stew   | grilled vegetables | chickpea stew with grilled vegetables |
| 3           | BEEF TIBS WITH CHICKPEA STEW PLEASE |                    | beef tibs       |                    | beef tibs only                        |
| 4           |                                     | Grilled Vegetables |                 | grilled vegetables | grilled vegetables only               |
| 5           | Surprise me.                        |                    |                 |                    |                                       |
```

## Labeling rows with blank values

Let's say we want to add a column called **Follow up?** to keep track of orders that are missing a valid main, a side, or both. This means we'll need to check whether any of **Order**, **Main (Clean)**, or **Side (Clean)** are blank.

We can combine the [`isempty` function](/docs/latest/questions/query-builder/expressions/isempty) with the `OR` [operator](/docs/latest/questions/query-builder/expressions#conditional-operators) to return "yes" if any of the three columns are blank, and "no" if all of the columns are filled out with valid data.

Create **Follow up?** using:

```mbql
case(( isempty([Order])
    OR isempty([Main (Clean)])
    OR isempty([Side (Clean)])), "yes", "no")
```

The final result (scroll right to view the full table):

```plaintext
| Response ID | Main                                | Side                    | Order                                 | Follow up? |
|-------------|-------------------------------------|-------------------------|---------------------------------------|------------|
| 1           | beef tibs                           | injera                  | beef tibs with injera                 | no         |
| 2           | chickpea stew                       | grilled vegetables      | chickpea stew with grilled vegetables | no         |
| 3           | BEEF TIBS WITH CHICKPEA STEW PLEASE |                         | beef tibs                             | yes        |
| 4           |                                     | vegetables              | grilled vegetables                    | yes        |
| 5           | Surprise me.                        |                         |                                       | yes        |
```

## Best practices and tips

In this tutorial, we created a new custom column each time we needed to extract, combine, or label our text data. We also combined simpler functions (such as `lower` and `isempty`) with other functions. In general, we recommend creating a new custom column each time you use a function with multiple parameters (like `case`, `regexextract`, and `coalesce`), because:

- You can confirm whether your expressions are working as expected.
- The logic is easier to read and update.

And, if you're used to working with functions in other tools, like SQL, spreadsheets, or Python, check out the **Related functions** section in the custom expressions docs. For example, you can learn how to convert if-then logic to a Metabase expression using the [related functions for `case`](/docs/latest/questions/query-builder/expressions/case#related-functions).

## Further reading

- [Tutorial: Custom expressions in the query builder](/learn/metabase-basics/querying-and-dashboards/questions/custom-expressions)
- [Docs: Custom expressions](/docs/latest/questions/query-builder/expressions)
- [List of custom expressions](/docs/latest/questions/query-builder/expressions-list)
