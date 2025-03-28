---
version: v0.53
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: 'People and Groups'
title: Passwords
source_url: 'https://github.com/metabase/metabase/blob/master/docs/people-and-groups/changing-password-complexity.md'
layout: new-docs
redirect_from:
    - /v0.53/operations-guide/changing-password-complexity
---

# Passwords

Metabase can allow authentication via email and password.

## Password complexity

Metabase offers a couple controls for administrators who prefer to increase the password requirements on their user accounts.

    export MB_PASSWORD_COMPLEXITY=strong
    export MB_PASSWORD_LENGTH=10

The settings above can be used independently, so it's fine to use only one or the other. By default Metabase use complexity = `normal` and a password length of 6. The following options are available for complexity choice:

- `weak` = no character constraints
- `normal` = at least 1 digit
- `strong` = minimum 8 characters w/ 2 lowercase, 2 uppercase, 1 digit, and 1 special character

By default, Metabase also prevents users from setting passwords that are in a list of common passwords (like `qwerty123` and
`passw0rd`). Changing the complexity requirement to `weak` disables this behavior.

## Disabling password logins

{% include plans-blockquote.html feature="Disabling password logins" %}

On Pro and Enterprise plans, you can require people to log in with SSO by disabling password authentication from **Admin settings** > **Authentication**.
