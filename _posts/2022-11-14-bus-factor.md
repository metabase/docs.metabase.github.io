---
title: "Bus factor of top GitHub projects"
summary: "What is the bus factor for the top one thousand GitHub repositories with the most stars?"
date: 2022-11-14 00:10:18
last_updated_at: 2022-11-14 00:10:18
categories: "Data explorations"
featured_image: /images/posts/bus-factor/bus-factor.jpg
image: /images/posts/bus-factor/bus-factor.jpg
author: The Metabase Team
layout: post
---

The [Bus factor](https://peerj.com/preprints/1233/) is the number of people on a project that would have to be hit by a bus (or quit) before the project is in serious trouble. We were interested in the bus factors for the top 1,000 projects on GitHub (by stars).

## Observations

Check out our [dashboard](https://metabase-public.metabaseapp.com/public/dashboard/552f3868-5f09-4b0b-a403-67089952d32c), or read on to learn what we’ve found.

## Dataset

- We used the GitHub API and [truckfactor](https://github.com/HelgeCPH/truckfactor) to get and compute the bus factors of the top 1,000 GitHub repositories by star count.
- Due to memory restrictions, we were only able to compute the bus factors for around 95% of the repos on GitHub.
- To exclude codeless repos (such as learning resources, or a curated list of a topic), we removed projects where the primary programming language couldn't be determined, or if the repo was primarily composed of one of the following file types: Makefile, TeX, Dockerfile, and Markdown.
- If you want to play around with the data yourself, go ahead and [download and explore the dataset](https://metabase-public.metabaseapp.com/public/question/87cd0501-3050-4a55-99cc-59000149ca49).

## How we computed the bus factor

We used a library called [truckfactor](https://github.com/HelgeCPH/truckfactor) to compute the bus/truck factor. Here's how truck factor does its calculations. For each repo, truckfactor (and here we're quoting directly from the repo):

- Reads a git log from the repository
- Computes for each file who has the _knowledge ownership_ of it.
  - A contributor has knowledge ownership of a file when she edited the most
    lines in it.
  - That computation is inspired by
    [A. Tornhill _Your Code as a Crime Scene_](https://pragprog.com/titles/atcrime/your-code-as-a-crime-scene/).
  - Note, only for text files knowledge ownership is computed. The tool may
    not return a good answer for repositories containing only binary files.
- Then similar to [G. Avelino et al. _A novel approach for estimating Truck Factors_](https://peerj.com/preprints/1233.pdf)
  low-contributing authors are removed from the analysis as long as still more
  than half of all files have a knowledge owner. The amount of remaining
  knowledge owners is the truck factor of the given repository.

For some context, studies conducted in [2015](https://peerj.com/preprints/1233/) and [2016](https://arxiv.org/abs/1604.06766v1) calculated the bus/truck factor of 133 popular GitHub projects. The results show that most of the projects had a small bus factor (65% have bus factor ≤ 2) and that less than 10% of those projects had a bus factor greater than 10.

## Distribution of bus factors

Almost half of the projects have a bus factor of two or less.

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/7a331840-d920-49a3-904f-46992dad6621"
    frameborder="0"
    width="800"
    height="600"
    allowtransparency
></iframe>

Only 10% of projects have bus factor of 6 or higher.

## There is no correlation between repo stars and bus factor

We initially thought that more popular projects should have more contributors, and therefore a higher bus factor, but that doesn't seem to be the case.

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/9f7c2f41-0d84-4e85-8b30-5714d2dee5bb" frameborder="0"
    width="800"
    height="600"
    allowtransparency
></iframe>

## Average bus factor of top languages used

We're talking about languages in general here, so languages like HTML and CSS are in play.

- More than half of all projects use the Shell scripting language (Bash scripts).
- The most common languages were web-based tools: JavaScript, HTML, CSS, and Typescript. The top general purpose languages included Python, C, and Java.
- Projects that were written in web-based development languages (JavaScript, HTML, CSS, TypeScript and SCSS) tend to have a lower bus factor compared to projects written in general purpose programming languages (Python, C, Java and C++)

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/b4fc7219-6fbd-4e6c-b174-0ac939994de2"
    frameborder="0"
    width="800"
    height="600"
    allowtransparency
></iframe>

## Most popular labels

Among the most-starred repositories, `JavaScript` is the most popular label, led by popular web frameworks and libraries like `React`, `Vue`, `Bootstrap`, and `Angular`. If we combine `Go` and `Golang`, projects written in Go would be the second most-labeled language (though it's possible that some repos include both the `Go` and `Golang` labels, which would inflate the label count).

`Hacktoberfest` is the second most common label, which makes sense. Hacktoberfest is a month-long celebration of open-source projects to encourage the contributions to open-source projects, and so repo maintainers are incentivized to add the label to attract contributors.

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/62592c87-6238-42a9-b07a-ba81fd7a3c53"
    frameborder="0"
    width="800"
    height="600"
    allowtransparency
></iframe>

## Bus factors by software types

We also broke out bus factor by software type, and machine learning had the most projects with bus factors in the double digits.

### Backend projects

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/9aa01388-fdc7-4477-af76-27f13bb5a1dc"
    frameborder="0"
    width="800"
    height="600"
    allowtransparency
></iframe>

### Frontend projects

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/8a961ab3-29af-4673-8840-84526b4abc1e"
    frameborder="0"
    width="800"
    height="600"
    allowtransparency
></iframe>

### Machine learning projects

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/3be37b10-3f5e-423e-ba63-a3e0e492637d"
    frameborder="0"
    width="800"
    height="600"
    allowtransparency
></iframe>

### Business intelligence projects

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/87a2cbf5-099e-46eb-bc7c-d28055e0e147"
    frameborder="0"
    width="800"
    height="600"
    allowtransparency
></iframe>

## Conclusions

- Metabase supports public transportation.
- Software is built on a house of cards.
- Document your code.
- Metabase's bus factor is _decent_ (4). Plus, we're a fully distributed team, so the bus accidents would have to be globally coordinated to put the project in any kind of jeopardy.
- But our bus factor could be better, so, you know, [we're hiring](/jobs).
