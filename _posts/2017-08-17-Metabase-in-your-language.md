---
title: "Help us provide Metabase in your language!"
date: 2017-08-17 00:10:58
last_updated_at: 2017-08-17 00:10:58
categories: "News"
author: Sameer Al-Sakran
image: /images/posts/help-us-provide-metabase-in-your-language!.jpg
layout: post
---

## Overview

The Metabase project has a lot of users for whom English is not a first language. There are also a lot more potential users who would be able to use Metabase if it provided an interface in their native language.

However, the team has neither the in-house language proficiency, nor the funds to hire translators in all of these languages. Additionally, we have a fairly high bar for design and copy, and are in active development, which means that there is a fair bit of work to be done in translation.

To explore the project’s ability to deliver a localized experience, we’re going to take a crack at it over the next few months. This will occur in two main stages per language.

## Stages

### A) Localization of user-facing interfaces

- The core team (or the community) finds and replaces all the user-facing strings with i18n wrappers.
- The core team finds all in-image text, extracts it from the image, and wraps it.
- The community provides translations for as many of these as possible.
- Based on how complete the translations and commitments behind them are, some fraction of languages are elevated to “Primary.”
- If a language passes the criteria for becoming a primary end-user-facing language, an admin can switch the interface to that language.

### B) Localization of admin-facing interfaces

- The core team finds and replaces all the admin-facing strings with i18n wrappers.
- The community provides translations for as many of these as possible.
- Based on how complete the translations and commitments behind them are, some fraction of languages are elevated to “Primary," only if the user-facing localization has already been completed.
- A language that has a Primary level translation on both the user-facing interface and the admin-facing interface will be eligible for a setup wizard selection for the entire end-to-end setup process to be in that language.

## Criteria for a primary language

### 100% translation coverage

The coverage should be complete. While occasional regressions from this standard are okay in the event of a launch, the expectation is that once a language enters the primary list, there will be a consistent level of quality and coverage of translations that hovers around 100% complete.

### Design sign-off

The lengths of the translated text can’t break the design of the application. If a translation breaks our design, one of the two need to be fixed.

### Native speaker sign-off

The translations should have a similar feel and tone as the english versions — helpful, informal and nice.

### Committed translator

There should be an individual or institution that commits to following the ~6 week release cadence of the project, and making sure that their language is up-to-date on any language tweaks. At the start of a release process, we will send out an email describing the features we plan on working on and the expected changes in UI. Once those have been stabilized, we’ll then send out an email approximately 1 or 2 weeks away from the release. At that point, it is expected that the individual or institution will commit to providing translations in time.

Once a language is already translated, this will be a fairly modest time commitment, but an extremely important one to follow through with.

## Secondary languages

We will additionally maintain a list of secondary languages. Depending on the scale of localization, we might or might not provide a way for end users to select them. They will not be publicized or made easily switchable into.

## Dropping languages from the primary list

If after a release or two the quality of a language drops, the core team might drop that language from the primary list to the secondary list. On upgrade, we will warn the administrator in the Admin UI that they are using a currently “less supported” language.

## Community

This is not an effort the core team can do on our own. We need individuals or institutions to step up and help us. The help will not be quick and glamorous, but hopefully the payoff of helping others who speak your language to use Metabase will make it worthwhile and gratifying for you.

If you’re interested in helping, [please sign up here](https://docs.google.com/forms/d/e/1FAIpQLSfplkCJ6OMv9vid1VgWaKakUPeVoCYFKoYVDAHC8BWw6GqaJg/viewform?usp=sf_link).
